'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDateString } from '@/lib/dateUtils';
import { useSearchParams } from 'next/navigation';
import RichTextRenderer from '@/components/RichTextRenderer';
import {
  prepareRichTextBlocks,
  splitBlocksWithImages,
} from '@/lib/richTextLayout';

function normalizePreviewImages(picture: any): string[] {
  const mediaItems = Array.isArray(picture)
    ? picture
    : picture?.data
      ? Array.isArray(picture.data)
        ? picture.data
        : [picture.data]
      : picture
        ? [picture]
        : [];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  return mediaItems
    .map((item: any) => item?.url ?? item?.attributes?.url)
    .filter((url: string | undefined): url is string => Boolean(url))
    .map((url: string) =>
      url.startsWith('http') ? url : `${apiUrl}${url}`,
    );
}

function normalizePreviewImages(picture: any): string[] {
  const mediaItems = Array.isArray(picture)
    ? picture
    : picture?.data
      ? Array.isArray(picture.data)
        ? picture.data
        : [picture.data]
      : picture
        ? [picture]
        : [];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  return mediaItems
    .map((item: any) => item?.url ?? item?.attributes?.url)
    .filter((url: string | undefined): url is string => Boolean(url))
    .map((url: string) =>
      url.startsWith('http') ? url : `${apiUrl}${url}`,
    );
}

function expandContentBlocks(blocks: any[] = []) {
  return blocks.flatMap((block) => {
    if (
      block?.type !== 'paragraph' ||
      !Array.isArray(block.children) ||
      block.children.length !== 1 ||
      typeof block.children[0]?.text !== 'string'
    ) {
      return [block];
    }

    const words = block.children[0].text.trim().split(/\s+/).filter(Boolean);

    if (words.length <= 60) {
      return [block];
    }

    const chunks: any[] = [];

    for (let index = 0; index < words.length; index += 60) {
      chunks.push({
        ...block,
        children: [
          {
            ...block.children[0],
            text: words.slice(index, index + 60).join(' '),
          },
        ],
      });
    }

    return chunks;
  });
}

function splitBlocksWithImages(blocks: any[] = [], images: string[] = []) {
  if (!images.length) {
    return [{ blocks, image: null as string | null }];
  }

  const segments: { blocks: any[]; image: string | null }[] = [];
  const imageSlots = images.length;
  const blocksPerSegment =
    blocks.length > 0 ? Math.ceil(blocks.length / (imageSlots + 1)) : 0;

  let blockIndex = 0;

  for (let imageIndex = 0; imageIndex < imageSlots; imageIndex += 1) {
    const nextBlockIndex =
      blocksPerSegment > 0
        ? Math.min(blocks.length, blockIndex + blocksPerSegment)
        : blockIndex;
    segments.push({
      blocks: blocks.slice(blockIndex, nextBlockIndex),
      image: images[imageIndex],
    });
    blockIndex = nextBlockIndex;
  }

  if (blockIndex < blocks.length || segments.length === 0) {
    segments.push({
      blocks: blocks.slice(blockIndex),
      image: null,
    });
  }

  return segments;
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get('documentId');
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/articles-preview/${documentId}`,
        );
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
    };
    if (documentId) {
      fetchPreview();
    }
  }, [documentId]);

  const previewImages = normalizePreviewImages(article?.picture);
  const heroImage = previewImages[0] ?? null;
  const expandedBlocks = prepareRichTextBlocks(article?.Content || []);
  const previewSegments = splitBlocksWithImages(
    expandedBlocks,
    previewImages.slice(1),
  );

  if (loading) {
    return <main className="min-h-screen bg-white" />;
  }

  if (!article) {
    return <main className="min-h-screen bg-white" />;
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl">
        {heroImage && (
          <div className="relative w-screen sm:w-full overflow-hidden rounded-2xl -mx-[calc(50vw-50%)] sm:mx-0 lg:-mx-8 -mt-4 lg:mt-0" style={{ aspectRatio: '16/9' }}>
            <Image
              src={heroImage}
              alt={article.Title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
        <div className="px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {article.Title}
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
              <span className="font-semibold">By {article.Author}</span>
              {' | '}
              <time dateTime={article.Date_pub}>
                {formatDateString(article.Date_pub)}
              </time>
            </p>
          </header>
          <div className="border-b-2 border-[#C8A75A] -mx-4 lg:-mx-8 mb-8"></div>

          <div className="prose prose-lg max-w-none leading-relaxed text-gray-800">
            {previewSegments.map((segment, index) => (
              <div key={`${article.id || documentId}-${index}`}>
                {!!segment.blocks.length && <RichTextRenderer blocks={segment.blocks} />}
                {segment.image && (
                  <div
                    className="my-6 relative overflow-hidden rounded-2xl bg-gray-100"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <Image
                      src={segment.image}
                      alt={`${article.Title} image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
