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
    from playbooks.agent_factory import AgentFactory
    from playbooks.config import LLMConfig
    from playbooks.exceptions import AgentConfigurationError, PlaybooksError
    from playbooks.human_agent import HumanAgent
    from playbooks.message_router import MessageRouter
    from playbooks.types import AgentResponseChunk

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
        self.agent_chat = None
        self.ai_agent = None
        self.human_agent = None


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
    initial_message: Optional[str] = None


class MessageResponse(BaseModel):
    success: bool
    response: str
    trace_data: Optional[TraceItem] = None
    new_session_id: Optional[str] = None
    error: Optional[str] = None


# Mock implementation for when playbooks package is not available
class MockAgentChat:
    def __init__(self, playbook_content):
        self.playbook_content = playbook_content
        self.ai_agent = MockAgent(playbook_content)
        self.human_agent = MockHumanAgent()

    def run(self, stream: bool = False):
        """Mock implementation of run method."""
        # Generate a more dynamic initial message based on the playbook content
        initial_message = self.ai_agent.get_initial_message()
        chunk = MockAgentResponseChunk(initial_message)
        return [chunk]

    def process_user_message(self, message: str, stream: bool = False):
        response = self.ai_agent.chat(message)
        # Create a mock response chunk
        chunk = MockAgentResponseChunk(response)
        return [chunk]


class MockAgent:
    def __init__(self, playbook_content):
        self.playbook_content = playbook_content

    def get_initial_message(self):
        """Generate an initial greeting message."""
        # Try to extract a title or purpose from the playbook content if possible
        playbook_lines = self.playbook_content.strip().split("\n")
        title = "Playbook Assistant"

        # Look for a title in the first few lines
        for line in playbook_lines[:10]:
            if "title:" in line.lower():
                title = line.split("title:")[1].strip().strip("\"'")
                break
            elif "name:" in line.lower():
                title = line.split("name:")[1].strip().strip("\"'")
                break

        return f"Hello! I'm your {title} assistant. How can I help you today?"

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
            return f'I received your message: "{message}". This is a response from the mock playbook agent.'


class MockHumanAgent:
    def __init__(self):
        self.klass = "User"


class MockAgentResponseChunk:
    def __init__(self, response):
        self.raw = None
        self.trace = None
        self.agent_response = response
        self.tool_response = None


# Helper functions
def create_agent_chat(playbook_content: str) -> Any:
    """Create an agent chat from playbook content."""
    if not PLAYBOOKS_AVAILABLE:
        print("Using mock agent as playbooks package is not available")
        return MockAgentChat(playbook_content)

    try:
        # Configure LLM
        api_key = os.environ.get("OPENAI_API_KEY", "")
        if not api_key or api_key == "your_openai_api_key_here":
            print(
                "Warning: OPENAI_API_KEY environment variable not set or using default value"
            )
            return MockAgentChat(playbook_content)

        llm_config = LLMConfig()

        # Create agent chat config
        class AgentChatConfig:
            def __init__(self, playbooks_content, main_model_config):
                self.playbooks_paths = None
                self.playbooks_content = playbooks_content
                self.main_model_config = main_model_config

        config = AgentChatConfig(
            playbooks_content=playbook_content, main_model_config=llm_config
        )

        # Create agents using AgentFactory
        agents = AgentFactory.from_playbooks_content(playbook_content, llm_config)

        if len(agents) != 1:
            raise AgentConfigurationError(f"Expected 1 agent, but found {len(agents)}")

        # Create AgentChat-like class
        class AgentChat:
            def __init__(self, agents, config):
                self.config = config
                self.agents = agents
                self.ai_agent_class = agents[list(agents.keys())[0]]
                self.ai_agent = self.ai_agent_class()
                self.human_agent = agents["User"] = HumanAgent(klass="User")
                print(
                    f"Created AgentChat with agent type: {type(self.ai_agent).__name__}"
                )

            def run(self, stream: bool = False):
                """Run the agent and return both raw chunks and agent responses."""
                print(f"Running agent of type: {type(self.ai_agent).__name__}")
                try:
                    result = self.ai_agent.run(
                        llm_config=self.config.main_model_config, stream=stream
                    )
                    print(f"Agent run returned result of type: {type(result).__name__}")
                    return result
                except Exception as e:
                    print(f"Error in agent.run(): {str(e)}")
                    raise

            def process_user_message(self, message: str, stream: bool = False):
                return MessageRouter.send_message(
                    message=message,
                    from_agent=self.human_agent,
                    to_agent=self.ai_agent,
                    llm_config=self.config.main_model_config,
                    stream=stream,
                )

        return AgentChat(agents, config)
    except PlaybooksError as e:
        print(f"Error creating agent: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error creating agent: {str(e)}")
    except Exception as e:
        print(f"Unexpected error in create_agent_chat: {str(e)}")
        # Fall back to mock agent instead of raising an exception
        return MockAgentChat(playbook_content)


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


def process_chunks(response_chunks, session, request_message) -> MessageResponse:
    """
    Process response chunks and return a MessageResponse.
    Updates session messages and traces.
    """
    all_responses = []
    try:
        # Try to iterate if it's not a list but is iterable
        for chunk in response_chunks:
            if chunk and hasattr(chunk, "agent_response") and chunk.agent_response:
                all_responses.append(chunk.agent_response)
    except Exception as e:
        print(f"Error processing message response chunks: {str(e)}")

    response = " ".join(all_responses) if all_responses else ""

    # Add assistant response to session
    session.messages.append({"role": "assistant", "content": response})

    # Create trace item with appropriate name based on whether it's an initial message or a response
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

    # Reuse existing session if provided
    session_id = request.existing_trace_id or str(uuid.uuid4())

    # Create a new session
    session = PlaybookSession(id=session_id, playbook=request.playbook)
    active_sessions[session_id] = session  # Store the session

    # Create agent chat
    print(f"Creating agent chat for session {session_id}")
    agent_chat = create_agent_chat(request.playbook)
    session.agent_chat = agent_chat
    session.ai_agent = agent_chat.ai_agent
    session.human_agent = agent_chat.human_agent

    # Generate initial response from agent
    print("Generating initial response from agent...")
    try:
        # Process message with agent chat
        response_chunks = session.agent_chat.run(stream=False)

        message_response = process_chunks(response_chunks, session, None)

        return PlaybookResponse(
            success=True,
            message=message_response.response,
            trace_id=session_id,
            initial_message=message_response.response,
        )
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
        # Create a new session
        new_session_id = str(uuid.uuid4())

        # Return error response with new session ID
        return MessageResponse(
            success=False,
            response="It seems your session has expired. This is a new session. How can I help you?",
            new_session_id=new_session_id,
            error="Session expired",
        )

    session = active_sessions[request.trace_id]

    try:
        # Add user message to session
        session.messages.append({"role": "user", "content": request.message})

        # Process message with agent chat
        response_chunks = session.agent_chat.process_user_message(
            request.message, stream=False
        )

        return process_chunks(response_chunks, session, request.message)
    except Exception as e:
        return MessageResponse(
            success=False,
            response="I'm sorry, there was an error processing your message. Please try again.",
            error=str(e),
        )


@app.get("/traces/{trace_id}")
async def get_trace(trace_id: str):
    """Get trace data for a playbook session."""
    if trace_id not in active_sessions:
        print(f"Trace {trace_id} not found in active sessions")
        # Instead of raising a 404, return a structured error response
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
    root_trace = {
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
