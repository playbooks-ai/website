'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    Shield,
    Lock,
    Zap,
    Brain,
    Users,
    RefreshCw,
    BarChart3,
    Play,
    Github,
    Mail,
    Binary,
    Sparkles,
} from 'lucide-react';

export default function Page() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isSnapEnabled, setIsSnapEnabled] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const checkWindowHeight = () => {
            setIsSnapEnabled(window.innerHeight >= 700);
        };

        // Check on mount
        checkWindowHeight();

        // Check on resize
        window.addEventListener('resize', checkWindowHeight);

        return () => {
            window.removeEventListener('resize', checkWindowHeight);
        };
    }, []);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const sections = [
                'hero',
                'language',
                'runtime',
                'pbasm',
                'debugger',
                'playbookslm',
                'enterprise',
                'build-something-magical',
            ];

            // Get the scroll container - it's either the main div (when snap is enabled) or window
            const scrollContainer = isSnapEnabled ? (e.currentTarget as HTMLElement) : window;
            const scrollTop =
                scrollContainer === window
                    ? window.scrollY
                    : (scrollContainer as HTMLElement).scrollTop;
            const scrollPosition = scrollTop + 100; // Offset for better detection

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    if (section.offsetTop <= scrollPosition) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        // Find the scroll container
        const mainDiv = document.querySelector('[data-oid="gfjzy82"]') as HTMLElement;
        const scrollTarget = isSnapEnabled && mainDiv ? mainDiv : window;

        scrollTarget.addEventListener('scroll', handleScroll as any);
        handleScroll({ currentTarget: scrollTarget } as any); // Check initial position

        return () => {
            scrollTarget.removeEventListener('scroll', handleScroll as any);
        };
    }, [isSnapEnabled]);
    return (
        <div
            className={`bg-white text-black relative overflow-x-hidden scroll-smooth pl-20 ${
                isSnapEnabled ? 'md:snap-y md:snap-mandatory h-screen overflow-y-scroll' : ''
            }`}
            style={{ scrollPaddingTop: '20px' }}
        >
            {/* Subtle Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50" />

                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                    }}
                />
            </div>

            {/* Left Sidebar Navigation */}
            <nav className="fixed left-0 top-0 h-full w-20 z-50 backdrop-blur-xl bg-white/90 border-r border-gray-100 flex flex-col items-center py-6">
                {/* Logo */}
                <a
                    className="w-10 h-10 flex items-center justify-center group cursor-pointer mb-8 hover:scale-110 transition-transform duration-300"
                    href="#hero"
                >
                    <Image
                        src="/images/playbooks-only-logo.png"
                        alt="Playbooks AI Logo"
                        width={554}
                        height={431}
                        className=""
                    />
                </a>

                {/* Navigation Icons */}
                <div className="flex flex-col space-y-4 mb-auto">
                    <a
                        href="#language"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'language'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Language"
                    >
                        Aa
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Language
                        </span>
                    </a>
                    <a
                        href="#runtime"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'runtime'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Runtime"
                    >
                        <Play className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Runtime
                        </span>
                    </a>
                    <a
                        href="#pbasm"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'pbasm'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Assembly Language and Compiler"
                    >
                        <Binary className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Assembly Language and Compiler
                        </span>
                    </a>
                    <a
                        href="#debugger"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'debugger'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Debugger"
                    >
                        <Zap className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Debugger
                        </span>
                    </a>
                    <a
                        href="#playbookslm"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'playbookslm'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="PlaybooksLM"
                    >
                        <Brain className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            PlaybooksLM
                        </span>
                    </a>
                    <a
                        href="#enterprise"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'enterprise'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Enterprise"
                    >
                        <Shield className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Enterprise
                        </span>
                    </a>
                    <a
                        href="#build-something-magical"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'build-something-magical'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Build Something Magical"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Build Something Magical
                        </span>
                    </a>
                </div>

                {/* Bottom Action Icons */}
                <div className="flex flex-col space-y-3">
                    <a
                        href="mailto:contact@runplaybooks.com"
                        className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                        title="Contact"
                    >
                        <Mail className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Contact
                        </span>
                    </a>
                    <Link
                        href="https://github.com/playbooks-ai/playbooks"
                        className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                        title="GitHub"
                    >
                        <Github className="w-5 h-5" />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            GitHub
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="hero"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''}`}
            >
                <div className="max-w-6xl mx-auto px-8 text-center">
                    <div className="space-y-8">
                        <div className="text-sm font-mono text-gray-500 mb-4">
                            Playbooks AI<br></br>Welcome to software 3.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
                            <span className="block text-gray-300">LLM is the new CPU.</span>
                            <span className="block text-gray-400 relative">
                                Program AI Agents
                            </span>
                            <span className="block text-black relative">
                                in English.
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            </span>
                        </h1>

                        <div className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light">
                            <div>
                                Step-debug through LLM prompts!
                                Build reliable multi-agent systems combining English and Python code on the same call stack, and deploy with full observability, reliability and security.
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/get-started/quickstart/"
                                className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                            >
                                Start in 3 Minutes
                            </Link>
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/"
                                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full text-lg font-medium hover:border-black hover:text-black transition-all duration-300 inline-block"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Language Section */}
            <section
                id="language"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-5xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="text-sm font-mono text-gray-500 mb-4">Open Standard</div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            Playbooks Language
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Plain English, with a hint of markdown. No complex syntax to learn.
                            <br></br> If you can write instructions for a human, you can write a
                            Playbooks program.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="flex space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full" />

                                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />

                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                </div>
                                <span className="ml-6 text-gray-400 text-sm font-mono">
                                    customer_support.pb
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-example-program.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Runtime Section */}
            <section
                id="runtime"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-5xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="text-sm font-mono text-gray-500 mb-4">
                            Open Source (MIT License)
                        </div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            Playbooks Runtime
                        </h2>
                        <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Execute Playbooks programs to get multi-agent systems.
                            <div className="mt-8">
                                <code className="bg-gray-100 px-6 py-2 rounded-lg mt-8">
                                    pip install playbooks
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <RefreshCw className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Unified Call Stack
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            English and Python playbooks can call each other on the
                                            same stack and share program state seamlessly.
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Users className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Multi-Agent Meetings
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Built-in support for multi-agent interactions like
                                            having multi-party meetings and collaborative sessions.
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Brain className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Memory Layers
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Scratchpad for short-term memory, artifacts for
                                            long-term memory, and stack-based automated LLM context
                                            management.
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Zap className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Semantic Triggers
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Event-driven execution based on semantic conditions and
                                            intelligent context switching.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Compiler Section */}
            <section
                id="pbasm"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-5xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <div className="text-sm font-mono text-gray-500 mb-4">Open Standard</div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            Playbooks Assembly Language
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A standard that defines how to annotate natural language programs for
                            reliable execution on LLMs. A semantic compiler transforms Playbooks
                            programs into Playbooks Assembly Language.
                        </p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                        <div className="flex items-center">
                            <div className="bg-gray-100 rounded-xl px-6 py-3 font-mono">.pb</div>
                            <div className="flex flex-col items-center relative">
                                <span className="text-sm text-gray-500 absolute top-0 z-10">
                                    Playbooks Compiler
                                </span>
                                <svg
                                    className="h-8 text-gray-400 mt-2"
                                    style={{ width: '12rem' }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 124 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M0 12h128m0 0l-5-5m5 5l-5 5"
                                    />
                                </svg>
                            </div>
                            <div className="bg-gray-100 rounded-xl px-6 py-3 font-mono">.pbasm</div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="flex space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full" />

                                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />

                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                </div>
                                <span className="ml-6 text-gray-400 text-sm font-mono">
                                    customer_support.pbasm
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-example-pbasm.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Debugger Section */}
            <section
                id="debugger"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-4xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="text-sm font-mono text-gray-500 mb-4">
                            Free to install and use
                        </div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            Playbooks Debugger
                        </h2>
                        <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                            VSCode extension that lets you step-debug through your English programs
                            like traditional code. Use breakpoints, inspect variables and navigate
                            call stack.
                            <div className="mt-8">
                                Finally, you can step-debug through LLM prompts!
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="flex space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full" />

                                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />

                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                </div>
                                <span className="ml-6 text-gray-400 text-sm font-mono">
                                    customer_support.pbasm
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-vscode-debugger.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* PlaybooksLM Section */}
            <section
                id="playbookslm"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-5xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="text-sm font-mono text-gray-500 mb-4">
                            Commercial License
                        </div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            PlaybooksLM
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            For Enterprise deployments, instead of using third party frontier models
                            like Claude, use PlaybooksLM hosted within your infrastructure or hosted
                            on Playbooks&nbsp;Cloud&nbsp;(coming soon).
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-4 rounded-2xl p-6 ">
                                    <div className="flex-shrink-0">
                                        <div className="text-5xl font-bold text-gray-800">10x</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Faster Execution
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Token throughput vs Claude Sonnet 4.0
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-6">
                                    <div className="flex-shrink-0">
                                        <div className="text-5xl font-bold text-gray-800">10x</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Lower Costs
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Inference costs vs Claude Sonnet 4.0
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Shield className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Higher Reliability
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            For Playbooks execution
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Lock className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            On-Premise
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Complete deployment control
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Features Section */}
            <section
                id="enterprise"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-5xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="text-sm font-mono text-gray-500 mb-4">
                            Commercial License
                        </div>
                        <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                            Enterprise
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Enterprise-grade multi-agent system with compliance, security,
                            scalability, and observability.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <Lock className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Security & Scalability
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            On-premise deployment and SLM-based execution
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <BarChart3 className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Full Observability
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            LangFuse compatible, audit trails, and execution tracing
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 rounded-2xl p-6">
                                    <div className="flex-shrink-0">
                                        <RefreshCw className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-1">
                                            Framework Integration
                                        </div>
                                        <span className="text-gray-600 text-sm">
                                            Works with LangGraph, Google ADK, Autogen, and MCP
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 rounded-2xl p-6 bg-gradient-to-r to-gray-50 from-gray-100 border border-white">
                                    <div className="flex-shrink-0">
                                        <Users className="w-12 h-12 text-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-2">
                                            Unlock Enterprise Capabilities
                                        </div>
                                        <a
                                            href="mailto:contact@runplaybooks.ai"
                                            className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105 inline-block"
                                        >
                                            Contact Sales
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section
                id="build-something-magical"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative bg-gray-900 text-white ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
            >
                <div className="max-w-6xl mx-auto px-8 text-center ">
                    {/* <h2
            className="text-5xl md:text-6xl font-light tracking-tight mb-8 pb-8 border-b border-gray-700"
            data-oid="0lzc21q"
            >
            Playbooks AI
            </h2> */}

                    {/* <div
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
            data-oid="l6sokt_"
            >
            <p data-oid="b2-j3:e">
            My name is Amol Kelkar and I&apos;m happy and proud to bring Playbooks
            AI to you today. It is released as an open source project with a highly
            permissive MIT license, so you&apos;re free to use it any way you would
            like to.
            </p>
            <p data-oid="o4kg1xa">
            I built Playbooks over the past 2.5 years, first started thinking about
            it during Christmas holidays in 2022. The stack had to be rewritten from
            scratch 4 times as LLM technology evolved, but surprisingly, the
            Playbooks language syntax has stayed mostly unchanged, hinting at the
            timelessness of Natural Language and markdown.
            </p>
            <p data-oid="5:ioz.r">
            Countless late nights and weekends and thousands of experiments later, I
            now feel that we have something that the community will find useful.
            </p>
            </div> */}

                    <div className="max-w-6xl mx-auto px-8 text-center">
                        <div className="space-y-8">
                            <div className="text-sm font-mono text-gray-400 mb-4">
                                Join the revolution
                            </div>
                            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
                                <span className="block text-gray-600">Build something</span>
                                <span className="block text-gray-500">magical with</span>
                                <span className="block text-white relative">
                                    Playbooks!
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                                </span>
                            </h1>

                            <div className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light mt-8"></div>

                            <div className="text-base text-gray-500 mt-8">
                                Amol Kelkar (Founder, Playbooks AI)
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                                <Link
                                    href="https://playbooks-ai.github.io/playbooks-docs/get-started/quickstart/"
                                    className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                                >
                                    Get Started Now
                                </Link>
                                <Link
                                    href="https://github.com/playbooks-ai/playbooks"
                                    className="px-8 py-4 border border-gray-600 text-gray-300 rounded-full text-lg font-medium hover:border-white hover:text-white transition-all duration-300 inline-block"
                                >
                                    View on GitHub
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
