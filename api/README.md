# Playbooks API

This is a FastAPI server that provides an API for running playbooks and interacting with the playbooks package.

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Set up your environment variables:

```bash
export OPENAI_API_KEY=your_openai_api_key
export API_PORT=8000  # Optional, default is 8000
```

3. Run the server:

```bash
uvicorn main:app --reload --host=0.0.0.0 --port=${API_PORT:-8000}
```

The server will be available at http://localhost:8000 (or the port you specified).

## Port Configuration

By default, the API server runs on port 8000. You can change this port by setting the `API_PORT` environment variable:

```bash
export API_PORT=9000
```

If you change the API port, make sure to update the `NEXT_PUBLIC_API_BASE_URL` in the frontend's `.env.local` file accordingly.

## API Endpoints

### Run Playbook

```
POST /run-playbook
```

Start a new playbook session.

Request body:
```json
{
  "playbook": "# Playbook content in markdown format",
  "existing_trace_id": "optional-existing-trace-id"
}
```

Response:
```json
{
  "success": true,
  "message": "Playbook started successfully",
  "trace_id": "trace-id"
}
```

### Send Message

```
POST /send-message
```

Send a message to a playbook session.

Request body:
```json
{
  "message": "User message",
  "trace_id": "trace-id"
}
```

Response:
```json
{
  "success": true,
  "response": "Assistant response",
  "trace_data": {
    "id": "trace-item-id",
    "name": "Process user message",
    "type": "step",
    "metadata": {
      "status": "completed",
      "duration": "0.8s",
      "input": "User message",
      "output": "Assistant response"
    }
  }
}
```

### Get Trace

```
GET /traces/{trace_id}
```

Get trace data for a playbook session.

Response: Hierarchical trace structure.

### Stop Playbook

```
DELETE /traces/{trace_id}
```

Stop a playbook session.

Response:
```json
{
  "success": true,
  "message": "Playbook session stopped"
}
```

## Integration with Frontend

To integrate this API with the frontend, update the `python-service.ts` file to use these API endpoints instead of the simulated responses. 