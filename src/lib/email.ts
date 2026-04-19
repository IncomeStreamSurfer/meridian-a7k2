export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(opts: SendEmailOptions) {
  const key = import.meta.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[meridian] RESEND_API_KEY missing — skipping email send.');
    return { skipped: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: opts.from ?? 'Meridian <onboarding@resend.dev>',
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error('[meridian] resend send failed', res.status, body);
    return { ok: false, status: res.status };
  }
  return { ok: true };
}

export function waitlistConfirmationHtml(siteUrl: string) {
  return `
    <div style="background:#F5F0E8;padding:48px 24px;font-family:Georgia,serif;color:#1A1412;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #E0D6C4;padding:40px;">
        <p style="text-transform:uppercase;letter-spacing:0.24em;font-size:11px;font-family:Arial,sans-serif;color:#8B8178;margin:0 0 24px;">Meridian</p>
        <h1 style="font-size:28px;line-height:1.1;margin:0 0 16px;">You're on the list.</h1>
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Thank you for reserving your seat. When our first roast is ready — bright, clean, sourced from farms above three thousand metres — you'll be among the first to pour.</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">Quietly, we'll send one email at launch. No noise. Just coffee.</p>
        <a href="${siteUrl}" style="display:inline-block;background:#1A1412;color:#F5F0E8;text-decoration:none;padding:12px 24px;font-size:14px;font-family:Arial,sans-serif;letter-spacing:0.05em;">Visit Meridian →</a>
        <p style="font-size:12px;color:#8B8178;margin:32px 0 0;font-family:Arial,sans-serif;">Where every cup finds its peak.</p>
      </div>
    </div>
  `;
}
