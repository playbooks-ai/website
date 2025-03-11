"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaybookStore } from "@/lib/store";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface TraceItem {
  id: string;
  name: string;
  children?: TraceItem[];
  metadata?: Record<string, any>;
  type: string;
}

interface ChatInterfaceProps {
  isRunning: boolean;
  sessionId?: string;
  initialMessage?: string;
  onTraceUpdate?: (traceItem: TraceItem) => void;
}

export function ChatInterface({ isRunning, sessionId, initialMessage, onTraceUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playbook } = usePlaybookStore();

  // Set initial message if provided
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          id: Date.now().toString(),
          role: "assistant",
          content: initialMessage,
        },
      ]);
    }
  }, [initialMessage]);

  // Add effect to handle initial message when sessionId changes
  useEffect(() => {
    if (sessionId && !initialMessage) {
      // Fetch the initial trace to get the first message
      fetch(`/api/sessions/${sessionId}/traces`)
        .then((res) => res.json())
        .then((data) => {
          // Extract the initial message from the trace
          const initialTrace = data.children?.[0]?.children?.[0];
          if (initialTrace?.metadata?.output) {
            setMessages([
              {
                id: Date.now().toString(),
                role: "assistant",
                content: initialTrace.metadata.output,
              },
            ]);
          }
        })
        .catch((error) => console.error("Error fetching initial trace:", error));
    }
  }, [sessionId, initialMessage]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !isRunning) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the actual API route to send a message to the playbook
      const response = await fetch(`/api/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Even if there's an error in the backend but the API returned a 200 response,
      // we can still show the response message to the user
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response || "I'm sorry, there was an error processing your message.",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If there's a new session ID, update the parent component
      if (data.newSessionId && sessionId) {
        // Use a custom event to notify the parent component about the new session ID
        const event = new CustomEvent('session-updated', {
          detail: { newSessionId: data.newSessionId }
        });
        window.dispatchEvent(event);
      }

      // If there's trace data and a callback to handle it, call the callback
      if (data.traceData && onTraceUpdate) {
        onTraceUpdate(data.traceData);
      }
    } catch (error) {
      console.error('Failed to send message:', error);

      // Add an error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your message. Please try again or restart the playbook.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isRunning) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <p className="text-gray-500">Run the playbook to see the AI agent in action.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={!isRunning || isLoading}
          />
          <Button onClick={handleSendMessage} disabled={!isRunning || isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 