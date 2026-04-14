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
    <div className="p-6">
      <div className="mb-4 flex-col gap-4 border-b-2 border-[#C8A75A] p-2 pb-4">
        {article.picture && (
          <div className="relative h-100 w-full overflow-hidden md:h-75">
            <Image
              src={article.picture}
              alt={article.Title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-col justify-start">
          <h1 style={{ fontFamily: 'var(--font-cormorant)' }} className="mt-4 text-3xl font-bold tracking-wide [word-spacing:5px] font-bold">
            {article.Title}
          </h1>
          <h2 className="mt-1 text-lg text-gray-600">
            By {article.Author} | Published on{' '}
            {formatDateString(article.Date_pub)}
          </h2>
        </div>
      </div>
      <div className="font-public mt-4 pl-2 leading-relaxed text-gray-800">
        <RichTextRenderer blocks={article.Content} />
      </div>
    </div>
  );
}
