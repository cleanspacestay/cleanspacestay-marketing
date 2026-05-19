# CleanspaceStay Marketing Site

Marketing and sales landing page for [cleanspacestay.com](https://cleanspacestay.com).

## Architecture

- **Root domain** (`cleanspacestay.com`) → This marketing site (Vercel)
- **App subdomain** (`app.cleanspacestay.com`) → Operational platform (Manus hosting)

## Tech Stack

- Pure HTML/CSS/JS (no build step)
- Responsive design (mobile-first)
- Optimized for Vercel Edge Network

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from this directory
cd cleanspacestay-marketing
vercel

# For production deployment
vercel --prod
```

### Option 2: Git-based Deploy

1. Push this folder to a GitHub repository
2. Import the repository in [vercel.com/new](https://vercel.com/new)
3. Framework Preset: **Other** (static site)
4. Deploy

### Custom Domain Setup

After deploying to Vercel:

1. Go to your Vercel project → **Settings** → **Domains**
2. Add `cleanspacestay.com`
3. Vercel will provide DNS records to add in Cloudflare:
   - Type: `A` record → `76.76.21.21`
   - Or Type: `CNAME` → `cname.vercel-dns.com`
4. In Cloudflare DNS, add the record (proxy status: DNS only for initial setup)

## DNS Configuration (Cloudflare)

```
cleanspacestay.com        A       76.76.21.21          (Vercel - marketing)
app.cleanspacestay.com    CNAME   <manus-domain>       (Manus - platform)
```

## Local Development

```bash
# Serve locally
npx serve .

# Or use Python
python3 -m http.server 8000
```

## File Structure

```
index.html    → Main landing page
style.css     → All styles (responsive)
script.js     → Mobile menu, animations, form handling
vercel.json   → Vercel deployment config
```

## Contact Form

The contact form currently logs to console. To make it functional:

1. Connect to a form service (Formspree, Netlify Forms, or custom API)
2. Or set up a serverless function at `/api/contact` on Vercel

## Updating Content

All content is in `index.html`. Key sections:
- Hero: headline, description, stats
- Problem: pain points
- Features: platform capabilities
- How It Works: 4-step process
- Roles: team member access levels
- Pricing: tier cards
- Contact: form and info
- Footer: links and branding
