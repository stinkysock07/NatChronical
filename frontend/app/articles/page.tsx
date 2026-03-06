import { fetchArticles } from '@/lib/data';
import { ArticleCard } from '@/components/ArticleCard';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  const articles = await fetchArticles();
  return (
    <section className="container mx-auto py-5">
      <h1 className="pb-8 text-3xl font-bold">
        {genre ? `Our ${genre} Articles` : 'All Articles'}
      </h1>
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col gap-4">
            <h2 className="border-b-2 border-gray-100 pb-2 text-xl font-bold tracking-wider text-gray-800 uppercase">
              {article.Type}
            </h2>
            <div className="flex flex-col gap-4">
              {articles
                .filter((a) => a.Type === article.Type)
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
