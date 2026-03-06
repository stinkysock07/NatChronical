import { useState } from 'react';
import { postTip } from '../../lib/data'; // Ensure this path is correct based on your 'lib' folder
import DOMPurify from 'dompurify';

export function useTipSubmission() {
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
        body: JSON.stringify({ ...tipToSubmit, turnstileToken }),
      });

      if (!emailRes.ok) {
        const errorData = await emailRes.json();
        throw new Error(errorData.message || 'Failed to send email');
      }

      alert('Tip submitted successfully!');

      setIsSuccess(true);
      setIsAnonymous(false);
      setTurnstileToken(null);

      setFormData({
        name: '',
        contact_email: '',
        subject: '',
        tip_description: '',
      });

      if (window.turnstile) {
        window.turnstile.reset();
      }
    } catch (err) {
      alert('There was an error sending your tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
    isAnonymous,
    setIsAnonymous,
    loading,
    isSuccess,
    turnstileToken,
    setTurnstileToken,
    handleChange,
    handleSubmit,
  };
}
