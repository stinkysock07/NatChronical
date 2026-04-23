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
  format?: 'ordered' | 'unordered';
  ordered?: boolean;
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
  const renderedChildren =
    type === 'list'
      ? children?.map((child, index) => (
        <li key={index} className="mb-2" style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
          {child.children?.map((textChild: any, i: number) => (
            <span key={i}>{renderChild(textChild)}</span>
          ))}
        </li>
      ))
      : children?.map((child, index) => (
        <span key={index}>{renderChild(child)}</span>
      ));
  switch (type) {
    case 'paragraph':
      return <p className="mb-4">{renderedChildren}</p>;
    case 'heading':
      const level = block.level || 1;
      const HeadingTag =
        `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag className={`mt-4 mb-3 font-bold ${getHeadingSize(level)}`}>
          {renderedChildren}
        </HeadingTag>
      );
    case 'quote':
      return (
        <blockquote className="my-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic">
          {renderedChildren}
        </blockquote>
      );
    case 'code':
      return (
        <pre className="mb-4 overflow-x-auto rounded bg-gray-100 p-4">
          <code>{renderedChildren}</code>
        </pre>
      );
    case 'list':
      const isOrderedList = block.format === 'ordered';
      return (
        <>
          {isOrderedList ? (
            <ol className="mb-4 list-decimal pl-6">{renderedChildren}</ol>
          ) : (
            <ul className="mb-4 list-disc pl-6">{renderedChildren}</ul>
          )}
        </>
      );
    case 'image':
      return (
        <div className="my-4">
          <img
            src={block.url}
            alt={block.alt || ''}
            className="h-auto max-w-full rounded"
          />
        </div>
      );
    default:
      return <p className="mb-4">{renderedChildren}</p>;
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
