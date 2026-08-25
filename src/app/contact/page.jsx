import { Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import BrandMark from "@/components/brand/BrandMark";
import { createWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact",
  description: "Contact Sati Tech for business websites, e-commerce stores, UI/UX, SEO-ready web experiences and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="section-shell contact-page">
      <section className="contact-page-layout">
        <div className="contact-page-intro">
          <BrandMark size={58} priority className="contact-page-mark" />
          <p className="page-kicker">Start a project</p>
          <h1>Tell us what you need.</h1>
          <p>Share a few details and we’ll help you find the clearest route to a stronger digital presence.</p>

          <div className="contact-page-direct">
            <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="contact-page-whatsapp" data-cursor="OPEN ↗">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Talk on WhatsApp
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`}><Mail className="h-4 w-4" aria-hidden="true" /><span>{siteConfig.contactEmail}</span></a>
            {siteConfig.contactNumbers.slice(0, 1).map((contact) => (
              <a key={contact.href} href={contact.href}><Phone className="h-4 w-4" aria-hidden="true" /><span>{contact.display}</span></a>
            ))}
          </div>
        </div>
        <div className="contact-page-form"><ContactForm source="contact-page" /></div>
      </section>
    </main>
  );
}
