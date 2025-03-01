import { NextResponse } from 'next/server';
import { Playbook } from '@/lib/store';

// Sample playbook data
const examplePlaybooks: Playbook[] = [
  {
    id: 'hello',
    name: 'Hello World',
    content: `# HelloWorld Agent
This is a simple Hello World agent.

## HelloWorld

### Trigger
At the beginning

### Steps
- Greet the user with a friendly "Hello, World!" message.
- Explain that this is a demonstration of a simple Hello World playbook.
- Say goodbye to the user.`
  },
  {
    id: 'chat',
    name: 'Simple Chat',
    content: `# Chat Agent
A simple chat agent that responds to user messages.

## Chat

### Trigger
At the beginning

### Steps
- Greet the user and introduce yourself as a chat assistant.
- Ask how you can help them today.
- Respond to their questions or messages in a helpful and friendly manner.`
  },
  {
    id: 'weather',
    name: 'Weather Agent',
    content: `# Weather Agent
An agent that can provide weather information.

## WeatherInfo

### Trigger
At the beginning

### Steps
- Greet the user and introduce yourself as a weather assistant.
- Ask the user which city they want to know the weather for.
- When the user provides a city, pretend to look up the weather and provide a made-up forecast.
- Ask if they want to know the weather for another city.`
  }
];

export async function GET() {
  return NextResponse.json(examplePlaybooks);
} 