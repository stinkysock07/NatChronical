'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ncn-backend.up.railway.app';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
          setStatus('error');
          setMessage('Invalid verification link');
          return;
        }

        // Call the custom verify endpoint
        const verifyResponse = await fetch(
          `${STRAPI_URL}/api/newsletter-subscribers/verify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token }),
          }
        );

        if (!verifyResponse.ok) {
          throw new Error('Failed to verify');
        }

        setStatus('success');
        setMessage('Email verified! You will now receive our newsletter.');
        setTimeout(() => router.push('/'), 3000);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Verification link is invalid or expired. Please try subscribing again.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {status === 'success' && '✓ Verified!'}
          {status === 'error' && '✗ Error'}
          {status === 'loading' && '⏳ Verifying...'}
        </h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}