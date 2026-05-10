'use client';

import Link from 'next/link';
import { Tweet } from '@/lib/data';
import { useEffect, useRef } from 'react';

export function TweetScrollbar({ tweets }: { tweets: Tweet[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let scrollInterval: NodeJS.Timeout;
        const scrollSpeed = 0.3;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0; // Reset to start
                } else {
                    container.scrollLeft += scrollSpeed;
                }
            }, 20);
        };

        // Start auto-scroll on mount
        startAutoScroll();

        // Pause on hover
        container.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        container.addEventListener('mouseleave', startAutoScroll);

        return () => {
            clearInterval(scrollInterval);
            container.removeEventListener('mouseenter', () => clearInterval(scrollInterval));
            container.removeEventListener('mouseleave', startAutoScroll);
        };
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div ref={scrollContainerRef} className="md:hidden overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 pb-2 snap-x snap-mandatory">
                {tweets.map((tweet) => (
                    <Link
                        key={tweet.id}
                        href={tweet.url || '#'}
                        target="_blank"
                        className="shrink-0 w-72 p-2 hover:shadow-md transition-shadow snap-start"
                    >
                        <p className="text-sm text-gray-900 mb-3 line-clamp-4">
                            {tweet.text}
                        </p>
                        <p className="text-xs text-gray-600">
                            {formatDate(tweet.created_at)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
