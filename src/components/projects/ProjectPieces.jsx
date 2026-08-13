"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { createWhatsAppUrl } from "@/config/site";
import { cn, formatDate, getInitials, truncate } from "@/lib/utils";
import { fadeUp, imageReveal, scaleIn, viewportOnce } from "@/motion/variants";

function colorFromString(value = "sati") {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = value.charCodeAt(index) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return {
    a: `hsl(${hue} 92% 64%)`,
    b: `hsl(${(hue + 58) % 360} 88% 82%)`,
    c: `hsl(${(hue + 126) % 360} 95% 90%)`,
  };
}

export function ProjectFallbackVisual({ project, compact = false }) {
  const colors = useMemo(() => colorFromString(project?.repoName || project?.title), [project]);
  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden p-5 text-neutral-950"
      style={{ background: `radial-gradient(circle at 20% 20%, ${colors.b}, transparent 34%), radial-gradient(circle at 82% 12%, ${colors.c}, transparent 31%), linear-gradient(135deg, #fff, ${colors.a})` }}
    >
      <div className="absolute inset-0 studio-grid opacity-40" aria-hidden="true" />
      <div className="relative flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
        <span>{project?.industry || "Digital"}</span>
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="relative">
        <div className={cn("font-black uppercase leading-[0.78] tracking-[-0.12em]", compact ? "text-7xl" : "text-[clamp(5rem,10vw,10rem)]")}>{getInitials(project?.title)}</div>
        <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-neutral-800">{project?.summary}</p>
      </div>
    </div>
  );
}

export function BrowserPreview({ project, className, priority = false, compact = false, showSource = false }) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: previewRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], compact ? [6, -6] : [18, -18]);
  const displayUrl = useMemo(() => {
    try {
      return project.liveUrl ? new URL(project.liveUrl).hostname : project.githubUrl.replace("https://", "");
    } catch {
      return project.repoName;
    }
  }, [project]);

  return (
    <motion.div
      ref={previewRef}
      className={cn("browser-window group relative", className)}
      data-cursor={project.liveUrl ? "OPEN LIVE" : "VIEW"}
      variants={imageReveal}
      initial={reduceMotion || compact ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="browser-url absolute left-[4.15rem] top-[0.68rem] z-10 hidden max-w-[54%] truncate rounded-full px-3 py-1 text-[0.6rem] font-semibold text-neutral-500 sm:block">
        {displayUrl}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {!failed && project.image ? (
          <motion.div className="absolute -inset-y-5 inset-x-0" style={{ y: reduceMotion ? 0 : parallaxY }}>
            <Image
              src={project.image}
              alt={project.imageAlt || `${project.title} preview`}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              quality={82}
              sizes="(max-width: 768px) 94vw, (max-width: 1200px) 54vw, 760px"
              className="project-preview-image object-cover object-top"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setFailed(true);
              }}
            />
          </motion.div>
        ) : (
          <ProjectFallbackVisual project={project} compact={compact} />
        )}
        {loading && !failed && project.image ? <div className="project-image-loading" aria-label={`Loading ${project.title} project image`} /> : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/18 to-transparent" />
        {showSource && project.image ? (
          <div className="real-capture-badge" aria-label="Real image from this GitHub project">
            <GitHubIcon className="h-3.5 w-3.5" /> Real GitHub project image
          </div>
        ) : null}
        {project.liveUrl ? (
          <div className="live-project-overlay" aria-hidden="true">
            View live project <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        ) : null}
        {showSource ? <div className="project-image-scan" aria-hidden="true" /> : null}
        <div className="preview-caption">
          <div className="min-w-0">
            <p className="truncate text-[0.58rem] font-extrabold uppercase tracking-[0.15em] text-neutral-500">{project.industry} / {project.year}</p>
            <p className={cn("mt-1 truncate font-extrabold tracking-[-0.045em] text-neutral-950", compact ? "text-xs" : "text-sm sm:text-base")}>{project.title}</p>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#151515] text-white"><ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectPreviewLink({ project, children, className }) {
  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open live demo for ${project.title} from its project preview`}
        className={cn("block", className)}
        data-cursor="LIVE DEMO ↗"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={cn("block", className)}
      data-cursor="VIEW"
    >
      {children}
    </Link>
  );
}

export function ProjectActions({ project, className, includeCaseStudy = true, includeEnquiry = true, compact = false }) {
  const projectMessage = `Hello Sati Tech, I viewed your ${project.title} project and would like to discuss something similar for my business.`;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live demo for ${project.title} in a new tab`}
          className={cn("action-primary group/action inline-flex items-center gap-2 rounded-full bg-[#151515] font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(21,21,21,0.13)] hover:bg-[#4C5CFF]", compact ? "px-3 py-2 text-[0.68rem]" : "px-4 py-3 text-xs")}
          data-cursor="OPEN ↗"
        >
          Live Demo <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 group-hover/action:rotate-6" aria-hidden="true" />
        </a>
      ) : null}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View source code for ${project.title} on GitHub in a new tab`}
        className={cn("inline-flex items-center gap-2 rounded-full border border-black/10 bg-white font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:border-[#4C5CFF]/50 hover:text-[#4C5CFF]", compact ? "px-3 py-2 text-[0.68rem]" : "px-4 py-3 text-xs")}
        data-cursor="OPEN ↗"
      >
        View Code <GitHubIcon className="h-3.5 w-3.5" />
      </a>
      {includeCaseStudy ? (
        <Link
          href={`/work/${project.slug}`}
          className={cn("inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-[#CFFF72]", compact ? "px-3 py-2 text-[0.68rem]" : "px-4 py-3 text-xs")}
        >
          Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}
      {includeEnquiry ? (
        <a
          href={createWhatsAppUrl(projectMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about a project similar to ${project.title} on WhatsApp`}
          className={cn("inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#CFFF72]/90 font-black uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-[#CFFF72]", compact ? "px-3 py-2 text-[0.68rem]" : "px-4 py-3 text-xs")}
          data-cursor="OPEN ↗"
        >
          Similar project
        </a>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project, index = 0 }) {
  const colors = useMemo(() => colorFromString(project.repoName || project.title), [project.repoName, project.title]);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      style={{ "--project-accent": colors.a }}
      className="group project-card relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-2.5 shadow-[0_18px_60px_rgba(21,21,21,0.06)]"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: Math.min(index * 0.035, 0.14) }}
    >
      <ProjectPreviewLink project={project}>
        <BrowserPreview project={project} compact showSource className="shadow-none" />
      </ProjectPreviewLink>
      {project.featured ? <span className="absolute left-5 top-[3.15rem] z-20 rounded-full bg-[#CFFF72] px-3 py-1.5 text-[0.58rem] font-black uppercase tracking-[0.15em] text-neutral-950 shadow-lg">Featured</span> : null}
      <div className="p-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#F7F7F2] px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-neutral-500">Project {String(index + 1).padStart(2, "0")}</span>
          <ArrowUpRight className="project-card-arrow h-5 w-5 text-neutral-500" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-[clamp(1.35rem,4vw,2.15rem)] font-black uppercase leading-[0.94] tracking-[-0.065em] text-neutral-950">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="mt-3 min-h-[3.75rem] text-sm leading-6 text-neutral-600">{truncate(project.summary, 132)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {[project.category, project.industry, ...project.technologies.slice(0, 2)].map((chip, chipIndex) => (
            <span key={`${chip}-${chipIndex}`} className="rounded-full border border-black/10 bg-[#F7F7F2] px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.13em] text-neutral-500">{chip}</span>
          ))}
        </div>
        <ProjectActions project={project} includeCaseStudy includeEnquiry={false} compact className="mt-5 border-t border-black/8 pt-4" />
      </div>
    </motion.article>
  );
}

export function FeaturedProject({ project, index = 0 }) {
  const flip = index % 2 === 1;
  const immersive = index === 2;
  const reduceMotion = useReducedMotion();

  if (immersive) {
    return (
      <motion.article
      id={`project-${String(index + 1).padStart(2, "0")}`}
      className="featured-real-project group overflow-hidden rounded-[2rem] border border-black/10 bg-[#151515] p-3 text-white shadow-[0_30px_110px_rgba(21,21,21,0.16)] sm:rounded-[3rem] sm:p-5"
        variants={scaleIn}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="flex flex-col justify-between p-3 sm:p-5">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Project {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.78] tracking-[-0.11em]">{project.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/68">{project.summary}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[project.industry, project.category, project.year, ...project.technologies.slice(0, 3)].map((item, itemIndex) => (
                <span key={`${item}-${itemIndex}`} className="rounded-full border border-white/15 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/70">{item}</span>
              ))}
            </div>
            <ProjectActions project={project} includeEnquiry={false} className="mt-8" />
          </div>
          <ProjectPreviewLink project={project} className="self-stretch">
            <BrowserPreview project={project} className="featured-real-image min-h-[360px] shadow-none" priority={index === 0} showSource />
          </ProjectPreviewLink>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      id={`project-${String(index + 1).padStart(2, "0")}`}
      className={cn("featured-real-project grid gap-6 rounded-[2rem] border border-black/10 bg-white/78 p-3 shadow-[0_22px_80px_rgba(21,21,21,0.08)] backdrop-blur sm:rounded-[3rem] sm:p-5 lg:grid-cols-2 lg:items-center", flip && "lg:[&>*:first-child]:order-2")}
      variants={scaleIn}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <ProjectPreviewLink project={project}>
        <BrowserPreview project={project} priority={index === 0} showSource className={cn("featured-real-image", index === 1 && "lg:-rotate-1", index === 3 && "lg:rotate-1")} />
      </ProjectPreviewLink>
      <div className="p-3 sm:p-6 lg:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#151515] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">Project {String(index + 1).padStart(2, "0")}</span>
          <span className="rounded-full bg-[#DED9FF] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">{project.industry}</span>
        </div>
        <h3 className="mt-6 text-[clamp(2.3rem,7vw,5.6rem)] font-black uppercase leading-[0.78] tracking-[-0.11em] text-neutral-950">{project.title}</h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[project.category, project.year, ...project.technologies.slice(0, 4)].map((item, itemIndex) => (
            <span key={`${item}-${itemIndex}`} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-neutral-500">{item}</span>
          ))}
        </div>
        <ProjectActions project={project} includeEnquiry={false} className="mt-8" />
      </div>
    </motion.article>
  );
}

export function ActivityList({ projects = [] }) {
  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group grid gap-3 rounded-3xl border border-black/10 bg-white/76 p-4 transition hover:border-[#4C5CFF]/40 hover:bg-white sm:grid-cols-[1fr_auto] sm:items-center"
          data-cursor="OPEN ↗"
        >
          <span>
            <span className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-neutral-950"><GitHubIcon className="h-4 w-4" /> {project.title}</span>
            <span className="mt-1 block text-sm text-neutral-500">{project.repoName} · updated {formatDate(project.updatedAt)}</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F7F2] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-neutral-600">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" /> {project.language || "Web"}
          </span>
        </a>
      ))}
    </div>
  );
}
