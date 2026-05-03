import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function forwardedEmailHtml(data: {
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
}) {
  const { from, subject, body, receivedAt } = data;
  const date = new Date(receivedAt).toLocaleString("en-KE", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Forwarded Email</title>
</head>
<body style="margin:0;padding:0;background-color:#08080a;font-family:'Courier New',Courier,monospace;">
  <div style="max-width:580px;margin:0 auto;padding:48px 32px;">

    <div style="margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #1a1a1e;">
      <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#ff4f33;">IAN.</p>
      <p style="margin:6px 0 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#555555;">
        Forwarded · ian@codesynergi.co.ke
      </p>
    </div>

    <h1 style="margin:0 0 8px;font-size:18px;font-weight:400;letter-spacing:0.03em;color:#f0ece6;">${subject}</h1>
    <p style="margin:0 0 32px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#555555;">${date}</p>

    <div style="margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// From</p>
      <a href="mailto:${from}" style="font-size:14px;color:#ff4f33;text-decoration:none;">${from}</a>
    </div>

    <div style="margin-bottom:40px;padding-top:24px;border-top:1px solid #1a1a1e;">
      <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#888888;">// Message</p>
      <div style="font-size:14px;color:#f0ece6;line-height:1.75;">${body}</div>
    </div>

    <div style="padding-top:32px;border-top:1px solid #1a1a1e;">
      <a href="mailto:${from}" style="display:inline-block;background:#ff4f33;color:#000000;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:14px 28px;text-decoration:none;font-family:'Courier New',Courier,monospace;">
        Reply ↗
      </a>
    </div>

    <p style="margin:40px 0 0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#333333;">
      IAN. · Nairobi, KE
    </p>

  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();

    // Verify the webhook signature
    const event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    if (event.type === "email.received") {
      const { email_id, from, subject, created_at } = event.data;

      // Fetch the full email body — webhook payload is metadata only
      const { data: email } = await resend.emails.receiving.get(email_id);

      const body = email?.html ?? email?.text?.replace(/\n/g, "<br>") ?? "(no body)";

      const fromName = process.env.RESEND_FROM_NAME ?? "Ian";
      await resend.emails.send({
        from: `${fromName} <${process.env.RESEND_FROM_EMAIL!}>`,
        to: process.env.CONTACT_EMAIL!,
        replyTo: from,
        subject: `[ian@codesynergi.co.ke] ${subject}`,
        html: forwardedEmailHtml({
          from,
          subject,
          body,
          receivedAt: created_at,
        }),
      });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Return 200 anyway — non-200 causes Resend to retry
    return new Response("Webhook processing failed", { status: 200 });
  }
}
