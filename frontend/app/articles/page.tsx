import Link from 'next/link';
import Image from 'next/image';
import { fetchArticles, Article } from '@/lib/data';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  const articles = await fetchArticles();

  return (
    <section>
      <div className="grid grid-cols-3 items-start gap-5">
        <h1 className="col-span-full pb-5 text-3xl font-bold">
          {genre ? `Our ${genre} Articles` : 'All Articles'}
        </h1>
        <div className="flex flex-col gap-4">
          <h2 className="border-b text-xl font-semibold">Anaylsis</h2>
          <div className="flex flex-col gap-2">
            {articles
              .filter((a) => a.Type === 'analysis')
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                 className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border transition-all"
                >
                  {article.picture && (
                    <div className="relative h-48 w-full sm:h-24 sm:w-28 shrink-0">
                      <Image
                        src={article.picture}
                        alt={article.Title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 p-4 sm:p-2">
                    <h3 className="pl-2 text-lg font-semibold group-hover:text-blue-600">
                      {article.Title}
                    </h3>
                    <h4 className="pl-2 text-sm text-gray-600">
                      {article.Author}
                    </h4>
                    <p className="pl-2 text-sm text-gray-600">
                      Read full article →
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="border-b text-xl font-semibold">Opinion</h2>
          <div className="flex flex-col gap-2">
            {articles
              .filter((a) => a.Type === 'opinion')
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
       className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border transition-all"
                >
                  {article.picture && (
                    <div className="relative h-48 w-full sm:h-24 sm:w-28 shrink-0">
                      <Image
                        src={article.picture}
                        alt={article.Title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  )}
                 <div className="flex flex-col gap-1 p-4 sm:p-2">
                    <h3 className="pl-2 text-lg font-semibold group-hover:text-blue-600">
                      {article.Title}
                    </h3>
                    <h4 className="pl-2 text-sm text-gray-600">
                      {article.Author}
                    </h4>
                    <p className="pl-2 text-sm text-gray-600">
                      Read full article →
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="border-b text-xl font-semibold">Editorial</h2>
          <div className="flex flex-col gap-2">
            {articles
              .filter((a) => a.Type === 'editorial')
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
       className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border transition-all"
                >
                  {article.picture && (
                    <div className="relative h-48 w-full sm:h-24 sm:w-28 shrink-0">
                      <Image
                        src={article.picture}
                        alt={article.Title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  )}
                 <div className="flex flex-col gap-1 p-4 sm:p-2">
                    <h3 className="pl-2 text-lg font-semibold group-hover:text-blue-600">
                      {article.Title}
                    </h3>
                    <h4 className="pl-2 text-sm text-gray-600">
                      {article.Author}
                    </h4>
                    <p className="pl-2 text-sm text-gray-600">
                      Read full article →
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
