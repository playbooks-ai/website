import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Playbooks Documentation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg mb-4">
            Playbooks is a natural language programming framework that allows you to create interactive agents using markdown files. With Playbooks, you can define the behavior of an agent using a simple, human-readable format.
          </p>
          <p className="text-lg mb-4">
            This documentation will guide you through the process of creating and running your own playbooks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <p className="text-lg mb-4">
            You can install Playbooks using pip:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            <code>pip install playbooks</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Creating a Playbook</h2>
          <p className="text-lg mb-4">
            A playbook is a markdown file with a specific structure. Here's a simple example:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            <code>{`# HelloWorld Agent
This is a simple Hello World agent.

## HelloWorld

### Trigger
At the beginning

### Steps
- Greet the user with a friendly "Hello, World!" message.
- Explain that this is a demonstration of a simple Hello World playbook.
- Say goodbye to the user.`}</code>
          </pre>
          <p className="text-lg mb-4">
            Let's break down the structure:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg mb-4">
            <li><strong>Title</strong>: The first line is the title of the agent, preceded by a # (H1 heading).</li>
            <li><strong>Description</strong>: The next line is a description of the agent.</li>
            <li><strong>Section</strong>: Each section starts with ## (H2 heading) and represents a distinct part of the agent's behavior.</li>
            <li><strong>Trigger</strong>: The trigger defines when this section should be activated, preceded by ### (H3 heading).</li>
            <li><strong>Steps</strong>: The steps define what the agent should do when the section is activated, preceded by ### (H3 heading) and listed with bullet points.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Running a Playbook</h2>
          <p className="text-lg mb-4">
            You can run a playbook using the <code>agent_chat.py</code> application:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            <code>python -m playbooks.applications.agent_chat --playbooks_paths hello.md</code>
          </pre>
          <p className="text-lg mb-4">
            This will start an interactive chat session with your agent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advanced Features</h2>
          <p className="text-lg mb-4">
            Playbooks supports many advanced features, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg mb-4">
            <li><strong>Multiple Sections</strong>: You can define multiple sections in a playbook to handle different scenarios.</li>
            <li><strong>Complex Triggers</strong>: Triggers can be based on user input, agent state, or other conditions.</li>
            <li><strong>Tools</strong>: Agents can use tools to perform actions like searching the web, accessing databases, or calling APIs.</li>
            <li><strong>Memory</strong>: Agents can remember information from previous interactions.</li>
            <li><strong>Multi-Agent Systems</strong>: Multiple agents can work together to solve complex problems.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Try It Out</h2>
          <p className="text-lg mb-4">
            The best way to learn is by doing. Try creating your own playbook or experimenting with the examples in our playground.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/playground">
              <Button className="inline-flex items-center">
                Go to Playground
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/yourusername/playbooks" target="_blank" rel="noopener noreferrer">
              <Button className="bg-transparent border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
                View on GitHub
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 