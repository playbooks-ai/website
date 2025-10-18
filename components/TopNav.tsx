'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useMouseDistanceOpacity } from '@/lib/useMouseDistanceOpacity';

interface TopNavProps {
    currentPage: 'home' | 'blog';
}

export default function TopNav({ currentPage }: TopNavProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const opacity = useMouseDistanceOpacity(navRef, { d1: 200, d2: 300 });

    return (
        <div
            ref={navRef}
            style={{ opacity }}
            className="fixed top-0 right-0 z-50 bg-white bg-opacity-50 px-8 py-2 w-full transition-opacity duration-500 ease-out backdrop-blur-md"
        >
            <nav className="flex justify-end items-center space-x-8 font-light">
                {currentPage === 'home' ? (
                    <span className="text-black font-medium">Home</span>
                ) : (
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-black transition-colors duration-200"
                    >
                        Home
                    </Link>
                )}
                {currentPage === 'blog' ? (
                    <Link
                        href="/blog"
                        className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
                    >
                        Blog
                    </Link>
                ) : (
                    <Link
                        href="/blog"
                        className="text-gray-500 font-light hover:text-black transition-colors duration-200"
                    >
                        Blog
                    </Link>
                )}
            </nav>
        </div>
    );
}
