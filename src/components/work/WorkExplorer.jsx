"use client";

import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { industryFilters, technologyFilters } from "@/config/project-metadata";
import { createWhatsAppUrl } from "@/config/site";
import { ProjectCard } from "@/components/projects/ProjectPieces";
import { cn } from "@/lib/utils";

function asText(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function createArchiveHref({ category = "All", technology = "All", query = "", sort = "featured" }) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (technology !== "All") params.set("technology", technology);
  if (query.trim()) params.set("q", query.trim());
  if (sort !== "featured") params.set("sort", sort);
  const search = params.toString();
  return search ? `/work?${search}` : "/work";
}

function WorkExplorerView({ projects = [], facets = {}, initialCategory = "All", initialTechnology = "All", initialSearch = "", initialSort = "featured", onFilterSubmit }) {
  const category = asText(initialCategory, "All");
  const technology = asText(initialTechnology, "All");
  const query = asText(initialSearch);
  const sort = ["featured", "recent", "az"].includes(initialSort) ? initialSort : "featured";
  const categories = ["All", ...new Set([...industryFilters.filter((item) => item !== "All"), ...(facets.categories || []), ...(facets.industries || [])].filter(Boolean))];
  const technologies = ["All", ...new Set([...technologyFilters.filter((item) => item !== "All"), ...(facets.technologies || [])].filter(Boolean))].slice(0, 18);
  const search = query.trim().toLowerCase();
  const filteredProjects = projects
    .filter((project) => {
      const categoryMatch = category === "All" || project.category === category || project.industry === category;
      const techMatch = technology === "All" || project.technologies.includes(technology) || project.language === technology;
      const searchMatch = !search || `${project.title} ${project.repoName} ${project.summary} ${project.description} ${project.category} ${project.industry} ${project.technologies.join(" ")}`.toLowerCase().includes(search);
      return categoryMatch && techMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "recent") return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.sortOrder - b.sortOrder;
    });
  const hasFilters = category !== "All" || technology !== "All" || Boolean(query) || sort !== "featured";

  return (
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-8 lg:p-10">
        <div className="absolute right-[-5rem] top-[-5rem] h-72 w-72 rounded-full bg-[#DED9FF]" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Selected archive</p>
            <h1 className="mt-4 text-[clamp(3.4rem,12vw,10rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">Work with direction.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral-600 lg:justify-self-end">A living selection of digital work across hospitality, retail, food and service-led businesses.</p>
        </div>
      </section>

      <form onSubmit={onFilterSubmit} className="sticky top-20 z-20 mt-5 rounded-[1.75rem] border border-black/10 bg-white/[0.88] p-3 shadow-[0_18px_70px_rgba(21,21,21,0.08)] backdrop-blur-xl">
        <input type="hidden" name="category" value={category === "All" ? "" : category} />
        <input type="hidden" name="technology" value={technology === "All" ? "" : technology} />
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input defaultValue={query} name="q" placeholder="Search projects..." className="h-12 w-full rounded-full border border-black/10 bg-[#F7F7F2] pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-[#4C5CFF]/50 focus:bg-white" />
          </label>
          <label className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-[#F7F7F2] px-3 text-xs font-black uppercase tracking-[0.12em] text-neutral-600">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select defaultValue={sort} name="sort" className="bg-transparent font-black outline-none">
              <option value="featured">Featured</option>
              <option value="recent">Recently Updated</option>
              <option value="az">Alphabetical</option>
            </select>
          </label>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="rounded-full bg-[#151515] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white">Showing {filteredProjects.length} of {projects.length}</span>
            <button type="submit" className="rounded-full bg-[#4C5CFF] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white">Apply</button>
            {hasFilters ? <Link href="/work" className="rounded-full border border-black/10 bg-white px-3 py-3 text-[0.66rem] font-black uppercase tracking-[0.12em] text-neutral-600">Clear</Link> : null}
          </div>
        </div>
      </form>

      <section className="mt-5 rounded-[1.75rem] border border-black/10 bg-white/[0.72] p-3">
        <p className="px-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-neutral-400">Filter by business type</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Project categories">
          {categories.map((item) => (
            <Link key={item} href={createArchiveHref({ category: item, technology, query, sort })} className={cn("archive-filter-link shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition", category === item ? "border-[#151515] bg-[#151515] text-white" : "border-black/10 bg-white text-neutral-600 hover:border-[#4C5CFF]/40")}>{item}</Link>
          ))}
        </div>
        <p className="mt-3 px-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-neutral-400">Filter by technology</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar" aria-label="Project technologies">
          {technologies.map((item) => (
            <Link key={item} href={createArchiveHref({ category, technology: item, query, sort })} className={cn("archive-filter-link shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] transition", technology === item ? "border-[#4C5CFF] bg-[#DED9FF] text-neutral-950" : "border-black/10 bg-[#F7F7F2] text-neutral-500 hover:border-[#4C5CFF]/40")}>{item}</Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        {filteredProjects.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        ) : (
          <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center">
            <p className="text-2xl font-black uppercase tracking-[-0.06em] text-neutral-950">No projects match this filter.</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-neutral-600">Try a different business type, technology or search term. You can also ask Sati Tech for a similar custom project.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/work" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">Reset filters</Link>
              <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12 rounded-[2rem] border border-black/10 bg-[#151515] p-6 text-white sm:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">The archive</p>
            <h2 className="mt-2 text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-[0.82] tracking-[-0.1em]">Every project starts with a real business question.</h2>
          </div>
          <Link href="/#process" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">View process <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

function WorkExplorerClient({ projects, facets }) {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") || "All";
  const technology = params.get("technology") || "All";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "featured";

  function handleFilterSubmit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    router.push(createArchiveHref({
      category: values.get("category") || "All",
      technology: values.get("technology") || "All",
      query: values.get("q") || "",
      sort: values.get("sort") || "featured",
    }));
  }

  return <WorkExplorerView projects={projects} facets={facets} initialCategory={category} initialTechnology={technology} initialSearch={query} initialSort={sort} onFilterSubmit={handleFilterSubmit} />;
}

export default function WorkExplorer({ projects = [], facets = {} }) {
  return (
    <Suspense fallback={<WorkExplorerView projects={projects} facets={facets} />}>
      <WorkExplorerClient projects={projects} facets={facets} />
    </Suspense>
  );
}
