import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Playbooks AI',
  description: "Playbooks AI is the world's first software 3.0 programming language and technology stack where you write the behavior of AI agents using plain English playbooks.",
  openGraph: {
    title: 'Playbooks AI',
    description: "Playbooks AI is the world's first software 3.0 programming language and technology stack where you write the behavior of AI agents using plain English playbooks.",
    url: '03uktc8exzaipqverh9t.onlook.live',
    siteName: 'Playbooks AI',
    images: [{
      url: '/images/playbooks-only-logo.png',
      width: 1200,
      height: 630,
      alt: 'Playbooks AI'
    }],
    type: 'website'
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
            <head>
              {/* Google Fonts - Source Sans Pro */}
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet" />
              
              {/* Google tag (gtag.js) */}
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-6Z71TBR6KW"></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-6Z71TBR6KW');
                  `,
                }}
              />
            </head>
            <body className="font-sans">{children}</body>
        </html>;
}