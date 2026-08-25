"use client";

import StudioHomepage from "@/components/sections/StudioHomepage";

export default function HomeSections({ featuredProjects = [], projects = [], recentProjects = [], facets = {} }) {
  return <StudioHomepage projects={projects} featuredProjects={featuredProjects} />;
}
