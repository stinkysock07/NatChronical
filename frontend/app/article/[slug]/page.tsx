import { fetchArticles } from '../../../lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDateString } from '@/lib/dateUtils';
import RichTextRenderer from '@/components/RichTextRenderer';

// Define the shape of the params (Next.js 15 requires awaiting params)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  // 1. Await the params to get the slug from the URL
  const { slug } = await params;

  const articles = await fetchArticles();

  // 2. Find the specific article in your data file that matches the slug
  const article = articles.find((a) => a.slug === slug);

  // 3. If no article is found (e.g., /article/random-text), show a 404
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl">
        <div className="px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          {article.picture && (
            <div className="relative h-96 w-full overflow-hidden sm:h-125 -mx-4 mt-0 sm:-mx-6 lg:-mx-8">
              <Image
                src={article.picture}
                alt={article.Title}
                width={768}
                height={504}
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
              />
            </div>
          )}
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {article.Title}
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
              <span className="font-semibold">By {article.Author}</span>
              {' | '}
              <time dateTime={article.Date_pub}>
                {formatDateString(article.Date_pub)}
              </time>
            </p>
          </header>
          <div className="border-b-2 border-[#C8A75A] -mx-4 lg:-mx-8 mb-8"></div>
          <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
            <RichTextRenderer blocks={article.Content} />
          </div>
        </div>
      </article>
    </main>
  );
}
