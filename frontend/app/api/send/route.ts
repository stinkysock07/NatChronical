import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { turnstileToken, ...body } = await req.json();
    const { name, contact_email, subject, tip_description } = body;

    const ip = req.headers.get('x-forwarded-for') || '';

    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY || '',
          response: turnstileToken,
          remoteip: ip,
        }),
      },
    );

    const outcome = await verifyRes.json();

    if (!outcome.success) {
      console.error('Turnstile Error Codes:', outcome['error-codes']); // Logs why it failed
      return NextResponse.json(
        {
          error: 'Failed security verification',
          details: outcome['error-codes'],
        },
        { status: 400 },
      );
    }

    const hasValidEmail = contact_email && contact_email.includes('@');

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Tips <onboarding@resend.dev>',
      to: [process.env.RESEND_TO_EMAIL || 'sh33tghost@proton.me'],
      subject: `NEW TIP: ${subject || 'No Subject'}`,
      ...(hasValidEmail && { replyTo: contact_email }),
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
      console.error('Resend SDK Error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
