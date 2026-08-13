"use client";

import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { configuredSocials, createWhatsAppUrl, siteConfig } from "@/config/site";
import BrandMark from "@/components/brand/BrandMark";

const iconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = configuredSocials();
  const whatsappHref = createWhatsAppUrl();

  return (
    <footer className="section-shell pb-6 pt-16 sm:pt-24">
      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#151515] text-white sm:rounded-[3rem]">
        <div className="grid min-w-0 gap-10 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <BrandMark size={56} />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#CFFF72]" /> Sati Tech Pvt. Ltd.
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-[clamp(2rem,5vw,5.3rem)] font-black uppercase leading-[0.82] tracking-[-0.09em]">
              Let&apos;s build something that matters.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[#CFFF72] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-neutral-950"
                data-cursor="OPEN ↗"
              >
                WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              {siteConfig.contactEmail ? (
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex min-w-0 max-w-full items-center gap-2 break-all rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white"
                  data-cursor="OPEN ↗"
                >
                  {siteConfig.contactEmail} <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              {siteConfig.contactNumbers.map((contact) => (
                <a key={contact.href} href={contact.href} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white">
                  {contact.display} <Phone className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white"
              >
                Explore work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 px-4 py-3 text-xs font-black tracking-[0.05em] text-cyan-200" data-cursor="OPEN ↗">
                <Globe2 className="h-4 w-4" aria-hidden="true" /> {siteConfig.websiteDisplay}
              </a>
            </div>
          </div>

          <div className="grid min-w-0 gap-7 sm:grid-cols-3 lg:grid-cols-2">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Navigate</h2>
              <ul className="mt-4 grid gap-2 text-sm text-white/78">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link className="link-underline" href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Services</h2>
              <ul className="mt-4 grid gap-2 text-sm text-white/78">
                {siteConfig.services.map((service) => (
                  <li key={service.id}>
                    <Link className="link-underline" href={`/services#${service.id}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-3 lg:col-span-2">
              <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Social presence</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map(({ key, href }) => {
                  const Icon = iconMap[key] || ArrowUpRight;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition hover:bg-white hover:text-neutral-950"
                      data-cursor="OPEN ↗"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" /> {key}
                    </a>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/52">
                Follow Sati Tech on Instagram and Facebook for project visuals and studio updates, visit {siteConfig.websiteDisplay}, or use GitHub and WhatsApp for code and direct project conversations.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-[clamp(4rem,19vw,18rem)] font-black uppercase leading-[0.74] tracking-[-0.12em] text-white">
              SATI<br />TECH
            </div>
            <div className="max-w-sm text-sm leading-6 text-white/55 sm:text-right">
              <p>© {year} {siteConfig.legalName}. {siteConfig.tagline}</p>
              <p className="mt-2">{siteConfig.location} · {siteConfig.contactNumbers.map((contact) => contact.display).join(" · ")}</p>
              <p className="mt-1"><a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="text-cyan-200">{siteConfig.websiteDisplay}</a></p>
              <p className="mt-1">{siteConfig.contactEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
