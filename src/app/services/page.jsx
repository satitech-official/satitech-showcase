import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import { createWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata = {
  title: "Services",
  description: "Sati Tech services include business website development, e-commerce stores, UI/UX design, SEO growth foundations and website support.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="section-shell service-page">
      <section className="service-page-hero">
        <p className="page-kicker">Services</p>
        <h1>Digital work, made clear and useful.</h1>
        <p>Choose the direction that fits your next step. Every engagement is designed around clarity, quality and a result you can use.</p>
      </section>

      <section className="service-page-list" aria-label="Sati Tech services">
        {siteConfig.services.map((service) => {
          const message = `Hello Sati Tech, I'm interested in your ${service.title} service. I'd like to discuss my requirements.`;
          return (
            <article key={service.id} id={service.id} className="service-page-card">
              <div className="service-page-card-number">{service.number}</div>
              <div className="service-page-card-main">
                <h2>{service.title}</h2>
                <p>{service.short}</p>
              </div>
              <div className="service-page-card-details">
                <ul>
                  {service.deliverables.slice(0, 3).map((item) => (
                    <li key={item}><Check className="h-3.5 w-3.5" aria-hidden="true" /> {item}</li>
                  ))}
                </ul>
                <a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer noopener" className="service-page-card-link" data-cursor="OPEN ↗">
                  Discuss service <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <section className="service-page-cta">
        <div>
          <p className="page-kicker">Not sure where to start?</p>
          <h2>Tell us the goal. We’ll shape the right next step.</h2>
        </div>
        <Link href="/contact" className="studio-link-button">Open enquiry form <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
