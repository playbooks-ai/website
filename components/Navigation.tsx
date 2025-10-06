import Link from 'next/link';
import Image from 'next/image';
import {
    Play,
    Mail,
    Brain,
    Sparkles,
    Layers,
    ShieldCheck,
    StepForward,
    FileCog
} from 'lucide-react';
import NavigationIcon from './NavigationIcon';

// GitHub icon component using Simple Icons
const GitHubIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

interface NavigationProps {
    activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
    return (
        <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 z-50 backdrop-blur-xl bg-white/90 border-r border-gray-100 flex-col items-center py-6">
            {/* Logo */}
            <a
                className="w-10 h-10 flex items-center justify-center group cursor-pointer mb-8 hover:scale-110 transition-transform duration-300"
                href="#hero"
            >
                <Image
                    src="/images/playbooks-ai-logo-only.svg"
                    alt="Playbooks AI Logo"
                    width={64}
                    height={64}
                    className=""
                />
            </a>

            {/* Navigation Icons */}
            <div className="flex flex-col space-y-4 mb-auto">
                <a
                    href="#language"
                    className={`p-3 text-lg rounded-lg transition-all duration-200 hover:scale-105 group relative ${
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
                <NavigationIcon
                    href="#runtime"
                    icon={Play}
                    title="Runtime"
                    tooltipText="Runtime"
                    isActive={activeSection === 'runtime'}
                />
                <NavigationIcon
                    href="#pbasm"
                    icon={FileCog}
                    title="Assembly Language and Compiler"
                    tooltipText="Assembly Language and Compiler"
                    isActive={activeSection === 'pbasm'}
                />
                <NavigationIcon
                    href="#debugger"
                    icon={StepForward}
                    title="Debugger"
                    tooltipText="Debugger"
                    isActive={activeSection === 'debugger'}
                />
                <NavigationIcon
                    href="#playbookslm"
                    icon={Brain}
                    title="PlaybooksLM"
                    tooltipText="PlaybooksLM"
                    isActive={activeSection === 'playbookslm'}
                />
                <NavigationIcon
                    href="#enterprise"
                    icon={ShieldCheck}
                    title="Enterprise"
                    tooltipText="Enterprise"
                    isActive={activeSection === 'enterprise'}
                />
                <NavigationIcon
                    href="#context-engineering"
                    icon={Layers}
                    title="Context Engineering"
                    tooltipText="Context Engineering"
                    isActive={activeSection === 'context-engineering'}
                />
                <NavigationIcon
                    href="#build-something-magical"
                    icon={Sparkles}
                    title="Build Something Magical"
                    tooltipText="Build Something Magical"
                    isActive={activeSection === 'build-something-magical'}
                />
            </div>

            {/* Bottom Action Icons */}
            <div className="flex flex-col space-y-3">
                <a
                    href="mailto:contact@runplaybooks.com"
                    className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                    title="Contact"
                >
                    <Mail className="w-6 h-6" />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Contact
                    </span>
                </a>
                <Link
                    href="https://github.com/playbooks-ai/playbooks"
                    className="p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200 hover:scale-105 group relative"
                    title="GitHub"
                >
                    <GitHubIcon className="w-6 h-6" />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        GitHub
                    </span>
                </Link>
            </div>
        </nav>
    );
}
