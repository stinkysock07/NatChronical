import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, contact_email, subject, description } = await req.json();

    const data = await resend.emails.send({
      from: 'Tips <onboarding@resend.dev>', // Later, verify your domain to use tips@yourcompany.com
      to: ['<anything>@itoluaulda.resend.app'], // Change to your email or a distribution list
      subject: `NEW TIP: ${subject}`,
      replyTo: contact_email,
      html: `
        <h2>New Tip Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contact_email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}