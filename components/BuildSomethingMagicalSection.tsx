'use client';

import Link from 'next/link';

interface BuildSomethingMagicalSectionProps {
    onContactClick: () => void;
}

export default function BuildSomethingMagicalSection({
    onContactClick,
}: BuildSomethingMagicalSectionProps) {
    return (
        <section
            id="build-something-magical"
            className="min-h-screen md:h-screen flex flex-col justify-between relative bg-gray-900 text-white md:snap-start py-20"
        >
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-6xl mx-auto px-8 text-center">
                    <div className="space-y-8">
                        <div className="text-sm font-mono text-gray-400 mb-4">
                            Welcome to Software 3.0!
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-none">
                            <span className="block text-slate-300">
                                Let&apos;s build something magical
                            </span>
                            <span className="block text-slate-300 relative">
                                with <span className="text-blue-400">Playbooks AI</span>
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                            </span>
                        </h1>

                        <div className="text-base text-gray-500 mt-12">
                            <a href="https://www.linkedin.com/in/amol-kelkar/">
                                Amol Kelkar (Founder, Playbooks AI)
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/getting-started/"
                                className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                            >
                                Get Started Now
                            </Link>
                            <button
                                onClick={onContactClick}
                                className="px-8 py-4 border border-gray-600 text-gray-300 rounded-full text-lg font-medium hover:border-white hover:text-white transition-all duration-300"
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
