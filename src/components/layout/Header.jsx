"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, Search, X } from "lucide-react";
import { FacebookIcon, GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import BrandMark from "@/components/brand/BrandMark";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header({ openCommand }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const startMessage = "Hello Sati Tech, I explored your portfolio and I'm interested in discussing a website/project for my business.";

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
            className="hidden rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral-700 transition hover:border-[#4C5CFF]/40 hover:text-[#4C5CFF] md:inline-flex"
            aria-label="Open command palette"
          >
            <Search className="mr-2 h-3.5 w-3.5" aria-hidden="true" /> Ctrl K
          </button>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-neutral-800 transition hover:border-[#22d3ee]/50 hover:text-[#22d3ee]"
            aria-label="Follow Sati Tech on Instagram"
            data-cursor="OPEN ↗"
          >
            <InstagramIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={siteConfig.facebookUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-neutral-800 transition hover:border-[#60a5fa]/50 hover:text-[#60a5fa] sm:grid"
            aria-label="Follow Sati Tech on Facebook"
            data-cursor="OPEN ↗"
          >
            <FacebookIcon className="h-4.5 w-4.5" />
          </a>
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
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/80 text-neutral-950 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu-panel mx-auto mt-3 max-w-[1520px] rounded-[2rem] border border-black/10 bg-white/[0.96] p-4 shadow-[0_24px_90px_rgba(21,21,21,0.16)] backdrop-blur-2xl xl:hidden"
          >
            <div className="flex items-center justify-between rounded-3xl bg-[#f7f7f2] p-3">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Navigate</span>
              <button type="button" onClick={() => { setOpen(false); openCommand(); }} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-neutral-700">
                <Search className="h-3.5 w-3.5" aria-hidden="true" /> Search
              </button>
            </div>
            <nav className="mt-4 grid gap-2" aria-label="Mobile navigation">
              {siteConfig.nav.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.035 * index }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="group flex items-center justify-between rounded-3xl border border-black/10 bg-white px-4 py-4 text-[clamp(1.25rem,8vw,2.8rem)] font-black uppercase leading-none tracking-[-0.06em] text-neutral-950">
                    <span>{item.label}</span><span className="text-sm font-bold tracking-normal text-neutral-400">0{index + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <a href={createWhatsAppUrl(startMessage)} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#CFFF72] px-4 text-sm font-black uppercase tracking-[0.1em] text-neutral-950">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-black text-neutral-950">Email us</a>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#101a36] px-4 text-sm font-black uppercase tracking-[0.1em] text-white"><InstagramIcon className="h-4 w-4" /> Instagram</a>
              <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-300/20 bg-[#101a36] px-4 text-sm font-black uppercase tracking-[0.1em] text-white"><FacebookIcon className="h-4 w-4" /> Facebook</a>
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-4 text-sm font-black uppercase tracking-[0.1em] text-white"><GitHubIcon className="h-4 w-4" /> GitHub</a>
              <a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/20 bg-[#071126] px-4 text-xs font-black text-cyan-200">{siteConfig.websiteDisplay}</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
