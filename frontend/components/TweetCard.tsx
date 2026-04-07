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
        <Link href={tweet.url || '#'} target="_blank" className="group flex flex-col rounded-md border border-gray-900 p-2 transition-all hover:border-[#C8A75A] hover:bg-gray-50">
            <p className="text-xs text-gray-600 leading-tight">{formattedDate}</p>
            <p className="text-sm">{tweet.text}</p>
        </Link>
    );
}