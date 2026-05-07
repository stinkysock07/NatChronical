import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { email, verificationToken } = await req.json();

        const verificationUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/newsletter/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Newsletter <onboarding@resend.dev>',
            to: email,
            subject: 'Verify Your NCN Newsletter Subscription!',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        });

        if (error) {
            console.error('Resend SDK Error:', error);
            return NextResponse.json({ error }, { status: 400 });
        }
        return NextResponse.json({ success: true });
    }
    catch (error) {
        console.error('Resend SDK Error:', error);
        return NextResponse.json(
            { error: 'Failed to send verification email' },
            { status: 500 },
        );
    }
}