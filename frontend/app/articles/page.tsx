import { fetchArticles } from '@/lib/data';
import { ArticleCard } from '@/components/ArticleCard';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  const articles = await fetchArticles();
  const types = Array.from(new Set(articles.map(a => a.Type)));

  return (
    <section className="container mx-auto py-5 px-4">
      <h1 className="pb-8 text-3xl font-bold">
        {genre ? `Our ${genre} Articles` : 'All Articles'}
      </h1>
      <nav className="sticky top-0 z-20 -mx-4 mb-8 border-b bg-white/80 p-4 backdrop-blur-md md:hidden">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          Jump to category
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {types.map((type) => (
            <a
              key={type}
              href={`#${type.toUpperCase()}`}
              className="uppercase whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-medium shadow-sm active:scale-95 transition-transform"
            >
              {type}
            </a>
          ))}
        </div>
      </nav>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-3">
        {types.map((type) => (
          <div 
            key={type} 
            id={type.toUpperCase()} 
            className="flex flex-col gap-4 scroll-mt-28" 
          >
            <h2 className="border-b-2 border-gray-100 pb-2 text-xl font-bold tracking-wider text-gray-800 uppercase">
              {type}
            </h2>
            <div className="flex flex-col gap-4">
              {articles
                .filter((a) => a.Type === type)
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
