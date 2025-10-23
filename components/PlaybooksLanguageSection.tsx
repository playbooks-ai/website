'use client';

import Image from 'next/image';
import ShadowBox from './ShadowBox';

export default function PlaybooksLanguageSection() {
    return (
        <section
            id="language"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
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
                    <ShadowBox>
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
