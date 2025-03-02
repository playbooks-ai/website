import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Zap, ListChecks, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaybookMarkdownProps {
  content: string;
  className?: string;
}

export function PlaybookMarkdown({ content, className }: PlaybookMarkdownProps) {
  const isInverse = className?.includes('inverse-theme');

  return (
    <div className={cn("playbook-markdown font-mono text-sm", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className={cn(
              "font-mono text-xl font-bold mb-4 flex items-center gap-2",
              isInverse ? "text-black dark:text-white" : "text-primary"
            )}>
              <span className={cn(
                "font-mono rounded-md px-2 py-1 text-sm",
                isInverse ? "bg-black text-white dark:bg-white dark:text-black" : "bg-primary text-primary-foreground"
              )}>
                Program
              </span>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={cn(
              "font-mono text-lg font-bold mt-6 mb-4 flex items-center gap-2 px-4 py-3 rounded-md border-l-[6px]",
              isInverse
                ? "bg-slate-700 dark:bg-slate-300 border-slate-400 dark:border-slate-500 text-white dark:text-black"
                : "bg-slate-100 dark:bg-slate-700/40 border-slate-500"
            )}>
              <span className={cn(
                "font-mono rounded-md px-2 py-1 text-sm",
                isInverse ? "bg-slate-600 text-white" : "bg-slate-500 text-white"
              )}>
                Playbook
              </span>
              {children}
            </h2>
          ),
          h3: ({ children }) => {
            const text = String(children).toLowerCase();

            if (text.includes('trigger')) {
              return (
                <h3 className={cn(
                  "font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2",
                  isInverse ? "text-amber-600 dark:text-amber-400" : "text-amber-500"
                )}>
                  <Zap className="h-5 w-5" />
                  {children}
                </h3>
              );
            } else if (text.includes('steps')) {
              return (
                <h3 className={cn(
                  "font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2",
                  isInverse ? "text-blue-600 dark:text-blue-400" : "text-blue-500"
                )}>
                  <ListChecks className="h-5 w-5" />
                  {children}
                </h3>
              );
            } else if (text.includes('notes')) {
              return (
                <h3 className={cn(
                  "font-mono text-lg font-semibold mt-4 mb-2 flex items-center gap-2",
                  isInverse ? "text-orange-700 dark:text-orange-500" : "text-orange-600"
                )}>
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
            <pre className={cn(
              "p-4 rounded-md text-sm overflow-x-auto my-4",
              isInverse ? "bg-slate-200 dark:bg-slate-800" : "bg-muted"
            )}>{children}</pre>
          ),
          code: ({ children, className }) => {
            // Check if this is a code block (wrapped in a pre) or inline code
            const isInline = !className?.includes('language-');
            return (
              <code
                className={cn(
                  isInline
                    ? cn(
                      "px-1 py-0.5 rounded text-sm",
                      isInverse ? "bg-slate-200 dark:bg-slate-800" : "bg-muted"
                    )
                    : cn(
                      "block rounded-md text-sm",
                      isInverse ? "bg-slate-200 dark:bg-slate-800" : "bg-muted"
                    ),
                  className
                )}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className={cn(
              "border-l-4 pl-4 italic my-4",
              isInverse ? "border-slate-400 dark:border-slate-600" : "border-muted"
            )}>{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 