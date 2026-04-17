import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Connect - One Platform. Every Opportunity.',
  description:
    'Student Connect is a trusted, all-in-one college ecosystem platform designed to bridge the gap between students, colleges, and the wider academic community.',
  keywords: [
    'student connect',
    'college clubs',
    'events',
    'mentorship',
    'hackathons',
    'internships',
    'student community',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
