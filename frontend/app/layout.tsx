'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchArticles, Article } from '../lib/data';

export const cormorant = localFont({
  src: '../fonts/Cormorant/Cormorant-VariableFont_wght.ttf',
  variable: '--font-cormorant',
});

export const sourceSans = localFont({
  src: '../fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf',
  variable: '--font-source-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const getArticles = async () => {
      const data = await fetchArticles();
      if (isMounted) {
        setArticles(data);
        setIsLoading(false);
      }
    };
    getArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The National Chronicle</title>
        <meta
          name="description"
          content="View the latest news and articles from The National Chronicle"
        />
        <meta
          name="keywords"
          content="news, articles, national chronicle, journalism, current events"
        />
        <meta property="og:title" content="The National Chronicle" />
        <meta
          property="og:description"
          content="View the latest news and articles from The National Chronicle"
        />
      </head>
      <body
        className={`${cormorant.variable} ${sourceSans.variable} antialiased`}
      >
        {/* Desktop UI */}
        <nav
          className={`${cormorant.className} sticky top-0 z-50 hidden grid-cols-5 items-center border-t-3 border-[#C8A75A] bg-[#0B1F3A] text-white md:grid`}
        >
          <Link
            href="/"
            className="text-center text-lg font-bold hover:text-[#C8A75A]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-center text-lg font-bold hover:text-[#C8A75A]"
          >
            About
          </Link>
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logos/Transparent Logo.png"
                alt="The National Chronicle Logo"
                width={50}
                height={75}
              />
            </Link>
          </div>
          <div
            className="relative flex justify-center"
            onMouseLeave={() => setIsArticlesOpen(false)}
          >
            <button
              onClick={() => setIsArticlesOpen(!isArticlesOpen)}
              onMouseEnter={() => setIsArticlesOpen(true)}
              className="flex items-center gap-1 text-lg font-bold hover:text-[#C8A75A] focus:outline-none"
            >
              Articles
              <span
                className={`transition-transform ${isArticlesOpen ? 'rotate-180' : ''}`}
              >
                ▴
              </span>
            </button>
            {isArticlesOpen && (
              <div className="absolute top-full left-1/2 z-50 w-48 -translate-x-1/2 rounded-md border border-[#C8A75A] bg-[#0B1F3A] font-bold shadow-xl">
                <div className="py-2">
                  {Array.from(
                    new Set(
                      articles
                        .map((article) => article.Genre?.trim())
                        .filter(Boolean),
                    ),
                  ).map((genre) => (
                    <Link
                      key={genre}
                      href={`/articles?genre=${genre}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/tip"
            className="text-center text-lg font-bold hover:text-[#C8A75A]"
          >
            Have A Tip?
          </Link>
        </nav>
        {/* Mobile UI */}
        <nav
          className={`${cormorant.className} sticky top-0 z-50 flex w-full items-center border-t-3 border-[#C8A75A] bg-[#0B1F3A] px-4 text-white md:hidden`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-auto shrink-0 text-3xl hover:text-[#C8A75A] focus:outline-none"
          >
            ☰
          </button>
          <Link
            href="/"
            className="flex flex-1 shrink-0 items-center justify-center"
          >
            <Image
              src="/logos/Transparent Logo.png"
              alt="The National Chronicle Logo"
              width={80}
              height={50}
            />
          </Link>
          <Link
            href="https://x.com/NCNewsOnX"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#C8A75A]"
          >
            <Image
              src="/logos/x-logo-background-removed.png"
              alt="X Logo"
              width={20}
              height={20}
            />
          </Link>
          {isOpen && (
            <div className="absolute top-full right-0 left-0 -mt-px max-h-96 overflow-y-auto border-b bg-[#0B1F3A] shadow-xl">
              <div className="flex flex-col">
                <Link
                  href="/"
                  className="px-4 text-lg font-bold hover:text-[#C8A75A]"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="px-4 text-lg font-bold hover:text-[#C8A75A]"
                >
                  About
                </Link>
                <div
                  className="relative w-full px-4"
                  onMouseLeave={() => setIsArticlesOpen(false)}
                >
                  <button
                    onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                    className="text-lg font-bold hover:text-[#C8A75A]"
                  >
                    Articles
                    <span
                      className={`inline-block transition-transform ${isArticlesOpen ? 'rotate-180' : ''} px-1`}
                    >
                      ▴
                    </span>
                  </button>
                  {isArticlesOpen && (
                    <div className="bg-[#0B1F3A]">
                      <div className="px-2">
                        {Array.from(
                          new Set(
                            articles
                              .map((article) => article.Genre?.trim())
                              .filter(Boolean),
                          ),
                        ).map((genre) => (
                          <Link
                            key={genre}
                            href={`/articles?genre=${genre}`}
                            className="block px-4 py-2 text-sm hover:text-[#C8A75A]"
                          >
                            {genre}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href="/tip"
                  className="px-4 text-lg font-bold hover:text-[#C8A75A]"
                >
                  Have A Tip?
                </Link>
              </div>
            </div>
          )}
        </nav>
        <main className="h-full gap-4 overflow-hidden">
          <div className="custom-scrollbar col-span-1 items-center justify-center overflow-y-auto p-4">
             {children}
            <footer className="mt-20 flex flex-col items-center justify-center gap-2 p-4 text-sm text-gray-600">
              <nav className="flex gap-6">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-[#C8A75A]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[#C8A75A]"
                >
                  Terms of Service
                </Link>
                <Link
                  href="https://x.com/NCNewsOnX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#C8A75A]"
                >
                  Follow us on X
                </Link>
              </nav>
              <p className="text-center">
                &copy; {new Date().getFullYear()} NationalChronicle. <br></br>{' '}
                All rights reserved.
              </p>
              <div className="flex gap-4"></div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
