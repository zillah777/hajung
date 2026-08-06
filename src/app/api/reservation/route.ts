import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, guests, seating, dietary } = body;

    console.log('Received Reservation Request:', {
      name,
      email,
      phone,
      date,
      time,
      guests,
      seating,
      dietary,
    });

    if (!resend) {
      console.warn('RESEND_API_KEY is not defined. Simulating email sending.');
      return NextResponse.json({
        success: true,
        message: 'Reservation logged successfully (simulation mode - no API key).',
      });
    }

    // Build the email body html template in a premium minimalist design matching Qitchen style
    const emailHtml = `
      <div style="background-color: #0A0B0A; color: #EFE7D2; font-family: 'Inter', sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #2A2A27; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #1E1E1E; padding-bottom: 20px;">
          <h2 style="font-family: 'Forum', serif; letter-spacing: 0.25em; color: #CFBE91; text-transform: uppercase; margin: 0 0 10px 0;">HAJUNG</h2>
          <p style="font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #EFE7D2; opacity: 0.45; margin: 0;">New Reservation Alert</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em; width: 40%;">Guest Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Email Address</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Phone Number</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Date</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Time / Session</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Guests Count</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${guests}</td>
          </tr>
          ${
            seating
              ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Seating Preference</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2;">${seating}</td>
          </tr>
          `
              : ''
          }
          ${
            dietary
              ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 12px; text-transform: uppercase; color: #CFBE91; letter-spacing: 0.1em;">Dietary Restrictions</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #161614; font-size: 14px; text-align: right; color: #EFE7D2; font-style: italic;">${dietary}</td>
          </tr>
          `
              : ''
          }
        </table>
        
        <div style="text-align: center; color: #EFE7D2; opacity: 0.3; font-size: 10px; border-top: 1px solid #1E1E1E; padding-top: 20px;">
          © ${new Date().getFullYear()} HAJUNG. All rights reserved.
        </div>
      </div>
    `;

    // Send the email using Resend
    // By default on Resend free/onboarding tier, we must send from onboarding@resend.dev
    const data = await resend.emails.send({
      from: 'HAJUNG <onboarding@resend.dev>',
      to: 'ladycocoon26@gmail.com',
      subject: `New HAJUNG Reservation: ${name} (${date} ${time})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending reservation email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
