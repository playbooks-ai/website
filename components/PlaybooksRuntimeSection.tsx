'use client';

import { Layers, Users, Brain, Zap } from 'lucide-react';
import ShadowBox from './ShadowBox';

export default function PlaybooksRuntimeSection() {
    return (
        <section
            id="runtime"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
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
                    <ShadowBox className="py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <Layers className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Unified Call Stack
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        English and Python playbooks can call each other on the same
                                        stack and share program state seamlessly.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <Users className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Natively Multi-Agent
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Built-in support for multi-agent interactions like having
                                        multi-party meetings and collaborative sessions.
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
                                    <span className="text-gray-600 text-base">
                                        Scratchpad for short-term memory, artifacts for long-term
                                        memory, and stack-based automated LLM context management.
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
                                    <span className="text-gray-600 text-base">
                                        Event-driven execution based on semantic conditions and
                                        intelligent context switching.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ShadowBox>
                </div>
            </div>
        </section>
    );
}
