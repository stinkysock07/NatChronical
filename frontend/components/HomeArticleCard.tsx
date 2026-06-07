import Link from 'next/link';
import { Article } from '@/lib/data';
import { formatDateString } from '@/lib/dateUtils';

export function HomeArticleCard({ article }: { article: Article }) {
  return (
    <Link
      key={article.id}
      href={`/article/${article.slug}`}
      className="group flex items-stretch overflow-hidden border-b border-gray-500 pt-2 pb-4 hover:text-[#C8A75A] transition-colors duration-300"
    >
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
        <p>
        </p>
        <h2 className="pl-2 text-sm text-gray-600">{article.Author}</h2>
        <h2 className="pl-2 text-sm text-gray-600">Read full article →</h2>
      </div>
    </Link>
  );
}
