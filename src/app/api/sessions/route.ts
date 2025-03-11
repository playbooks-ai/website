import { NextRequest, NextResponse } from 'next/server';
import { startPlaybook } from '@/lib/python-service';

export async function POST(request: NextRequest) {
  try {
    const { playbook, existingSessionId } = await request.json();

    if (!playbook) {
      return NextResponse.json(
        { error: 'Invalid request: playbook is required' },
        { status: 400 }
      );
    }

    try {
      // Call the Python backend to start a new playbook session
      const result = await startPlaybook(playbook, existingSessionId);

      return NextResponse.json({
        success: true,
        session_id: result.traceId,
        initial_message: result.initialMessage
      });
    } catch (error) {
      console.error('Error starting playbook:', error);

      return NextResponse.json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Error running playbook:', error);
    return NextResponse.json(
      {
        error: 'Failed to run playbook',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 