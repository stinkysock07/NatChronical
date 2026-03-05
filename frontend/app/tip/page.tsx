'use client';
import { useState } from 'react';
import { postTip, Tip } from '../../lib/data';
import DOMPurify from 'dompurify';

export default function Home() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    subject: '',
    description: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tipToSubmit = {
        name: isAnonymous ? 'Anonymous' : DOMPurify.sanitize(formData.name),
        contact_email: isAnonymous
          ? 'Anonymous'
          : DOMPurify.sanitize(formData.contact_email),
        subject: DOMPurify.sanitize(formData.subject),
        description: DOMPurify.sanitize(formData.description),
      };

      await postTip(tipToSubmit);

      setFormData({
        name: '',
        contact_email: '',
        subject: '',
        description: '',
      });
      setIsAnonymous(false);
    } catch (err) {
      alert('There was an error sending your tip. Please try again.');
    }
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
              name="contact_email"
              placeholder="Your Email..."
              onChange={handleChange}
              className="rounded-md border-2 p-2 outline-none focus:border-[#C8A75A]"
              required
            ></input>
          </>
        )}
        <input
          name="subject"
          placeholder="The Subject..."
          onChange={handleChange}
          className="rounded-md border-2 p-2 pb-20 outline-none focus:border-[#C8A75A]"
          required
        ></input>
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
