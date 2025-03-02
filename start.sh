#!/bin/bash

# Default ports
export PORT=${PORT:-3000}
export API_PORT=${API_PORT:-8000}

# Check if OPENAI_API_KEY is set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Warning: OPENAI_API_KEY environment variable is not set."
  echo "The API will use mock responses instead of the real Playbooks AI package."
  echo "Set your API key with: export OPENAI_API_KEY=your_openai_api_key"
  echo ""
fi

echo "Frontend will run on port $PORT"
echo "API will run on port $API_PORT"
echo ""

# Check if foreman is installed
if command -v foreman &> /dev/null; then
  echo "Starting services with foreman..."
  foreman start -f Procfile.dev
else
  # Check if concurrently is installed
  if grep -q "\"concurrently\"" package.json; then
    echo "Starting services with npm..."
    npm run start:all
  else
    echo "Starting services in separate terminals..."
    echo "Starting Next.js frontend on port $PORT..."
    npm run dev -- -p $PORT &
    FRONTEND_PID=$!
    
    echo "Starting Python API server on port $API_PORT..."
    cd api && uvicorn main:app --reload --host=0.0.0.0 --port=$API_PORT &
    API_PID=$!
    
    # Handle Ctrl+C to kill both processes
    trap "kill $FRONTEND_PID $API_PID; exit" INT
    
    # Wait for both processes to finish
    wait $FRONTEND_PID $API_PID
  fi
fi 