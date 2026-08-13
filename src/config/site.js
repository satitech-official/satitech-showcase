const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/satitech.official/";
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/profile.php?id=61590880774148";

const services = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    short: "Modern business websites built to establish trust, explain offers clearly and convert visitors into enquiries.",
    outcome: "A fast, responsive and search-ready website designed around a real business action.",
    visual: "Business Website",
    goodFit: "Service businesses, new launches and brands replacing a basic online presence.",
    deliverables: ["Content architecture", "Responsive UI", "CMS-ready build", "Analytics setup"],
    technologies: ["Next.js", "React", "Tailwind", "Vercel"],
  },
  {
    id: "e-commerce-development",
    number: "02",
    title: "E-Commerce Development",
    short: "Online stores and catalogue experiences shaped around discovery, confidence and high-intent buying journeys.",
    outcome: "Premium product presentation, conversion paths, WhatsApp ordering or checkout integration.",
    visual: "Online Store",
    goodFit: "Fashion, gifting, food, furniture and product-led brands.",
    deliverables: ["Store architecture", "Product templates", "Cart or enquiry flow", "Launch support"],
    technologies: ["Next.js", "Shopify", "Stripe", "Supabase"],
  },
  {
    id: "ui-ux-design",
    number: "03",
    title: "UI / UX Design",
    short: "Interface systems that make websites feel distinctive, easy to navigate and aligned with the brand.",
    outcome: "A coherent responsive design direction that balances personality, usability and conversion.",
    visual: "Design System",
    goodFit: "Teams with an existing product, rough idea or inconsistent interface.",
    deliverables: ["Experience strategy", "Wireframes", "Visual system", "Interactive prototype"],
    technologies: ["Figma", "Design systems", "Motion", "Accessibility"],
  },
  {
    id: "custom-web-applications",
    number: "04",
    title: "Custom Web Applications",
    short: "Purpose-built digital tools, portals and operational systems designed around real workflows.",
    outcome: "A scalable application with intentional roles, data flows and maintainable architecture.",
    visual: "Product System",
    goodFit: "Businesses that have outgrown spreadsheets, manual workflows or generic tools.",
    deliverables: ["Workflow mapping", "Application UI", "Backend integration", "Deployment"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    id: "website-redesign",
    number: "05",
    title: "Website Redesign",
    short: "A strategic refresh for websites that feel outdated, unclear, slow or disconnected from the current business.",
    outcome: "Stronger positioning, clearer journeys and a contemporary responsive experience without losing useful content.",
    visual: "Repositioning",
    goodFit: "Established businesses whose website no longer reflects their quality.",
    deliverables: ["Experience audit", "Content restructure", "Visual redesign", "Migration plan"],
    technologies: ["Next.js", "React", "Framer Motion", "Technical SEO"],
  },
  {
    id: "seo-performance",
    number: "06",
    title: "SEO & Performance",
    short: "Technical optimization and information architecture that help people and search engines understand the site.",
    outcome: "Faster pages, cleaner metadata, measurable fundamentals and more discoverable content.",
    visual: "Growth Layer",
    goodFit: "Businesses with slow pages, poor search visibility or unclear landing pages.",
    deliverables: ["Technical audit", "Core Web Vitals", "Metadata", "Measurement plan"],
    technologies: ["Lighthouse", "Search Console", "Schema.org", "Analytics"],
  },
  {
    id: "deployment-domain",
    number: "07",
    title: "Deployment & Domain Setup",
    short: "A calm production launch covering hosting, domains, redirects, SSL and environment configuration.",
    outcome: "A dependable release with clear ownership and no last-minute infrastructure surprises.",
    visual: "Launch Desk",
    goodFit: "Teams preparing a new site or moving away from fragile hosting.",
    deliverables: ["Hosting setup", "Domain connection", "Redirect plan", "Launch checklist"],
    technologies: ["Vercel", "Cloudflare", "DNS", "GitHub"],
  },
  {
    id: "website-maintenance",
    number: "08",
    title: "Website Maintenance",
    short: "Reliable ongoing care for updates, improvements, monitoring and small growth experiments after launch.",
    outcome: "A website that stays current, secure and useful instead of slowly degrading.",
    visual: "Care System",
    goodFit: "Businesses that need a dependable technical partner after launch.",
    deliverables: ["Routine updates", "Monitoring", "Bug fixes", "Iteration support"],
    technologies: ["GitHub", "Vercel", "Analytics", "Uptime monitoring"],
  },
  {
    id: "digital-consulting",
    number: "09",
    title: "Digital Consulting",
    short: "Focused guidance on what to build, how to structure it and which technology fits the business stage.",
    outcome: "A practical direction, prioritized roadmap and fewer expensive wrong turns.",
    visual: "Decision Sprint",
    goodFit: "Founders and teams with a goal but no clear digital plan.",
    deliverables: ["Discovery workshop", "Opportunity map", "Technology direction", "Action roadmap"],
    technologies: ["Research", "Strategy", "Architecture", "Measurement"],
  },
];

export const siteConfig = {
  name: "Sati Tech",
  legalName: "Sati Tech Pvt. Ltd.",
  shortName: "SATI TECH",
  tagline: "Code. Create. Elevate.",
  positioning: "Creative Technology Studio",
  description:
    "Sati Tech designs and develops modern websites, e-commerce experiences and digital systems that help businesses build trust, convert visitors and grow online.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.satitechnologies.com",
  websiteDisplay: "www.satitechnologies.com",
  githubOrg: "satitech-official",
  githubUrl: "https://github.com/satitech-official",
  instagramUrl,
  facebookUrl,
  location: "India",
  logo: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/sati-tech-logo.jpeg`,
  ogImage: "/og.webp",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919131043573",
  whatsappDisplay: "+91 91310 43573",
  contactNumbers: [
    { label: "Primary", display: "+91 91310 43573", href: "tel:+919131043573" },
    { label: "Alternate", display: "+91 97703 94840", href: "tel:+919770394840" },
  ],
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "www.satitechinfo@gmail.com",
  socials: {
    instagram: instagramUrl,
    facebook: facebookUrl,
    github: "https://github.com/satitech-official",
  },
  stats: [
    { label: "Projects", value: "50+", numeric: 50, suffix: "+" },
    { label: "Satisfaction", value: "99%", numeric: 99, suffix: "%" },
    { label: "Support", value: "24/7", numeric: 24, suffix: "/7" },
  ],
  services,
  nav: [
    { label: "Home", href: "/" },
    { label: "Studio", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/#process" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Contact", href: "/contact" },
  ],
};

export function createWhatsAppUrl(message = "Hello Sati Tech, I explored your portfolio and I'm interested in discussing a website/project for my business.") {
  const configuredDigits = String(siteConfig.whatsappNumber || "9131043573").replace(/\D/g, "");
  const digits = configuredDigits.length === 10 ? `91${configuredDigits}` : configuredDigits;
  const safeMessage = String(message || "Hello Sati Tech, I'd like to discuss a project.").trim();
  return `https://wa.me/${digits}?text=${encodeURIComponent(safeMessage)}`;
}

export function configuredSocials() {
  return Object.entries(siteConfig.socials)
    .filter(([, href]) => Boolean(href))
    .map(([key, href]) => ({ key, href }));
}
