import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Playbooks AI</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What is Playbooks AI?</h2>
          <p className="text-lg mb-4">
            Playbooks AI is a natural language programming framework that allows you to create interactive agents using markdown files. It's designed to make it easy for anyone to create powerful AI agents without writing code.
          </p>
          <p className="text-lg mb-4">
            With Playbooks AI, you can define the behavior of an agent using a simple, human-readable format. The agent can then interact with users, perform tasks, and integrate with other systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Playbooks AI?</h2>
          <p className="text-lg mb-4">
            Traditional programming requires learning complex syntax and programming concepts. Playbooks AI simplifies this by allowing you to write programs in natural language, using a familiar markdown format.
          </p>
          <p className="text-lg mb-4">
            Key benefits of Playbooks AI include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg mb-4">
            <li><strong>Simplicity</strong>: Write programs in natural language, no coding required.</li>
            <li><strong>Readability</strong>: Playbooks AI are easy to read and understand, even for non-programmers.</li>
            <li><strong>Flexibility</strong>: Create agents for a wide range of tasks, from simple chatbots to complex assistants.</li>
            <li><strong>Extensibility</strong>: Integrate with existing Python code and external services.</li>
            <li><strong>Traceability</strong>: Understand how your agent is working with detailed execution traces.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg mb-4">
            Playbooks AI uses large language models (LLMs) to interpret and execute natural language programs. Here's how it works:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-lg mb-4">
            <li>You write a playbook in markdown format, defining the behavior of your agent.</li>
            <li>The Playbooks AI framework parses the markdown and creates an agent.</li>
            <li>When the agent runs, it uses an LLM to interpret and execute the steps in the playbook.</li>
            <li>The agent can interact with users, use tools, and perform tasks based on the playbook.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-lg mb-4">
            Ready to create your own playbooks? Check out our documentation to learn more, or try the playground to experiment with examples.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/docs">
              <Button className="inline-flex items-center">
                Read the Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button className="inline-flex items-center">
                Try the Playground
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
          <p className="text-lg mb-4">
            Playbooks AI is an open-source project. We welcome contributions from the community to help improve and extend the framework.
          </p>
          <Link href="https://github.com/yourusername/playbooks" target="_blank" rel="noopener noreferrer">
            <Button className="bg-transparent border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
              View on GitHub
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
} 