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

export function AllProjectsPreview({ projects }) {
  return (
    <section className="section-shell py-16 sm:py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionIntro eyebrow="Project explorer" title="More public work, always updating." text="New public repositories can appear through the GitHub integration without manually rewriting homepage project JSX." />
        <Link href="/work" className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white sm:mb-12">
          Browse all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.slice(0, 6).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}

export function WhyChooseSati() {
  const reasons = [
    { number: "01", title: "Strategy before screens", text: "Every build starts with the audience, offer and business action the experience needs to support." },
    { number: "02", title: "Design and code together", text: "Visual craft, responsive behaviour and implementation decisions are shaped as one connected system." },
    { number: "03", title: "Performance is part of quality", text: "Mobile-first layouts, optimized media and accessible interactions keep the experience useful beyond the first impression." },
    { number: "04", title: "Support beyond launch", text: "Clear handoff and reliable ongoing support help the website stay relevant as the business moves forward." },
  ];

  return (
    <section className="section-shell py-16 sm:py-24">
      <SectionIntro eyebrow="Why Sati Tech" title="A technical partner, not a page factory." text="Focused decisions, transparent delivery and digital craft designed around real business momentum." />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {reasons.map((reason, index) => (
          <motion.article
            key={reason.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: index * 0.05 }}
            className="glass-panel rounded-[2rem] p-5 sm:p-6"
          >
            <span className="font-mono text-xs font-bold tracking-[0.18em] text-cyan-300">{reason.number} / SATI</span>
            <h3 className="mt-9 text-2xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-white">{reason.title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">{reason.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function CompleteProjectGallery({ projects }) {
  const filters = ["All Projects", "Business Websites", "E-Commerce", "UI/UX", "Branding", "Other"];
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const searchable = `${project.title} ${project.summary} ${project.category} ${project.industry} ${project.technologies.join(" ")}`.toLowerCase();
    const matchesQuery = searchable.includes(query.trim().toLowerCase());
    if (!matchesQuery || activeFilter === "All Projects") return matchesQuery;

    const tags = [];
    if (project.category === "E-Commerce") tags.push("E-Commerce");
    if (["Business", "Restaurant", "Hospitality", "Tourism"].includes(project.category)) tags.push("Business Websites");
    if (project.industry === "Creative Studio" || project.repoName === "satitech-showcase") tags.push("UI/UX");
    if (project.industry === "Fashion") tags.push("Branding");
    if (project.repoName === "indias-got-latent-site") tags.push("Other");
    return tags.includes(activeFilter);
  }), [activeFilter, projects, query]);

  return (
    <section id="projects" className="section-shell scroll-mt-20 py-16 sm:py-24">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionIntro eyebrow="Explore Projects" title="Every public build. One visual library." text="Search and filter every Sati Tech project. Each card uses its own optimized real screenshot, verified repository link and a live demo only when one is confirmed." />
        <div className="mb-8 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200 sm:mb-12">{filteredProjects.length} of {projects.length} projects</div>
      </div>
      <div className="mb-8 grid gap-4 rounded-[2rem] border border-white/10 bg-[#071126]/80 p-4 sm:p-5 lg:grid-cols-[minmax(240px,0.65fr)_1fr] lg:items-center">
        <label className="flex min-h-12 items-center gap-3 rounded-full border border-white/12 bg-white/7 px-4 text-white focus-within:border-cyan-300/60">
          <Search className="h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500" />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Project filters">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={cn("min-h-10 rounded-full border px-3.5 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] transition", activeFilter === filter ? "border-cyan-300 bg-cyan-300 text-[#03101e]" : "border-white/12 bg-white/5 text-slate-300 hover:border-cyan-300/50 hover:text-white")}>
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </AnimatePresence>
      </div>
      {!filteredProjects.length ? <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-slate-300">No projects match this search yet.</div> : null}
    </section>
  );
}

export function InstagramShowcase({ projects }) {
  const showcase = projects.slice(-6);

  return (
    <section id="instagram" className="section-shell py-16 sm:py-24">
      <div className="instagram-shell overflow-hidden rounded-[2rem] p-5 sm:rounded-[3rem] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow-label text-fuchsia-300">Sati / Instagram</p>
            <h2 className="display-type mt-5 max-w-5xl text-[clamp(2.7rem,8vw,7rem)] uppercase leading-[0.82] text-white">Work in pixels.<br /><span className="text-gradient-tech">Ideas in motion.</span></h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">A social-style edit of real Sati Tech project captures—no scraped posts, placeholders or invented campaigns.</p>
          </div>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-500 px-5 text-xs font-black uppercase tracking-[0.14em] text-[#030712] shadow-[0_0_40px_rgba(34,211,238,0.22)]" data-cursor="OPEN ↗">
            Follow @satitech.official <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {showcase.map((project, index) => (
            <motion.a
              key={project.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="instagram-tile group relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#071126] sm:rounded-[1.7rem]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.045, duration: 0.45 }}
              aria-label={`See ${project.title} and follow Sati Tech on Instagram`}
              data-cursor="OPEN ↗"
            >
              <Image src={project.image} alt={project.imageAlt || `${project.title} project preview`} fill sizes="(max-width: 640px) 48vw, (max-width: 1024px) 46vw, 31vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.035]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-transparent to-transparent" />
              <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                <span className="min-w-0">
                  <span className="block truncate text-[0.58rem] font-black uppercase tracking-[0.17em] text-cyan-200">{project.industry}</span>
                  <span className="mt-1 block truncate text-sm font-black uppercase tracking-[-0.04em] text-white sm:text-lg">{project.title}</span>
                </span>
                <InstagramIcon className="h-5 w-5 shrink-0 text-white" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="section-shell py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#DED9FF] p-6 sm:rounded-[3rem] sm:p-10 lg:p-14">
        <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-[#CFFF72]" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Contact</p>
          <h2 className="mt-4 text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-[0.76] tracking-[-0.13em] text-neutral-950">Have an idea?<br />Let’s turn it into something people remember.</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white" data-cursor="OPEN ↗">
              Start on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">
              Open enquiry form <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

