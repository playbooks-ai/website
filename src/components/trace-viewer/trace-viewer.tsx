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
        console.log(`Fetching traces for session ID: ${sessionId}`);
        const response = await fetch(`/api/sessions/${sessionId}/traces`);

        if (!response.ok) {
          throw new Error(`Failed to fetch trace data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Trace API response:", data);
        setDebugInfo(data);

        const traces = data.root.traces;

        // Simply extract the traces array or create an empty array if not found
        const extractedTraces: TraceItem[] = [];

        // If data is an object with a traces property
        if (Array.isArray(traces)) {
          traces.forEach((trace: any) => {
            if (trace && trace.content) {
              extractedTraces.push({
                id: trace.id || `trace-${Math.random().toString(36).substr(2, 9)}`,
                content: trace.content,
                timestamp: trace.timestamp,
                type: trace.type
              });
            }
          });
        }

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