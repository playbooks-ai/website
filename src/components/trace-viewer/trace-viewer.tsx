"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

interface TraceItem {
  id: string;
  name: string;
  children?: TraceItem[];
  metadata?: Record<string, any>;
  type: string;
}

interface TraceData {
  root: TraceItem;
}

interface TraceViewerProps {
  traceId?: string;
  newTraceItem?: TraceItem;
}

interface TraceNodeProps {
  item: TraceItem;
  depth: number;
}

function TraceNode({ item, depth }: TraceNodeProps) {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const [showMetadata, setShowMetadata] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const hasMetadata = item.metadata && Object.keys(item.metadata).length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleMetadata = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMetadata(!showMetadata);
  };

  const getIconColor = () => {
    switch (item.type) {
      case "agent":
        return "text-blue-500";
      case "trigger":
        return "text-purple-500";
      case "step":
        return "text-green-500";
      case "action":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="font-mono text-sm">
      <div
        className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1 cursor-pointer"
        onClick={toggleOpen}
      >
        <div style={{ marginLeft: `${depth * 16}px` }} className="flex items-center">
          {hasChildren ? (
            isOpen ? (
              <ChevronDown className="h-4 w-4 mr-1" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1" />
            )
          ) : (
            <div className="w-4 mr-1" />
          )}
          <span className={getIconColor()}>{item.name}</span>

          {hasMetadata && (
            <Info
              className="h-3 w-3 ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={toggleMetadata}
            />
          )}
        </div>
      </div>

      {showMetadata && hasMetadata && (
        <div
          style={{ marginLeft: `${(depth + 1) * 16 + 12}px` }}
          className="bg-gray-50 dark:bg-gray-900 p-2 rounded text-xs my-1 border border-gray-200 dark:border-gray-700"
        >
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(item.metadata, null, 2)}
          </pre>
        </div>
      )}

      {isOpen && hasChildren && (
        <div>
          {item.children!.map((child) => (
            <TraceNode key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TraceViewer({ traceId, newTraceItem }: TraceViewerProps) {
  const [traceData, setTraceData] = useState<TraceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevNewTraceItemRef = useRef<string | null>(null);

  // Fetch initial trace data
  useEffect(() => {
    async function fetchTraceData() {
      if (!traceId) return;

      setLoading(true);
      setError(null);

      try {
        // Use the traceId directly without mapping "sample" to "trace1"
        const response = await fetch(`/api/traces/${traceId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch trace data: ${response.statusText}`);
        }

        const data = await response.json();
        setTraceData(data);
      } catch (err) {
        console.error('Error fetching trace data:', err);
        setError('Failed to load trace data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTraceData();
  }, [traceId]);

  // Update trace data when a new trace item is received
  useEffect(() => {
    if (newTraceItem && traceData) {
      // Skip if we've already processed this exact trace item
      if (prevNewTraceItemRef.current === newTraceItem.id) {
        return;
      }

      // Find the section to add the new trace item to
      // For simplicity, we'll add it to the first section's children
      const updatedTraceData = { ...traceData };

      if (updatedTraceData.root.children && updatedTraceData.root.children.length > 0) {
        const firstSection = updatedTraceData.root.children[0];

        if (!firstSection.children) {
          firstSection.children = [];
        }

        // Check if the item already exists to prevent infinite loops
        const itemExists = firstSection.children.some(
          (item) => item.id === newTraceItem.id
        );

        // Only add the new trace item if it doesn't already exist
        if (!itemExists) {
          // Add the new trace item
          firstSection.children.push(newTraceItem);

          // Update the trace data
          setTraceData(updatedTraceData);

          // Remember this trace item ID to avoid processing it again
          prevNewTraceItemRef.current = newTraceItem.id;
        }
      }
    }
  }, [newTraceItem, traceData]);

  if (loading) {
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!traceData || !traceData.root) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No trace data available</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-2">
        <TraceNode key={traceData.root.id} item={traceData.root} depth={0} />
      </div>
    </div>
  );
} 