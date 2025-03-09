"""
FastAPI server for running playbooks and interacting with the playbooks package.
"""

import importlib
import os
import re
import uuid
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load environment variables from .env file if python-dotenv is installed
try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

# Import playbooks package
from playbooks.applications.agent_chat import AgentChat, AgentChatConfig
from playbooks.config import LLMConfig
from playbooks.exceptions import PlaybooksError
from playbooks.types import AgentResponseChunk

# Initialize FastAPI app
app = FastAPI(title="Playbooks AI API", description="API for running playbooks")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class PlaybookSession:
    """In-memory storage for active playbook sessions."""

    def __init__(self, id: str, playbook: str):
        self.id = id
        self.playbook_content = playbook
        self.messages = []
        self.traces = []
        self.agent_chat = None
        self.ai_agent = None
        self.human_agent = None


# Initialize active sessions
active_sessions: Dict[str, PlaybookSession] = {}


# Request and response models
class PlaybookRequest(BaseModel):
    """Request model for starting a playbook."""

    playbook: str
    existing_trace_id: Optional[str] = None


class MessageRequest(BaseModel):
    """Request model for sending a message to a playbook."""

    message: str
    trace_id: str


class TraceItem(BaseModel):
    """Model for a trace item in the execution history."""

    id: str
    name: str
    type: str
    metadata: Dict[str, Any]


class PlaybookResponse(BaseModel):
    """Response model for starting a playbook."""

    success: bool
    message: str
    trace_id: str
    initial_message: Optional[str] = None


class MessageResponse(BaseModel):
    """Response model for sending a message to a playbook."""

    success: bool
    response: str
    trace_data: Optional[TraceItem] = None
    new_session_id: Optional[str] = None
    error: Optional[str] = None


# Helper functions
def create_agent_chat(playbook_content: str) -> AgentChat:
    """Create an agent chat from playbook content."""
    # Check for API key
    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        raise HTTPException(
            status_code=400, detail="OPENAI_API_KEY environment variable not set"
        )

    try:
        # Create config with playbook content
        config = AgentChatConfig(
            playbooks_content=playbook_content, main_model_config=LLMConfig()
        )

        # Create AgentChat instance
        return AgentChat(config)
    except PlaybooksError as e:
        raise HTTPException(status_code=400, detail=f"Error creating agent: {str(e)}")


def create_trace_item(
    name: str, input_msg: Optional[str] = None, output: Optional[str] = None
) -> TraceItem:
    """Create a trace item for the execution."""
    metadata = {
        "status": "completed",
        "duration": "0.8s",  # Mock duration
    }

    if input_msg:
        metadata["input"] = input_msg

    if output:
        metadata["output"] = output

    return TraceItem(
        id=f"trace-{uuid.uuid4()}", name=name, type="step", metadata=metadata
    )


def process_chunks(
    response_chunks: List[AgentResponseChunk],
    session: PlaybookSession,
    request_message: Optional[str],
) -> MessageResponse:
    """Process response chunks and return a MessageResponse."""
    all_responses = []

    # Extract agent responses from chunks
    for chunk in response_chunks:
        if hasattr(chunk, "agent_response") and chunk.agent_response:
            all_responses.append(chunk.agent_response)

    response = " ".join(all_responses) if all_responses else ""

    # Add assistant response to session
    session.messages.append({"role": "assistant", "content": response})

    # Create trace item
    trace_name = (
        "Initial greeting" if request_message is None else "Process user message"
    )
    trace_item = create_trace_item(
        name=trace_name, input_msg=request_message, output=response
    )

    # Add trace to session
    session.traces.append(trace_item)

    return MessageResponse(success=True, response=response, trace_data=trace_item)


# API endpoints
@app.post("/run-playbook", response_model=PlaybookResponse)
async def run_playbook(request: PlaybookRequest) -> PlaybookResponse:
    """Start a new playbook session."""
    if not request.playbook:
        raise HTTPException(status_code=400, detail="Playbook content is required")

    # Create or reuse session
    session_id = request.existing_trace_id or str(uuid.uuid4())
    session = PlaybookSession(id=session_id, playbook=request.playbook)
    active_sessions[session_id] = session

    try:
        # Create agent chat
        session.agent_chat = create_agent_chat(request.playbook)
        session.ai_agent = session.agent_chat.ai_agent
        session.human_agent = session.agent_chat.human_agent

        # Get initial response - collect all chunks since we're not streaming
        response_chunks = list(session.agent_chat.run(stream=False))
        message_response = process_chunks(response_chunks, session, None)

        return PlaybookResponse(
            success=True,
            message=message_response.response,
            trace_id=session_id,
            initial_message=message_response.response,
        )
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        return PlaybookResponse(
            success=False,
            message=f"Error starting playbook: {str(e)}",
            trace_id=session_id,
        )


@app.post("/send-message", response_model=MessageResponse)
async def send_message(request: MessageRequest) -> MessageResponse:
    """Send a message to a playbook session."""
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is required")

    if not request.trace_id:
        raise HTTPException(status_code=400, detail="Trace ID is required")

    # Check if session exists
    if request.trace_id not in active_sessions:
        # Create a new session if the old one expired
        new_session_id = str(uuid.uuid4())
        return MessageResponse(
            success=False,
            response="Session expired. This is a new session. How can I help you?",
            new_session_id=new_session_id,
            error="Session expired",
        )

    session = active_sessions[request.trace_id]

    try:
        # Add user message to session
        session.messages.append({"role": "user", "content": request.message})

        # Process message with agent chat - collect all chunks since we're not streaming
        response_chunks = list(
            session.agent_chat.process_user_message(request.message, stream=False)
        )

        return process_chunks(response_chunks, session, request.message)
    except Exception as e:
        return MessageResponse(
            success=False,
            response="Error processing your message. Please try again.",
            error=str(e),
        )


@app.get("/traces/{trace_id}")
async def get_trace(trace_id: str) -> Dict[str, Any]:
    """Get trace data for a playbook session."""
    if trace_id not in active_sessions:
        # Return structured error response
        return {
            "id": "root",
            "name": "Session Not Found",
            "type": "agent",
            "children": [
                {
                    "id": "error",
                    "name": "Error",
                    "type": "step",
                    "metadata": {
                        "status": "error",
                        "output": "Session not found or expired. Please run the playbook again.",
                    },
                }
            ],
        }

    session = active_sessions[trace_id]

    # Create a hierarchical trace structure
    return {
        "id": "root",
        "name": "Playbook Execution",
        "type": "agent",
        "children": [
            {
                "id": "section1",
                "name": "Playbook",
                "type": "section",
                "children": session.traces,
            }
        ],
    }


@app.delete("/traces/{trace_id}")
async def stop_playbook(trace_id: str) -> Dict[str, Any]:
    """Stop a playbook session."""
    if trace_id in active_sessions:
        del active_sessions[trace_id]

    return {"success": True, "message": "Playbook session stopped"}


def list_playbook_examples() -> Dict[str, str]:
    """
    List all available playbook examples from the playbooks package.
    Returns a dictionary with program name as key and content as value.
    """
    result = {}

    for file in importlib.resources.files("playbooks.examples.playbooks").iterdir():
        if file.is_file() and file.suffix == ".md":
            content = file.read_text()
            h1_match = re.search(r"^# (.+)$", content, re.MULTILINE)
            if h1_match:
                program_name = h1_match.group(1).strip()
                result[program_name] = content

    return result


@app.get("/playbooks")
async def get_playbooks() -> Dict[str, str]:
    """Get all available playbook examples."""
    return list_playbook_examples()


if __name__ == "__main__":
    import uvicorn

    # Get port from environment variable or use default
    port = int(os.environ.get("API_PORT", 8000))

    print(f"Starting Playbooks API server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
