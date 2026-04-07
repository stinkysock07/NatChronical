import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { formatDateString } from '@/lib/dateUtils';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-gray-900 p-4 transition-all hover:border-[#C8A75A] hover:bg-gray-50"
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
        <h3 className="pl-2 text-lg font-semibold group-hover:text-blue-600">
          {article.Title}
        </h3>
        <h4 className="pl-2 text-sm text-gray-600">{formatDateString(article.Date_pub)}</h4>
        <h4 className="pl-2 text-sm text-gray-600">{article.Author}</h4>
        <p className="pl-2 text-sm text-gray-600">Read full article →</p>
      </div>
    </Link>
  );
}
