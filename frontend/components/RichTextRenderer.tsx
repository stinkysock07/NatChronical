import { JSX } from 'react';

interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface Block {
  id: number;
  url: string | Blob | undefined;
  alt: string;
  type: string;
  children: (TextNode | any)[];
  level?: number;
}

interface RichTextRendererProps {
  blocks: Block[] | null | undefined;
}

export default function RichTextRenderer({ blocks }: RichTextRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.id || index}>{renderBlock(block)}</div>
      ))}
    </>
  );
}

function renderBlock(block: Block) {
  const { type, children } = block;

  const renderedChildren = children?.map((child, index) => (
    <span key={index}>{renderChild(child)}</span>
  ));

  switch (type) {
    case 'paragraph':
      return <p className="mb-6 leading-8">{renderedChildren}</p>;
    case 'heading':
      const level = block.level || 1;
      const HeadingTag =
        `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag className={`mt-8 mb-4 font-bold ${getHeadingSize(level)}`}>
          {renderedChildren}
        </HeadingTag>
      );
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-[#C8A75A] bg-gray-50 py-4 pl-6 pr-4 text-lg italic text-gray-700">
          {renderedChildren}
        </blockquote>
      );
    case 'code':
      return (
        <pre className="mb-6 overflow-x-auto rounded bg-gray-100 p-4 font-mono text-sm">
          <code>{renderedChildren}</code>
        </pre>
      );
    case 'list':
    case 'unordered-list':
    case 'ordered-list':
      const isOrdered = block.type === 'ordered-list';
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag
          className={
            isOrdered
              ? 'mb-6 list-inside space-y-2 pl-2'
              : 'mb-6 list-inside space-y-2 pl-2'
          }
        >
          {renderedChildren}
        </ListTag>
      );
    case 'list-item':
      return <li className="leading-7">{renderedChildren}</li>;
    case 'image':
      return (
        <figure className="my-8 flex flex-col items-center">
          <div className="relative w-full max-w-2xl">
            <img
              src={block.url}
              alt={block.alt || ''}
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
          {block.alt && (
            <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );
    default:
      return <p className="mb-6 leading-8">{renderedChildren}</p>;
  }
}

function renderChild(child: TextNode | any) {
  if (typeof child === 'string') {
    return child;
  }

  if (!child || typeof child !== 'object') {
    return null;
  }

  const { type, text, bold, italic, underline, strikethrough, code } = child;

  if (type === 'text' || !type) {
    let element = <>{text}</>;

    if (bold) element = <strong>{element}</strong>;
    if (italic) element = <em>{element}</em>;
    if (underline) element = <u>{element}</u>;
    if (strikethrough) element = <s>{element}</s>;
    if (code)
      element = (
        <code className="rounded bg-gray-200 px-2 py-1">{element}</code>
      );

    return element;
  }

  return text;
}

function getHeadingSize(level: number): string {
  switch (level) {
    case 1:
      return 'text-3xl';
    case 2:
      return 'text-2xl';
    case 3:
      return 'text-xl';
    case 4:
      return 'text-lg';
    default:
      return 'text-base';
  }
}
