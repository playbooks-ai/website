import React from 'react';
import { PlaybookMarkdown } from './playbook-markdown';
import { cn } from '@/lib/utils';

interface PlaybookPreviewProps {
  className?: string;
}

export function PlaybookPreview({ className }: PlaybookPreviewProps) {
  const samplePlaybook = `## Check order status

### Trigger
- When a user requests order status

### Steps
- Authenticate the user
- Ask user which order they want to check by presenting a list of recent orders
- Load order status
- Answer user's question based on the order status`;

  return (
    <div className={cn(
      "playbook-preview rounded-lg overflow-hidden border",
      "dark:bg-white dark:text-black bg-slate-900 text-white",
      className
    )}>
      <div className="p-4">
        <PlaybookMarkdown
          content={samplePlaybook}
          className="inverse-theme"
        />
      </div>
    </div>
  );
} 