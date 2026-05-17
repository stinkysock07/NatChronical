import './globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import AppShell from './AppShell';

export const cormorant = localFont({
  src: '../fonts/Cormorant/Cormorant-VariableFont_wght.ttf',
  variable: '--font-cormorant',
});

export const sourceSans = localFont({
  src: '../fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf',
  variable: '--font-source-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.natchronicle.com'),
  title: {
    default: 'The National Chronicle',
    template: '%s | The National Chronicle',
  },
  description: 'View the latest news and articles from The National Chronicle',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://www.natchronicle.com',
    title: 'The National Chronicle',
    description: 'View the latest news and articles from The National Chronicle',
    siteName: 'The National Chronicle',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${sourceSans.variable} antialiased`}>
        <AppShell cormorantClassName={cormorant.className}>{children}</AppShell>
      </body>
    </html>
  );
}