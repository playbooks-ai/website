import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/python-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, playbook, traceId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!traceId) {
      return NextResponse.json(
        { error: 'Trace ID is required' },
        { status: 400 }
      );
    }

    try {
      // Call the Python backend to send a message to the playbook
      const result = await sendMessage(traceId, message);

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