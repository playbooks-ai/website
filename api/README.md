# Playbooks AI API

This is a FastAPI server that provides an API for running playbooks and interacting with the Playbooks AI package.

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## API Endpoints

- `POST /sessions` - Create a new playbook session
- `POST /sessions/{session_id}/messages` - Send a message to an existing session
- `GET /sessions/{session_id}/traces` - Get trace data for a session
- `DELETE /sessions/{session_id}` - Stop a session
- `GET /playbooks` - Get all available playbook examples

## Session Management

Sessions are persisted to disk using dill pickling. Session files are stored in the `api/sessions` directory.