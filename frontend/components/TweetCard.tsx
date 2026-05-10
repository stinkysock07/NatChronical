import Link from 'next/link';
import { Tweet } from '../lib/data';

export function TweetCard({ tweet }: { tweet: Tweet }) {
  const date = new Date(tweet.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
      <Link
        href={tweet.url || '#'}
        target="_blank"
        className="group flex flex-col gap-2 overflow-hidden border-b border-gray-500 pt-2 pb-2 hover:text-[#C8A75A] transition-colors duration-300"
      >
        <p className="text-sm">{tweet.text}</p>
        <h2 className="text-xs text-gray-600">{formattedDate}</h2>
      </Link>
  );
}
