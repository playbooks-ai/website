'use client';

import { Layers, ArrowDownNarrowWide, DatabaseZap, BetweenHorizontalEnd } from 'lucide-react';
import ShadowBox from './ShadowBox';

export default function ContextEngineeringSection() {
    return (
        <section
            id="context-engineering"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
        >
            <div className="max-w-5xl mx-auto px-8">
                <div className="text-center mb-16">
                    <div className="text-sm font-mono text-gray-500 mb-4">Open Source</div>
                    <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                        Context Engineering
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Playbooks runtime offers advanced context engineering capabilities to
                        optimize LLM interactions and manage complex workflows efficiently.
                    </p>
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
                                        Stack-based Context Management
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Automatic context management that follows your
                                        program&apos;s call stack, ensuring optimal context for each
                                        execution level.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <ArrowDownNarrowWide className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Incremental Compaction
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Built-in context compaction without extra LLM calls, keeping
                                        essential information while reducing token usage.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <DatabaseZap className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        LLM Caching Optimization
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Built-in optimization for LLM caching to reduce costs and
                                        improve performance through intelligent context reuse.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <BetweenHorizontalEnd className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Context Augmentation
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Easy-to-use techniques for adding file content, retrieval
                                        results, or outputs from other playbooks directly into
                                        context.
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
