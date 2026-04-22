import Link from 'next/link';
import { Tweet } from '../lib/data';

export function TweetCard({ tweet }: { tweet: Tweet }) {
  const date = new Date(tweet.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <Link
      href={tweet.url || '#'}
      target="_blank"
      className="group flex flex-col rounded-md border border-gray-200 p-2 shadow-sm transition-all duration-300 hover:border-[#C8A75A] hover:bg-gray-50 hover:shadow-lg"
    >
      <p className="text-xs leading-tight text-gray-600">{formattedDate}</p>
      <p className="text-sm">{tweet.text}</p>
    </Link>
  );
}
