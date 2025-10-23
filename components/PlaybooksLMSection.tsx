'use client';

import { ShieldCheck, Warehouse } from 'lucide-react';
import ShadowBox from './ShadowBox';

export default function PlaybooksLMSection() {
    return (
        <section
            id="playbookslm"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
        >
            <div className="max-w-5xl mx-auto px-8">
                <div className="text-center mb-16">
                    <div className="text-sm font-mono text-gray-500 mb-4">Commercial License</div>
                    <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                        PlaybooksLM
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        For Enterprise deployments, instead of using third party frontier models
                        like Claude, use PlaybooksLM hosted within your infrastructure or hosted on
                        Playbooks&nbsp;Cloud&nbsp;(coming soon).
                    </p>
                </div>

                <div className="space-y-8">
                    <ShadowBox className="py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4 rounded-2xl p-6 ">
                                <div className="flex-shrink-0">
                                    <div className="text-5xl font-bold text-gray-800">10x</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Faster Execution
                                    </div>
                                    <span className="text-gray-600 text-base">
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
                                    <span className="text-gray-600 text-base">
                                        Inference costs vs Claude Sonnet 4.0
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <ShieldCheck className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        Higher Reliability
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        For Playbooks execution
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-2xl p-6">
                                <div className="flex-shrink-0">
                                    <Warehouse className="w-12 h-12 text-gray-800" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        On-Premise
                                    </div>
                                    <span className="text-gray-600 text-base">
                                        Complete deployment control
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
