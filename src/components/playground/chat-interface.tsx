"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaybookStore } from "@/lib/store";
import { getChatHistory } from "@/lib/python-service";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant" | "trace";
  content: string;
  timestamp?: string;
  sequence?: number;
}

interface TraceItem {
  id: string;
  name: string;
  children?: TraceItem[];
  metadata?: Record<string, any>;
  type: string;
  content?: string;
  timestamp?: string;
  created_at?: string;
  createdAt?: string;
}

interface ChatInterfaceProps {
  isRunning: boolean;
  sessionId?: string;
  initialMessage?: string;
  onTraceUpdate?: (traceItem: TraceItem) => void;
}

export function ChatInterface({ isRunning, sessionId, initialMessage, onTraceUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [traces, setTraces] = useState<TraceItem[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playbook } = usePlaybookStore();
  const previousSessionIdRef = useRef<string | undefined>(undefined);
  const wasRunningRef = useRef<boolean>(false);
  const hasBeenStoppedRef = useRef<boolean>(false);

  // Clear messages when session is stopped
  useEffect(() => {
    // If it was running before and now it's not, clear the messages
    if (wasRunningRef.current && !isRunning) {
      setMessages([]);
      setTraces([]);
      setInput(""); // Also clear any input text

      // Mark that this session has been stopped
      hasBeenStoppedRef.current = true;
    }

    // Update the ref for the next check
    wasRunningRef.current = isRunning;
  }, [isRunning]);

  // Set initial message if provided
  useEffect(() => {
    if (initialMessage && !sessionId) {
      // Create a stable ID for the welcome message
      const welcomeMessageId = `welcome-${initialMessage.substring(0, 20).replace(/\s+/g, '-')}`;

      setMessages([
        {
          id: welcomeMessageId,
          role: "assistant",
          content: initialMessage,
          // Use sequence 0 for welcome message to ensure it appears first
          sequence: 0
        },
      ]);
    }
  }, [initialMessage, sessionId]);

  // Load chat history when sessionId changes
  useEffect(() => {
    // Only load history if we have a valid session and it hasn't been stopped
    if (
      sessionId &&
      isRunning &&
      sessionId !== previousSessionIdRef.current &&
      !initialMessage &&
      !hasBeenStoppedRef.current
    ) {
      setIsLoadingHistory(true);

      // Load chat history
      const loadChatHistory = async () => {
        try {
          // Check that we're still running before proceeding
          if (!isRunning) {
            setIsLoadingHistory(false);
            return;
          }

          const history = await getChatHistory(sessionId);

          // Check again that we're still running before updating state
          if (!isRunning) {
            setIsLoadingHistory(false);
            return;
          }

          if (history.messages && history.messages.length > 0) {
            // Convert API messages to our Message format with IDs
            const formattedMessages = history.messages.map((msg) => ({
              id: Date.now() + Math.random().toString(),
              role: msg.role as "user" | "assistant",
              content: msg.content,
              timestamp: msg.timestamp || new Date().toISOString()
            }));

            setMessages(formattedMessages);
          } else {
            // If no history, try to get initial message from trace
            fetchInitialMessageFromTrace();
          }

          // Load trace data
          fetchTraceData();
        } catch (error) {
          console.error('Error loading chat history:', error);

          // Only show toast if we're still running
          if (isRunning) {
            toast({
              title: "Error",
              description: "Failed to load chat history. Some messages may be missing.",
              variant: "destructive",
              duration: 3000,
            });

            // If we can't load history, try to get initial message from trace
            fetchInitialMessageFromTrace();
          }
        } finally {
          setIsLoadingHistory(false);
        }
      };

      loadChatHistory();
      previousSessionIdRef.current = sessionId;
    }

    // Reset the stopped flag when we get a new session ID
    if (sessionId && sessionId !== previousSessionIdRef.current) {
      hasBeenStoppedRef.current = false;
    }

    // Set up event listener for trace updates
    const handleTraceUpdate = (event: CustomEvent<{ sessionId: string, trace: TraceItem }>) => {
      if (event.detail.sessionId === sessionId && event.detail.trace) {
        console.log('Received trace update:', event.detail.trace);

        // Get the current highest sequence number
        const currentMaxSequence = Math.max(
          0,
          ...messages.map(m => m.sequence !== undefined ? m.sequence : 0)
        );

        // Create a stable ID for the trace
        const content = event.detail.trace.content || event.detail.trace.name || "Unknown trace";
        const stableId = `trace-${sessionId}-live-${content.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}`;

        // Add trace as a message with the next sequence number
        const traceMessage: Message = {
          id: stableId,
          role: "trace",
          content: content,
          sequence: currentMaxSequence + 1
        };

        setMessages(prevMessages => {
          // Skip if we already have this message
          if (prevMessages.some(m => m.id === stableId)) {
            return prevMessages;
          }

          // Add the new message
          const newMessages = [...prevMessages, traceMessage];

          // Sort by sequence number if available, otherwise by ID
          return newMessages.sort((a, b) => {
            if (a.sequence !== undefined && b.sequence !== undefined) {
              return a.sequence - b.sequence;
            }
            return a.id.localeCompare(b.id);
          });
        });
      }
    };

    // Add event listener
    window.addEventListener('trace-updated', handleTraceUpdate as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('trace-updated', handleTraceUpdate as EventListener);
    };
  }, [sessionId, initialMessage, isRunning]);

  // Fetch trace data
  const fetchTraceData = async () => {
    if (!sessionId) return;

    try {
      console.log(`Fetching session data for ID: ${sessionId}`);
      const response = await fetch(`/api/sessions/${sessionId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }

      const sessionData = await response.json();
      console.log("Session API response:", sessionData);

      // Extract trace data from the session data
      let tracesArray = [];

      // Handle different possible formats of trace data
      if (sessionData.traces && Array.isArray(sessionData.traces)) {
        // Direct array of traces in the session data
        tracesArray = sessionData.traces;
      } else if (sessionData.traces && sessionData.traces.root && Array.isArray(sessionData.traces.root)) {
        // Nested root array
        tracesArray = sessionData.traces.root;
      } else if (sessionData.traces && sessionData.traces.root && sessionData.traces.root.traces && Array.isArray(sessionData.traces.root.traces)) {
        // Deeply nested traces array
        tracesArray = sessionData.traces.root.traces;
      }

      console.log("Extracted traces array:", tracesArray);

      // Store the original traces for reference
      setTraces(tracesArray);

      // Process traces and add them as messages
      if (Array.isArray(tracesArray) && tracesArray.length > 0) {
        // First, get existing message IDs to avoid duplicates
        const existingIds = new Set(messages.map(m => m.id));

        // Get the current highest sequence number
        const currentMaxSequence = Math.max(
          0,
          ...messages.map(m => m.sequence !== undefined ? m.sequence : 0)
        );

        // Create a stable ID for each trace based on its content
        const traceMessages: Message[] = [];

        tracesArray.forEach((trace: any, index) => {
          if (trace) {
            const content = trace.content || trace.name || "Unknown trace";
            // Only add meaningful traces that have content
            if (content && content !== "Unknown trace") {
              // Create a stable ID based on content and index
              const stableId = `trace-${sessionId}-${index}-${content.substring(0, 20).replace(/\s+/g, '-')}`;

              // Skip if we already have this message
              if (!existingIds.has(stableId)) {
                traceMessages.push({
                  id: stableId,
                  role: "trace",
                  content: content,
                  // Use a sequence number based on the current max plus the index
                  // This ensures traces maintain their relative order
                  sequence: currentMaxSequence + index + 1
                } as Message);
              }
            }
          }
        });

        // Add trace messages to the chat
        if (traceMessages.length > 0) {
          setMessages(prevMessages => {
            // Merge messages and traces
            const allMessages = [...prevMessages, ...traceMessages];

            // Sort by sequence number if available, otherwise by ID
            return allMessages.sort((a, b) => {
              if (a.sequence !== undefined && b.sequence !== undefined) {
                return a.sequence - b.sequence;
              }
              return a.id.localeCompare(b.id);
            });
          });
        }
      }
    } catch (err) {
      console.error('Error fetching trace data:', err);
    }
  };

  // Fallback to fetch initial message from trace if needed
  const fetchInitialMessageFromTrace = () => {
    // Only proceed if we have a session ID and the session is running
    if (!sessionId || !isRunning) return;

    // Fetch the session data to get the traces
    fetch(`/api/sessions/${sessionId}`)
      .then((res) => {
        // Check if we're still running before proceeding
        if (!isRunning) return null;
        return res.json();
      })
      .then((sessionData) => {
        // If we aborted earlier, data will be null
        if (!sessionData || !isRunning) return;

        console.log("Session data for initial message:", sessionData);

        // Extract the traces from the session data
        let traces = [];
        if (sessionData.traces && Array.isArray(sessionData.traces)) {
          traces = sessionData.traces;
        } else if (sessionData.traces && sessionData.traces.root && Array.isArray(sessionData.traces.root)) {
          traces = sessionData.traces.root;
        } else if (sessionData.traces && sessionData.traces.root && sessionData.traces.root.traces && Array.isArray(sessionData.traces.root.traces)) {
          traces = sessionData.traces.root.traces;
        }

        console.log("Extracted traces for initial message:", traces);

        // Try different ways to find the initial message
        let initialMessage = null;

        // Method 1: Look for the first trace with metadata.output
        for (const trace of traces) {
          if (trace?.metadata?.output) {
            initialMessage = trace.metadata.output;
            break;
          }
        }

        // Method 2: Look for nested children
        if (!initialMessage && traces.length > 0) {
          const firstTrace = traces[0];
          if (firstTrace?.children?.[0]?.children?.[0]?.metadata?.output) {
            initialMessage = firstTrace.children[0].children[0].metadata.output;
          } else if (firstTrace?.children?.[0]?.metadata?.output) {
            initialMessage = firstTrace.children[0].metadata.output;
          }
        }

        console.log("Found initial message:", initialMessage);

        if (initialMessage) {
          // Create a stable ID for the initial message
          const initialMessageId = `initial-${sessionId}-${initialMessage.substring(0, 20).replace(/\s+/g, '-')}`;

          setMessages([
            {
              id: initialMessageId,
              role: "assistant",
              content: initialMessage,
              // Use sequence 0 for initial message to ensure it appears first
              sequence: 0
            }
          ]);
        }
      })
      .catch(error => {
        console.error("Error fetching initial message from trace:", error);
      });
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !isRunning) return;

    // Get the current highest sequence number
    const currentMaxSequence = Math.max(
      0,
      ...messages.map(m => m.sequence !== undefined ? m.sequence : 0)
    );

    // Create a stable ID for the user message
    const userMessageId = `user-${sessionId}-${Date.now()}-${input.substring(0, 20).replace(/\s+/g, '-')}`;

    // User message gets the next sequence number
    const userSequence = currentMaxSequence + 1;

    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: input,
      sequence: userSequence
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the messages API route to send a message to the playbook
      const response = await fetch(`/api/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          sequence: userSequence
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Assistant message gets the next sequence number after user
      const assistantSequence = userSequence + 1;

      // Create a stable ID for the assistant message
      const assistantMessageId = `assistant-${sessionId}-${Date.now()}-${data.response?.substring(0, 20).replace(/\s+/g, '-') || 'response'}`;

      // Even if there's an error in the backend but the API returned a 200 response,
      // we can still show the response message to the user
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: data.response || "I'm sorry, there was an error processing your message.",
        sequence: assistantSequence
      };

      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];

        // Sort by sequence number if available, otherwise by ID
        return newMessages.sort((a, b) => {
          if (a.sequence !== undefined && b.sequence !== undefined) {
            return a.sequence - b.sequence;
          }
          return a.id.localeCompare(b.id);
        });
      });

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

        // Also add trace data as a message if it has content
        if (data.traceData.content || data.traceData.name) {
          // Trace message gets the next sequence number after assistant
          const traceSequence = assistantSequence + 1;

          // Create a stable ID for the trace
          const traceContent = data.traceData.content || data.traceData.name;
          const traceId = `trace-${sessionId}-response-${traceContent.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}`;

          const traceMessage: Message = {
            id: traceId,
            role: "trace",
            content: traceContent,
            sequence: traceSequence
          };

          setMessages(prev => {
            // Skip if we already have this message
            if (prev.some(m => m.id === traceId)) {
              return prev;
            }

            const newMessages = [...prev, traceMessage];

            // Sort by sequence number if available, otherwise by ID
            return newMessages.sort((a, b) => {
              if (a.sequence !== undefined && b.sequence !== undefined) {
                return a.sequence - b.sequence;
              }
              return a.id.localeCompare(b.id);
            });
          });
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);

      // Error message gets the next sequence number after user
      const errorSequence = userSequence + 1;

      // Add an error message
      const errorMessage: Message = {
        id: `error-${sessionId}-${Date.now()}`,
        role: "assistant",
        content: "Sorry, there was an error processing your message. Please try again or restart the playbook.",
        sequence: errorSequence
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
        {isLoadingHistory ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
              <p className="text-sm text-gray-500">Loading conversation history...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user"
                  ? "justify-end"
                  : message.role === "trace"
                    ? "justify-center"
                    : "justify-start"
                  }`}
              >
                <div
                  className={`${message.role === "user"
                    ? "bg-primary text-primary-foreground max-w-[80%] rounded-lg px-4 py-2"
                    : message.role === "trace"
                      ? "bg-muted/50 text-muted-foreground max-w-[90%] rounded-md px-3 py-1 text-sm border border-border/50"
                      : "bg-muted max-w-[80%] rounded-lg px-4 py-2"
                    }`}
                >
                  {message.role === "trace" && (
                    <div className="text-xs text-muted-foreground/70 mb-1">
                      Trace {message.sequence !== undefined ? `#${message.sequence}` : ''}
                    </div>
                  )}
                  <div className={message.role === "trace" ? "text-sm font-mono" : ""}>
                    {message.content}
                  </div>
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
          </>
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
            disabled={!isRunning || isLoading || isLoadingHistory}
          />
          <Button onClick={handleSendMessage} disabled={!isRunning || isLoading || isLoadingHistory || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 