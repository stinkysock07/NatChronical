import { fetchArticles } from '../../lib/data';
import { HomeArticleCard } from '@/components/HomeArticleCard';

export default async function Home() {
  const article = await fetchArticles();
  return (
    <div className="flex flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold border-l-4 border-[#C8A75A] pl-4">
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
      <h1 className="text-3xl font-bold border-l-4 border-[#C8A75A] pl-4">
        Latest News
        </h1>
      <div className="grid grid-cols-1 gap-4">
        {article
          .map((article) => (
            <HomeArticleCard key={article.id} article={article} />
          ))}
      </div>
      </section>
    </div>
  );
}
