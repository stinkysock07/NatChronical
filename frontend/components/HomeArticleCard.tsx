import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/data';

export function HomeArticleCard({ article }: { article: Article }) {
return (
    <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex items-center overflow-hidden rounded-xl border transition-all hover:border-[#C8A75A] hover:bg-gray-50"
            >
              {article.picture && (
                <div className="relative h-24 w-28 shrink-0 overflow-hidden">
                  <Image
                    src={article.picture}
                    alt={article.Title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="pl-2 text-lg font-semibold group-hover:text-blue-600">
                  {article.Title}
                </h3>
                <h4 className="pl-2 text-sm text-gray-600">{article.Author}</h4>
                <p className="pl-2 text-sm text-gray-600">
                  Read full article →
                </p>
              </div>
            </Link>
)
}