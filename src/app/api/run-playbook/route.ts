import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playbook } = body;

    if (!playbook) {
      return NextResponse.json(
        { error: 'Playbook content is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would call the Python backend to run the playbook
    // For now, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: 'Playbook started successfully',
    });
  } catch (error) {
    console.error('Error running playbook:', error);
    return NextResponse.json(
      { error: 'Failed to run playbook' },
      { status: 500 }
    );
  }
} 