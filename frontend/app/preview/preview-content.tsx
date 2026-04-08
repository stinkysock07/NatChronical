'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDateString } from '@/lib/dateUtils';
import { useSearchParams } from 'next/navigation';
import RichTextRenderer from '@/components/RichTextRenderer';


export default function PreviewPage() {
    const searchParams = useSearchParams();
    const documentId = searchParams.get('documentId');
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';


    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/articles-preview/${documentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch preview');
                }
                const data = await response.json();
                console.log('Preview data:', data);
                setArticle(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (documentId) {
            fetchPreview();
        }
    }, [documentId]);

    return (
        <div className="p-6">
            {article && (
                <><div className="mb-4 flex-col gap-4 border-b-2 border-[#C8A75A] p-2 pb-4">
                    {article.picture && (
                        <div className="relative h-100 w-full overflow-hidden md:h-75">
                            <Image
                                src={article.picture.url.startsWith('http') 
                                    ? article.picture.url : `${apiUrl}${article.picture.url}`}
                                alt={article.Title}
                                fill
                                priority
                                className="object-cover" />
                        </div>
                    )}
                    <div className="flex-col justify-start">
                        <h1 className="font-neirizi mt-4 text-3xl font-bold tracking-wide [word-spacing:5px]">
                            {article.Title}
                        </h1>
                        <h2 className="mt-1 text-lg text-gray-600">
                            By {article.Author} | Published on {formatDateString(article.Date_pub)}
                        </h2>
                    </div>
                </div><div className="font-public mt-4 leading-relaxed text-gray-800 pl-2">
                        <RichTextRenderer blocks={article.Content} />
                    </div></>
            )}
        </div>
    );
}
