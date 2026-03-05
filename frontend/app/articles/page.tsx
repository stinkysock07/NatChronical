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
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 pl-2">
                      {article.Title}
                    </h3>
                    <h4 className="text-sm text-gray-600 pl-2">{article.Author}</h4>
                    <p className="text-sm text-gray-600 pl-2">Read full article →</p>
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
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 pl-2">
                      {article.Title}
                    </h3>
                    <h4 className="text-sm text-gray-600 pl-2">{article.Author}</h4>
                    <p className="text-sm text-gray-600 pl-2">Read full article →</p>
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
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 pl-2">
                      {article.Title}
                    </h3>
                    <h4 className="text-sm text-gray-600 pl-2">{article.Author}</h4>
                    <p className="text-sm text-gray-600 pl-2">Read full article →</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
