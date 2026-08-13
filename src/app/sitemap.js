import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/github";

export const dynamic = "force-static";

export default async function sitemap() {
  const staticRoutes = ["", "/work", "/about", "/services", "/contact"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const projects = await getProjects();
    const projectRoutes = projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: project.featured ? 0.75 : 0.62,
    }));
    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
