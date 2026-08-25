"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, Search } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import BrandMark from "@/components/brand/BrandMark";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header({ openCommand }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const startMessage = "Hello Sati Tech, I explored your portfolio and I'm interested in discussing a website/project for my business.";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-[1520px] items-center justify-between rounded-full border px-2.5 transition-all duration-300 sm:px-3.5",
          scrolled
            ? "border-black/10 bg-white/[0.86] py-2 shadow-[0_16px_45px_rgba(21,21,21,0.08)] backdrop-blur-2xl"
            : "border-black/[0.06] bg-white/[0.48] py-2.5 backdrop-blur-lg",
        )}
      >
        <Link href="/" className="group rounded-full transition-transform duration-300 hover:-rotate-1" aria-label="Sati Tech home">
          <BrandMark size={44} priority showWordmark className="max-w-[14rem]" />
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full border border-black/[0.08] bg-[#F4F4EE]/80 p-1 xl:flex" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => {
            const path = item.href.split("#")[0];
            const active = item.href === "/" ? pathname === "/" : path !== "/" && pathname.startsWith(path);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.67rem] font-bold uppercase tracking-[0.08em] transition",
                  active ? "bg-[#151515] text-white" : "text-neutral-600 hover:bg-black/[0.045] hover:text-neutral-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommand}
            className="studio-search-trigger hidden items-center md:inline-flex"
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-neutral-800 transition hover:border-[#4C5CFF]/40 hover:text-[#4C5CFF]"
            aria-label="Open Sati Tech GitHub"
            data-cursor="OPEN ↗"
          >
            <GitHubIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={createWhatsAppUrl(startMessage)}
            target="_blank"
            rel="noreferrer noopener"
            className="action-primary hidden items-center gap-2 rounded-full bg-[#151515] px-4 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.13em] text-white hover:bg-[#4C5CFF] xl:inline-flex"
            data-cursor="OPEN ↗"
          >
            Start a project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <details className="mobile-menu-native xl:hidden">
            <summary className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/80 text-neutral-950" aria-label="Open navigation">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="mobile-menu-panel rounded-[1.45rem] border border-black/10 bg-white/[0.98] p-3 shadow-[0_24px_90px_rgba(21,21,21,0.16)] backdrop-blur-2xl">
              <p className="rounded-2xl bg-[#f7f7f2] px-3 py-2.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-neutral-500">Navigate</p>
              <nav className="mt-2 grid gap-1.5" aria-label="Mobile navigation">
                {siteConfig.nav.map((item, index) => (
                  <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 py-3.5 text-[1.05rem] font-black uppercase leading-none tracking-[-0.055em] text-neutral-950">
                    <span>{item.label}</span><span className="text-[0.62rem] font-bold tracking-[0.08em] text-neutral-400">0{index + 1}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                <a href={createWhatsAppUrl(startMessage)} target="_blank" rel="noreferrer noopener" className="mobile-action-whatsapp inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-[0.68rem] font-black uppercase tracking-[0.1em]"><MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp</a>
                <a href={`mailto:${siteConfig.contactEmail}`} className="mobile-action-email inline-flex min-h-11 items-center justify-center rounded-full px-3 text-[0.66rem] font-black">Email us</a>
                <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" className="mobile-action-github inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-[0.68rem] font-black uppercase tracking-[0.1em]"><GitHubIcon className="h-4 w-4" /> GitHub</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
