"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github, Settings, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Playbooks AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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
          <Link href="https://github.com/playbooks-ai/playbooks" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hidden sm:flex">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/playground"
                className={`transition-colors hover:text-foreground/80 ${isActive('/playground') ? 'text-foreground' : 'text-foreground/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Playground
              </Link>
              <Link
                href="/docs"
                className={`transition-colors hover:text-foreground/80 ${isActive('/docs') ? 'text-foreground' : 'text-foreground/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-foreground/80 ${isActive('/about') ? 'text-foreground' : 'text-foreground/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Link>
                <ThemeToggle />
                <Link href="https://github.com/playbooks-ai/playbooks" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 