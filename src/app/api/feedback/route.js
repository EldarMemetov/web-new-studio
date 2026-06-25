import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message, lang } = await request.json();
    console.log('API KEY:', process.env.RESEND_API_KEY ? 'есть' : 'НЕТ');
    console.log('TO EMAIL:', process.env.RESEND_TO_EMAIL);
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev', // замени на свой домен после верификации
      to: process.env.RESEND_TO_EMAIL,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sprache:</strong> ${lang}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Nachricht erfolgreich gesendet' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
