"""
FastAPI server for running playbooks and interacting with the playbooks package.
"""

import importlib
import os
import pathlib
import re
import uuid
from typing import Any, Dict, List, Optional

import dill
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# Session storage directory
SESSIONS_DIR = pathlib.Path("api/sessions")
SESSIONS_DIR.mkdir(exist_ok=True, parents=True)


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


# Session management functions
def save_session(session_id: str, session: PlaybookSession) -> None:
    """Save session state to disk using dill pickling."""
    session_path = SESSIONS_DIR / f"{session_id}.pkl"
    with open(session_path, "wb") as f:
        dill.dump(session, f)


def load_session(session_id: str) -> Optional[PlaybookSession]:
    """Load session state from disk using dill unpickling."""
    session_path = SESSIONS_DIR / f"{session_id}.pkl"
    if not session_path.exists():
        return None

    try:
        with open(session_path, "rb") as f:
            return dill.load(f)
    except Exception as e:
        print(f"Error loading session {session_id}: {e}")
        return None


def get_session(session_id: str) -> Optional[PlaybookSession]:
    """Get session from memory or load from disk if not in memory."""
    if session_id in active_sessions:
        return active_sessions[session_id]

    # Try to load from disk
    session = load_session(session_id)
    if session:
        active_sessions[session_id] = session

    return session


# Request and response models
class PlaybookRequest(BaseModel):
    """Request model for starting a playbook."""

    playbook: str
    existing_session_id: Optional[str] = None


class MessageRequest(BaseModel):
    """Request model for sending a message to a playbook."""

    message: str


class TraceItem(BaseModel):
    """Model for a trace item in the execution history."""

    id: str
    content: str
    metadata: Dict[str, Any]


class PlaybookResponse(BaseModel):
    """Response model for starting a playbook."""

    success: bool
    message: str
    session_id: str
    initial_message: Optional[str] = None


class MessageResponse(BaseModel):
    """Response model for sending a message to a playbook."""

    success: bool
    response: str
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


def process_chunks(
    response_chunks: List[AgentResponseChunk],
    session: PlaybookSession,
    request_message: Optional[str],
) -> MessageResponse:
    """Process response chunks and return a MessageResponse."""
    all_responses = []
    all_traces = []

    # Extract agent responses from chunks
    for chunk in response_chunks:
        if hasattr(chunk, "agent_response") and chunk.agent_response:
            all_responses.append(chunk.agent_response)
        if hasattr(chunk, "trace") and chunk.trace:
            all_traces.append(chunk.trace)

    response = " ".join(all_responses) if all_responses else ""

    for trace in all_traces:
        session.traces.append(
            TraceItem(
                id=str(uuid.uuid4()),
                content=trace,
                metadata={},
            )
        )
    # Add assistant response to session
    session.messages.append({"role": "assistant", "content": response})

    # Save session state after processing
    save_session(session.id, session)

    return MessageResponse(success=True, response=response)


# API endpoints
@app.post("/sessions", response_model=PlaybookResponse)
async def create_session(request: PlaybookRequest) -> PlaybookResponse:
    """Start a new playbook session."""
    if not request.playbook:
        raise HTTPException(status_code=400, detail="Playbook content is required")

    # Create or reuse session
    session_id = request.existing_session_id or str(uuid.uuid4())
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

        # Save session state
        save_session(session_id, session)

        return PlaybookResponse(
            success=True,
            message=message_response.response,
            session_id=session_id,
            initial_message=message_response.response,
        )
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        return PlaybookResponse(
            success=False,
            message=f"Error starting playbook: {str(e)}",
            session_id=session_id,
        )


@app.post("/sessions/{session_id}/messages", response_model=MessageResponse)
async def send_message(session_id: str, request: MessageRequest) -> MessageResponse:
    """Send a message to a playbook session."""
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is required")

    # Load session from disk if not in memory
    session = get_session(session_id)

    if not session:
        # Create a new session if the old one expired
        new_session_id = str(uuid.uuid4())
        return MessageResponse(
            success=False,
            response="Session expired. This is a new session. How can I help you?",
            new_session_id=new_session_id,
            error="Session expired",
        )

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


@app.get("/sessions/{session_id}/traces")
async def get_traces(session_id: str) -> Dict[str, Any]:
    """Get trace data for a playbook session."""
    # Load session from disk if not in memory
    session = get_session(session_id)

    if not session:
        # Return structured error response
        return {
            "success": False,
            "error": "Session not found or expired. Please run the playbook again.",
            "traces": [],
        }

    # Create a hierarchical trace structure
    return {
        "success": True,
        "traces": session.traces,
    }


@app.delete("/sessions/{session_id}")
async def stop_playbook(session_id: str) -> Dict[str, Any]:
    """Stop a playbook session."""
    # Remove from active sessions
    if session_id in active_sessions:
        del active_sessions[session_id]

    # Delete session file if it exists
    session_path = SESSIONS_DIR / f"{session_id}.pkl"
    if session_path.exists():
        session_path.unlink()

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
