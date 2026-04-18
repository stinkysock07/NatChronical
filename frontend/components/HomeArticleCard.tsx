import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { formatDateString } from '@/lib/dateUtils';

export function HomeArticleCard({ article }: { article: Article }) {
  return (
    <Link
      key={article.id}
      href={`/article/${article.slug}`}
      className="group flex items-center overflow-hidden rounded-lg border border-gray-200 bg-linear-to-r from-white to-gray-50 shadow-sm transition-all duration-300 hover:border-[#C8A75A] hover:bg-gray-50 hover:shadow-lg"
    >
      {article.picture && (
        <div className="relative aspect-square w-28 shrink-0 overflow-hidden">
          <Image
            src={article.picture}
            alt={article.Title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
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
        <h2 className="pl-2 text-sm text-gray-600">Read full article →</h2>
      </div>
    </Link>
  );
}
