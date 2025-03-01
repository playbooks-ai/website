"""
FastAPI server for running playbooks and interacting with the playbooks package.
"""
import os
import uuid
from typing import Any, Dict, Optional

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
try:
    from playbooks.agent import Agent
    from playbooks.agent_builder import AgentBuilder
    from playbooks.exceptions import PlaybooksError
    from playbooks.llm_config import LLMConfig
    from playbooks.playbook_loader import PlaybookLoader
    PLAYBOOKS_AVAILABLE = True
except ImportError:
    print("Warning: playbooks package not found. Using mock implementation.")
    PLAYBOOKS_AVAILABLE = False

app = FastAPI(title="Playbooks API", description="API for running playbooks")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for active playbook sessions
class PlaybookSession:
    def __init__(self, id: str, playbook: str):
        self.id = id
        self.playbook_content = playbook
        self.messages = []
        self.traces = []
        self.agent = None

# Initialize active sessions
active_sessions: Dict[str, PlaybookSession] = {}

# Request and response models
class PlaybookRequest(BaseModel):
    playbook: str
    existing_trace_id: Optional[str] = None

class MessageRequest(BaseModel):
    message: str
    trace_id: str

class TraceItem(BaseModel):
    id: str
    name: str
    type: str
    metadata: Dict[str, Any]

class PlaybookResponse(BaseModel):
    success: bool
    message: str
    trace_id: str

class MessageResponse(BaseModel):
    success: bool
    response: str
    trace_data: Optional[TraceItem] = None
    new_session_id: Optional[str] = None
    error: Optional[str] = None

# Mock implementation for when playbooks package is not available
class MockAgent:
    def __init__(self, playbook_content):
        self.playbook_content = playbook_content
    
    def chat(self, message):
        if "hello" in message.lower() or "hi" in message.lower():
            return "Hello there! How can I help you today?"
        elif "help" in message.lower():
            return "I'm here to help! You can ask me questions or give me tasks related to the playbook."
        elif "weather" in message.lower():
            return "I don't have real-time weather data, but I can pretend! It's sunny and 72°F in San Francisco today."
        elif "thank" in message.lower():
            return "You're welcome! Is there anything else I can help with?"
        else:
            return f"I received your message: \"{message}\". This is a response from the mock playbook agent."

# Helper functions
def create_agent(playbook_content: str) -> Any:
    """Create an agent from playbook content."""
    if not PLAYBOOKS_AVAILABLE:
        return MockAgent(playbook_content)
    
    try:
        # Configure LLM
        api_key = os.environ.get("OPENAI_API_KEY", "")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable not set")
        
        llm_config = LLMConfig(
            provider="openai",
            model="gpt-4",
            api_key=api_key
        )
        
        # Load playbook
        ast = PlaybookLoader.load(playbook_content, llm_config)
        
        # Build agent
        agent_builder = AgentBuilder()
        agent = agent_builder.build_from_ast(ast)
        
        return agent
    except PlaybooksError as e:
        raise HTTPException(status_code=400, detail=f"Error creating agent: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

def create_trace_item(name: str, input_msg: Optional[str] = None, output: Optional[str] = None) -> TraceItem:
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
        id=f"trace-{uuid.uuid4()}",
        name=name,
        type="step",
        metadata=metadata
    )

# API endpoints
@app.post("/run-playbook", response_model=PlaybookResponse)
async def run_playbook(request: PlaybookRequest) -> PlaybookResponse:
    """Start a new playbook session."""
    if not request.playbook:
        raise HTTPException(status_code=400, detail="Playbook content is required")
    
    # Reuse existing session if provided
    session_id = request.existing_trace_id or str(uuid.uuid4())
    
    try:
        # Create a new session
        session = PlaybookSession(id=session_id, playbook=request.playbook)
        
        # Create agent
        agent = create_agent(request.playbook)
        session.agent = agent
        
        # Add initialization trace
        init_trace = create_trace_item(
            name="Initialize Playbook",
            output="Playbook initialized successfully"
        )
        session.traces.append(init_trace)
        
        # Store session
        active_sessions[session_id] = session
        
        return PlaybookResponse(
            success=True,
            message="Playbook started successfully",
            trace_id=session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to run playbook: {str(e)}")

@app.post("/send-message", response_model=MessageResponse)
async def send_message(request: MessageRequest) -> MessageResponse:
    """Send a message to a playbook session."""
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    if not request.trace_id:
        raise HTTPException(status_code=400, detail="Trace ID is required")
    
    # Check if session exists
    if request.trace_id not in active_sessions:
        # Create a new session
        new_session_id = str(uuid.uuid4())
        
        # Return error response with new session ID
        return MessageResponse(
            success=False,
            response="It seems your session has expired. This is a new session. How can I help you?",
            new_session_id=new_session_id,
            error="Session expired"
        )
    
    session = active_sessions[request.trace_id]
    
    try:
        # Add user message to session
        session.messages.append({"role": "user", "content": request.message})
        
        # Process message with agent
        if PLAYBOOKS_AVAILABLE and isinstance(session.agent, Agent):
            response = session.agent.chat(request.message)
        else:
            # Use mock agent
            response = session.agent.chat(request.message)
        
        # Add assistant response to session
        session.messages.append({"role": "assistant", "content": response})
        
        # Create trace item
        trace_item = create_trace_item(
            name="Process user message",
            input_msg=request.message,
            output=response
        )
        
        # Add trace to session
        session.traces.append(trace_item)
        
        return MessageResponse(
            success=True,
            response=response,
            trace_data=trace_item
        )
    except Exception as e:
        return MessageResponse(
            success=False,
            response="I'm sorry, there was an error processing your message. Please try again.",
            error=str(e)
        )

@app.get("/traces/{trace_id}")
async def get_trace(trace_id: str):
    """Get trace data for a playbook session."""
    if trace_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Trace not found")
    
    session = active_sessions[trace_id]
    
    # Create a hierarchical trace structure
    root_trace = {
        "id": "root",
        "name": "Playbook Execution",
        "type": "agent",
        "children": [
            {
                "id": "section1",
                "name": "Playbook",
                "type": "section",
                "children": session.traces
            }
        ]
    }
    
    return root_trace

@app.delete("/traces/{trace_id}")
async def stop_playbook(trace_id: str):
    """Stop a playbook session."""
    if trace_id in active_sessions:
        del active_sessions[trace_id]
    
    return {"success": True, "message": "Playbook session stopped"}

if __name__ == "__main__":
    import uvicorn
    
    # Get port from environment variable or use default
    port = int(os.environ.get("API_PORT", 8000))
    
    print(f"Starting Playbooks API server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port) 