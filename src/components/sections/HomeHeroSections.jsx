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

export function HeroProjectConstellation({ projects, reduceMotion }) {
  const positions = [
    "left-[5%] top-[13%] w-[74%] -rotate-[5deg]",
    "right-[4%] top-[35%] w-[72%] rotate-[5deg]",
    "bottom-[6%] left-[12%] w-[67%] -rotate-[2deg]",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden p-8" aria-label="Animated previews of real Sati Tech projects">
      <div className="absolute inset-[12%] rounded-full border border-cyan-300/20" aria-hidden="true" />
      <div className="absolute inset-[23%] rounded-full border border-violet-300/20" aria-hidden="true" />
      {projects.slice(0, 3).map((project, index) => (
        <motion.div
          key={project.id}
          className={`absolute ${positions[index]} overflow-hidden rounded-[1.2rem] border border-white/20 bg-[#071126] p-2 shadow-[0_26px_80px_rgba(2,8,23,0.34)]`}
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, index % 2 ? -9 : 9, 0], scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { opacity: { delay: 0.18 + index * 0.1, duration: 0.5 }, y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5 } }}
        >
          <Link href={`/work/${project.slug}`} className="group block" aria-label={`View ${project.title} case study`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem] bg-slate-900">
              <Image src={project.image} alt={`${project.title} website preview`} fill priority={index === 0} sizes="(max-width: 768px) 76vw, 42vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/65 via-transparent to-transparent" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-white">
                <span className="min-w-0">
                  <span className="block text-[0.52rem] font-black uppercase tracking-[0.16em] text-cyan-200">Real project / 0{index + 1}</span>
                  <strong className="mt-1 block truncate text-xs uppercase">{project.title}</strong>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero({ projects }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualExitY = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, -34]);
  const words = ["DESIGNED TO CONVERT.", "BUILT TO SCALE.", "ENGINEERED TO PERFORM.", "MADE TO STAND OUT."];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setWordIndex((value) => (value + 1) % words.length), 1800);
    return () => clearInterval(timer);
  }, [reduceMotion, words.length]);

  const onMove = (event) => {
    if (window.innerWidth < 900 || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  return (
    <section ref={heroRef} id="home" className="section-shell relative min-h-[100svh] overflow-hidden pb-12 pt-28 sm:pt-36 lg:pt-40" onMouseMove={onMove}>
      <div className="mb-7 grid grid-cols-2 gap-3 border-b border-black/10 pb-4 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-neutral-500 sm:grid-cols-4">
        <span>01 / Digital studio</span>
        <span>India · Working globally</span>
        <span className="hidden sm:block">Design + Development</span>
        <span className="justify-self-end text-neutral-950"><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#69d883] not-italic" />Available for projects</span>
      </div>
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-[32rem] max-w-5xl rounded-full bg-[#DED9FF]/28 blur-3xl" aria-hidden="true" />
      <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div className="relative z-10">
          <motion.div
            className="eyebrow-label text-[#4C5CFF]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SATI TECH / CREATIVE TECHNOLOGY STUDIO
          </motion.div>

          <motion.h1
            className="display-type mt-6 max-w-5xl text-[clamp(3.15rem,8.5vw,7.2rem)] uppercase leading-[0.74] text-neutral-950"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.span variants={maskReveal} className="block overflow-hidden">We build</motion.span>
            <motion.span variants={maskReveal} className="editorial-serif block overflow-hidden pr-[0.08em] font-normal normal-case leading-[0.78] tracking-[-0.06em] text-[#22d3ee]">digital experiences</motion.span>
            <motion.span variants={maskReveal} className="block overflow-hidden">that move</motion.span>
            <motion.span variants={maskReveal} className="block overflow-hidden">businesses <span className="text-[#8b5cf6]">forward.</span></motion.span>
          </motion.h1>

          <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-4 overflow-hidden">
            <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-neutral-400">Built for impact</span>
            <div className="editorial-rule" />
          </div>
          <div className="mt-3 min-h-[3rem] overflow-hidden sm:min-h-[4.2rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={wordIndex}
                initial={{ y: 36, opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ y: 0, opacity: 1, clipPath: "inset(0 0 0 0)" }}
                exit={{ y: -18, opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: motionTokens.normal, ease: premiumEase }}
                className="display-type text-[clamp(2rem,5.5vw,4.9rem)] uppercase leading-[0.82] text-neutral-950"
                aria-live="polite"
              >
                {words[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-5 max-w-xl text-[0.96rem] leading-7 text-neutral-600 sm:text-[1.04rem] sm:leading-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
          >
            Sati Tech designs and develops modern websites, e-commerce experiences and digital systems that help businesses build trust, convert visitors and grow online.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#projects" className="action-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#151515] px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white hover:bg-[#4C5CFF]">
              Explore Projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-neutral-950 hover:border-[#CFFF72] hover:bg-[#CFFF72]" data-cursor="OPEN ↗">
              Start a project <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-cyan-300/25 bg-[#0a1530]/75 px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white hover:border-cyan-300/70 hover:text-cyan-200" data-cursor="OPEN ↗">
              Follow on Instagram <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-violet-300/25 bg-[#0a1530]/75 px-6 text-xs font-extrabold tracking-[0.04em] text-white hover:border-violet-300/70 hover:text-violet-200" data-cursor="OPEN ↗">
              {siteConfig.websiteDisplay} <Globe2 className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-stage hero-stage-orbit relative min-h-[455px] overflow-hidden sm:min-h-[590px] lg:min-h-[680px]"
          style={{ y: reduceMotion ? 0 : visualExitY }}
          initial={{ opacity: 0, scale: 0.975, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-spotlight left-1/2 top-1/2" style={{ transform: `translate(calc(-50% + ${pointer.x * 14}px), calc(-50% + ${pointer.y * 14}px))` }} aria-hidden="true" />
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-neutral-600 backdrop-blur sm:left-5 sm:top-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4C5CFF]" aria-hidden="true" /> Sati Signal / Live work
          </div>
          <div className="absolute right-4 top-4 z-20 rounded-full bg-[#CFFF72] px-3 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-neutral-950 sm:right-5 sm:top-5">
            Real project signals
          </div>
          <HeroProjectConstellation projects={projects} reduceMotion={reduceMotion} />

          <div className="absolute bottom-5 right-5 z-20 hidden text-right text-[0.58rem] font-extrabold uppercase tracking-[0.17em] text-neutral-500 sm:block">
            Real builds<br /><span className="text-white">in motion</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-5 border-t border-black/10 pt-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <a href="#selected-work" className="inline-flex w-fit items-center gap-3 text-[0.66rem] font-extrabold uppercase tracking-[0.17em] text-neutral-500" aria-label="Scroll to selected work">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-neutral-950"><ArrowDown className="h-4 w-4" aria-hidden="true" /></span>
          Discover the studio
        </a>
        <div className="grid grid-cols-3 gap-3 sm:justify-self-end">
          {[{ value: "Mobile-first", label: "Responsive" }, { value: "Fast", label: "Performance" }, { value: "24/7", label: "Support" }].map((stat) => <div key={stat.label} className="mini-proof"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function TrustMarquee({ projects }) {
  const line = ["Design", "Development", "E-Commerce", "Next.js", "Motion", "SEO", "UI/UX", "Digital Experiences", "Business Growth"];
  const industries = Array.from(new Set(projects.map((project) => project.industry))).slice(0, 12);
  return (
    <section className="border-y border-black/10 bg-white/40 py-4">
      <div className="marquee">
        <div className="marquee-track flex text-[clamp(1.4rem,4vw,4rem)] font-black uppercase leading-none tracking-[-0.06em] text-neutral-950">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="marquee-set flex shrink-0 gap-5 pr-5" aria-hidden={setIndex === 1}>
              {line.map((item) => <span key={item} className="flex items-center gap-5 whitespace-nowrap">{item}<span className="h-3 w-3 rounded-full bg-[#4C5CFF]" /></span>)}
            </div>
          ))}
        </div>
      </div>
      {industries.length ? (
        <div className="marquee mt-3">
          <div className="marquee-track reverse flex text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="marquee-set flex shrink-0 gap-4 pr-4" aria-hidden={setIndex === 1}>
                {industries.map((item) => <span key={item} className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2">{item}</span>)}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function LiveProjectStream({ projects }) {
  const reduceMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);
  const featuredSix = projects.slice(0, 6);

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  if (!featuredSix.length) return null;

  return (
    <section className="live-project-stream border-y border-cyan-300/10 py-10 sm:py-14" aria-labelledby="live-project-stream-title">
      <div className="section-shell mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow-label text-cyan-300">Live image stream</p>
          <h2 id="live-project-stream-title" className="mt-4 text-[clamp(1.8rem,4vw,3.8rem)] font-black uppercase leading-[0.88] tracking-[-0.075em] text-white">Projects 01–06.<br /><span className="text-gradient-tech">Real GitHub project visuals.</span></h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400">Six unique local captures from Sati Tech’s public repository portfolio, moving in real time and linked to each project.</p>
      </div>

      <div className="live-project-viewport">
        <div className={cn("live-project-track", (reduceMotion || !pageVisible) && "is-paused")}>
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="live-project-set" aria-hidden={setIndex === 1 || undefined}>
              {featuredSix.map((project, index) => (
                <Link
                  key={`${setIndex}-${project.id}`}
                  href={`/work/${project.slug}`}
                  className="live-project-card group"
                  tabIndex={setIndex === 1 ? -1 : undefined}
                  aria-label={setIndex === 0 ? `Open project ${String(index + 1).padStart(2, "0")}: ${project.title}` : undefined}
                >
                  <div className="live-project-image">
                    <Image
                      src={project.image}
                      alt={setIndex === 0 ? project.imageAlt || `${project.title} GitHub project image` : ""}
                      fill
                      sizes="(max-width: 640px) 78vw, 350px"
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.045]"
                    />
                    <span className="live-project-image-shade" />
                    <span className="live-project-scan" />
                  </div>
                  <span className="live-project-meta">
                    <span>
                      <span className="block font-mono text-[0.58rem] font-bold uppercase tracking-[0.17em] text-cyan-200">Project {String(index + 1).padStart(2, "0")} · GitHub image</span>
                      <strong className="mt-1 block truncate text-sm uppercase tracking-[-0.035em] text-white">{project.title}</strong>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedWork({ projects }) {
  return (
    <section id="selected-work" className="section-shell py-16 sm:py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionIntro eyebrow="Selected work" title="Projects 01–06, shown with their real images." text="Six GitHub-backed Sati Tech projects, each using a unique local repository capture with animated image depth, transparent source access and verified live links where available." />
        <Link href="/work" className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-[#151515] hover:text-white sm:mb-12">
          Open project explorer <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-6 sm:gap-8">
        {projects.map((project, index) => <FeaturedProject key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}

