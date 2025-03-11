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
import { PlaybookMarkdown } from "@/components/ui/playbook-markdown";
import { randomBytes } from "crypto";

export default function PlaygroundPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const { playbook, setPlaybook, examplePlaybooks, setExamplePlaybooks, loadExamplePlaybook } = usePlaybookStore();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
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
      setCurrentSessionId(event.detail.newSessionId);
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
    setInitialMessage(undefined); // Reset initial message

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playbook,
          existingSessionId: currentSessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to run playbook');
      }

      const data = await response.json();

      // Set the session ID from the response
      if (data.session_id) {
        setCurrentSessionId(data.session_id);

        // Set the initial message if available
        if (data.initial_message) {
          setInitialMessage(data.initial_message);
        }
      } else {
        throw new Error('No session ID returned from playbook');
      }
    } catch (error) {
      console.error('Failed to run playbook:', error);
      setIsRunning(false);
    }
  };

  const handleStopPlaybook = async () => {
    // Stop the playbook session
    if (currentSessionId) {
      try {
        await stopPlaybook(currentSessionId);
      } catch (error) {
        console.error('Failed to stop playbook:', error);
      }
    }

    setIsRunning(false);
    setCurrentSessionId(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Playground</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="chat">AI Agent</TabsTrigger>
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

            <TabsContent value="preview" className="mt-0">
              <Card className="p-4">
                <div className="border rounded-md p-4 min-h-[500px] overflow-y-auto bg-card">
                  <PlaybookMarkdown content={playbook || ''} />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <Card className="p-4">
                <ChatInterface
                  isRunning={isRunning}
                  sessionId={currentSessionId || undefined}
                  initialMessage={initialMessage}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Trace Viewer</h2>
            {currentSessionId ? (
              <TraceViewer
                sessionId={currentSessionId}
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