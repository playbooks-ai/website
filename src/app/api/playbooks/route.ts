import { NextRequest, NextResponse } from 'next/server';

// Base URL for the Python API
const API_BASE_URL = 'http://localhost:8000';

export async function GET() {
  try {
    // Forward the request to the Python backend
    const response = await fetch(`${API_BASE_URL}/playbooks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching playbooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playbooks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the request to the Python backend
    const response = await fetch(`${API_BASE_URL}/save-playbook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving playbook:', error);
    return NextResponse.json(
      { error: 'Failed to save playbook' },
      { status: 500 }
    );
  }
} 