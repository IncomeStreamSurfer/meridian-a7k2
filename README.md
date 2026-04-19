# Meridian — Specialty Coffee Coming Soon

Editorial coming-soon landing for a small-batch specialty coffee brand. Supabase-backed email capture, dark/light editorial aesthetic, three-page flow (home → about → thanks).

## Stack
- Astro 5 + Tailwind v4
- Supabase (waitlist + content table for future blog)
- Resend (confirmation emails)
- Vercel (edge + deploy)

## Pages
- `/` — hero, brand story, email capture
- `/about` — four-chapter brand narrative
- `/thanks` — post-signup confirmation + share prompts

## Environment
See `.env.example`. Required:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `PUBLIC_SITE_URL`

## Supabase schema
- `meridian_waitlist` — email capture store (anon insert allowed via RLS)
- `meridian_content` — future blog table for Harbor Writer

## Dev
```bash
npm install --legacy-peer-deps
npm run dev
```

## TODO after deploy
- Verify Resend domain (`meridiancoffee.com`) and swap `onboarding@resend.dev` for a branded from address
- Connect custom domain in Vercel
- Replace hero / about imagery with studio photography once available
