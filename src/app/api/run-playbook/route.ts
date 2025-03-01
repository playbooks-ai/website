import { NextRequest, NextResponse } from 'next/server';
import { startPlaybook } from '@/lib/python-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playbook, existingTraceId } = body;

    if (!playbook) {
      return NextResponse.json(
        { error: 'Playbook content is required' },
        { status: 400 }
      );
    }

    // Call the Python backend to run the playbook
    // If existingTraceId is provided, try to reuse that session
    const traceId = await startPlaybook(playbook, existingTraceId);

    return NextResponse.json({
      success: true,
      message: 'Playbook started successfully',
      traceId: traceId
    });
  } catch (error) {
    console.error('Error running playbook:', error);
    return NextResponse.json(
      { error: 'Failed to run playbook' },
      { status: 500 }
    );
  }
} 