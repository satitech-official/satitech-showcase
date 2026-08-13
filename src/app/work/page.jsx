import WorkExplorer from "@/components/work/WorkExplorer";
import { getProjectFacets, getProjects } from "@/lib/github";

export const metadata = {
  title: "Work",
  description: "Explore Sati Tech public projects dynamically loaded from GitHub with filters for industries, services and technologies.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [projects, facets] = await Promise.all([getProjects(), getProjectFacets()]);
  return <WorkExplorer projects={projects} facets={facets} initialCategory="All" initialSearch="" />;
}
