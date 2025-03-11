import { NextRequest, NextResponse } from 'next/server';
import { getTraceData, stopPlaybook } from '@/lib/python-service';

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
    // Get the session ID from the URL parameter - await the params
    const params = await context.params;
    const sessionId = params.id;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    try {
      // Get trace data for the session
      const traceData = await getTraceData(sessionId);
      return NextResponse.json(traceData);
    } catch (error) {
      console.error('Error getting trace data:', error);
      return NextResponse.json(
        { error: 'Failed to get trace data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in trace data API route:', error);
    return NextResponse.json(
      { error: 'Failed to get trace data' },
      { status: 500 }
    );
  }
}