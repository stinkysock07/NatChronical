import Link from 'next/link';
import Image from 'next/image'; // Import Link for navigation
import { fetchArticles, Article } from '../../lib/data';

export default async function Home() {
  const article = await fetchArticles();
  return (
    <div className="flex flex-col gap-8 p-10">
      <h1 className="text-3xl font-bold">Featured News</h1>
      <div className="grid gap-4">
        {article
          .filter((a) => a.Featured)
          .map((article) => (
            /* This Link points to your dynamic [slug] folder */
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
      <h1 className="text-3xl font-bold">Latest News</h1>
      <div className="grid gap-4">
        {article.map((article) => (
          /* This Link points to your dynamic [slug] folder */
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
  );
}
