import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Playbooks Documentation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of Playbooks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Playbooks is a natural language programming framework that allows you to create
              interactive agents using markdown files. This guide will help you get started
              with creating your first playbook.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>How to install Playbooks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              You can install Playbooks using pip:
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
              pip install playbooks
            </pre>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Playbook Structure</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Anatomy of a Playbook</CardTitle>
          <CardDescription>Understanding the structure of a playbook file</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            A playbook is a markdown file with a specific structure. Here's an example:
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm">
            {`# HelloWorld Agent
This is a simple Hello World agent.

## HelloWorld

### Trigger
At the beginning

### Steps
- Greet the user with a friendly "Hello, World!" message.
- Explain that this is a demonstration of a simple Hello World playbook.
- Say goodbye to the user.`}
          </pre>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              <strong>Title:</strong> The first line starting with # defines the agent name.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Description:</strong> The text following the title is the agent description.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Section:</strong> Lines starting with ## define a section of the playbook.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Trigger:</strong> The "Trigger" subsection defines when the section should be executed.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Steps:</strong> The "Steps" subsection defines what the agent should do.
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">API Reference</h2>

      <Card>
        <CardHeader>
          <CardTitle>Python API</CardTitle>
          <CardDescription>How to use Playbooks in your Python code</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            You can use Playbooks in your Python code like this:
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm">
            {`from playbooks.agent_factory import AgentFactory
from playbooks.config import LLMConfig

# Create agents from playbooks
agents = AgentFactory.from_playbooks_paths(
    ["path/to/playbook.md"],
    LLMConfig(model="gpt-4")
)

# Get the first agent
agent_class = agents[list(agents.keys())[0]]
agent = agent_class()

# Run the agent
for response in agent.run(stream=True):
    if response.agent_response:
        print(f"Agent: {response.agent_response}")
`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
} 