"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, MessageCircle, MousePointer2, Search, Sparkles } from "lucide-react";
import { GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { ActivityList, BrowserPreview, FeaturedProject, ProjectCard } from "@/components/projects/ProjectPieces";
import { cn } from "@/lib/utils";
import { fadeUp, maskReveal, motionTokens, premiumEase, staggerContainer, viewportOnce } from "@/motion/variants";

import { SectionIntro } from "@/components/sections/SectionIntro";

export function AboutStudio() {
  return (
    <section id="about" className="section-shell py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_22px_80px_rgba(21,21,21,0.07)] sm:rounded-[3rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">About Sati Tech</p>
          <h2 className="mt-4 text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.76] tracking-[-0.13em] text-neutral-950">
            Not just<br />websites.<br /><span className="editorial-serif font-normal normal-case tracking-[-0.06em] text-[#4C5CFF]">Digital</span><br />business<br />systems.
          </h2>
        </div>
        <div className="grid gap-5">
          <p className="text-[clamp(1.35rem,3vw,2.4rem)] font-black leading-[1.02] tracking-[-0.055em] text-neutral-950">
            Sati Tech helps businesses move from “we need a website” to a sharper digital presence that explains, sells and supports growth.
          </p>
          <p className="text-base leading-8 text-neutral-600">
            Based on the verified company positioning, the studio works across business websites, e-commerce stores, landing pages, SEO-ready structures, UI/UX design and website support. The work is built mobile-first, designed for trust, and shaped around practical business actions like enquiries, bookings, product discovery and WhatsApp conversations.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Business Websites", "E-Commerce Stores", "SEO Optimized", "UI/UX Design", "Mobile First", "Reliable Support"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/64 p-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#CFFF72]"><Check className="h-4 w-4" aria-hidden="true" /></span>
                <span className="text-sm font-black uppercase tracking-[0.1em] text-neutral-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CountUpStat({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? stat.numeric : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(stat.numeric * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, stat.numeric]);

  return (
    <div ref={ref} className="rounded-[2rem] border border-black/10 bg-white p-5 text-center shadow-[0_18px_60px_rgba(21,21,21,0.06)] sm:p-8">
      <div className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-none tracking-[-0.1em] text-neutral-950">{value}{stat.suffix}</div>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-500">{stat.label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="section-shell py-10 sm:py-16">
      <div className="grid gap-3 sm:grid-cols-3">
        {siteConfig.stats.map((stat) => <CountUpStat key={stat.label} stat={stat} />)}
      </div>
    </section>
  );
}

export function ProjectWall({ projects }) {
  const wallRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion || window.innerWidth < 900 || !wallRef.current || !trackRef.current) return undefined;
    let cleanup = () => {};
    let alive = true;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (!alive) return;
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const distance = Math.max(0, track.scrollWidth - window.innerWidth + 96);
        if (!distance) return;
        gsap.to(track, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wallRef.current,
            start: "top 8%",
            end: () => `+=${distance + 520}`,
            pin: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
      }, wallRef);
      cleanup = () => ctx.revert();
    });

    return () => {
      alive = false;
      cleanup();
    };
  }, [reduceMotion]);

  const wallProjects = projects.slice(0, 8);

  return (
    <section className="section-shell py-16 sm:py-24">
      <SectionIntro eyebrow="Live project wall" title="Scroll through the studio floor." text="A horizontal wall of public project previews. On mobile it becomes a clean stacked gallery for performance and touch usability." />
      <div ref={wallRef} className="hidden overflow-hidden rounded-[2rem] border border-black/10 bg-white/55 p-5 lg:block">
        <div ref={trackRef} className="flex w-max gap-5 py-4">
          {wallProjects.map((project, index) => (
            <article key={project.id} className="wall-panel w-[min(62vw,760px)] shrink-0 rounded-[2rem] bg-[#F7F7F2] p-4">
              <BrowserPreview project={project} compact={false} />
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">{project.industry} · {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-3xl font-black uppercase tracking-[-0.07em]">{project.title}</h3>
                </div>
                {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="rounded-full bg-[#151515] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white" data-cursor="OPEN ↗">View live</a> : <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="rounded-full bg-[#151515] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white" data-cursor="OPEN ↗">GitHub</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:hidden">
        {wallProjects.slice(0, 4).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}

export function ServicesAccordion() {
  const [active, setActive] = useState(siteConfig.services[0]);
  const message = `Hello Sati Tech, I'm interested in your ${active.title} service. I'd like to discuss my requirements.`;

  return (
    <section id="services" className="section-shell py-16 sm:py-24">
      <SectionIntro eyebrow="Services" title="Built around business outcomes." text="Sati Tech offers verified website services across business websites, online stores, UI/UX, SEO foundations and reliable support." />
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
          {siteConfig.services.map((service) => {
            const selected = active.id === service.id;
            return (
              <motion.button
                layout
                key={service.id}
                type="button"
                onMouseEnter={() => setActive(service)}
                onFocus={() => setActive(service)}
                onClick={() => setActive(service)}
                transition={{ duration: motionTokens.fast, ease: premiumEase }}
                className={cn("grid w-full gap-3 border-b border-black/10 p-5 text-left last:border-b-0 sm:grid-cols-[4rem_1fr] sm:items-start", selected ? "bg-[#151515] py-6 text-white" : "bg-white hover:bg-[#F7F7F2]")}
                aria-expanded={selected}
                aria-controls={`service-panel-${service.id}`}
              >
                <motion.span layout className={cn("text-sm font-black uppercase tracking-[0.18em]", selected ? "text-[#CFFF72]" : "text-neutral-400")}>{service.number}</motion.span>
                <span>
                  <motion.span layout className="block text-[clamp(1.6rem,5vw,3.8rem)] font-black uppercase leading-[0.82] tracking-[-0.09em]">{service.title}</motion.span>
                  <AnimatePresence initial={false}>
                    {selected ? (
                      <motion.span
                        id={`service-panel-${service.id}`}
                        initial={{ opacity: 0, height: 0, y: 8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: motionTokens.fast, ease: premiumEase }}
                        className="mt-3 block max-w-2xl overflow-hidden text-sm leading-6 text-white/68"
                      >
                        {service.short}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 8% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -10, clipPath: "inset(8% 0 0 0)" }}
            transition={{ duration: motionTokens.normal, ease: premiumEase }}
            className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#DED9FF] p-6 sm:p-8"
          >
          <div className="absolute right-[-3rem] top-[-3rem] h-44 w-44 rounded-full bg-[#CFFF72]" aria-hidden="true" />
          <div className="relative">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{active.visual}</span>
            <h3 className="mt-7 text-[clamp(2.3rem,8vw,6rem)] font-black uppercase leading-[0.78] tracking-[-0.11em] text-neutral-950">{active.title}</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-700">{active.outcome}</p>
            <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-white/72 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500"><MousePointer2 className="h-4 w-4" aria-hidden="true" /> Mini service demo</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Strategy", "Design", "Build"].map((item) => <div key={item} className="rounded-2xl bg-[#F7F7F2] p-4 text-sm font-black uppercase tracking-[0.1em]">{item}</div>)}
              </div>
            </div>
            <a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white" data-cursor="OPEN ↗">
              Discuss this service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

