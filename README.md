# Playbooks AI Companion Website

This is the companion website for the [Playbooks AI](https://github.com/playbooks-ai/playbooks) Python package. It provides a web interface for creating, editing, and running Playbooks AI.

## Features

- **Landing Page**: Information about the Playbooks AI package
- **Playground**: Create, edit, and run Playbooks AI in the browser
- **Trace Viewer**: Visualize the execution trace of your Playbooks AI
- **Example Playbooks**: Try out pre-built example Playbooks AI

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Python 3.8 or later (for running the Playbooks AI package)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/playbooks-ai/playbooks-website.git
cd playbooks-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following content:

```
# API URL for the Python backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Port configuration
PORT=3000
API_PORT=8000
```

### Port Configuration

By default, the frontend runs on port 3000 and the API runs on port 8000. You can change these ports by setting the following environment variables:

- `PORT`: The port for the Next.js frontend (default: 3000)
- `API_PORT`: The port for the Python API server (default: 8000)

If you change the API port, make sure to update the `NEXT_PUBLIC_API_BASE_URL` in `.env.local` accordingly.

### Development

There are several ways to run the development server:

#### Option 1: Use the start script (Recommended)

The easiest way to start both the frontend and API server:

```bash
./start.sh
```

This script will automatically detect the best way to start both services based on your environment.

#### Option 2: Run frontend and API separately

Run the Next.js frontend:

```bash
npm run dev -- -p 3000
# or
PORT=3000 npm run dev
```

In a separate terminal, run the Python API server:

```bash
npm run dev:api
# or
API_PORT=8000 cd api && uvicorn main:app --reload --host=0.0.0.0 --port=8000
```

#### Option 3: Run both services with npm script

```bash
npm run start:all
# or
PORT=3000 API_PORT=8000 npm run start:all
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Production

Build the website for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start:prod
# or
PORT=3000 API_PORT=8000 npm run start:prod
# or
foreman start
```

## Python API Server

This website now includes a real Python API server that integrates with the Playbooks AI package. The API server is located in the `api` directory.

### Setting up the Python API Server

1. Navigate to the API directory:

```bash
cd api
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Set up your environment variables:

```bash
export OPENAI_API_KEY=your_openai_api_key
export API_PORT=8000  # Optional, default is 8000
```

4. Run the server:

```bash
uvicorn main:app --reload --host=0.0.0.0 --port=$API_PORT
```

The API server will be available at http://localhost:8000 (or the port you specified).

## Integration with Playbooks AI Python Package

This website is designed to work with the Playbooks AI Python package. The Python API server in the `api` directory provides the integration between the website and the Playbooks AI package.

The website includes a fallback to a simulated Python backend service in `src/lib/python-service.ts` if the API server is not available.

## Project Structure

- `api`: Python API server for running playbooks
- `src/app`: Next.js app router pages
- `src/components`: React components
  - `src/components/playground`: Playground components
  - `src/components/trace-viewer`: Trace viewer components
  - `src/components/ui`: UI components
- `src/lib`: Utility functions and services
- `public`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Playbooks AI](https://github.com/playbooks-ai/playbooks) - The Python package this website is built for
- [Next.js](https://nextjs.org/) - The React framework used
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [FastAPI](https://fastapi.tiangolo.com/) - The Python API framework used
