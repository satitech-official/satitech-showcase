"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { industryFilters, technologyFilters } from "@/config/project-metadata";
import { createWhatsAppUrl } from "@/config/site";
import { ProjectCard } from "@/components/projects/ProjectPieces";
import { cn } from "@/lib/utils";

export default function WorkExplorer({ projects = [], facets = {}, initialCategory = "All", initialSearch = "" }) {
  const [category, setCategory] = useState(initialCategory || "All");
  const [technology, setTechnology] = useState("All");
  const [query, setQuery] = useState(initialSearch || "");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => {
    const dynamic = [...(facets.categories || []), ...(facets.industries || [])].filter(Boolean);
    return ["All", ...new Set([...industryFilters.filter((item) => item !== "All"), ...dynamic])];
  }, [facets.categories, facets.industries]);

  const technologies = useMemo(() => {
    const dynamic = facets.technologies || [];
    return ["All", ...new Set([...technologyFilters.filter((item) => item !== "All"), ...dynamic])].slice(0, 18);
  }, [facets.technologies]);

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    const result = projects.filter((project) => {
      const categoryMatch = category === "All" || project.category === category || project.industry === category;
      const techMatch = technology === "All" || project.technologies.includes(technology) || project.language === technology;
      const searchMatch = !search || `${project.title} ${project.repoName} ${project.summary} ${project.description} ${project.category} ${project.industry} ${project.technologies.join(" ")}`.toLowerCase().includes(search);
      return categoryMatch && techMatch && searchMatch;
    });

    return result.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "recent") return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.sortOrder - b.sortOrder;
    });
  }, [category, projects, query, sort, technology]);

  return (
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-8 lg:p-10">
        <div className="absolute right-[-5rem] top-[-5rem] h-72 w-72 rounded-full bg-[#DED9FF]" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Project explorer</p>
            <h1 className="mt-4 text-[clamp(3.4rem,12vw,10rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">Browse real public work.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral-600 lg:justify-self-end">
            Projects are pulled from the Sati Tech GitHub organization, then enriched with maintainable portfolio metadata for categories, industries, case-study context and visuals.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-20 mt-5 rounded-[1.75rem] border border-black/10 bg-white/[0.88] p-3 shadow-[0_18px_70px_rgba(21,21,21,0.08)] backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="h-12 w-full rounded-full border border-black/10 bg-[#F7F7F2] pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-[#4C5CFF]/50 focus:bg-white"
            />
          </label>
          <label className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-[#F7F7F2] px-3 text-xs font-black uppercase tracking-[0.12em] text-neutral-600">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent font-black outline-none">
              <option value="featured">Featured</option>
              <option value="recent">Recently Updated</option>
              <option value="az">Alphabetical</option>
            </select>
          </label>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[#151515] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white">
              Showing {filteredProjects.length} of {projects.length}
            </div>
            {category !== "All" || technology !== "All" || query ? (
              <button type="button" onClick={() => { setCategory("All"); setTechnology("All"); setQuery(""); }} className="rounded-full border border-black/10 bg-white px-3 py-3 text-[0.66rem] font-black uppercase tracking-[0.12em] text-neutral-600">Clear</button>
            ) : null}
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Project categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition", category === item ? "border-[#151515] bg-[#151515] text-white" : "border-black/10 bg-white text-neutral-600 hover:border-[#4C5CFF]/40")}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Project technologies">
          {technologies.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTechnology(item)}
              className={cn("shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] transition", technology === item ? "border-[#4C5CFF] bg-[#DED9FF] text-neutral-950" : "border-black/10 bg-[#F7F7F2] text-neutral-500 hover:border-[#4C5CFF]/40")}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length ? (
            <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="rounded-[2rem] border border-black/10 bg-white p-8 text-center"
            >
              <p className="text-2xl font-black uppercase tracking-[-0.06em] text-neutral-950">No projects match this filter.</p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-neutral-600">Try a different industry, technology or search term. You can also ask Sati Tech for a similar custom project.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => { setCategory("All"); setTechnology("All"); setQuery(""); }} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">Reset filters</button>
                <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">
                  Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="mt-12 rounded-[2rem] border border-black/10 bg-[#151515] p-6 text-white sm:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">GitHub source</p>
            <h2 className="mt-2 text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-[0.82] tracking-[-0.1em]">New repositories can join this wall automatically.</h2>
          </div>
          <Link href="/#process" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">
            View process <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
