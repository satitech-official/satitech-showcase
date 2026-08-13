import { Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import ContactForm from "@/components/forms/ContactForm";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import BrandMark from "@/components/brand/BrandMark";

export const metadata = {
  title: "Contact",
  description: "Contact Sati Tech for business websites, e-commerce stores, UI/UX, SEO-ready web experiences and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <section className="grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-28">
          <div className="min-w-0 rounded-[2rem] border border-black/10 bg-[#DED9FF] p-5 sm:rounded-[3rem] sm:p-8">
            <BrandMark size={80} priority className="mb-6" />
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Contact Sati Tech Pvt. Ltd.</p>
            <h1 className="mt-4 text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">Have an idea? Let’s make it real.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700">Share your requirement and get a direct project conversation for a website, e-commerce store, UI/UX improvement or custom digital platform.</p>
          </div>
          <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm font-black uppercase tracking-[0.1em] text-neutral-950" data-cursor="OPEN ↗">
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp</span>
              <span>{siteConfig.whatsappDisplay}</span>
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm font-black tracking-[-0.02em] text-neutral-950">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.1em]"><Mail className="h-4 w-4" aria-hidden="true" /> Email</span>
              <span className="min-w-0 break-all text-right text-xs sm:text-sm">{siteConfig.contactEmail}</span>
            </a>
            {siteConfig.contactNumbers.map((contact) => (
              <a key={contact.href} href={contact.href} className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm font-black uppercase tracking-[0.1em] text-neutral-950">
                <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden="true" /> {contact.label}</span>
                <span>{contact.display}</span>
              </a>
            ))}
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-cyan-300/20 bg-[#08142d]/90 p-5 text-sm font-black uppercase tracking-[0.1em] text-white" data-cursor="OPEN ↗">
              <span className="inline-flex items-center gap-2"><InstagramIcon className="h-4 w-4" /> Instagram</span>
              <span className="text-cyan-200">@satitech.official</span>
            </a>
            <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer noopener" className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-blue-300/20 bg-[#08142d]/90 p-5 text-sm font-black uppercase tracking-[0.1em] text-white" data-cursor="OPEN ↗">
              <span className="inline-flex items-center gap-2"><FacebookIcon className="h-4 w-4" /> Facebook</span>
              <span className="text-blue-200">Official profile</span>
            </a>
            <a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-cyan-300/20 bg-[#08142d]/90 p-5 text-sm font-black text-white" data-cursor="OPEN ↗">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.1em]"><Globe2 className="h-4 w-4" /> Website</span>
              <span className="text-cyan-200">{siteConfig.websiteDisplay}</span>
            </a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" className="flex min-w-0 items-center justify-between gap-3 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm font-black uppercase tracking-[0.1em] text-neutral-950" data-cursor="OPEN ↗">
              <span className="inline-flex items-center gap-2"><GitHubIcon className="h-4 w-4" /> GitHub</span>
              <span>satitech-official</span>
            </a>
          </div>
        </div>
        <ContactForm source="contact-page" />
      </section>
    </main>
  );
}
