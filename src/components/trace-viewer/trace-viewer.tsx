"use client";

import { useState, useEffect } from "react";

interface TraceItem {
  id: string;
  content: string;
  timestamp?: string;
  type?: string;
}

interface TraceViewerProps {
  sessionId?: string;
}

export function TraceViewer({ sessionId }: TraceViewerProps) {
  const [traces, setTraces] = useState<TraceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Fetch trace data
  useEffect(() => {
    if (!sessionId) return;

    async function fetchTraceData() {
      setLoading(true);
      setError(null);

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

        // Log the structure of the session data to help debug
        console.log("Session data structure:", {
          hasTraces: !!sessionData.traces,
          tracesType: sessionData.traces ? typeof sessionData.traces : 'undefined',
          isTracesArray: sessionData.traces ? Array.isArray(sessionData.traces) : false,
          tracesLength: sessionData.traces ? (Array.isArray(sessionData.traces) ? sessionData.traces.length : 'not an array') : 0
        });

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
        setDebugInfo(sessionData);

        // Simply extract the traces array or create an empty array if not found
        const extractedTraces: TraceItem[] = [];

        // If we have a traces array, process it
        if (Array.isArray(tracesArray)) {
          tracesArray.forEach((trace: any) => {
            console.log("Processing trace item:", trace);
            if (trace) {
              extractedTraces.push({
                id: trace.id || `trace-${Math.random().toString(36).substr(2, 9)}`,
                content: trace.content || trace.name || "Unknown trace",
                timestamp: trace.timestamp || new Date().toISOString(),
                type: trace.type || "unknown"
              });
            }
          });
        }

        console.log("Final extracted traces:", extractedTraces);
        setTraces(extractedTraces);
      } catch (err) {
        console.error('Error fetching trace data:', err);
        setError('Failed to load trace data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTraceData();

    // Set up event listener for trace updates
    const handleTraceUpdate = (event: CustomEvent<{ sessionId: string, trace: TraceItem }>) => {
      if (event.detail.sessionId === sessionId && event.detail.trace.content) {
        console.log('Received trace update:', event.detail.trace);
        setTraces(prevTraces => [...prevTraces, event.detail.trace]);
      }
    };

    // Add event listener
    window.addEventListener('trace-updated', handleTraceUpdate as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('trace-updated', handleTraceUpdate as EventListener);
    };
  }, [sessionId]);

  if (loading && traces.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-75"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce delay-150"></div>
        </div>
      </div>
    );
  }

  if (error && traces.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (traces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-2">No trace data available</p>
        <p className="text-xs text-muted-foreground">Session ID: {sessionId}</p>
        {debugInfo && (
          <details className="mt-4 text-xs">
            <summary className="cursor-pointer text-blue-500">Show Debug Info</summary>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-h-[300px]">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-2">
        {traces.map((trace) => (
          <div
            key={trace.id}
            className="p-3 border rounded-md mb-2 bg-card"
          >
            {trace.timestamp && (
              <div className="text-xs text-muted-foreground mb-1">
                {formatTimestamp(trace.timestamp)}
              </div>
            )}
            <div className="whitespace-pre-wrap text-sm">
              {trace.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  } catch (e) {
    return timestamp;
  }
} 