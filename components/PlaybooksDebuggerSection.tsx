'use client';

import Image from 'next/image';
import ShadowBox from './ShadowBox';

export default function PlaybooksDebuggerSection() {
    return (
        <section
            id="debugger"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
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
                        VSCode extension to step-debug through your Playbooks programs like
                        traditional code. Use breakpoints, inspect variables and navigate call
                        stack.
                        <div className="mt-8">Finally, you can step-debug through LLM prompts!</div>
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
                            src="/images/playbooks-ai-vscode-debugger.png"
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
