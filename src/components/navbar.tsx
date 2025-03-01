"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Playbooks</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/"
            className={`transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Home
          </Link>
          <Link
            href="/playground"
            className={`transition-colors hover:text-foreground/80 ${isActive('/playground') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Playground
          </Link>
          <Link
            href="/docs"
            className={`transition-colors hover:text-foreground/80 ${isActive('/docs') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Docs
          </Link>
          <Link
            href="/trace-viewer"
            className={`transition-colors hover:text-foreground/80 ${isActive('/trace-viewer') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Trace Viewer
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/yourusername/playbooks" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 