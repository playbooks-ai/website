"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { usePlaybookStore, Playbook } from "@/lib/store";
import { Download, Upload, Share2, BookOpen, FolderOpen, Save } from "lucide-react";

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
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Reset save status after delay
  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      const timer = setTimeout(() => {
        setSaveStatus('idle');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  useEffect(() => {
    // Set default playbook if empty
    if (!playbook) {
      setPlaybook(DEFAULT_PLAYBOOK);
    }
  }, [playbook, setPlaybook]);

  // Extract playbook name from H1 tag
  const getPlaybookName = () => {
    if (!playbook) return "My Playbook";

    // Look for the first H1 tag (# Title)
    const h1Match = playbook.match(/^#\s+(.+)$/m);
    if (h1Match && h1Match[1]) {
      return h1Match[1].trim();
    }

    return "My Playbook";
  };

  const handleSavePlaybook = () => {
    setSaveStatus('saving');

    // Simulate a small delay to show the saving state
    setTimeout(() => {
      try {
        const playbookName = getPlaybookName();

        // Check if a playbook with this name already exists
        const existingPlaybookIndex = savedPlaybooks.findIndex(
          (saved) => saved.name.toLowerCase() === playbookName.toLowerCase()
        );

        if (existingPlaybookIndex >= 0) {
          // Update existing playbook
          const existingId = savedPlaybooks[existingPlaybookIndex].id;
          savePlaybook(playbookName, playbook, existingId);
        } else {
          // Create new playbook
          savePlaybook(playbookName, playbook);
        }

        setSaveStatus('success');
      } catch (error) {
        console.error('Failed to save playbook:', error);
        setSaveStatus('error');
      }
    }, 500);
  };

  const handleLoadExample = (examplePlaybook: Playbook) => {
    loadExamplePlaybook(examplePlaybook.id);
  };

  const handleLoadSaved = (savedPlaybook: Playbook) => {
    setPlaybook(savedPlaybook.content);
  };

  const handleExportPlaybook = () => {
    if (!playbook) return;

    const playbookName = getPlaybookName();

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

    const playbookName = getPlaybookName();

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

        // Clear the URL parameters after loading
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [setPlaybook]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-32">
          {/* Removed the Edit/Preview tabs from here */}
        </div>

        <div className="flex items-center space-x-2">
          {/* 1. Save Button */}
          <SecondaryButton
            onClick={handleSavePlaybook}
            className={`h-9 w-9 p-0 rounded-full transition-colors duration-300 ${saveStatus === 'saving'
              ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400'
              : saveStatus === 'success'
                ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-400'
                : saveStatus === 'error'
                  ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-400'
                  : ''
              }`}
            title="Save Playbook"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? (
              <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin dark:border-blue-400 dark:border-t-transparent" />
            ) : (
              <Save className={`h-4 w-4 ${saveStatus === 'success' ? 'text-green-700 dark:text-green-400' :
                saveStatus === 'error' ? 'text-red-700 dark:text-red-400' : ''
                }`} />
            )}
            <span className="sr-only">Save</span>
          </SecondaryButton>

          {/* 2. Load Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SecondaryButton
                className="h-9 w-9 p-0 rounded-full"
                title="Load Saved Playbooks"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="sr-only">Load</span>
              </SecondaryButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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

          {/* 3. Examples Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SecondaryButton
                className="h-9 w-9 p-0 rounded-full"
                title="Example Playbooks"
              >
                <BookOpen className="h-4 w-4" />
                <span className="sr-only">Examples</span>
              </SecondaryButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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

          {/* 4. Share Button */}
          <SecondaryButton
            onClick={handleSharePlaybook}
            className="h-9 w-9 p-0 rounded-full"
            title="Share Playbook"
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </SecondaryButton>

          {/* 5. Download Button */}
          <SecondaryButton
            onClick={handleExportPlaybook}
            className="h-9 w-9 p-0 rounded-full"
            title="Export Playbook"
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Export</span>
          </SecondaryButton>

          {/* 6. Upload Button */}
          <SecondaryButton
            onClick={handleImportClick}
            className="h-9 w-9 p-0 rounded-full"
            title="Import Playbook"
          >
            <Upload className="h-4 w-4" />
            <span className="sr-only">Import</span>
          </SecondaryButton>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportPlaybook}
          accept=".md"
          className="hidden"
        />
      </div>

      {/* Always show the editor now, removed the conditional rendering based on activeTab */}
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
              <SecondaryButton
                onClick={() => setShowShareModal(false)}
              >
                Close
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 