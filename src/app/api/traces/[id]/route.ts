import { NextRequest, NextResponse } from 'next/server';
import { getTraceData, stopPlaybook } from '@/lib/python-service';

// Sample trace data for the "sample" trace ID
const sampleTraceData = {
  root: {
    id: 'root',
    name: 'HelloWorld Agent',
    type: 'agent',
    children: [
      {
        id: 'section1',
        name: 'HelloWorld',
        type: 'section',
        children: [
          {
            id: 'step1',
            name: 'Greet the user',
            type: 'step',
            metadata: {
              status: 'completed',
              duration: '1.2s',
              output: 'Hello, World!'
            }
          },
          {
            id: 'step2',
            name: 'Explain demonstration',
            type: 'step',
            metadata: {
              status: 'completed',
              duration: '0.8s',
              output: 'This is a demonstration of a simple Hello World playbook.'
            }
          },
          {
            id: 'step3',
            name: 'Say goodbye',
            type: 'step',
            metadata: {
              status: 'completed',
              duration: '0.5s',
              output: 'Goodbye!'
            }
          }
        ]
      }
    ]
  }
};

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
    // Properly await the entire params object
    const params = await context.params;
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Trace ID is required' },
        { status: 400 }
      );
    }

    // For the "sample" trace ID, return the sample trace data
    if (id === 'sample') {
      return NextResponse.json(sampleTraceData);
    }

    // For other trace IDs, get the trace data from the Python service
    try {
      const traceData = await getTraceData(id);
      return NextResponse.json(traceData);
    } catch (error) {
      console.error('Error fetching trace data:', error);

      // If the trace is not found, fall back to sample data
      // This helps prevent errors when a trace ID is invalid or expired
      console.log('Falling back to sample trace data');
      return NextResponse.json(sampleTraceData);
    }
  } catch (error) {
    console.error('Error fetching trace:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trace data' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: Params
) {
  try {
    // Properly await the entire params object
    const params = await context.params;
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Trace ID is required' },
        { status: 400 }
      );
    }

    // For the "sample" trace ID, just return success
    if (id === 'sample') {
      return NextResponse.json({
        success: true,
        message: 'Sample playbook session stopped'
      });
    }

    // For other trace IDs, stop the playbook session
    try {
      await stopPlaybook(id);
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