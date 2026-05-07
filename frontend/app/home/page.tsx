import { fetchArticles } from '../../lib/data';
import { HomeArticleCard } from '@/components/HomeArticleCard';
import { TweetCard } from '@/components/TweetCard';
import { fetchTweets } from '../../lib/data';
import { NewsletterCard } from '@/components/NewsletterCard';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const article = await fetchArticles();
  const tweets = await fetchTweets();
  return (
    <div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-3 lg:min-h-screen">
      <div className="flex flex-col gap-3 lg:col-span-2">
        <section className="flex flex-col gap-2">
          <h1 className={`border-l-4 border-[#C8A75A] pl-4 text-2xl uppercase`}>
            Featured News
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {article
              .filter((a) => a.Featured)
              .map((article) => (
                <HomeArticleCard key={article.id} article={article} />
              ))}
          </div>
        </section>
        <section className="lg:hidden">
          <NewsletterCard />
        </section>
        <section className="flex flex-col gap-2">
          <h1 className={`border-l-4 border-[#C8A75A] pl-4 text-2xl uppercase`}>
            Latest News
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {article
              .slice()
              .map((article) => (
                <HomeArticleCard key={article.id} article={article} />
              ))}
          </div>
        </section>
      </div>
      <div className="hidden lg:flex flex-col gap-2 lg:gap-3">
        <section className="hidden flex-col gap-2 lg:flex">
          <h1 className={`border-l-4 border-[#C8A75A] pl-4 text-2xl uppercase`}>
            Latest Tweets
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet.tweet_id}
                tweet={{ ...tweet, id: tweet.tweet_id }}
              />
            ))}
          </div>
        </section>
        <section className="flex-grow">
          <NewsletterCard />
        </section>
      </div>
    </div>
  );
}
