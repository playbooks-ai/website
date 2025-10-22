import { useEffect } from 'react';

export function useHeadingScrollObserver() {
    useEffect(() => {
        const h2h3h4Headings = Array.from(
            document.querySelectorAll('.blog-content h2, .blog-content h3, .blog-content h4'),
        ) as HTMLElement[];

        if (h2h3h4Headings.length === 0) return;

        // Process h2, h3, h4 headings - generate IDs if they don't have them
        h2h3h4Headings.forEach((heading) => {
            if (!heading.id) {
                const id = heading.textContent
                    ?.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-+|-+$/g, '');
                if (id) heading.id = id;
            }
        });

        // Lucide Share icon SVG
        const shareIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`;

        // Create anchor links for each heading
        h2h3h4Headings.forEach((heading) => {
            if (heading.id) {
                const anchor = document.createElement('a');
                anchor.href = `#${heading.id}`;
                anchor.className = 'heading-anchor';
                anchor.setAttribute('aria-label', `Link to ${heading.textContent}`);
                anchor.innerHTML = shareIconSvg;

                heading.insertBefore(anchor, heading.firstChild);
            }
        });

        let currentHeading: string | null = null;
        let lastScrollY = 0;
        let scrollDirection: 'up' | 'down' = 'down';

        const updateHeadingHash = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction
            if (currentScrollY > lastScrollY) {
                scrollDirection = 'down';
            } else if (currentScrollY < lastScrollY) {
                scrollDirection = 'up';
            }
            lastScrollY = currentScrollY;

            // Clear hash if at top of page
            if (currentScrollY <= 0) {
                if (currentHeading !== null) {
                    currentHeading = null;
                    window.history.replaceState(null, '', window.location.pathname);
                }
                return;
            }

            // Check all headings to find which one to track
            let targetHeading: HTMLElement | null = null;
            let targetOffset = scrollDirection === 'down' ? -Infinity : Infinity;

            h2h3h4Headings.forEach((heading) => {
                const rect = heading.getBoundingClientRect();
                // Check if heading is visible or near the viewport
                if (rect.top >= -200 && rect.top < window.innerHeight) {
                    if (scrollDirection === 'down') {
                        // When scrolling down, pick the heading closest to bottom of viewport
                        if (rect.top > targetOffset) {
                            targetOffset = rect.top;
                            targetHeading = heading;
                        }
                    } else {
                        // When scrolling up, pick the heading closest to top of viewport
                        if (rect.top < targetOffset) {
                            targetOffset = rect.top;
                            targetHeading = heading;
                        }
                    }
                }
            });

            if (targetHeading) {
                // Update hash for h2/h3/h4
                const headingId = (targetHeading as HTMLElement).id;
                if (headingId && headingId !== currentHeading) {
                    currentHeading = headingId;
                    window.history.replaceState(null, '', `#${headingId}`);
                }
            }
        };

        window.addEventListener('scroll', updateHeadingHash, { passive: true });

        // Initial call
        updateHeadingHash();

        return () => {
            window.removeEventListener('scroll', updateHeadingHash);
        };
    }, []);
}
