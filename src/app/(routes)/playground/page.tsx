"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaybookEditor } from "@/components/playground/playbook-editor";
import { ChatInterface } from "@/components/playground/chat-interface";
import { TraceViewer } from "@/components/trace-viewer/trace-viewer";
import { usePlaybookStore } from "@/lib/store";
import { stopPlaybook } from "@/lib/python-service";

interface TraceItem {
  id: string;
  name: string;
  children?: TraceItem[];
  metadata?: Record<string, any>;
  type: string;
}

export default function PlaygroundPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const { playbook, setPlaybook, examplePlaybooks, setExamplePlaybooks, loadExamplePlaybook } = usePlaybookStore();
  const [currentTraceId, setCurrentTraceId] = useState<string | null>(null);
  const [newTraceItem, setNewTraceItem] = useState<TraceItem | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Load example playbooks when the component mounts
    const fetchExamplePlaybooks = async () => {
      try {
        const response = await fetch('/api/playbooks');
        const data = await response.json();
        setExamplePlaybooks(data);
      } catch (error) {
        console.error('Failed to load example playbooks:', error);
      }
    };

    fetchExamplePlaybooks();
  }, [setExamplePlaybooks]);

  // Listen for session updates
  useEffect(() => {
    const handleSessionUpdate = (event: CustomEvent<{ newSessionId: string }>) => {
      console.log('Session updated:', event.detail.newSessionId);
      setCurrentTraceId(event.detail.newSessionId);
    };

    // Add event listener
    window.addEventListener('session-updated', handleSessionUpdate as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('session-updated', handleSessionUpdate as EventListener);
    };
  }, []);

  const handleRunPlaybook = async () => {
    setIsRunning(true);
    setActiveTab("chat");
    setNewTraceItem(null); // Reset trace items
    setInitialMessage(undefined); // Reset initial message

    try {
      const response = await fetch('/api/run-playbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playbook,
          // Pass the existing trace ID if available
          existingTraceId: currentTraceId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to run playbook');
      }

      const data = await response.json();

      // Set the trace ID from the response
      if (data.traceId) {
        setCurrentTraceId(data.traceId);

        // Set the initial message if available
        if (data.initialMessage) {
          setInitialMessage(data.initialMessage);
        }
      } else {
        // Fallback to sample trace if no trace ID is returned
        setCurrentTraceId("sample");
      }
    } catch (error) {
      console.error('Failed to run playbook:', error);
      setIsRunning(false);
    }
  };

  const handleStopPlaybook = async () => {
    // Stop the playbook session
    if (currentTraceId) {
      try {
        await stopPlaybook(currentTraceId);
      } catch (error) {
        console.error('Failed to stop playbook:', error);
      }
    }

    setIsRunning(false);
    setCurrentTraceId(null);
  };

  const handleTraceUpdate = (traceItem: TraceItem) => {
    setNewTraceItem(traceItem);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Playbooks AI Playground</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>

              <div className="flex space-x-2">
                {!isRunning ? (
                  <Button onClick={handleRunPlaybook} disabled={!playbook || isRunning}>
                    Run Playbook
                  </Button>
                ) : (
                  <Button onClick={handleStopPlaybook} className="bg-red-500 hover:bg-red-600">
                    Stop
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="editor" className="mt-0">
              <Card className="p-4">
                <PlaybookEditor />
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <Card className="p-4">
                <ChatInterface
                  isRunning={isRunning}
                  traceId={currentTraceId || undefined}
                  initialMessage={initialMessage}
                  onTraceUpdate={handleTraceUpdate}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Trace Viewer</h2>
            {currentTraceId ? (
              <TraceViewer
                traceId={currentTraceId}
                newTraceItem={newTraceItem || undefined}
              />
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <p className="text-gray-500">Run a playbook to see its trace.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 