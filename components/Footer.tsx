'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

// GitHub icon component using Simple Icons
const GitHubIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

export default function Footer() {
    return (
        <div className="border-t border-gray-700 pt-16 mt-16">
            <div className="max-w-6xl mx-auto px-8">
                {/* Quick Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Getting Started */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-6">Getting Started</h3>
                        <div className="space-y-3">
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/"
                                className="block text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Documentation
                            </Link>
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/getting-started/"
                                className="block text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Getting Started
                            </Link>
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/tutorials/"
                                className="block text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Tutorial
                            </Link>
                        </div>
                    </div>

                    {/* Core Concepts */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-6">Links</h3>
                        <div className="space-y-3">
                            <Link
                                href="https://github.com/playbooks-ai/playbooks"
                                className="block text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                GitHub Repository
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Blog
                            </Link>{' '}
                        </div>
                    </div>

                    {/* Advanced */}
                    {/* <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-6">Advanced</h3>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © 2025 Playbooks AI. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link
                            href="https://github.com/playbooks-ai/playbooks"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <GitHubIcon className="w-6 h-6" />
                        </Link>
                        <a
                            href="mailto:contact@runplaybooks.com"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
