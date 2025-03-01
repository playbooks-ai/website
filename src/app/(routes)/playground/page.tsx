"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaybookEditor } from "@/components/playground/playbook-editor";
import { ChatInterface } from "@/components/playground/chat-interface";
import { TraceViewer } from "@/components/trace-viewer/trace-viewer";
import { usePlaybookStore } from "@/lib/store";

export default function PlaygroundPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const { playbook, setPlaybook, examplePlaybooks, setExamplePlaybooks, loadExamplePlaybook } = usePlaybookStore();
  const [currentTraceId, setCurrentTraceId] = useState<string | null>(null);

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

  const handleRunPlaybook = async () => {
    setIsRunning(true);
    setActiveTab("chat");

    try {
      const response = await fetch('/api/run-playbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playbook }),
      });

      if (!response.ok) {
        throw new Error('Failed to run playbook');
      }

      // In a real implementation, we would get a trace ID back
      // and set it here to show the trace in the trace viewer
      setCurrentTraceId("sample");
    } catch (error) {
      console.error('Failed to run playbook:', error);
      setIsRunning(false);
    }
  };

  const handleStopPlaybook = () => {
    // This would be replaced with an actual API call to stop the playbook
    setIsRunning(false);
    setCurrentTraceId(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Playbooks Playground</h1>

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
                  <Button onClick={handleStopPlaybook} variant="destructive">
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
                <ChatInterface isRunning={isRunning} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Trace Viewer</h2>
            {currentTraceId ? (
              <TraceViewer traceId={currentTraceId} />
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