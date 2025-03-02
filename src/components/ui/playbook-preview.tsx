import React from 'react';
import { PlaybookMarkdown } from './playbook-markdown';
import { cn } from '@/lib/utils';

interface PlaybookPreviewProps {
  className?: string;
}

export function PlaybookPreview({ className }: PlaybookPreviewProps) {
  const samplePlaybook = `## Check order status

### Trigger
- When an authenticated user requests order status

### Steps
- Get order id from the user
- Load order status
- If order was found
  - Provide order status to the user
- Otherwise
  - Tell user that the order was not found
`;

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