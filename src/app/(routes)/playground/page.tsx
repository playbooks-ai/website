"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaybookEditor } from "@/components/playground/playbook-editor";
import { ChatInterface } from "@/components/playground/chat-interface";
import { TraceViewer } from "@/components/trace-viewer/trace-viewer";
import { usePlaybookStore } from "@/lib/store";
import { stopPlaybook, startPlaybook, getSessionData } from "@/lib/python-service";
import { PlaybookMarkdown } from "@/components/ui/playbook-markdown";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function PlaygroundPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const { playbook, setPlaybook, examplePlaybooks, setExamplePlaybooks, loadExamplePlaybook } = usePlaybookStore();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isResumingSession, setIsResumingSession] = useState(false);

  // This flag prevents reloading a session after it's been stopped
  const preventReloadRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Check for session_id in URL and load that session if present
  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    // Only load session if we have a session ID and we're not preventing reloads
    if (sessionId && !currentSessionId && !isLoadingSession && !preventReloadRef.current) {
      setIsLoadingSession(true);
      setIsResumingSession(true);

      // Load the session
      const loadSession = async () => {
        try {
          // Get all session data at once
          const sessionData = await getSessionData(sessionId);

          // Update the playbook content in the editor
          if (sessionData.playbook_content) {
            setPlaybook(sessionData.playbook_content);
          }

          // Set the UI to running state
          setIsRunning(true);
          setActiveTab("chat");

          // Set the session ID
          setCurrentSessionId(sessionData.session_id);

          // Start the session with the existing ID
          const result = await startPlaybook(sessionData.playbook_content, sessionId);

          if (result.traceId) {
            // Set the initial message if available
            if (result.initialMessage) {
              setInitialMessage(result.initialMessage);
            }

            toast({
              title: "Session Loaded",
              description: "Successfully loaded the shared session with its conversation history and playbook.",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error('Failed to load session:', error);
          setIsRunning(false);

          // Remove the session_id from URL if loading fails
          updateUrl(null);

          toast({
            title: "Error",
            description: "Failed to load the session. The session may have expired or been corrupted.",
            variant: "destructive",
            duration: 5000,
          });
        } finally {
          setIsLoadingSession(false);
          setIsResumingSession(false);
        }
      };

      loadSession();
    }
  }, [searchParams, currentSessionId, isLoadingSession, playbook]);

  // Listen for session updates
  useEffect(() => {
    const handleSessionUpdate = (event: CustomEvent<{ newSessionId: string }>) => {
      console.log('Session updated:', event.detail.newSessionId);
      setCurrentSessionId(event.detail.newSessionId);

      // Update URL with new session ID
      updateUrl(event.detail.newSessionId);
    };

    // Add event listener
    window.addEventListener('session-updated', handleSessionUpdate as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('session-updated', handleSessionUpdate as EventListener);
    };
  }, []);

  // Function to update URL with session ID
  const updateUrl = (sessionId: string | null) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);

      if (sessionId) {
        url.searchParams.set('session_id', sessionId);
      } else {
        url.searchParams.delete('session_id');
      }

      // Update the URL without refreshing the page
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleRunPlaybook = async () => {
    // Reset state for a new session
    setIsRunning(true);
    setActiveTab("chat");
    setInitialMessage(undefined); // Reset initial message

    // If we had a previous session, clear it
    if (currentSessionId) {
      setCurrentSessionId(null);
    }

    try {
      // Make sure we're using the current playbook content from the editor
      const currentPlaybook = playbook;

      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playbook: currentPlaybook,
          existingSessionId: null // Always start a fresh session
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to run playbook');
      }

      const data = await response.json();

      // Set the session ID from the response
      if (data.session_id) {
        setCurrentSessionId(data.session_id);

        // Update URL with session ID
        updateUrl(data.session_id);

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

      toast({
        title: "Error",
        description: "Failed to run the playbook. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Function to handle stopping a session
  const handleStopSession = () => {
    // Set flag to prevent reloading
    preventReloadRef.current = true;

    // Get the session ID before clearing state
    const sessionIdToStop = currentSessionId;

    // Update UI state immediately
    setIsRunning(false);
    setInitialMessage(undefined);
    setCurrentSessionId(null);

    // Remove session ID from URL
    updateUrl(null);

    // Stop the session in the backend
    if (sessionIdToStop) {
      stopPlaybook(sessionIdToStop)
        .then(() => {
          toast({
            title: "Session Stopped",
            description: "The playbook session has been stopped. You can still access it later using the same URL.",
            duration: 5000,
          });

          // Reset the prevent reload flag after a delay
          setTimeout(() => {
            preventReloadRef.current = false;
          }, 1000);
        })
        .catch((error) => {
          console.error('Failed to stop playbook:', error);
          toast({
            title: "Error",
            description: "Failed to stop the playbook session.",
            variant: "destructive",
            duration: 5000,
          });

          // Reset the prevent reload flag after a delay
          setTimeout(() => {
            preventReloadRef.current = false;
          }, 1000);
        });
    } else {
      // Reset the prevent reload flag after a delay
      setTimeout(() => {
        preventReloadRef.current = false;
      }, 1000);
    }
  };

  // Function to copy the current URL with session ID to clipboard
  const handleShareSession = () => {
    if (currentSessionId && typeof window !== 'undefined') {
      const url = window.location.href;

      navigator.clipboard.writeText(url)
        .then(() => {
          toast({
            title: "URL Copied",
            description: "Session URL has been copied to clipboard. You can share it with others.",
            duration: 3000,
          });
        })
        .catch(err => {
          console.error('Failed to copy URL:', err);

          toast({
            title: "Error",
            description: "Failed to copy the URL to clipboard.",
            variant: "destructive",
            duration: 5000,
          });
        });
    }
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
                  <Button onClick={handleRunPlaybook} disabled={!playbook || isRunning || isLoadingSession}>
                    {isLoadingSession ? (isResumingSession ? 'Resuming Session...' : 'Loading Session...') : 'Run Playbook'}
                  </Button>
                ) : (
                  <>
                    {currentSessionId && (
                      <Button onClick={handleShareSession} variant="outline">
                        Share Session
                      </Button>
                    )}
                    <Button
                      onClick={handleStopSession}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Stop
                    </Button>
                  </>
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