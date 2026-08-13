import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { siteConfig } from "@/config/site";

const sameAs = Object.values(siteConfig.socials).filter(Boolean);
const title = "Sati Tech — Digital Experiences That Move Businesses Forward";
const description = siteConfig.description;

export const metadata = {
  applicationName: siteConfig.legalName,
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s — Sati Tech",
  },
  description,
  keywords: [
    "Sati Tech",
    "Sati Technologies",
    "web development agency India",
    "business website development",
    "e-commerce website design",
    "Next.js portfolio",
    "UI UX design",
    "SEO website development",
    "creative technology studio",
    "Three.js web experiences",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: siteConfig.logo,
    shortcut: siteConfig.logo,
    apple: siteConfig.logo,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1731,
        height: 909,
        alt: "Sati Tech — We build digital experiences that move businesses forward",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  sameAs,
  email: siteConfig.contactEmail,
  contactPoint: siteConfig.contactNumbers.map((contact) => ({
    "@type": "ContactPoint",
    telephone: contact.display,
    contactType: contact.label === "Primary" ? "customer support" : "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/work?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
