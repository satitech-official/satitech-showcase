"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import BrandMark from "@/components/brand/BrandMark";

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = createWhatsAppUrl("Hello Sati Tech, I would like to discuss a new website or digital project.");

  return (
    <footer className="premium-footer">
      <div className="premium-footer-panel">
        <div className="premium-footer-top">
          <div>
            <div className="premium-footer-brand"><BrandMark size={42} /><span>Independent digital studio</span></div>
            <h2>Make the next<br /><em>move count.</em></h2>
          </div>
          <div className="premium-footer-brief">
            <span>New projects</span>
            <p>Websites, commerce and digital systems built with clarity from the first conversation.</p>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </div>
          <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="premium-button premium-button-coral" data-cursor="OPEN ↗">Start a project <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="premium-footer-links">
          <nav aria-label="Footer navigation">
            {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="premium-footer-contact">
            <a href={`mailto:${siteConfig.contactEmail}`}><Mail aria-hidden="true" />{siteConfig.contactEmail}</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer noopener" data-cursor="OPEN ↗"><MessageCircle aria-hidden="true" />WhatsApp</a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" data-cursor="OPEN ↗"><GitHubIcon aria-hidden="true" />GitHub</a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" data-cursor="OPEN ↗"><InstagramIcon aria-hidden="true" />Instagram</a>
          </div>
        </div>

        <div className="premium-footer-bottom">
          <div className="footer-wordmark" aria-label="Sati Tech">Sati <span>Tech</span></div>
          <p>© {year} {siteConfig.legalName}. {siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
