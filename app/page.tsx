'use client';

import { useState, useEffect } from 'react';
import { siGithub } from 'simple-icons';
import Navigation from '../components/Navigation';
import ContactModal from '../components/ContactModal';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import VideoIntroSection from '../components/VideoIntroSection';
import PlaybooksLanguageSection from '../components/PlaybooksLanguageSection';
import PlaybooksRuntimeSection from '../components/PlaybooksRuntimeSection';
import PlaybooksAssemblySection from '../components/PlaybooksAssemblySection';
import PlaybooksDebuggerSection from '../components/PlaybooksDebuggerSection';
import EarlyAdoptersSection from '../components/EarlyAdoptersSection';
import PlaybooksLMSection from '../components/PlaybooksLMSection';
import EnterpriseSection from '../components/EnterpriseSection';
import ContextEngineeringSection from '../components/ContextEngineeringSection';
import BuildSomethingMagicalSection from '../components/BuildSomethingMagicalSection';

// TypeScript declarations for Google Analytics
declare global {
    interface Window {
        gtag?: (
            command: string,
            targetIdOrEventName: string,
            eventParams?: Record<string, any>,
        ) => void;
        dataLayer?: any[];
    }
}

// GitHub icon component using Simple Icons
const GitHubIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={siGithub.path} />
    </svg>
);

export default function Page() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isSnapEnabled, setIsSnapEnabled] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Track initial anchor/hash navigation
    useEffect(() => {
        // Check if page loaded with a hash
        if (typeof window !== 'undefined' && window.location.hash) {
            const hash = window.location.hash.substring(1); // Remove the # symbol

            // Send as virtual page view to Google Analytics
            if (typeof window.gtag !== 'undefined') {
                window.gtag('event', 'page_view', {
                    page_title: `Playbooks AI - ${hash.charAt(0).toUpperCase() + hash.slice(1).replace(/-/g, ' ')}`,
                    page_location: window.location.href,
                    page_path: `/#${hash}`,
                });
            }
        }

        // Track hash changes (when user clicks anchor links)
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && typeof window.gtag !== 'undefined') {
                window.gtag('event', 'page_view', {
                    page_title: `Playbooks AI - ${hash.charAt(0).toUpperCase() + hash.slice(1).replace(/-/g, ' ')}`,
                    page_location: window.location.href,
                    page_path: `/#${hash}`,
                });
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        const checkWindowHeight = () => {
            setIsSnapEnabled(window.innerHeight >= 700);
        };

        // Check on mount
        checkWindowHeight();

        // Check on resize
        window.addEventListener('resize', checkWindowHeight);

        return () => {
            window.removeEventListener('resize', checkWindowHeight);
        };
    }, []);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const sections = [
                'hero',
                'video-intro',
                'language',
                'runtime',
                'pbasm',
                'debugger',
                'early-adopters',
                'playbookslm',
                'enterprise',
                'context-engineering',
                'build-something-magical',
            ];

            // Get the scroll container - it's either the main div (when snap is enabled) or window
            const scrollContainer = isSnapEnabled ? (e.currentTarget as HTMLElement) : window;
            const scrollTop =
                scrollContainer === window
                    ? window.scrollY
                    : (scrollContainer as HTMLElement).scrollTop;

            // For window scrolling, we need to check what's actually visible in viewport
            // For container scrolling, use the existing logic
            let currentSection = sections[0]; // default to first section

            if (scrollContainer === window) {
                // Simple approach: find the section closest to the top of the viewport
                // that is at least partially visible
                const viewportHeight = window.innerHeight;
                const threshold = viewportHeight * 0.5; // Switch when section reaches middle of screen

                // Start from the end and work backwards to find the last section that's passed the threshold
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = document.getElementById(sections[i]);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        // If section top is above the threshold, this section should be active
                        if (rect.top <= threshold) {
                            currentSection = sections[i];
                            break;
                        }
                    }
                }
            } else {
                // Original logic for snap scrolling
                const scrollPosition = scrollTop + 100;
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = document.getElementById(sections[i]);
                    if (section) {
                        if (section.offsetTop <= scrollPosition) {
                            currentSection = sections[i];
                            break;
                        }
                    }
                }
            }

            // Track section visibility in Google Analytics as virtual page views
            if (currentSection !== activeSection) {
                if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
                    // Update the URL hash without triggering a page jump
                    const newUrl = `${window.location.pathname}#${currentSection}`;
                    window.history.replaceState(null, '', newUrl);

                    // Send as virtual page view event
                    window.gtag('event', 'page_view', {
                        page_title: `Playbooks AI - ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1).replace(/-/g, ' ')}`,
                        page_location: window.location.origin + newUrl,
                        page_path: `/#${currentSection}`,
                    });
                }
                setActiveSection(currentSection);
            }
        };

        // Find the scroll container
        const mainDiv = document.querySelector('[data-scroll-container]') as HTMLElement;
        const scrollTarget = isSnapEnabled && mainDiv ? mainDiv : window;

        scrollTarget.addEventListener('scroll', handleScroll as any);
        handleScroll({ currentTarget: scrollTarget } as any); // Check initial position

        return () => {
            scrollTarget.removeEventListener('scroll', handleScroll as any);
        };
    }, [isSnapEnabled, activeSection]);
    return (
        <div
            data-scroll-container
            className={`bg-white text-black relative overflow-x-hidden scroll-smooth ${
                isSnapEnabled ? 'md:snap-y md:snap-mandatory h-screen overflow-y-scroll' : ''
            }`}
            style={{ scrollPaddingTop: '20px' }}
        >
            {/* Top Navigation */}
            <TopNav currentPage="home" />
            {/* Subtle Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50" />

                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                        willChange: 'transform',
                    }}
                />
            </div>

            <Navigation activeSection={activeSection} />
            <HeroSection onContactClick={() => setIsContactModalOpen(true)} />
            <VideoIntroSection />
            <PlaybooksLanguageSection />
            <PlaybooksRuntimeSection />
            <PlaybooksAssemblySection />
            <PlaybooksDebuggerSection />
            <EarlyAdoptersSection />
            <PlaybooksLMSection />
            <EnterpriseSection onContactClick={() => setIsContactModalOpen(true)} />
            <ContextEngineeringSection />
            <BuildSomethingMagicalSection onContactClick={() => setIsContactModalOpen(true)} />
            <Footer />
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    );
}
