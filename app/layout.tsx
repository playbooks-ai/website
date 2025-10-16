import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Serif_4 } from 'next/font/google';
import './globals.css';

const sourceSerifPro = Source_Serif_4({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-source-serif-pro',
});

export const metadata: Metadata = {
    title: 'Playbooks AI',
    description:
        "Playbooks AI is the world's first software 3.0 programming language and technology stack where you write the behavior of AI agents using plain English playbooks.",
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
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={sourceSerifPro.variable}>
            <head>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-6Z71TBR6KW"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-6Z71TBR6KW');
                `}
                </Script>
            </head>
            <body className="font-sans">{children}</body>
        </html>
    );
}
