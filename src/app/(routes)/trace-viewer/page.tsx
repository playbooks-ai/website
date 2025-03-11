"use client";

import { useState, useEffect } from "react";
import { TraceViewer } from "@/components/trace-viewer/trace-viewer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Trace {
  id: string;
  name: string;
  timestamp: string;
}

export default function TraceViewerPage({ params }: { params: { sessionId: string } }) {
  const [activeTrace, setActiveTrace] = useState<string | null>(null);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraces() {
      try {
        const response = await fetch(`/api/sessions/${params.sessionId}`);
        const sessionData = await response.json();

        // Extract trace data from the session data
        let traceData = [];
        if (sessionData.traces) {
          traceData = sessionData.traces;
        } else if (sessionData.traceData) {
          traceData = sessionData.traceData;
        }

        setTraces(traceData);
      } catch (error) {
        console.error('Failed to fetch session data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTraces();
  }, [params.sessionId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Trace Viewer</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Traces</CardTitle>
              <CardDescription>Select a trace to view</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-4 text-center">Loading traces...</div>
              ) : traces.length > 0 ? (
                <div className="space-y-2">
                  {traces.map((trace) => (
                    <Button
                      key={trace.id}
                      onClick={() => setActiveTrace(trace.id)}
                      className={`w-full justify-start ${activeTrace === trace.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                        }`}
                    >
                      <div className="text-left">
                        <div>{trace.name}</div>
                        <div className="text-xs text-muted-foreground">{trace.timestamp}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center">No traces available</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {activeTrace
                  ? traces.find((t) => t.id === activeTrace)?.name || "Trace Details"
                  : "Trace Details"}
              </CardTitle>
              <CardDescription>
                {activeTrace
                  ? `Viewing execution trace from ${traces.find((t) => t.id === activeTrace)?.timestamp
                  }`
                  : "Select a trace from the left panel"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] overflow-auto">
              {activeTrace ? (
                <TraceViewer sessionId={params.sessionId} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select a trace to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 