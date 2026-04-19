import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { sendEmail, waitlistConfirmationHtml } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let email = '';
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = (body.email || '').toString().trim().toLowerCase();
    } else {
      const form = await request.formData();
      email = (form.get('email') || '').toString().trim().toLowerCase();
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Please share a valid email.' }), { status: 400 });
  }

  const { error } = await supabase
    .from('meridian_waitlist')
    .insert({ email, source: 'landing' });

  if (error && !`${error.message || ''}`.toLowerCase().includes('duplicate')) {
    console.error('[meridian] waitlist insert error', error);
    return new Response(JSON.stringify({ error: 'Our cellar is briefly closed — please retry.' }), { status: 500 });
  }

  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://meridian-a7k2.vercel.app';
  sendEmail({
    to: email,
    subject: "You're on the Meridian waitlist ✦",
    html: waitlistConfirmationHtml(siteUrl),
  }).catch((err) => console.error('[meridian] email send failed', err));

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'POST only.' }), { status: 405 });
};
