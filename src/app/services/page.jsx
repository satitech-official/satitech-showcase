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
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-8 lg:p-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Services</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(3.2rem,12vw,10rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">Digital services for business growth.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">Verified Sati Tech offerings include business websites, e-commerce stores, SEO, UI/UX design and website support — presented as practical service systems rather than generic packages.</p>
      </section>

      <section className="mt-8 grid gap-5">
        {siteConfig.services.map((service) => {
          const message = `Hello Sati Tech, I'm interested in your ${service.title} service. I'd like to discuss my requirements.`;
          return (
            <article key={service.id} id={service.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 sm:rounded-[3rem] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
                <div>
                  <span className="text-sm font-black uppercase tracking-[0.22em] text-[#4C5CFF]">{service.number}</span>
                  <h2 className="mt-4 text-[clamp(2.4rem,8vw,6.2rem)] font-black uppercase leading-[0.78] tracking-[-0.12em] text-neutral-950">{service.title}</h2>
                </div>
                <div>
                  <p className="text-xl font-black leading-snug tracking-[-0.045em] text-neutral-950">{service.short}</p>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{service.outcome}</p>
                  <div className="mt-6 grid gap-3 lg:grid-cols-3">
                    <div className="rounded-2xl bg-[#F7F7F2] p-4">
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-neutral-400">Good fit for</p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-neutral-700">{service.goodFit}</p>
                    </div>
                    <div className="rounded-2xl bg-[#F7F7F2] p-4">
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-neutral-400">Deliverables</p>
                      <div className="mt-3 grid gap-2">{service.deliverables.map((item) => <span key={item} className="flex items-center gap-2 text-sm font-semibold text-neutral-700"><Check className="h-3.5 w-3.5 text-[#4C5CFF]" aria-hidden="true" /> {item}</span>)}</div>
                    </div>
                    <div className="rounded-2xl bg-[#F7F7F2] p-4">
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-neutral-400">Technology</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">{service.technologies.map((item) => <span key={item} className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-neutral-600">{item}</span>)}</div>
                    </div>
                  </div>
                  <a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer noopener" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white" data-cursor="OPEN ↗">
                    Discuss this service <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-12 rounded-[2rem] border border-black/10 bg-[#DED9FF] p-6 sm:rounded-[3rem] sm:p-10">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Not sure where to start?</p>
            <h2 className="mt-2 text-[clamp(2rem,5vw,4.6rem)] font-black uppercase leading-[0.82] tracking-[-0.1em]">Share the goal. Sati Tech can recommend the right direction.</h2>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">Open enquiry form <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
