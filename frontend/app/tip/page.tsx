'use client';
import { useState } from 'react';
import { Tip } from '../../lib/data';
import DOMPurify from 'dompurify';

export default function Home() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    contact_email: '',
    description: '',
    date: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = isAnonymous ? 'Anonymous' : DOMPurify.sanitize(formData.name);
    const cleanEmail = isAnonymous ? 'Anonymous' : DOMPurify.sanitize(formData.contact_email);
    const cleanDescription = DOMPurify.sanitize(formData.description);

    const finalTip: Tip = {
      ...formData,
      id: crypto.randomUUID(),
      name: cleanName,
      contact_email: cleanEmail,
      description: cleanDescription,
      date: new Date().toISOString(),
    };
  };

  return (
    <div className="grid grid-cols-3">
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
              onChange={handleChange}
              className="rounded-md border-2 p-2 outline-none focus:border-[#C8A75A]"
              required
            ></input>

            <input
              name="email"
              placeholder="Your Email..."
              onChange={handleChange}
              className="rounded-md border-2 p-2 outline-none focus:border-[#C8A75A]"
              required
            ></input>
          </>
        )}
        <textarea
          name="description"
          placeholder="Your Tip..."
          onChange={handleChange}
          className="rounded-md border-2 p-2 pb-20 outline-none focus:border-[#C8A75A]"
          required
        ></textarea>
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
