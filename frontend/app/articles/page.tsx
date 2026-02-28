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
      <h1 className="text-3xl font-bold capitalize">
        {genre ? `Our ${genre} Articles` : 'All Articles'}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {articles
          .filter((article) => article.Genre.toLocaleLowerCase() == genre)
          .map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group - flex items-center overflow-hidden rounded-xl border transition-all hover:border-[#C8A75A] hover:bg-gray-50"
            >
              {article.picture && (
                <div className="relative w-32 shrink-0">
                  <Image
                    src={article.picture}
                    alt={article.Title}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold group-hover:text-blue-600">
                  {article.Title}
                </h3>
                <h4 className="text-sm text-gray-600">{article.Author}</h4>
                <p className="text-sm text-gray-600">Read full article →</p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
