'use client';
import Link from 'next/link';
import './globals.css';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchArticles, Article } from '../lib/data';

const neirizi = localFont({
  src: '../fonts/Neirizi Regular/Neirizi Regular.ttf',
  variable: '--font-neirizi',
});

const publicSans = localFont({
  src: '../fonts/Public_Sans/PublicSans-VariableFont_wght.ttf',
  variable: '--font-public-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [articles, setArticles] = useState<Article[]>([]);
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = pathName === '/';

  useEffect(() => {
    const getArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };
    getArticles();
  }, []);

  const uniqueGenres = Array.from(
    new Set(articles.map((article) => article.Genre)),
  ).filter(Boolean);

  return (
    <html lang="en">
      <body
        className={`${neirizi.variable} ${publicSans.variable} antialiased`}
      >
        {isHomePage && (
          <div className="relative aspect-4/1 max-h-75 w-full overflow-hidden bg-[#0B1F3A]">
            <Image
              src="/logos/Copy of NATIONAL CHRONICLE (1500 x 250 px) (1500 x 350 px).png"
              alt="KeyHolePress Logo"
              fill
              priority
              unoptimized={true}
              className="bg-[#0B1F3A]"
            />
          </div>
        )}
        <nav className="sticky top-0 z-50 grid grid-cols-5 items-center border-t-3 border-[#C8A75A] bg-[#0B1F3A] text-white">
          <Link href="/" className="text-center text-lg hover:text-[#C8A75A]">
            Home
          </Link>
          <Link
            href="/about"
            className="text-center text-lg hover:text-[#C8A75A]"
          >
            About
          </Link>
          <div className="flex justify-center">
            <Image
              src="/logos/Transparent Logo.png"
              alt="KeyHolePress Logo"
              width={50}
              height={75}
            />
          </div>
          <div
            className="relative flex justify-center"
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              className="flex items-center gap-1 text-lg hover:text-[#C8A75A] focus:outline-none"
            >
              Articles
              <span
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div className="absolute top-full left-1/2 z-50 w-48 -translate-x-1/2 rounded-md border border-[#C8A75A] bg-[#0B1F3A] shadow-lg">
                <div className="py-2">
                  {uniqueGenres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/articles?genre=${genre.toLocaleLowerCase()}`}
                      className="block px-4 py-2 text-sm capitalize hover:bg-[#C8A75A] hover:text-[#0B1F3A]"
                      onClick={() => setIsOpen(false)}
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
            className="text-center text-lg hover:text-[#C8A75A]"
          >
            Have A Tip?
          </Link>
        </nav>
        <main className="h-full gap-4 overflow-hidden">
          <div className="custom-scrollbar col-span-3 overflow-y-auto p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
