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
            data-oid="5mb824q"
        >
            {/* Subtle Background Elements */}
            <div className="fixed inset-0 pointer-events-none" data-oid="a0-1cl4">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50"
                    data-oid="t5:iqn-"
                />

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
                    data-oid="ja2l3vh"
                />
            </div>

            {/* Left Sidebar Navigation */}
            <nav
                className="fixed left-0 top-0 h-full w-20 z-50 backdrop-blur-xl bg-white/90 border-r border-gray-100 flex flex-col items-center py-6"
                data-oid="b32ft9p"
            >
                {/* Logo */}
                <a
                    className="w-10 h-10 flex items-center justify-center group cursor-pointer mb-8 hover:scale-110 transition-transform duration-300"
                    href="#hero"
                    data-oid="ejksmhj"
                >
                    <Image
                        src="/images/playbooks-only-logo.png"
                        alt="Playbooks AI Logo"
                        width={554}
                        height={431}
                        className=""
                        data-oid="sh.a96t"
                    />
                </a>

                {/* Navigation Icons */}
                <div className="flex flex-col space-y-4 mb-auto" data-oid="pcut5ao">
                    <a
                        href="#language"
                        className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                            activeSection === 'language'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                        title="Language"
                        data-oid="j179e:g"
                    >
                        Aa
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="fawx9gn"
                        >
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
                        data-oid="w8.bpd1"
                    >
                        <Play className="w-5 h-5" data-oid="ad:zueo" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid=":ywn9xy"
                        >
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
                        data-oid="7h:rl6k"
                    >
                        <Binary className="w-5 h-5" data-oid="trwxz8o" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="3istbj3"
                        >
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
                        data-oid="x56pg_2"
                    >
                        <Zap className="w-5 h-5" data-oid="jk8x90d" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="9bj2ja9"
                        >
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
                        data-oid="n5v8utg"
                    >
                        <Brain className="w-5 h-5" data-oid="-5je6fo" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="obp90z6"
                        >
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
                        data-oid="sr:hcbm"
                    >
                        <Shield className="w-5 h-5" data-oid="_7-82n." />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="q:3v6q1"
                        >
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
                        data-oid="4l3h.cg"
                    >
                        <Sparkles className="w-5 h-5" data-oid="58zpp:d" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="daiw._w"
                        >
                            Build Something Magical
                        </span>
                    </a>
                </div>

                {/* Bottom Action Icons */}
                <div className="flex flex-col space-y-3" data-oid="86e6eus">
                    <a
                        href="mailto:contact@runplaybooks.com"
                        className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                        title="Contact"
                        data-oid="9rdd:ff"
                    >
                        <Mail className="w-5 h-5" data-oid="l_fc20b" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid="n5-up4u"
                        >
                            Contact
                        </span>
                    </a>
                    <Link
                        href="https://github.com/playbooks-ai/playbooks"
                        className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                        title="GitHub"
                        data-oid="iylwi6s"
                    >
                        <Github className="w-5 h-5" data-oid="68gtvp7" />
                        <span
                            className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            data-oid=":gklz9a"
                        >
                            GitHub
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="hero"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''}`}
                data-oid="rtx.ei3"
            >
                <div className="max-w-6xl mx-auto px-8 text-center" data-oid="vz14ktx">
                    <div className="space-y-8" data-oid="sskd44f">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="jnz9ltn">
                            Playbooks AI: Welcome to software 3.0
                        </div>
                        <h1
                            className="text-5xl md:text-7xl font-light tracking-tighter leading-none"
                            data-oid="lc:xzmk"
                        >
                            <span className="block text-gray-300" data-oid="i9kexo6">
                                Build AI agents with
                            </span>
                            <span className="block text-gray-400 relative" data-oid="o-pekcy">
                                your playbooks
                            </span>
                            <span className="block text-black relative" data-oid="k3vqfwi">
                                in plain English
                                <div
                                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    data-oid="_pxgai4"
                                />
                            </span>
                        </h1>

                        <div
                            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light"
                            data-oid="3n4:wmt"
                        >
                            <div data-oid="l770lrz">
                                With LLMs as your CPU, orchestrate complex multi-agent systems with
                                the simplicity of natural language.
                            </div>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                            data-oid="5_q_k8n"
                        >
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/get-started/quickstart/"
                                className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                                data-oid="jo7rl8u"
                            >
                                Start in 3 Minutes
                            </Link>
                            <Link
                                href="https://playbooks-ai.github.io/playbooks-docs/"
                                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full text-lg font-medium hover:border-black hover:text-black transition-all duration-300 inline-block"
                                data-oid="mm.xvhl"
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
                data-oid="1cc1geb"
            >
                <div className="max-w-5xl mx-auto px-8" data-oid="i13.he_">
                    <div className="text-center mb-16" data-oid="9882kj9">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="m1x_pib">
                            Open Standard
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="-0_9z-h"
                        >
                            Playbooks Language
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="uk-4za:">
                            Plain English, with a hint of markdown. No complex syntax to learn.
                            <br data-oid="3-ni3ti"></br> If you can write instructions for a human,
                            you can write a Playbooks program.
                        </p>
                    </div>
                    <div className="space-y-8" data-oid="uxww853">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid="c5gyt6y"
                        >
                            <div className="flex items-center mb-6" data-oid="h92g5t.">
                                <div className="flex space-x-3" data-oid=":vcgsaa">
                                    <div
                                        className="w-3 h-3 bg-red-400 rounded-full"
                                        data-oid="_xarnam"
                                    />

                                    <div
                                        className="w-3 h-3 bg-yellow-400 rounded-full"
                                        data-oid="sc2h4i8"
                                    />

                                    <div
                                        className="w-3 h-3 bg-green-400 rounded-full"
                                        data-oid="ivvt5no"
                                    />
                                </div>
                                <span
                                    className="ml-6 text-gray-400 text-sm font-mono"
                                    data-oid="wt4fd0d"
                                >
                                    customer_support.pb
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-example-program.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                                data-oid="i.n:_:w"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Runtime Section */}
            <section
                id="runtime"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
                data-oid="b:qp79b"
            >
                <div className="max-w-5xl mx-auto px-8" data-oid="ppawvhm">
                    <div className="text-center mb-16" data-oid="k40k_gp">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="ul65d_l">
                            Open Source (MIT License)
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="a3lsuvc"
                        >
                            Playbooks Runtime
                        </h2>
                        <div className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="xghics:">
                            Execute Playbooks programs to get multi-agent systems.
                            <div className="mt-8" data-oid="q1d2d3a">
                                <code
                                    className="bg-gray-100 px-6 py-2 rounded-lg mt-8"
                                    data-oid="5gcisg1"
                                >
                                    pip install playbooks
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8" data-oid="j_9kz1:">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid="d0v19m."
                        >
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                data-oid="0uzqmjt"
                            >
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="cnm.f6k"
                                >
                                    <div className="flex-shrink-0" data-oid="1.pwybb">
                                        <RefreshCw
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="x8odyne"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="0v55fnh">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="lxvu53p"
                                        >
                                            Unified Call Stack
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="xhz3lr6">
                                            English and Python playbooks can call each other on the
                                            same stack and share program state seamlessly.
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="11xipwg"
                                >
                                    <div className="flex-shrink-0" data-oid="9cj8bjg">
                                        <Users
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="4a50eg0"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="aeexjcw">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="digr61u"
                                        >
                                            Multi-Agent Meetings
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid=".-ei2gd">
                                            Built-in support for multi-agent interactions like
                                            having multi-party meetings and collaborative sessions.
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="zi7dvtg"
                                >
                                    <div className="flex-shrink-0" data-oid="u_fpdl:">
                                        <Brain
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="5_o6grb"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="am93c1e">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="8dyuaum"
                                        >
                                            Memory Layers
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="1e2hku_">
                                            Scratchpad for short-term memory, artifacts for
                                            long-term memory, and stack-based automated LLM context
                                            management.
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="3.vtymn"
                                >
                                    <div className="flex-shrink-0" data-oid="ivhk_2w">
                                        <Zap
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="tgf5g0z"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="3ahump3">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="6._l4gl"
                                        >
                                            Semantic Triggers
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="to83fup">
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
                data-oid="vdb7f0a"
            >
                <div className="max-w-5xl mx-auto px-8" data-oid=":3b28w2">
                    <div className="text-center mb-12" data-oid="z:au:t1">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="ds.t3h3">
                            Open Standard
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="3yhnp0e"
                        >
                            Playbooks Assembly Language
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="fhipswy">
                            A standard that defines how to annotate natural language programs for
                            reliable execution on LLMs. A semantic compiler transforms Playbooks
                            programs into Playbooks Assembly Language.
                        </p>
                    </div>
                    <div className="flex items-center justify-center mb-2" data-oid="5_cwt4k">
                        <div className="flex items-center" data-oid="vl6av0s">
                            <div
                                className="bg-gray-100 rounded-xl px-6 py-3 font-mono"
                                data-oid="8ed9arx"
                            >
                                .pb
                            </div>
                            <div className="flex flex-col items-center relative" data-oid="welqitk">
                                <span
                                    className="text-sm text-gray-500 absolute top-0 z-10"
                                    data-oid="0xz_jbn"
                                >
                                    Playbooks Compiler
                                </span>
                                <svg
                                    className="h-8 text-gray-400 mt-2"
                                    style={{ width: '12rem' }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 124 24"
                                    data-oid="jws8ggk"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M0 12h128m0 0l-5-5m5 5l-5 5"
                                        data-oid="2swen--"
                                    />
                                </svg>
                            </div>
                            <div
                                className="bg-gray-100 rounded-xl px-6 py-3 font-mono"
                                data-oid="uqf:bzm"
                            >
                                .pbasm
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8" data-oid="2:7x7mo">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid=":yqthz5"
                        >
                            <div className="flex items-center mb-6" data-oid=".:_nb_d">
                                <div className="flex space-x-3" data-oid="l20uoes">
                                    <div
                                        className="w-3 h-3 bg-red-400 rounded-full"
                                        data-oid="oob176j"
                                    />

                                    <div
                                        className="w-3 h-3 bg-yellow-400 rounded-full"
                                        data-oid="223p5lj"
                                    />

                                    <div
                                        className="w-3 h-3 bg-green-400 rounded-full"
                                        data-oid="ye:y78x"
                                    />
                                </div>
                                <span
                                    className="ml-6 text-gray-400 text-sm font-mono"
                                    data-oid="tco34_a"
                                >
                                    customer_support.pbasm
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-example-pbasm.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                                data-oid="tl2tlq:"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Playbooks Debugger Section */}
            <section
                id="debugger"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
                data-oid="87efgh8"
            >
                <div className="max-w-4xl mx-auto px-8" data-oid="u2uv3.2">
                    <div className="text-center mb-16" data-oid="3yqp8nj">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="3tuyr6c">
                            Free to install and use
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="gb_seo9"
                        >
                            Playbooks Debugger
                        </h2>
                        <div className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="1l4v5ow">
                            VSCode extension that lets you step-debug through your English programs
                            like traditional code. Use breakpoints, inspect variables and navigate
                            call stack.
                            <div className="mt-8" data-oid="uinq:ho">
                                Finally, you can step-debug through LLM prompts!
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8" data-oid="9y8kst.">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid="mnr2h9g"
                        >
                            <div className="flex items-center mb-6" data-oid="wd3w24c">
                                <div className="flex space-x-3" data-oid="wl8p372">
                                    <div
                                        className="w-3 h-3 bg-red-400 rounded-full"
                                        data-oid="h4wd9o7"
                                    />

                                    <div
                                        className="w-3 h-3 bg-yellow-400 rounded-full"
                                        data-oid="a..w3.a"
                                    />

                                    <div
                                        className="w-3 h-3 bg-green-400 rounded-full"
                                        data-oid="5d8ihmh"
                                    />
                                </div>
                                <span
                                    className="ml-6 text-gray-400 text-sm font-mono"
                                    data-oid="c8j_t9-"
                                >
                                    customer_support.pbasm
                                </span>
                            </div>

                            <Image
                                src="/images/playbooks-ai-vscode-debugger.png"
                                alt="Playbooks Debugger"
                                className="w-full h-auto"
                                width={1000}
                                height={1000}
                                data-oid=".l-3lb_"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* PlaybooksLM Section */}
            <section
                id="playbookslm"
                className={`min-h-screen ${isSnapEnabled ? 'md:h-screen' : ''} flex items-center justify-center relative ${isSnapEnabled ? 'md:snap-start' : ''} py-20`}
                data-oid="8ran-1n"
            >
                <div className="max-w-5xl mx-auto px-8" data-oid="7e8jset">
                    <div className="text-center mb-16" data-oid="brcxfak">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="h:1:p8a">
                            Commercial License
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="r5nvjri"
                        >
                            PlaybooksLM
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="sjug40b">
                            For Enterprise deployments, instead of using third party frontier models
                            like Claude, use PlaybooksLM hosted within your infrastructure or hosted
                            on Playbooks&nbsp;Cloud&nbsp;(coming soon).
                        </p>
                    </div>

                    <div className="space-y-8" data-oid="e:l2gg5">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid="lqclke2"
                        >
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                data-oid="y-a46sn"
                            >
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6 "
                                    data-oid="27j9m6s"
                                >
                                    <div className="flex-shrink-0" data-oid=".uu5e-2">
                                        <div
                                            className="text-5xl font-bold text-gray-800"
                                            data-oid="0692h86"
                                        >
                                            10x
                                        </div>
                                    </div>
                                    <div className="flex-1" data-oid="00g7d:_">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="8al8_5w"
                                        >
                                            Faster Execution
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="sb01w87">
                                            Token throughput vs Claude Sonnet 4.0
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-6" data-oid="kjmtwbt">
                                    <div className="flex-shrink-0" data-oid="3a9.ort">
                                        <div
                                            className="text-5xl font-bold text-gray-800"
                                            data-oid="kx:1oo_"
                                        >
                                            10x
                                        </div>
                                    </div>
                                    <div className="flex-1" data-oid="65gxv15">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="xuoar9d"
                                        >
                                            Lower Costs
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="7sfkar8">
                                            Inference costs vs Claude Sonnet 4.0
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="t17hsx5"
                                >
                                    <div className="flex-shrink-0" data-oid="7or6a3r">
                                        <Shield
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="2k26ejv"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="l74ll-o">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="8i7rc46"
                                        >
                                            Higher Reliability
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="in_hq0k">
                                            For Playbooks execution
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="d::g-g7"
                                >
                                    <div className="flex-shrink-0" data-oid="69kr:7n">
                                        <Lock
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="tx9h5_a"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="ni06409">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="300g5am"
                                        >
                                            On-Premise
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="x-3unwy">
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
                data-oid="4xwqz7i"
            >
                <div className="max-w-5xl mx-auto px-8" data-oid="ydkbysk">
                    <div className="text-center mb-16" data-oid="vxd7fs:">
                        <div className="text-sm font-mono text-gray-500 mb-4" data-oid="q2dhf1y">
                            Commercial License
                        </div>
                        <h2
                            className="text-5xl md:text-6xl font-light tracking-tight mb-6"
                            data-oid="if7s58_"
                        >
                            Enterprise
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-oid="c9sqbzn">
                            Enterprise-grade multi-agent system with compliance, security,
                            scalability, and observability.
                        </p>
                    </div>

                    <div className="space-y-8" data-oid="b3-yba7">
                        <div
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                            data-oid="40p3pfp"
                        >
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                data-oid="0qlehs0"
                            >
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="9rrieyc"
                                >
                                    <div className="flex-shrink-0" data-oid="ebjc_ak">
                                        <Lock
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="y7tthh9"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="rzchl5y">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="mqwv_4d"
                                        >
                                            Security & Scalability
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="5kd1jh8">
                                            On-premise deployment and SLM-based execution
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="wope.ma"
                                >
                                    <div className="flex-shrink-0" data-oid="ygph5ww">
                                        <BarChart3
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="-ogrvt_"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="kice05p">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="7:bp2im"
                                        >
                                            Full Observability
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="ao0am2y">
                                            LangFuse compatible, audit trails, and execution tracing
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6"
                                    data-oid="slp862q"
                                >
                                    <div className="flex-shrink-0" data-oid="82ws9ke">
                                        <RefreshCw
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="2v762.p"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="bvf6lm4">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-1"
                                            data-oid="agifa1j"
                                        >
                                            Framework Integration
                                        </div>
                                        <span className="text-gray-600 text-sm" data-oid="bv94vrf">
                                            Works with LangGraph, Google ADK, Autogen, and MCP
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center space-x-4 rounded-2xl p-6 bg-gradient-to-r to-gray-50 from-gray-100 border border-white"
                                    data-oid="g._fh_g"
                                >
                                    <div className="flex-shrink-0" data-oid="6mu608:">
                                        <Users
                                            className="w-12 h-12 text-gray-800"
                                            data-oid="xn2di4x"
                                        />
                                    </div>
                                    <div className="flex-1" data-oid="yaan8b5">
                                        <div
                                            className="text-lg font-semibold text-gray-800 mb-2"
                                            data-oid="zwns2cy"
                                        >
                                            Unlock Enterprise Capabilities
                                        </div>
                                        <a
                                            href="mailto:contact@runplaybooks.ai"
                                            className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105 inline-block"
                                            data-oid="a3mjjbw"
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
                data-oid="a:cfvx8"
            >
                <div className="max-w-6xl mx-auto px-8 text-center " data-oid="t7-36uk">
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

                    <div className="max-w-6xl mx-auto px-8 text-center" data-oid="8iwhosr">
                        <div className="space-y-8" data-oid=".6893r7">
                            <div
                                className="text-sm font-mono text-gray-400 mb-4"
                                data-oid="ou9sfyk"
                            >
                                Join the revolution
                            </div>
                            <h1
                                className="text-5xl md:text-7xl font-light tracking-tighter leading-none"
                                data-oid="0ode:0m"
                            >
                                <span className="block text-gray-600" data-oid="-fwqab7">
                                    Build something
                                </span>
                                <span className="block text-gray-500" data-oid="-0hvgqy">
                                    magical with
                                </span>
                                <span className="block text-white relative" data-oid="e-y.bzn">
                                    Playbooks!
                                    <div
                                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                                        data-oid="1o.f5xm"
                                    />
                                </span>
                            </h1>

                            <div
                                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light mt-8"
                                data-oid="25ooule"
                            ></div>

                            <div className="text-base text-gray-500 mt-8" data-oid="q28k09r">
                                Amol Kelkar (Founder, Playbooks AI)
                            </div>

                            <div
                                className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                                data-oid="dg1smto"
                            >
                                <Link
                                    href="https://playbooks-ai.github.io/playbooks-docs/get-started/quickstart/"
                                    className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block"
                                    data-oid="sa3_-e1"
                                >
                                    Get Started Now
                                </Link>
                                <Link
                                    href="https://github.com/playbooks-ai/playbooks"
                                    className="px-8 py-4 border border-gray-600 text-gray-300 rounded-full text-lg font-medium hover:border-white hover:text-white transition-all duration-300 inline-block"
                                    data-oid="pkzn4tb"
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
