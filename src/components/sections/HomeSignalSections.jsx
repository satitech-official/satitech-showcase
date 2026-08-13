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

export function IndustryExplorer({ projects }) {
  const industries = Array.from(new Set(projects.map((project) => project.industry))).filter(Boolean);
  return (
    <section className="section-shell py-16 sm:py-24">
      <SectionIntro eyebrow="Industries" title="Range without losing focus." text="The repository portfolio shows work across fashion, food, healthcare, sports, automotive, architecture, tourism, hospitality and business websites." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => {
          const related = projects.filter((project) => project.industry === industry).slice(0, 3);
          return (
            <Link key={industry} href={`/work?category=${encodeURIComponent(industry)}`} className="group min-h-[190px] rounded-[2rem] border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#4C5CFF]/40 hover:shadow-[0_22px_80px_rgba(21,21,21,0.09)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                <ArrowUpRight className="h-5 w-5 text-neutral-400 transition group-hover:rotate-12 group-hover:text-[#4C5CFF]" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-[clamp(1.8rem,5vw,3.4rem)] font-black uppercase leading-[0.78] tracking-[-0.09em] text-neutral-950">{industry}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-500">{related.map((item) => item.title).join(" · ") || "Explore related projects"}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function TechCapabilities({ technologies }) {
  const tech = (technologies?.length ? technologies : ["Next.js", "React", "JavaScript", "Tailwind", "GSAP", "Framer Motion", "GitHub", "SEO"]).slice(0, 12);
  const [activeTech, setActiveTech] = useState("");
  const reduceMotion = useReducedMotion();
  const descriptions = {
    "Next.js": "Server-rendered React architecture for fast, scalable business experiences.",
    React: "Reusable interface systems with maintainable component architecture.",
    JavaScript: "Reliable interaction logic for modern browser experiences.",
    TypeScript: "Structured application code used across current public projects.",
    Tailwind: "Responsive visual systems built with consistent spacing and tokens.",
    GSAP: "Controlled scroll choreography and cinematic interface motion.",
    "Framer Motion": "Purposeful layout, reveal and interaction animation.",
    GitHub: "Transparent public project delivery and continuously synced repository data.",
  };
  const activeDescription = descriptions[activeTech] || "A project-backed toolkit for design, development, motion and dependable delivery.";

  return (
    <section id="capabilities" className="section-shell py-16 sm:py-24">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <SectionIntro eyebrow="Capabilities" title="A stack for modern web experiences." text="Capabilities are pulled from the project repository language and metadata layer, then presented as a flexible technology constellation." />
        <div className="min-w-0">
          <div className="relative mx-auto hidden max-w-[620px] lg:block">
            <div className="tech-orbit">
              <div className="absolute inset-0 z-10 grid place-items-center px-36 text-center">
                <motion.div key={activeTech || "default"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionTokens.fast, ease: premiumEase }}>
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[#4C5CFF]">{activeTech || "Digital systems"}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">{activeDescription}</p>
                </motion.div>
              </div>
              {tech.map((item, index) => {
                const angle = ((Math.PI * 2) / tech.length) * index - Math.PI / 2;
                const radius = index % 2 ? 44 : 36;
                const left = 50 + Math.cos(angle) * radius;
                const top = 50 + Math.sin(angle) * radius;
                const dimmed = activeTech && activeTech !== item;
                return (
                  <span key={item} className="absolute z-20" style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}>
                    <motion.button
                      type="button"
                      onMouseEnter={() => setActiveTech(item)}
                      onMouseLeave={() => setActiveTech("")}
                      onFocus={() => setActiveTech(item)}
                      onBlur={() => setActiveTech("")}
                      animate={{ y: reduceMotion ? 0 : [0, index % 2 ? -5 : 5, 0], opacity: dimmed ? 0.34 : 1, scale: activeTech === item ? 1.05 : 1 }}
                      transition={{ y: { duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * -0.35 }, opacity: { duration: motionTokens.fast }, scale: { duration: motionTokens.fast } }}
                      className="whitespace-nowrap rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-[0_10px_30px_rgba(21,21,21,0.08)]"
                      aria-label={`${item}: ${descriptions[item] || activeDescription}`}
                    >
                      {item}
                    </motion.button>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-3 lg:hidden no-scrollbar">
            {tech.map((item) => <span key={item} className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-700">{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SatiSignalNetwork({ projects }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const signalProjects = projects.filter((project) => project.image).slice(0, 4);
  const activeProject = signalProjects[activeIndex] || signalProjects[0];
  const positions = [
    { left: "3%", top: "9%" },
    { right: "3%", top: "9%" },
    { left: "3%", bottom: "9%" },
    { right: "3%", bottom: "9%" },
  ];

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion || !pageVisible || signalProjects.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % signalProjects.length), 2800);
    return () => window.clearInterval(timer);
  }, [pageVisible, reduceMotion, signalProjects.length]);

  if (!activeProject) return null;

  return (
    <section className="section-shell py-16 sm:py-24" aria-labelledby="sati-signal-title">
      <SectionIntro eyebrow="Sati signal network" title="Code connects. Ideas move. Businesses grow." text="An interactive, live-moving Sati Tech system: real project images flow through strategy, design and development into launch-ready digital experiences." />
      <div className="signal-network-shell grid gap-5 rounded-[2rem] p-4 sm:rounded-[3rem] sm:p-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
        <div className="sati-signal-network" role="group" aria-label="Interactive Sati Tech project network">
          <div className="signal-grid" aria-hidden="true" />
          <div className="signal-ring signal-ring-one" aria-hidden="true" />
          <div className="signal-ring signal-ring-two" aria-hidden="true" />
          <div className="signal-beam signal-beam-one" aria-hidden="true"><span /></div>
          <div className="signal-beam signal-beam-two" aria-hidden="true"><span /></div>
          <div className="signal-beam signal-beam-three" aria-hidden="true"><span /></div>
          <div className="signal-beam signal-beam-four" aria-hidden="true"><span /></div>

          <div className="signal-core">
            <span className="signal-core-pulse" aria-hidden="true" />
            <Image src={siteConfig.logo} alt="Sati Tech signal network core" fill sizes="112px" className="object-cover" />
          </div>
          <div className="signal-word signal-word-code">Code</div>
          <div className="signal-word signal-word-create">Create</div>
          <div className="signal-word signal-word-elevate">Elevate</div>

          {signalProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={cn("signal-project-node", activeIndex === index && "is-active")}
              style={positions[index]}
              aria-label={`Show ${project.title} signal`}
              aria-pressed={activeIndex === index}
            >
              <Image src={project.image} alt="" fill sizes="(max-width: 640px) 95px, 135px" className="object-cover object-top" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="signal-project-detail">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-cyan-200"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" /> Live project signal</span>
            <span className="font-mono text-[0.62rem] text-slate-500">{String(activeIndex + 1).padStart(2, "0")} / {String(signalProjects.length).padStart(2, "0")}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeProject.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: premiumEase }}>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816]">
                <Image src={activeProject.image} alt={activeProject.imageAlt || `${activeProject.title} project image`} fill sizes="(max-width: 1024px) 92vw, 580px" className="object-cover object-top" />
                <div className="project-image-scan" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712] to-transparent" />
              </div>
              <p className="mt-5 text-[0.62rem] font-black uppercase tracking-[0.18em] text-cyan-200">{activeProject.industry} · Real project capture</p>
              <h3 id="sati-signal-title" className="mt-2 text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.82] tracking-[-0.085em] text-white">{activeProject.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">{activeProject.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/work/${activeProject.slug}`} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#03101e]">Open project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                <a href={activeProject.githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white" data-cursor="OPEN ↗"><GitHubIcon className="h-4 w-4" /> GitHub</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function GitHubActivity({ projects }) {
  return (
    <section className="section-shell py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionIntro eyebrow="Built in public" title="Latest repository activity." text="Recent public repository updates are fetched from GitHub so the portfolio reflects the studio's active work over time." />
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white" data-cursor="OPEN ↗">
            View all on GitHub <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
        <ActivityList projects={projects} />
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  const processRef = useRef(null);
  const progressRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const phases = ["Discover", "Strategize", "Design", "Develop", "Test", "Launch", "Support"];

  useLayoutEffect(() => {
    if (reduceMotion || !processRef.current || !progressRef.current) return undefined;
    let cleanup = () => {};
    let alive = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (!alive) return;
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: processRef.current,
          start: "top 35%",
          end: "bottom 72%",
          scrub: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleY(${self.progress})`;
          },
        });
      }, processRef);
      cleanup = () => ctx.revert();
    });
    return () => {
      alive = false;
      cleanup();
    };
  }, [reduceMotion]);

  return (
    <section ref={processRef} id="process" className="section-shell py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionIntro eyebrow="Process" title="Calm process. Sharp output." text="A seven-stage studio workflow that creates clarity before craft and keeps launch practical." />
          <div className="hidden h-44 w-px overflow-hidden bg-black/10 lg:block" aria-hidden="true">
            <div ref={progressRef} className="h-full w-full origin-top scale-y-0 bg-[#4C5CFF]" />
          </div>
        </div>
        <div className="relative grid gap-3">
          {phases.map((phase, index) => (
            <motion.div
              key={phase}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={viewportOnce}
              className="process-card grid gap-4 rounded-[1.75rem] border border-black/10 bg-white p-4 sm:grid-cols-[5rem_1fr] sm:items-center sm:p-5 sm:pl-0"
            >
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[#151515] text-sm font-black text-white sm:mx-auto">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-[clamp(1.7rem,4vw,3.2rem)] font-black uppercase leading-none tracking-[-0.08em] text-neutral-950">{phase}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                  {index === 0 && "Understand goals, offers, audience, references and the business action the website must support."}
                  {index === 1 && "Turn requirements into a page structure, content hierarchy and practical launch direction."}
                  {index === 2 && "Create a premium responsive visual system with clear navigation and conversion-focused sections."}
                  {index === 3 && "Develop fast, responsive pages with motion details, SEO fundamentals and maintainable components."}
                  {index === 4 && "Check responsiveness, forms, links, performance, accessibility and production readiness."}
                  {index === 5 && "Deploy the website, connect contact actions and ensure the live experience is usable."}
                  {index === 6 && "Provide support for updates, improvements and ongoing website care after launch."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceMatcher() {
  const needs = [
    { label: "I don't have a website", services: ["Web Development", "UI / UX Design", "Deployment & Domain Setup"] },
    { label: "My current website looks outdated", services: ["Website Redesign", "UI / UX Design", "SEO & Performance"] },
    { label: "I need an online store", services: ["E-Commerce Development", "UI / UX Design", "Deployment & Domain Setup"] },
    { label: "I want more enquiries", services: ["SEO & Performance", "Website Redesign", "Digital Consulting"] },
    { label: "I need online booking", services: ["Custom Web Applications", "Web Development", "Digital Consulting"] },
    { label: "I need custom software", services: ["Custom Web Applications", "UI / UX Design", "Digital Consulting"] },
    { label: "My site is slow", services: ["SEO & Performance", "Website Maintenance", "Website Redesign"] },
    { label: "I need redesign / branding", services: ["Website Redesign", "UI / UX Design", "Digital Consulting"] },
  ];
  const [need, setNeed] = useState(needs[0]);
  const message = `Hello Sati Tech, ${need.label}. I saw your recommended services (${need.services.join(", ")}) and would like to discuss the right direction for my business.`;

  return (
    <section className="section-shell py-16 sm:py-24">
      <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 sm:rounded-[3rem] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Service matcher</p>
            <h2 className="mt-4 text-[clamp(2.6rem,8vw,6.7rem)] font-black uppercase leading-[0.78] tracking-[-0.12em]">What does your business need?</h2>
            <p className="mt-5 text-base leading-7 text-neutral-600">Choose the situation that feels closest. The matcher recommends a practical service combination and carries the context into WhatsApp.</p>
          </div>
          <div className="grid gap-5">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Current situation</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {needs.map((option) => <button key={option.label} type="button" onClick={() => setNeed(option)} className={cn("rounded-full border px-4 py-2 text-xs font-black tracking-[-0.01em] transition", need.label === option.label ? "border-[#151515] bg-[#151515] text-white" : "border-black/10 bg-[#F7F7F2] text-neutral-600 hover:border-[#4C5CFF]/40")}>{option.label}</button>)}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#F7F7F2] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Recommended service mix</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {need.services.map((service, index) => <div key={service} className="rounded-2xl border border-black/10 bg-white p-4"><span className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#4C5CFF]">0{index + 1}</span><strong className="mt-2 block text-sm leading-5 text-neutral-950">{service}</strong></div>)}
              </div>
              <a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer noopener" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#CFFF72] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">
                Discuss this project <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

