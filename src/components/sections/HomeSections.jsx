"use client";

import { AboutStudio, ProjectWall, ServicesAccordion, Stats } from "@/components/sections/HomeStudioSections";
import { FeaturedWork, Hero, LiveProjectStream, TrustMarquee } from "@/components/sections/HomeHeroSections";
import { GitHubActivity, IndustryExplorer, ProcessTimeline, SatiSignalNetwork, ServiceMatcher, TechCapabilities } from "@/components/sections/HomeSignalSections";
import { AllProjectsPreview, CompleteProjectGallery, ContactCTA, InstagramShowcase, WhyChooseSati } from "@/components/sections/HomeGallerySections";

export default function HomeSections({ featuredProjects = [], projects = [], recentProjects = [], facets = {} }) {
  const safeProjects = projects.length ? projects : featuredProjects;

  return (
    <main>
      <Hero projects={featuredProjects.length ? featuredProjects : safeProjects.slice(0, 3)} />
      <TrustMarquee projects={safeProjects} />
      <LiveProjectStream projects={featuredProjects.length ? featuredProjects : safeProjects.slice(0, 6)} />
      <FeaturedWork projects={featuredProjects} />
      <AboutStudio />
      <Stats />
      <WhyChooseSati />
      <ProjectWall projects={safeProjects} />
      <ServicesAccordion />
      <IndustryExplorer projects={safeProjects} />
      <TechCapabilities technologies={facets.technologies} />
      <SatiSignalNetwork projects={safeProjects} />
      <GitHubActivity projects={recentProjects.length ? recentProjects : safeProjects.slice(0, 6)} />
      <ProcessTimeline />
      <ServiceMatcher />
      <AllProjectsPreview projects={safeProjects} />
      <CompleteProjectGallery projects={safeProjects} />
      <InstagramShowcase projects={safeProjects} />
      <ContactCTA />
    </main>
  );
}
