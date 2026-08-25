"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, ArrowUp, Briefcase, ExternalLink, FileText, Globe2, MessageCircle, Search, Wrench, X } from "lucide-react";
import { FacebookIcon, GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import BrandMark from "@/components/brand/BrandMark";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { projectMetadata } from "@/config/project-metadata";
import { slugify } from "@/lib/utils";

const projectSearchRecords = Object.entries(projectMetadata).map(([repoName, project]) => ({
  repoName,
  slug: slugify(repoName),
  title: project.title || repoName.replaceAll("-", " "),
  category: project.category || "Web",
  industry: project.industry || "Digital",
  technologies: project.technologies || [],
}));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function OpeningLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 180 : 720);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="premium-opening-loader"
          role="status"
          aria-label="Loading Sati Tech"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.1 : 0.28, ease: "easeOut" } }}
        >
          <motion.div
            className="premium-opening-loader__content"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandMark size={58} priority />
            <span className="premium-opening-loader__track" aria-hidden="true"><span /></span>
            <span className="premium-opening-loader__label">Loading</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
      anchors: true,
    });

    let frame = 0;
    let alive = true;
    let syncScrollTrigger = null;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    import("gsap/ScrollTrigger").then((module) => {
      if (!alive) return;
      syncScrollTrigger = () => module.ScrollTrigger.update();
      lenis.on("scroll", syncScrollTrigger);
      module.ScrollTrigger.refresh();
    });

    frame = requestAnimationFrame(raf);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      if (syncScrollTrigger) lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return undefined;

    const move = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const over = (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cursor], a[target='_blank']") : null;
      const text = target?.getAttribute("data-cursor") || (target ? "OPEN ↗" : "");
      if (text) {
        label.textContent = text;
        cursor.classList.add("active");
      } else {
        label.textContent = "";
        cursor.classList.remove("active");
      }
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span ref={labelRef} /></div>;
}

function CommandPalette({ open, setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [query, setQuery] = useState("");
  const projects = projectSearchRecords;
  const loading = false;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, [setOpen]);

  useEffect(() => {
    document.body.classList.toggle("command-open", open);
    let focusTimer;
    let resetTimer;
    let restoreTimer;

    if (open) {
      returnFocusRef.current = document.activeElement;
      focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      resetTimer = window.setTimeout(() => setQuery(""), 0);
      restoreTimer = window.setTimeout(() => returnFocusRef.current?.focus?.(), 0);
    }

    return () => {
      if (focusTimer) window.clearTimeout(focusTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
      if (restoreTimer) window.clearTimeout(restoreTimer);
      document.body.classList.remove("command-open");
    };
  }, [open]);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, setOpen]);

  const options = useMemo(() => {
    const pages = [
      { type: "Page", label: "Home", href: "/", icon: FileText, keywords: "studio hero sati tech" },
      { type: "Page", label: "Work", href: "/work", icon: Briefcase, keywords: "projects portfolio explorer" },
      { type: "Page", label: "About", href: "/about", icon: FileText, keywords: "company stats support" },
      { type: "Page", label: "Services", href: "/services", icon: Wrench, keywords: "web development ecommerce seo ui ux support" },
      { type: "Page", label: "Contact", href: "/contact", icon: MessageCircle, keywords: "whatsapp enquiry form" },
      { type: "Explore", label: "View latest projects", href: "/work", icon: Briefcase, keywords: "latest recent repositories projects" },
      { type: "Explore", label: "Browse by industry", href: "/work", icon: Search, keywords: "fashion hospitality food healthcare sports architecture tourism" },
      { type: "Section", label: "Process", href: "/#process", icon: ArrowRight, keywords: "discover design develop launch support" },
      { type: "Section", label: "Capabilities", href: "/#capabilities", icon: ArrowRight, keywords: "next react tailwind gsap github" },
      { type: "External", label: "GitHub Organization", href: siteConfig.githubUrl, icon: GitHubIcon, external: true, keywords: "repositories code built in public" },
      { type: "External", label: "Follow Sati Tech on Instagram", href: siteConfig.instagramUrl, icon: InstagramIcon, external: true, keywords: "instagram social updates work projects" },
      { type: "External", label: "Follow Sati Tech on Facebook", href: siteConfig.facebookUrl, icon: FacebookIcon, external: true, keywords: "facebook social updates work projects" },
      { type: "External", label: siteConfig.websiteDisplay, href: siteConfig.url, icon: Globe2, external: true, keywords: "official website sati technologies domain" },
      { type: "External", label: "WhatsApp Sati Tech", href: createWhatsAppUrl(), icon: MessageCircle, external: true, keywords: "contact chat start project" },
    ];

    const services = siteConfig.services.map((service) => ({
      type: "Service",
      label: service.title,
      href: `/services#${service.id}`,
      icon: Wrench,
      keywords: `${service.short} ${service.outcome}`,
    }));

    const projectOptions = projects.map((project) => ({
      type: "Project",
      label: project.title,
      href: `/work/${project.slug}`,
      icon: Briefcase,
      keywords: `${project.repoName} ${project.category} ${project.industry} ${project.technologies?.join(" ") || ""}`,
    }));

    return [...pages, ...services, ...projectOptions];
  }, [projects]);

  const filtered = options
    .filter((option) => `${option.label} ${option.type} ${option.keywords}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  const selectOption = useCallback((option) => {
    setOpen(false);
    if (option.external) {
      window.open(option.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(option.href);
    }
  }, [router, setOpen]);

  useEffect(() => {
    if (!open) return undefined;
    const onDialogKey = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) => Math.max(index - 1, 0));
      }
      if (event.key === "Enter" && filtered[selectedIndex]) {
        event.preventDefault();
        selectOption(filtered[selectedIndex]);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll("button, input, a[href]")].filter((node) => !node.disabled);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onDialogKey);
    return () => window.removeEventListener("keydown", onDialogKey);
  }, [filtered, open, selectedIndex, selectOption]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-start bg-[#151515]/28 px-3 py-20 backdrop-blur-md sm:px-6 sm:py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            ref={dialogRef}
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_30px_110px_rgba(21,21,21,0.25)]"
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3">
              <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, services, pages..."
                className="h-12 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-neutral-400"
                aria-label="Search command palette"
                aria-controls="command-results"
                aria-activedescendant={filtered[selectedIndex] ? `command-option-${selectedIndex}` : undefined}
              />
              <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100 text-neutral-700" aria-label="Close command palette">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div id="command-results" className="max-h-[58vh] overflow-y-auto p-2" role="listbox">
              {loading ? (
                <div className="grid gap-2 p-2" aria-label="Loading project search">
                  {[0, 1, 2].map((item) => <div key={item} className="h-16 animate-pulse rounded-2xl bg-neutral-100" />)}
                </div>
              ) : filtered.length ? (
                filtered.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={`${option.type}-${option.href}-${option.label}`}
                      id={`command-option-${index}`}
                      type="button"
                      onClick={() => selectOption(option)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="option"
                      aria-selected={index === selectedIndex}
                      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${index === selectedIndex ? "bg-[#F7F7F2]" : "hover:bg-[#F7F7F2]"}`}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#151515] text-white">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black uppercase tracking-[0.08em] text-neutral-950">{option.label}</span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{option.type}</span>
                      </span>
                      {option.external ? <ExternalLink className="h-4 w-4 text-neutral-400" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1" aria-hidden="true" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <p className="text-lg font-black tracking-[-0.04em]">No matching command.</p>
                  <p className="mt-2 text-sm text-neutral-500">Try searching for a project, service, page or GitHub.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FloatingSocialDock() {
  const href = createWhatsAppUrl();

  return (
    <div className="fixed bottom-4 right-3 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6">
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="social-float grid h-12 w-12 place-items-center rounded-full border border-cyan-300/25 bg-[#071126]/90 text-cyan-200 shadow-[0_18px_60px_rgba(2,132,199,0.2)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-[#11254b]"
        aria-label="Follow Sati Tech on Instagram"
        data-cursor="OPEN ↗"
      >
        <InstagramIcon className="h-5 w-5" />
      </a>
      <a
        href={siteConfig.facebookUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="social-float grid h-12 w-12 place-items-center rounded-full border border-blue-300/25 bg-[#071126]/90 text-blue-200 shadow-[0_18px_60px_rgba(37,99,235,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-[#11254b]"
        aria-label="Follow Sati Tech on Facebook"
        data-cursor="OPEN ↗"
      >
        <FacebookIcon className="h-5 w-5" />
      </a>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="social-float inline-flex min-h-12 items-center gap-2 rounded-full border border-cyan-300/20 bg-[#071126]/90 px-3 py-2.5 text-xs font-black uppercase tracking-[0.13em] text-white shadow-[0_18px_60px_rgba(2,132,199,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-[#0d2448] sm:px-4"
        data-cursor="OPEN ↗"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-300 text-[#03101e]"><MessageCircle className="h-4 w-4" aria-hidden="true" /></span>
        <span className="hidden sm:inline">Let’s talk</span>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 720);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          className="fixed bottom-5 left-3 z-40 grid h-12 w-12 place-items-center rounded-full border border-cyan-300/25 bg-[#071126]/90 text-cyan-100 shadow-[0_18px_60px_rgba(2,132,199,0.2)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/60 sm:bottom-6 sm:left-6"
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default function SiteExperience({ commandOpen, setCommandOpen }) {
  return (
    <>
      <OpeningLoader />
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
      <FloatingSocialDock />
      <BackToTop />
    </>
  );
}
