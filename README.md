# SatiTech Interactive Showcase

[![Quality checks](https://github.com/satitech-official/satitech-showcase/actions/workflows/ci.yml/badge.svg)](https://github.com/satitech-official/satitech-showcase/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/satitech-official/satitech-showcase/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/satitech-official/satitech-showcase/actions/workflows/deploy-pages.yml)

An original, browser-native showcase of the interactive website experiences **SatiTech** can design and develop for modern businesses.

**[Explore the live showcase →](https://satitech-official.github.io/satitech-showcase/)**

![SatiTech Interactive Showcase](public/og-cover.svg)

## Experiences included

| Experience | Industry | Demonstrated capabilities |
| --- | --- | --- |
| 3D Product Studio | E-commerce | Product customisation, real-time materials, conversion UI |
| Virtual Property Tour | Real estate | Interactive architecture, environment modes, lead journeys |
| Immersive Dining | Hospitality | Menu storytelling, booking flows, cinematic presentation |
| Live Intelligence | SaaS | Streaming metrics, operational dashboards, data visualisation |
| Digital Stage | Events | Event launches, registrations, schedules and media experiences |
| Future Brand World | Brands | Art direction, motion systems and immersive brand storytelling |
| Connected Campus | Education | Admissions, notices, results and bilingual campus journeys |
| Performance Arena | Fitness | Programs, trainers, memberships and trial bookings |
| Digital Care Desk | Healthcare | Doctors, services, appointments and patient guidance |
| Journey Explorer | Travel | Packages, trip planning, maps and booking journeys |
| Luxury Collection Room | Jewellery & fashion | Collections, lookbooks and premium product discovery |
| Live Sports Hub | Sports | Registrations, fixtures, live results and academy content |

Each of the twelve demos opens as an interactive studio. Visitors can orbit the 3D scene, change its colour, adjust its visual energy and switch presentation modes. The live values are transparent UI simulations; production client work connects to secure APIs, databases and content systems.

## Technology

- React 19 and Vite
- Three.js with React Three Fiber and Drei
- Framer Motion
- Responsive, accessible CSS
- ESLint quality checks
- GitHub Actions CI and Pages deployment

No third-party photographs or commercial 3D models are used. The visual scenes are procedurally assembled from original geometry in the browser.

## Local development

```bash
npm install
npm run dev
```

Quality and production checks:

```bash
npm run lint
npm run build
npm run preview
```

Node.js 22 or newer is recommended.

## Project structure

```text
src/
├── components/
│   ├── DemoModal.jsx       # Interactive control studio and live UI
│   └── SceneCanvas.jsx     # Twelve procedural Three.js experiences
├── App.jsx                 # Showcase page and conversion journeys
├── data.js                 # Industry experience content
└── styles.css              # Responsive visual system
```

## Accessibility and performance

- Keyboard-visible focus states and semantic controls
- Escape-key support for closing interactive previews
- Reduced-motion CSS support
- Mobile layouts and controlled WebGL pixel density
- Vendor chunk splitting and production minification

## Work with SatiTech

Need a website, commerce experience, dashboard or immersive product?

- Website: [satitechnologies.com](https://www.satitechnologies.com/)
- WhatsApp: [+91 91310 43573](https://wa.me/919131043573)
- Email: [satitechinfo@gmail.com](mailto:satitechinfo@gmail.com)
- Instagram: [@satitech.official](https://www.instagram.com/satitech.official)

Built by **Sati Technologies**, Indore, India.

## License

Released under the [MIT License](LICENSE). Brand names and SatiTech identity assets remain the property of Sati Technologies.
