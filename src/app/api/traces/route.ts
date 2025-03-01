import { NextResponse } from 'next/server';

// Sample trace data
const traces = [
  {
    id: 'trace1',
    name: 'Hello World Execution',
    timestamp: '2023-06-15T14:30:00Z',
    data: {
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
    }
  },
  {
    id: 'trace2',
    name: 'Weather Agent Execution',
    timestamp: '2023-06-16T10:15:00Z',
    data: {
      root: {
        id: 'root',
        name: 'Weather Agent',
        type: 'agent',
        children: [
          {
            id: 'section1',
            name: 'WeatherInfo',
            type: 'section',
            children: [
              {
                id: 'step1',
                name: 'Greet the user',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '0.9s',
                  output: 'Hello! I am a weather assistant.'
                }
              },
              {
                id: 'step2',
                name: 'Ask for city',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '0.7s',
                  output: 'Which city would you like to know the weather for?'
                }
              },
              {
                id: 'step3',
                name: 'Provide weather',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '1.5s',
                  output: 'The weather in San Francisco is currently 72°F and sunny.'
                }
              },
              {
                id: 'step4',
                name: 'Ask for another city',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '0.6s',
                  output: 'Would you like to know the weather for another city?'
                }
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'trace3',
    name: 'Chat Agent Execution',
    timestamp: '2023-06-17T16:45:00Z',
    data: {
      root: {
        id: 'root',
        name: 'Chat Agent',
        type: 'agent',
        children: [
          {
            id: 'section1',
            name: 'Chat',
            type: 'section',
            children: [
              {
                id: 'step1',
                name: 'Greet the user',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '0.8s',
                  output: 'Hello! I am a chat assistant. How can I help you today?'
                }
              },
              {
                id: 'step2',
                name: 'Process user message',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '1.2s',
                  input: 'Tell me about Playbooks',
                  output: 'Playbooks is a natural language programming framework that allows you to create interactive agents using markdown files.'
                }
              },
              {
                id: 'step3',
                name: 'Process user message',
                type: 'step',
                metadata: {
                  status: 'completed',
                  duration: '1.0s',
                  input: 'How do I create a playbook?',
                  output: 'You can create a playbook by writing a markdown file with a specific structure. The file should include a title, description, sections, triggers, and steps.'
                }
              }
            ]
          }
        ]
      }
    }
  }
];

export async function GET() {
  // Return just the trace metadata, not the full trace data
  const traceList = traces.map(({ id, name, timestamp }) => ({
    id,
    name,
    timestamp
  }));

  return NextResponse.json(traceList);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real implementation, this would save the trace to a database
    // For now, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: 'Trace saved successfully',
      traceId: `trace${traces.length + 1}`
    });
  } catch (error) {
    console.error('Error saving trace:', error);
    return NextResponse.json(
      { error: 'Failed to save trace' },
      { status: 500 }
    );
  }
} 