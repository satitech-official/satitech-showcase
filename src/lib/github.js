import { cache } from "react";
import { siteConfig } from "@/config/site";
import { fallbackRepositories, featuredOrder, projectMetadata } from "@/config/project-metadata";
import { resolveProjectImages } from "@/lib/project-images";
import { resolveProjectLiveUrl } from "@/lib/project-live-url";
import { humanizeRepoName, slugify, truncate, unique } from "@/lib/utils";

const API = "https://api.github.com";

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function inferIndustry(repo, meta = {}) {
  if (meta.industry) return meta.industry;
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  if (/saree|cloth|fashion|wear|lehenga/.test(text)) return "Fashion";
  if (/restaurant|cafe|food|bite|chaat|dessert|menu/.test(text)) return "Food";
  if (/dental|clinic|health/.test(text)) return "Healthcare";
  if (/car|auto|vehicle/.test(text)) return "Automotive";
  if (/football|sports|academy/.test(text)) return "Sports";
  if (/architect|roof|planning|interior|construction|villa|elevation/.test(text)) return "Architecture";
  if (/tour|resort|travel|agro|stay/.test(text)) return "Tourism";
  if (/event|decor|dance|celebration/.test(text)) return "Hospitality";
  return "Business";
}

function inferCategory(repo, meta = {}) {
  if (meta.category) return meta.category;
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  if (/store|shop|commerce|product|saree|cloth|furniture/.test(text)) return "E-Commerce";
  if (/restaurant|cafe|food|bite|chaat|menu/.test(text)) return "Restaurant";
  if (/tour|resort|travel|stay/.test(text)) return "Tourism";
  if (/health|dental|clinic/.test(text)) return "Healthcare";
  if (/car|auto/.test(text)) return "Automotive";
  if (/sport|football|academy/.test(text)) return "Sports";
  if (/architect|planning|roof|construction|interior/.test(text)) return "Architecture";
  return "Business";
}

function inferTechnologies(repo, meta = {}) {
  const text = `${repo.language || ""} ${repo.description || ""}`.toLowerCase();
  const technologies = [...(meta.technologies || [])];

  const checks = [
    ["Next.js", /next\.js|nextjs/],
    ["React", /react/],
    ["JavaScript", /javascript|\bjs\b/],
    ["TypeScript", /typescript|\bts\b/],
    ["Tailwind", /tailwind/],
    ["GSAP", /gsap/],
    ["Framer Motion", /framer/],
    ["Node", /node/],
    ["Supabase", /supabase/],
    ["MongoDB", /mongodb/],
    ["Three.js", /three\.js|threejs/],
  ];

  if (repo.language) technologies.push(repo.language);
  checks.forEach(([label, pattern]) => {
    if (pattern.test(text)) technologies.push(label);
  });

  return unique(technologies).slice(0, 7);
}

function normalizeRepo(repo, index, liveUrl = "") {
  const meta = projectMetadata[repo.name] || {};
  const title = meta.title || humanizeRepoName(repo.name);
  const category = inferCategory(repo, meta);
  const industry = inferIndustry(repo, meta);
  const technologies = inferTechnologies(repo, meta);
  const description = repo.description || meta.summary || `${title} is a public project from the Sati Tech GitHub portfolio.`;
  const featuredIndex = featuredOrder.indexOf(repo.name);
  const media = resolveProjectImages(repo, meta);

  return {
    id: String(repo.id || repo.node_id || repo.name),
    repoName: repo.name,
    slug: slugify(repo.name),
    title,
    category,
    industry,
    year: meta.year || new Date(repo.created_at || repo.updated_at || Date.now()).getFullYear().toString(),
    summary: meta.summary || truncate(description, 170),
    description,
    technologies,
    language: repo.language || technologies[0] || "Web",
    topics: repo.topics || [],
    githubUrl: repo.html_url || `https://github.com/${siteConfig.githubOrg}/${repo.name}`,
    liveUrl,
    image: media.cover,
    mobileImage: media.mobile,
    gallery: media.gallery,
    imageSource: media.source,
    hasCustomCover: media.hasCustomCover,
    imageAlt: `${title} project interface preview by Sati Tech`,
    updatedAt: repo.updated_at || repo.pushed_at || null,
    stars: repo.stargazers_count || 0,
    visibility: repo.visibility || "public",
    featured: Boolean(meta.featured || featuredIndex >= 0),
    sortOrder: meta.sortOrder || (featuredIndex >= 0 ? featuredIndex + 1 : index + 20),
    tone: meta.tone || "Digital business website",
    caseStudy: meta.caseStudy || null,
  };
}

async function fetchGithubRepositories() {
  const endpoint = `${API}/orgs/${siteConfig.githubOrg}/repos?per_page=100&type=public&sort=updated`;
  const response = await fetch(endpoint, {
    headers: githubHeaders(),
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`GitHub repositories request failed with ${response.status}`);
  }

  const repos = await response.json();
  return Array.isArray(repos) ? repos.filter((repo) => !repo.fork && !repo.archived && !repo.disabled) : [];
}

export const getProjects = cache(async () => {
  let repos;

  try {
    repos = await fetchGithubRepositories();
  } catch {
    repos = fallbackRepositories;
  }

  const normalized = await Promise.all(
    repos.map(async (repo, index) => {
      const meta = projectMetadata[repo.name] || {};
      const liveUrl = await resolveProjectLiveUrl(repo, meta);
      return normalizeRepo(repo, index, liveUrl);
    })
  );

  return normalized.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
  });
});

export const getFeaturedProjects = cache(async (limit = 6) => {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured).slice(0, limit);
  if (featured.length >= Math.min(limit, 4)) return featured;
  return unique([...featured, ...projects]).slice(0, limit);
});

export const getProjectBySlug = cache(async (slug) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug || project.repoName === slug) || null;
});

export const getRecentActivity = cache(async (limit = 6) => {
  const projects = await getProjects();
  return [...projects]
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .slice(0, limit);
});

export const getProjectFacets = cache(async () => {
  const projects = await getProjects();
  return {
    categories: unique(projects.map((project) => project.category)).sort(),
    industries: unique(projects.map((project) => project.industry)).sort(),
    technologies: unique(projects.flatMap((project) => project.technologies)).sort(),
  };
});
