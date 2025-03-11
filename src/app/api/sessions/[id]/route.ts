import { NextRequest, NextResponse } from 'next/server';
import { getTraceData, stopPlaybook, getSessionData, sendMessage } from '@/lib/python-service';

// Define the params type
interface Params {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    // Get the session ID from the URL parameter
    const params = await context.params;
    const sessionId = params.id;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get the session data
    try {
      const sessionData = await getSessionData(sessionId);
      return NextResponse.json(sessionData);
    } catch (error) {
      console.error('Error getting session data:', error);
      return NextResponse.json(
        { error: 'Failed to get session data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in session GET route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    // Get the session ID from the URL parameter - await the params
    const params = await context.params;
    const sessionId = params.id;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Stop the playbook session
    try {
      await stopPlaybook(sessionId);
      return NextResponse.json({
        success: true,
        message: 'Playbook session stopped'
      });
    } catch (error) {
      console.error('Error stopping playbook session:', error);
      return NextResponse.json(
        { error: 'Failed to stop playbook session' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error stopping playbook:', error);
    return NextResponse.json(
      { error: 'Failed to stop playbook' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: Params
) {
  try {
    const { message } = await request.json();

    // Get the session ID from the URL parameter
    const params = await context.params;
    const sessionId = params.id;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    try {
      // Call the Python backend to send a message to the playbook
      const result = await sendMessage(sessionId, message);

      return NextResponse.json({
        success: true,
        response: result.response,
        traceData: result.traceItem,
        newSessionId: result.newSessionId
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);

      // Create a fallback response for error cases
      return NextResponse.json({
        success: false,
        response: "I'm sorry, there was an error processing your message. The playbook session may have expired. Please try running the playbook again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 