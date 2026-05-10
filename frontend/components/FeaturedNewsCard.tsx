import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/data';
import { formatDateString } from '@/lib/dateUtils';

// Helper function to extract plain text from rich text content
function extractPlainText(content: any[], maxLength: number = 500): string {
    if (!content || !Array.isArray(content)) return '';

    let text = '';
    for (const block of content) {
        if (block.type === 'paragraph' && block.children) {
            for (const child of block.children) {
                if (typeof child.text === 'string') {
                    text += child.text + ' ';
                }
            }
        } else if (block.type === 'paragraph' && typeof block.text === 'string') {
            text += block.text + ' ';
        }

        if (text.length >= maxLength) break;
    }

    return text.trim().slice(0, maxLength) + (text.length > maxLength ? '...' : '');
}

export function FeaturedArticleCard({ article }: { article: Article }) {
    return (
        <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group flex flex-col sm:flex-row items-stretch overflow-hidden border-b border-gray-500 pt-2 pb-2 hover:text-[#C8A75A] transition-colors duration-300"
        >
            {article.picture && (
                <div className="relative w-full h-45 overflow-hidden">
                    <Image
                        src={article.picture}
                        alt={article.Title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="flex flex-col gap-1 col-span-5">
                <h1
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                    className="pl-2 text-lg font-bold"
                >
                    {article.Title}
                </h1>
                <h2 className="pl-2 text-sm text-gray-600">
                    {formatDateString(article.Date_pub)}
                </h2>
                <p className="pl-2 text-sm text-gray-700 line-clamp-2">
                    {extractPlainText(article.Content, 500)}
                </p>
                <h2 className="pl-2 text-sm text-gray-600">{article.Author}</h2>
                <h2 className="pl-2 text-sm text-gray-600">Read full article →</h2>
            </div>
        </Link>
    );
}
