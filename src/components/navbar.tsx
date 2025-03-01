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
            href="/about"
            className={`transition-colors hover:text-foreground/80 ${isActive('/about') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
          <Link href="https://github.com/yourusername/playbooks" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 