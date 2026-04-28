# RYDI Transport — Production Ready

Phone: 604-999-1495 | Email: builtby.sc@outlook.com

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
# Upload `out/` folder to Vercel, Netlify, or Cloudflare Pages
```

## Setup Instant Alerts (Do This First)

### Option A: Email Only (Easiest)
1. Go to https://resend.com -> sign up
2. Verify your domain
3. Copy API key to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   ADMIN_EMAIL=builtby.sc@outlook.com
   ```

### Option B: Email + SMS (Best)
1. Do Option A above
2. Go to https://zapier.com -> create "Webhook" trigger
3. Action: "Send SMS" to 604-999-1495
4. Copy webhook URL to `.env.local`:
   ```
   WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/
   ADMIN_PHONE=+16049991495
   ```

### Option C: Make.com (Free tier)
1. https://make.com -> create scenario
2. Webhook module -> SMS/Telegram/WhatsApp module
3. Same process as Zapier

## Pages

| Page | Purpose |
|------|---------|
| `/` | Homepage with pricing, coverage, backup pitch, truck photo |
| `/quote` | Money page — stripped quote form, highest conversion |
| `/request-haul` | Full haul request with all details |
| `/contractor` | Contractor services + backup capacity pitch |

## Admin: View Submissions

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  https://your-site.com/api/submissions
```

## Business Strategy

1. **Direct Outreach** — Call pipeline subs, construction PMs, equipment rental shops
2. **Position as backup** — "When your primary carrier fails, call RYDI"
3. **Emergency premium** — Same-day / after-hours = charge 1.5x–2x
4. **One contractor = recurring income** — Weekly runs = steady cash
