'use client';

import Image from 'next/image';
import ShadowBox from './ShadowBox';

export default function PlaybooksAssemblySection() {
    return (
        <section
            id="pbasm"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
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
                    <ShadowBox>
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
                            className="w-auto h-auto"
                            width={500}
                            height={500}
                        />
                    </ShadowBox>
                </div>
            </div>
        </section>
    );
}
