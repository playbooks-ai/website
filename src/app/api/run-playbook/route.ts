import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { playbook } = await request.json();

    if (!playbook) {
      return NextResponse.json(
        { error: 'Invalid request: playbook is required' },
        { status: 400 }
      );
    }

    // Forward the request to the Python backend
    const response = await fetch('http://localhost:8000/run-playbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playbook }),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
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