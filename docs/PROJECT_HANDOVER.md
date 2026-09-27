# UK Property Investment Website — Project Handover

## Purpose
A UK property investment lead-generation and marketplace website. Helps investors
explore cities/areas with live pricing data, get instant valuations, buy/sell
properties, and connects visitors to the site owner via forms, an AI chatbot,
and a paid premium report.

**Live site:** https://uk-property-investment-website.vercel.app
**Repo:** https://github.com/anzishsalarafnan-dev/uk-property-investment-website
**Admin dashboard:** /admin (login-protected)

## How this project has been worked on (process, for any AI/developer continuing it)
- Built entirely via VS Code terminal + a conversational AI assistant (Claude),
  one instruction at a time, in Roman Urdu/English.
- Every code change follows this loop: (1) assistant writes/edits files via
  terminal heredocs (`cat > file << 'EOF' ... EOF` or `python3 << 'PYEOF'` for
  content containing special characters like `!`), (2) run `npx tsc --noEmit`
  and `npm run build` to verify, (3) paste the FULL output back before
  proceeding, (4) `git add -A && git commit && git push` once verified clean.
- IMPORTANT gotcha: the user's shell is zsh, which treats `!` as history
  expansion even inside single-quoted heredocs. Any TS/JS snippet with `!x`
  (e.g. `!session.isAdmin`) must either be written via `python3 << 'PYEOF'`
  (safe) instead of `cat << 'EOF'` (unsafe), or rewritten to avoid a leading
  `!` (e.g. `x !== true`).
- Never commit large binary files (a stray 135MB Chrome .deb once broke a
  push — GitHub rejects files >100MB). `.gitignore` includes `*.deb`.
- The user prefers being shown one command block at a time normally, but
  during large batches of work prefers everything done first and verified
  once at the end, in as few round-trips as possible.

## Tech Stack
- Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS, Framer Motion
- Supabase (Postgres + Storage + Auth-free custom session via iron-session)
- Resend (transactional email), Google Gemini (chatbot + auto-blog), Paddle (payments)
- Vercel (hosting, auto-deploys on push to main)
- Python automation scripts (GitHub Actions cron, daily)

## Database (Supabase Postgres) — all tables have RLS enabled
- `cities`, `areas` — public read; content editable via /admin
- `guides`, `blog_posts` — public read; content editable via /admin
- `leads` — service-role only (no public policy) — contact/valuation/guide/newsletter submissions
- `market_snapshots` — public read — daily real UK Land Registry price data
- `reviews` — public read ONLY where is_approved=true; submissions go through API + admin approval
- `seller_listings`, `buyer_requests` — public read ONLY where is_approved=true, and public
  queries deliberately SELECT ONLY non-contact columns (name/email/phone never
  leave the server) — see `getApprovedSellerListings`/`getApprovedBuyerRequests`
  in src/lib/database/content.ts
- `property_inquiries` — service-role only, no public policy at all (buyer
  enquiries about a listing; only visible in /admin/inquiries)
- `site_settings` — public read — contact email/phone/whatsapp shown site-wide

## Full feature list (what exists today)
**Public site:**
- Homepage, /cities + /cities/[city] + /cities/[city]/[area] (8 cities, 14 areas,
  all with SEO-depth content), /map (Leaflet + fuzzy search + WhatsApp CTA)
- /valuation (instant estimate using live area pricing — formula-based, not ML)
- /guides (lead-magnet PDF guide requests), /blog (+ daily AI-generated posts)
- /resources (mortgage/yield/rent-vs-buy calculators)
- /reviews (submit a review — needs admin approval before showing on homepage)
- /sell (list a property, with photo upload) and /buy (submit a buying requirement)
- /listings/sell and /listings/buy (public, approved-only, NO seller/buyer contact
  info shown — just property details + photos + an inquiry form)
- /report (£29 one-time "Premium Investment Report" via Paddle checkout)
- /how-it-works, /faq (with FAQPage schema), /about, /contact, /legal/*
- AI chatbot widget (bottom-right, all pages) — RAG grounded in the site's own
  Supabase data, 10-language selector, Gemini-powered, text-only (voice was
  tried and removed — unreliable especially on mobile)
- Newsletter signup

**Admin dashboard (/admin, login via ADMIN_PASSWORD env var + iron-session):**
- Overview (stat cards), Leads, Cities (edit), Areas (edit), Guides (edit),
  Blog (edit), Reviews (approve/unpublish/delete), Marketplace (approve seller
  listings & buyer requests), Inquiries (view buyer enquiries on listings),
  Settings (contact info)

**Automation (python-automation/, runs daily via .github/workflows/python-automation.yml):**
1. `automation_1_market_data` — fetches REAL average prices from UK Land Registry
   (free official government data, England & Wales only — Scotland not covered,
   Glasgow/Edinburgh intentionally excluded from this automation) → syncs into
   both `market_snapshots` and the public `cities.avg_price` column
2. `automation_3_lead_scoring` — rule-based (not ML — deliberately not a black-box
   model since we don't have enough labeled data) lead scoring + a Day
   0/2/5/7/14 automated email follow-up sequence (tracked via `sequence_sent`
   column on `leads`, duplicate-send-proof)
3. `automation_4_blog_generator` — writes one new blog post per day using
   Gemini, STRICTLY grounded in the real numbers already in the `cities` table
   (prompt explicitly forbids inventing facts beyond that data)

**Security measures in place:**
- Security headers (X-Frame-Options, HSTS, etc.) in next.config.ts
- Honeypot field + IP rate-limiting (5/min) on every public form
- reCAPTCHA v3 on contact/valuation/guide/review/sell/buy/inquiry forms
- RLS on every Supabase table (verified with actual anon-key test scripts —
  confirmed public key cannot read leads/inquiries/unapproved rows)
- Admin API routes double-check `session.isAdmin` server-side (not just UI-gated)
- CI pipeline (.github/workflows/ci.yml): every push runs type-check + Jest
  unit tests (18 tests covering valuation math, formatters, honeypot logic) +
  a full production build, before Vercel deploys

## Known limitations / honest caveats (don't let an agent "fix" these into false claims)
- Valuation tool uses a transparent formula (base price × condition multiplier),
  NOT a trained ML model — there isn't remotely enough real sales data to train
  one honestly yet.
- Only 4 of 8 cities have real (Unsplash) photos; the rest + all 14 areas use
  seeded Picsum placeholder photography — cosmetic gap, not urgent.
- Resend's free tier can only actually DELIVER email to the account owner's own
  address until a custom domain is verified on Resend — this is why testing
  with any other email address shows "delivered" in our code but the message
  never arrives. Same constraint blocks the site from truly emailing arbitrary
  leads until a domain is bought and verified.
- No custom domain yet — site is on the free uk-property-investment-website.vercel.app.
  This also blocks Paddle's LIVE mode (which requires an approved real domain);
  sandbox/test payments work today.
- Paddle integration status: sandbox product + price created, checkout page
  built, webhook handler built and signature-verified, but END-TO-END TESTING
  (an actual sandbox test purchase completing and the webhook firing/being
  observed) has NOT been explicitly confirmed successful in this project's
  history — verify this before considering payments "done."
- No Playwright/e2e tests yet, only Jest unit tests.
- Chatbot has no persistent memory across page reloads (resets each session)
  and no voice input/output (removed for reliability).

## Immediate next steps (priority order)
1. Confirm Paddle sandbox checkout completes end-to-end and the webhook fires
   (make a real sandbox test purchase, watch server logs / Paddle dashboard).
2. Decide on and buy a real custom domain — unlocks Resend emailing real leads
   and Paddle going live.
3. Playwright e2e tests for critical flows (valuation submit, contact submit,
   admin login+edit, sell/buy submission).
4. Remaining real photography for Leeds/Glasgow/Bristol/Edinburgh cities + all
   14 areas (currently placeholder) — cosmetic, lowest priority.
5. Consider whether `/admin/inquiries` needs pagination once volume grows.

## How to run locally
```bash
cd uk-property-investment-website
npm install
npm run dev          # site at localhost:3000
cd python-automation
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python -m automation_1_market_data.main   # etc for automations 3, 4
```
Environment variables needed: see `.env.example`. Real values live only in
`.env.local` (gitignored) and in Vercel/GitHub Actions secrets — never commit them.
