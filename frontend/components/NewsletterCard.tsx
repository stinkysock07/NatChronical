'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/data';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      await subscribeToNewsletter(email);
      setMessage('Subscription successful! Please check your email to verify.');
      setMessageType('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setMessageType('error');

      if (error instanceof Error && error.message?.includes('unique')) {
        setMessage('You are already subscribed to the newsletter.');
      } else {
        setMessage('Subscription failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-gray-100 p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="mb-4 text-2xl font-bold">Subscribe to our Newsletter</h2>
      <p className="mb-6 text-gray-700">
        Stay updated with the latest news and insights from NCN. Enter your email below to subscribe to our newsletter.
      </p>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-[#C8A75A] focus:ring-2 focus:ring-[#C8A75A]/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#C8A75A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#B38B4E] disabled:opacity-50 transition-shadow duration-300"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 rounded-md p-4 text-sm font-medium ${
            messageType === 'error'
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-green-100 text-green-800 border border-green-300'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}