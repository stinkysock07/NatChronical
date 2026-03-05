'use client';
import { useState } from 'react';
import { postTip, Tip } from '../../lib/data';
import DOMPurify from 'dompurify';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Home() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    subject: '',
    tip_description: '',
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert('Please complete the security check.');
      return;
    }
    setLoading(true);

    const tipToSubmit = {
      name: isAnonymous ? 'Anonymous' : DOMPurify.sanitize(formData.name),
      contact_email: isAnonymous
        ? 'Anonymous'
        : DOMPurify.sanitize(formData.contact_email),
      subject: DOMPurify.sanitize(formData.subject),
      tip_description: DOMPurify.sanitize(formData.tip_description),
      createdAt: new Date().toISOString(),
    };

    try {
      await postTip(tipToSubmit);

      const emailRes = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tipToSubmit),
      });

      if (!emailRes.ok) throw new Error('Email failed to send');

      try {
        // Pass the token to your API
        const emailRes = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...tipToSubmit, turnstileToken }),
        });

        if (!emailRes.ok) {
          const errorBody = await emailRes.json();
          throw new Error('Email failed to send');
        }
        setIsSuccess(true);
        setFormData({
          name: '',
          contact_email: '',
          subject: '',
          tip_description: '',
        });
        setIsAnonymous(false);
        setTurnstileToken(null); // Reset token for next use
        alert('Tip submitted successfully!');
      } catch (err) {
        alert('There was an error sending your tip. Please try again.');
        setLoading(false);
        return;
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        contact_email: '',
        subject: '',
        tip_description: '',
      });
      setIsAnonymous(false);
    } catch (err) {
      alert('There was an error sending your tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 max-w-150">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="mb-2 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
          <input
            type="checkbox"
            id="anon"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 accent-[#C8A75A]"
          />
          <label
            htmlFor="anon"
            className="text-sm font-semibold text-[#0B1F3A]"
          >
            Submit this tip anonymously
          </label>
        </div>
        {!isAnonymous && (
          <>
            <input
              name="name"
              placeholder="Your Name..."
              value={formData.name}
              onChange={handleChange}
              className="rounded-md border-2 p-2 outline-none focus:border-[#C8A75A]"
              required
            ></input>

            <input
              name="contact_email"
              placeholder="Your Email..."
              value={formData.contact_email}
              onChange={handleChange}
              className="rounded-md border-2 p-2 outline-none focus:border-[#C8A75A]"
              required
            ></input>
          </>
        )}
        <input
          name="subject"
          placeholder="The Subject..."
          value={formData.subject}
          onChange={handleChange}
          className="rounded-md border-2 p-2 pb-20 outline-none focus:border-[#C8A75A]"
          required
        ></input>
        <input
          name="tip_description"
          placeholder="Your Tip..."
          value={formData.tip_description}
          onChange={handleChange}
          className="rounded-md border-2 p-2 pb-20 outline-none focus:border-[#C8A75A]"
          required
        ></input>
        <div className="flex w-full justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onSuccess={(token) => setTurnstileToken(token)}
            options={{
              theme: 'light',
              size: 'normal',
            }}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#0B1F3A] py-2 text-white hover:bg-[#C8A75A]"
        >
          Submit Tip
        </button>
      </form>
      <div></div>
      <div></div>
    </div>
  );
}
