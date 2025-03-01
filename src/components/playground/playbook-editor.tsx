"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { usePlaybookStore, Playbook } from "@/lib/store";

const DEFAULT_PLAYBOOK = `# HelloWorld Agent
This is a simple Hello World agent.

## HelloWorld

### Trigger
At the beginning

### Steps
- Greet the user with a friendly "Hello, World!" message.
- Explain that this is a demonstration of a simple Hello World playbook.
- Say goodbye to the user.`;

export function PlaybookEditor() {
  const { playbook, setPlaybook, examplePlaybooks, loadExamplePlaybook, savedPlaybooks, savePlaybook } = usePlaybookStore();
  const [playbookName, setPlaybookName] = useState("My Playbook");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Set default playbook if empty
    if (!playbook) {
      setPlaybook(DEFAULT_PLAYBOOK);
    }
  }, [playbook, setPlaybook]);

  const handleSavePlaybook = () => {
    savePlaybook(playbookName, playbook);
    alert(`Playbook "${playbookName}" saved successfully!`);
  };

  const handleLoadExample = (examplePlaybook: Playbook) => {
    loadExamplePlaybook(examplePlaybook.id);
  };

  const handleLoadSaved = (savedPlaybook: Playbook) => {
    setPlaybook(savedPlaybook.content);
    setPlaybookName(savedPlaybook.name);
  };

  const handleExportPlaybook = () => {
    if (!playbook) return;

    // Create a blob with the playbook content
    const blob = new Blob([playbook], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and click it to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = `${playbookName.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImportPlaybook = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      if (content) {
        setPlaybook(content);

        // Extract name from file name
        const fileName = file.name.replace(/\.md$/, '');
        setPlaybookName(fileName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
      }
    };
    reader.readAsText(file);

    // Reset the input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleSharePlaybook = () => {
    if (!playbook) return;

    // Encode the playbook content for URL sharing
    const encodedPlaybook = encodeURIComponent(playbook);
    const encodedName = encodeURIComponent(playbookName);

    // Create a shareable URL with the playbook content and name as query parameters
    const url = `${window.location.origin}/playground?name=${encodedName}&playbook=${encodedPlaybook}`;

    // Set the share URL and show the modal
    setShareUrl(url);
    setShowShareModal(true);
  };

  const handleCopyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('Share URL copied to clipboard!');
          setShowShareModal(false);
        })
        .catch(err => {
          console.error('Failed to copy URL:', err);
        });
    }
  };

  // Check for shared playbook in URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedPlaybook = params.get('playbook');
      const sharedName = params.get('name');

      if (sharedPlaybook) {
        setPlaybook(decodeURIComponent(sharedPlaybook));
        if (sharedName) {
          setPlaybookName(decodeURIComponent(sharedName));
        }

        // Clear the URL parameters after loading
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [setPlaybook]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={playbookName}
            onChange={(e) => setPlaybookName(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            placeholder="Playbook Name"
          />
          <Button onClick={handleSavePlaybook}>
            Save
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportPlaybook}>
            Export
          </Button>
          <Button variant="outline" onClick={handleImportClick}>
            Import
          </Button>
          <Button variant="outline" onClick={handleSharePlaybook}>
            Share
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportPlaybook}
            accept=".md"
            className="hidden"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Examples
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {examplePlaybooks.length > 0 ? (
                examplePlaybooks.map((example) => (
                  <DropdownMenuItem
                    key={example.id}
                    onClick={() => handleLoadExample(example)}
                  >
                    {example.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No examples available</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Saved
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {savedPlaybooks.length > 0 ? (
                savedPlaybooks.map((saved) => (
                  <DropdownMenuItem
                    key={saved.id}
                    onClick={() => handleLoadSaved(saved)}
                  >
                    {saved.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No saved playbooks</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Textarea
        value={playbook}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPlaybook(e.target.value)}
        className="min-h-[500px] font-mono"
        placeholder="Write your playbook here..."
      />

      <div className="text-xs text-gray-500">
        <p>Write your playbook in markdown format. Use headings to define sections and steps.</p>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Share Playbook</h3>
            <p className="text-sm text-gray-500 mb-4">
              Copy this URL to share your playbook with others:
            </p>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={shareUrl || ''}
                readOnly
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <Button onClick={handleCopyShareUrl}>
                Copy
              </Button>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowShareModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 