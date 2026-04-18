import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { formatDateString } from '@/lib/dateUtils';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-gray-200 p-4 shadow-sm transition-all hover:border-[#C8A75A] hover:bg-gray-50 hover:shadow-lg"
    >
      {article.picture && (
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
          <Image
            src={article.picture}
            alt={article.Title}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 p-4 sm:p-2">
        <h1
          style={{ fontFamily: 'var(--font-cormorant)' }}
          className="pl-2 text-lg font-bold"
        >
          {article.Title}
        </h1>
        <h2 className="pl-2 text-sm text-gray-600">
          {formatDateString(article.Date_pub)}
        </h2>
        <h2 className="pl-2 text-sm text-gray-600">{article.Author}</h2>
        <p className="pl-2 text-sm text-gray-600">Read full article →</p>
      </div>
    </Link>
  );
}
