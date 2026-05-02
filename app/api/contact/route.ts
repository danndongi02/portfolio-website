import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

function ownerEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { name, email, phone, message } = data;
  const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Project Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#08080a;font-family:'Courier New',Courier,monospace;">
  <div style="max-width:580px;margin:0 auto;padding:48px 32px;">

    <div style="margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1a1a1e;">
      <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#ff4f33;">IAN.</p>
      <p style="margin:6px 0 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555555;">New Project Inquiry</p>
    </div>

    <h1 style="margin:0 0 6px;font-size:20px;font-weight:400;letter-spacing:0.03em;color:#f0ece6;">
      Message from <span style="color:#ff4f33;">${name}</span>
    </h1>
    <p style="margin:0 0 40px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#555555;">
      via portfolio contact form
    </p>

    <div style="margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// Name</p>
      <p style="margin:0;font-size:14px;color:#f0ece6;">${name}</p>
    </div>

    <div style="margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// Email</p>
      <a href="mailto:${email}" style="font-size:14px;color:#ff4f33;text-decoration:none;">${email}</a>
    </div>

    ${
      phone
        ? `<div style="margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// Phone</p>
      <a href="tel:${phone}" style="font-size:14px;color:#ff4f33;text-decoration:none;">${phone}</a>
    </div>`
        : ""
    }

    <div style="margin-bottom:40px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// Message</p>
      <p style="margin:0;font-size:14px;color:#f0ece6;line-height:1.75;white-space:pre-wrap;">${safeMessage}</p>
    </div>

    <div style="padding-top:32px;border-top:1px solid #1a1a1e;">
      <a href="mailto:${email}" style="display:inline-block;background:#ff4f33;color:#000000;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:14px 28px;text-decoration:none;font-family:'Courier New',Courier,monospace;">
        Reply to ${name} ↗
      </a>
    </div>

    <p style="margin:40px 0 0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#333333;">
      IAN. · Nairobi, KE
    </p>

  </div>
</body>
</html>`;
}

function userEmailHtml(data: { name: string }) {
  const { name } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Got your message</title>
</head>
<body style="margin:0;padding:0;background-color:#08080a;font-family:'Courier New',Courier,monospace;">
  <div style="max-width:580px;margin:0 auto;padding:48px 32px;">

    <div style="margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1a1a1e;">
      <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#ff4f33;">IAN.</p>
      <p style="margin:6px 0 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555555;">Message Received</p>
    </div>

    <h1 style="margin:0 0 24px;font-size:20px;font-weight:400;letter-spacing:0.03em;color:#f0ece6;">
      Hey ${name}, got your message.
    </h1>

    <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#aaaaaa;">
      Thanks for reaching out — I've received your message and will get back to you within 24 hours.
    </p>

    <p style="margin:0 0 40px;font-size:14px;line-height:1.75;color:#aaaaaa;">
      If anything is urgent, feel free to follow up directly.
    </p>

    <div style="padding:24px;background:#0f0f12;border-left:2px solid #ff4f33;margin-bottom:40px;">
      <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#ff4f33;">// Status</p>
      <p style="margin:8px 0 0;font-size:13px;color:#f0ece6;">message received · response within 24h</p>
    </div>

    <div style="padding-top:32px;border-top:1px solid #1a1a1e;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#f0ece6;">IAN</p>
      <p style="margin:0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#555555;">Software · Automation · AI — Nairobi, KE</p>
    </div>

  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const { name, email, phone, message } = result.data;
    const toEmail = process.env.CONTACT_EMAIL!;
    const fromEmail = process.env.RESEND_FROM_EMAIL!;

    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New project inquiry from ${name}`,
        html: ownerEmailHtml({ name, email, phone, message }),
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Got your message — I'll be in touch`,
        html: userEmailHtml({ name }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
