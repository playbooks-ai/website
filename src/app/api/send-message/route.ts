import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, playbook } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would call the Python backend to send a message to the playbook
    // For now, we'll just return a simulated response

    // Simulate different responses based on the message content
    let response = '';

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = 'Hello there! How can I help you today?';
    } else if (message.toLowerCase().includes('help')) {
      response = 'I\'m here to help! You can ask me questions or give me tasks related to the playbook.';
    } else if (message.toLowerCase().includes('weather')) {
      response = 'I don\'t have real-time weather data, but I can pretend! It\'s sunny and 72°F in San Francisco today.';
    } else if (message.toLowerCase().includes('thank')) {
      response = 'You\'re welcome! Is there anything else I can help with?';
    } else {
      response = `I received your message: "${message}". This is a simulated response from the playbook.`;
    }

    // Add a slight delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 