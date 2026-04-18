'use client';
export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import PreviewPage from './preview-content';

export default function Preview() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewPage />
    </Suspense>
  );
}
