'use client';

import { ShieldCheck, Telescope, ArrowLeftRight, Users } from 'lucide-react';
import ShadowBox from './ShadowBox';

interface EnterpriseSectionProps {
    onContactClick: () => void;
}

export default function EnterpriseSection({ onContactClick }: EnterpriseSectionProps) {
    return (
        <section
            id="enterprise"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
        >
            <div className="max-w-5xl mx-auto px-8">
                <div className="text-center mb-16">
                    <div className="text-sm font-mono text-gray-500 mb-4">Commercial License</div>
                    <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                        Enterprise
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Enterprise-grade multi-agent system with compliance, security, scalability,
                        and observability.
                    </p>
                </div>

                <div className="space-y-8">
                    <ShadowBox className="py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <ShieldCheck className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Security & Scalability
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        On-premise deployment and SLM-based execution
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <Telescope className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Full Observability
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        LangFuse compatible, audit trails, and execution tracing
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <ArrowLeftRight className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Framework Integration
                                    </div>
                                    <span className="text-gray-600 text-base">
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
                                    <button
                                        onClick={onContactClick}
                                        className="px-6 py-2 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105 inline-block"
                                    >
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ShadowBox>
                </div>
            </div>
        </section>
    );
}
