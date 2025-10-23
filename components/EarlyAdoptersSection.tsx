'use client';

import Image from 'next/image';
import ShadowBox from './ShadowBox';

export default function EarlyAdoptersSection() {
    return (
        <section
            id="early-adopters"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
        >
            <div className="max-w-5xl mx-auto px-8">
                <div className="text-center mb-16">
                    <div className="text-sm font-mono text-gray-500 mb-4">Early Adopters</div>
                    <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                        Building with Playbooks
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Forward-thinking companies are exploring Playbooks for their AI agent
                        systems
                    </p>
                </div>

                <div className="space-y-8">
                    <ShadowBox className="p-12">
                        <div className="max-w-xl md:max-w-xl lg:max-w-3xl mx-auto">
                            {/* Company Logo/Name */}
                            <div className="text-center mb-8">
                                <Image
                                    src="/images/odystra-logo.png"
                                    alt="ODYSTRA"
                                    width={300}
                                    height={80}
                                    className="mx-auto"
                                />
                            </div>

                            {/* Mission Statement */}
                            <div className="rounded-2xl p-0 md:p-8 mb-8">
                                <p className="text-lg text-gray-700 text-center leading-relaxed  max-w-4xl">
                                    ODYSTRA is using Playbooks to build the core intelligence fabric
                                    for high-value, high-trust knowledge work across business
                                    domains - transforming static enterprise information into
                                    dynamic, collaborative, and autonomous processes.
                                </p>
                            </div>

                            {/* Website Link */}
                            <div className="mt-8 text-center">
                                <a
                                    href="https://odystra.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-black transition-colors duration-200"
                                >
                                    odystra.com →
                                </a>
                            </div>
                        </div>
                    </ShadowBox>
                </div>
            </div>
        </section>
    );
}
