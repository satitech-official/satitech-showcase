# Sati Tech — Digital Experiences That Move Businesses Forward

<p align="center">
  <a href="https://satitech-official.github.io/satitech-showcase/">
    <img src="./public/og.webp" alt="Sati Tech portfolio preview" width="960" />
  </a>
</p>

Production-ready portfolio for **Sati Tech Pvt. Ltd.** built by merging the strongest architecture, interaction and content systems from the two supplied projects.

## Highlights

- Next.js App Router with JavaScript / JSX application code
- **SATI ORBIT** interactive Three.js / React Three Fiber hero
- Reduced-motion, touch-device and WebGL fallbacks
- Real Sati Tech logo sourced from the company website
- Live public repositories from `satitech-official`
- Stable curated GitHub fallback data when the API is unavailable
- Centralized live URL verification and project media resolution
- Unique GitHub social previews with designed CSS fallbacks
- Editorial selected-work layouts and full project explorer
- Industry, technology, search and sort filters
- Dynamic case studies with qualitative, metadata-backed narratives
- Nine expandable services and an interactive service matcher
- Lenis, Framer Motion and GSAP ScrollTrigger with cleanup
- Compact branded opening loader and route transitions
- Keyboard command palette with focus containment and arrow navigation
- Desktop-only contextual cursor
- Optional PostgreSQL enquiry storage through Drizzle
- Safe contact and health APIs when `DATABASE_URL` is absent
- Metadata, Open Graph image, JSON-LD, sitemap and robots

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and configure only the values you need.

```env
DATABASE_URL=
GITHUB_TOKEN=
NEXT_PUBLIC_SITE_URL=https://www.satitechnologies.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919131043573
NEXT_PUBLIC_CONTACT_EMAIL=www.satitechinfo@gmail.com
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_FACEBOOK_URL=
```

- `GITHUB_TOKEN` is optional and server-only. It increases the GitHub REST API rate limit.
- `DATABASE_URL` is optional. Without it, the portfolio and API health route remain available, while the validated contact response directs delivery to WhatsApp/email.
- Official profiles are configured for Instagram and Facebook, with `https://www.satitechnologies.com` as the production website URL.

## GitHub project pipeline

`src/lib/github.js` fetches public, non-forked, non-archived repositories from:

```text
https://api.github.com/orgs/satitech-official/repos
```

Repository data is merged with `src/config/project-metadata.js`. Live URLs are resolved in this order:

1. Repository homepage
2. Curated verified metadata
3. GitHub Pages candidate when Pages is enabled

Every live candidate is checked before a Live action is shown. If none passes, the GitHub action remains available and the Live action is omitted.

## Project media

Owned images can be configured in `src/config/project-metadata.js`. When a curated file is not supplied, the portfolio uses the repository-specific GitHub Open Graph preview. The UI also includes a designed fallback if a remote image fails.

## Contact delivery

The static contact form validates the enquiry in the browser and opens a prepared WhatsApp conversation, so it works reliably on GitHub Pages without a server.

## Deployment

The portfolio is deployed through GitHub Actions and GitHub Pages—no Vercel deployment is used.

- Live site: `https://satitech-official.github.io/satitech-showcase/`
- Repository: `https://github.com/satitech-official/satitech-showcase`
- Every push to `main` runs lint, type-check, production build and the static Pages deployment workflow.
