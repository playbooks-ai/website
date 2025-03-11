import { NextRequest, NextResponse } from 'next/server';
import { getTraceData, stopPlaybook } from '@/lib/python-service';

// Define the params type
interface Params {
  params: {
    id: string;
  };
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