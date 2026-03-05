import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { turnstileToken, ...body } = await req.json();
    const { name, contact_email, subject, tip_description } = body;

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY || '',
            response: turnstileToken,
        }),
        });

    const outcome = await verifyRes.json();

    if (!outcome.success) {
      return NextResponse.json({ error: 'Failed security verification' }, { status: 400 });
    }

    console.log("Email Payload Received:", body);

    const hasValidEmail = contact_email && contact_email.includes('@')

    const { data, error } = await resend.emails.send({
      from: 'Tips <onboarding@resend.dev>',
      to: [process.env.RESEND_EMAIL], // Use your Resend login email first to be safe
      subject: `NEW TIP: ${subject || 'No Subject'}`,
      ...hasValidEmail && { replyTo: contact_email }, // Set reply-to only if a valid email is provided
      html: `
        <h2>New Tip Submission</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Contact:</strong> ${contact_email || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${tip_description || 'No content provided.'}</p>
      `,
    });

    if (error) {
      console.error("Resend SDK Error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}