import HomeSections from "@/components/sections/HomeSections";
import { getFeaturedProjects, getProjectFacets, getProjects, getRecentActivity } from "@/lib/github";

export default async function HomePage() {
  const [featuredProjects, projects, recentProjects, facets] = await Promise.all([
    getFeaturedProjects(6),
    getProjects(),
    getRecentActivity(6),
    getProjectFacets(),
  ]);

  return <HomeSections featuredProjects={featuredProjects} projects={projects} recentProjects={recentProjects} facets={facets} />;
}
