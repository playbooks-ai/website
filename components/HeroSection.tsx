'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
    onContactClick: () => void;
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start"
        >
            <div className="max-w-6xl mx-auto px-8 text-center">
                <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src="/images/playbooks-ai-logo.svg"
                            alt="Playbooks AI Logo"
                            width={172}
                            height={172}
                        />
                    </div>

                    <div className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light">
                        <div>
                            Build multi‑agent AI systems
                            <br />
                            with the world&apos;s first Software 3.0 stack
                            <br />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link
                            href="https://playbooks-ai.github.io/playbooks-docs/getting-started/"
                            className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                        >
                            Get Started in 10 Mins
                        </Link>
                        <button
                            onClick={onContactClick}
                            className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full text-lg font-medium hover:border-black hover:text-black transition-all duration-300"
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
