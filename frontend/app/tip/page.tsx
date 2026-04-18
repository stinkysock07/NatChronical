'use client';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTipSubmission } from '../hooks/useTipSubmission';

export default function Home() {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    isAnonymous,
    setIsAnonymous,
    setTurnstileToken,
  } = useTipSubmission();

  return (
    <div className="grid max-w-150 grid-cols-1 md:grid-cols-1">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="mb-2 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm hover:shadow-lg transition-all duration-300">
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
              required
              className="rounded-lg border-0! bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md focus:shadow-md focus:outline-none"
            ></input>
            <input
              name="contact_email"
              placeholder="Your Email..."
              value={formData.contact_email}
              onChange={handleChange}
              required
              className="rounded-lg border-0! bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md focus:shadow-md focus:outline-none"
            ></input>
          </>
        )}
        <input
          name="subject"
          placeholder="The Subject..."
          value={formData.subject}
          onChange={handleChange}
          required
          className="rounded-lg border-0! bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md focus:shadow-md focus:outline-none"
        ></input>
        <input
          name="tip_description"
          placeholder="Your Tip..."
          value={formData.tip_description}
          onChange={handleChange}
          required
          className="rounded-lg border-0! bg-white px-3 py-2 shadow-sm transition-all hover:shadow-md focus:shadow-md focus:outline-none"
        ></input>
        <div className="flex w-full justify-center">
          {typeof process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY === 'string' ? (
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              options={{
                theme: 'light',
                size: 'flexible',
              }}
            />
          ) : (
            <div className="rounded border border-dashed p-4 text-xs text-gray-400">
              Loading security check...
            </div>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#0B1F3A] py-2 text-white hover:bg-[#C8A75A] shadow-sm transition-all hover:shadow-lg duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit Tip
        </button>
      </form>
      <div></div>
      <div></div>
    </div>
  );
}
