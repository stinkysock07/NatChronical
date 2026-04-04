import { fetchArticles } from '../../lib/data';
import { HomeArticleCard } from '@/components/HomeArticleCard';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const article = await fetchArticles();
  return (
    <div className="flex flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
        <h1 className="border-l-4 border-[#C8A75A] pl-4 text-3xl font-bold uppercase">
          Featured News
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {article
            .filter((a) => a.Featured)
            .map((article) => (
              <HomeArticleCard key={article.id} article={article} />
            ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="border-l-4 border-[#C8A75A] pl-4 text-3xl font-bold uppercase">
          Latest News
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {article.map((article) => (
            <HomeArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
