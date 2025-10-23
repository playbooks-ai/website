'use client';

import ShadowBox from './ShadowBox';

export default function VideoIntroSection() {
    return (
        <section
            id="video-intro"
            className="min-h-screen md:h-screen flex items-center justify-center relative md:snap-start py-20"
        >
            <div className="max-w-3xl mx-auto px-8 w-full">
                <div className="text-center mb-12">
                    <div className="text-sm font-mono text-gray-500 mb-4">
                        3-minute Introduction to Playbooks AI
                    </div>
                </div>
                <div className="space-y-8 w-full">
                    <ShadowBox style={{ padding: 0, border: 0 }} enableTilt={false}>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                                src="https://www.youtube.com/embed/ZX2L453km6s"
                                title="Playbooks AI Introduction"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </ShadowBox>
                </div>
            </div>
        </section>
    );
}
