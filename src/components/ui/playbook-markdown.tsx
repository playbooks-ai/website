import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Zap, ListChecks, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaybookMarkdownProps {
  content: string;
  className?: string;
}

export function PlaybookMarkdown({ content, className }: PlaybookMarkdownProps) {
  return (
    <div className={cn("playbook-markdown font-mono text-sm", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-mono text-xl font-bold mb-4 text-primary flex items-center gap-2">
              <span className=" font-mono bg-primary text-primary-foreground rounded-md px-2 py-1 text-sm">
                Program
              </span>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-mono text-lg font-bold mt-6 mb-4 text-primary flex items-center gap-2 bg-slate-100 dark:bg-slate-700/40 px-4 py-3 rounded-md border-l-[6px] border-slate-500">
              <span className="font-mono bg-slate-500 text-white rounded-md px-2 py-1 text-sm">
                Playbook
              </span>
              {children}
            </h2>
          ),
          h3: ({ children }) => {
            const text = String(children).toLowerCase();

            if (text.includes('trigger')) {
              return (
                <h3 className="font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2 text-amber-500">
                  <Zap className="h-5 w-5" />
                  {children}
                </h3>
              );
            } else if (text.includes('steps')) {
              return (
                <h3 className="font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2 text-blue-500">
                  <ListChecks className="h-5 w-5" />
                  {children}
                </h3>
              );
            } else if (text.includes('notes')) {
              return (
                <h3 className="font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  {children}
                </h3>
              );
            } else {
              return (
                <h3 className="font-mono text-lg font-semibold mt-4 mb-2">
                  {children}
                </h3>
              );
            }
          },
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">{children}</li>
          ),
          p: ({ children }) => (
            <p className="mb-4">{children}</p>
          ),
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto my-4">{children}</pre>
          ),
          code: ({ children, className }) => {
            // Check if this is a code block (wrapped in a pre) or inline code
            const isInline = !className?.includes('language-');
            return (
              <code
                className={cn(
                  isInline
                    ? "bg-muted px-1 py-0.5 rounded text-sm"
                    : "block bg-muted rounded-md text-sm",
                  className
                )}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic my-4">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 