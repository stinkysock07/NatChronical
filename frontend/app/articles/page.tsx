import { fetchArticles } from '@/lib/data';
import { ArticleCard } from '@/components/ArticleCard';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  let articles = await fetchArticles();

  if (genre) {
    articles = articles.filter(
      (a) => a.Genre?.toLowerCase() === genre.toLowerCase(),
    );
  }

  const types = Array.from(
    new Set(articles.map((a) => a.Type).filter(Boolean)),
  );

  return (
    <section className="container mx-auto px-4 py-5">
      <h1 style={{ fontFamily: 'var(--font-cormorant)' }} className="pb-8 text-3xl font-bold">
        {genre ? `Our ${genre} Articles` : 'All Articles'}
      </h1>
      <nav className="sticky top-0 z-20 -mx-4 mb-8 border-b bg-white/80 p-4 backdrop-blur-md md:hidden">
        <p className="mb-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
          Jump to category
        </p>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {types.map((type) => (
            <a 
              key={type}
              href={`#${type.toUpperCase()}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-medium whitespace-nowrap uppercase shadow-sm transition-transform active:scale-95"
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
            className="flex scroll-mt-28 flex-col gap-4"
          >
            <h2 style={{ fontFamily: 'var(--font-cormorant)' }} className="border-l-4 border-[#C8A75A] pl-4 text-3xl font-bold uppercase">
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
