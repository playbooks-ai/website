import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Playbooks AI',
    description:
        "Playbooks AI is the world's first software 3.0 programming language and technology stack where you write the behavior of AI agents using plain English playbooks.",
    metadataBase: new URL('https://03uktc8exzaipqverh9t.onlook.live/'),
    openGraph: {
        title: 'Playbooks AI',
        description:
            "Playbooks AI is the world's first software 3.0 programming language and technology stack where you write the behavior of AI agents using plain English playbooks.",
        url: '03uktc8exzaipqverh9t.onlook.live',
        siteName: 'Playbooks AI',
        images: [
            {
                url: '/images/playbooks-only-logo.png',
                width: 1200,
                height: 630,
                alt: 'Playbooks AI',
            },
        ],

        type: 'website',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="">{children}</body>
        </html>
    );
}
