import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserPreview, ProjectActions } from "@/components/projects/ProjectPieces";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjects } from "@/lib/github";
import { formatDate, truncate } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "This Sati Tech project could not be found.",
    };
  }

  return {
    title: project.title,
    description: truncate(project.summary || project.description, 155),
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Sati Tech Project`,
      description: truncate(project.summary || project.description, 155),
      url: `${siteConfig.url}/work/${project.slug}`,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Sati Tech Project`,
      description: truncate(project.summary || project.description, 155),
      images: [project.image],
    },
  };
}

function createStudy(project) {
  const source = project.caseStudy || {};
  return {
    challenge: source.challenge || `The repository positions ${project.title} as a ${project.industry.toLowerCase()} web project that needs to present business information clearly and professionally.`,
    strategy: source.approach || "Shape the content around audience intent, business priorities and the clearest path to enquiry or action.",
    design: `Build a ${project.tone.toLowerCase()} visual direction with strong hierarchy, responsive typography and interaction that supports the project story.`,
    development: `Translate the experience into a responsive implementation using ${project.technologies.slice(0, 4).join(", ") || project.language}, with attention to maintainability and performance.`,
    outcome: source.solution || project.summary,
    features: source.features || [
      `${project.category} oriented page structure`,
      "Responsive presentation for mobile and desktop",
      "Clear project storytelling and contact actions",
      "Public GitHub repository for transparent code access",
    ],
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getProjects()]);
  if (!project) notFound();

  const study = createStudy(project);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.url}/work/${project.slug}` },
    ],
  };

  return (
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-[#151515] hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to work
      </Link>

      <section className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">{project.industry} · {project.year}</p>
          <h1 className="mt-4 text-[clamp(3.2rem,12vw,9.5rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[project.category, project.language, ...project.technologies.slice(0, 5)].map((item, itemIndex) => (
              <span key={`${item}-${itemIndex}`} className="rounded-full border border-black/10 bg-[#F7F7F2] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-neutral-600">{item}</span>
            ))}
          </div>
          <ProjectActions project={project} className="mt-8" />
        </div>
        <BrowserPreview project={project} priority className="lg:-rotate-1" />
      </section>

      <section className="mt-8 grid gap-4 rounded-[2rem] border border-black/10 bg-white/72 p-4 sm:rounded-[3rem] sm:p-6 lg:grid-cols-4">
        {[
          ["Client / Project", project.title],
          ["Industry", project.industry],
          ["Repository", project.repoName],
          ["Updated", formatDate(project.updatedAt)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.5rem] bg-white p-4">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-neutral-400">{label}</p>
            <p className="mt-2 text-lg font-black tracking-[-0.04em] text-neutral-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Case study</p>
          <h2 className="mt-3 text-[clamp(2.5rem,8vw,6.6rem)] font-black uppercase leading-[0.78] tracking-[-0.12em]">From repository to business story.</h2>
        </div>
        <div className="grid gap-4">
          {[
            ["The Challenge", study.challenge],
            ["Strategy", study.strategy],
            ["Design Direction", study.design],
            ["Development", study.development],
            ["Outcome", study.outcome],
          ].map(([heading, body], index) => (
            <article key={heading} className="rounded-[2rem] border border-black/10 bg-white p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-400">0{index + 1}</span>
              <h3 className="mt-4 text-[clamp(1.8rem,5vw,3.8rem)] font-black uppercase leading-[0.86] tracking-[-0.09em] text-neutral-950">{heading}</h3>
              <p className="mt-4 text-base leading-8 text-neutral-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-black/10 bg-[#151515] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Key features</p>
          <div className="mt-6 grid gap-3">
            {study.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#CFFF72]" aria-hidden="true" />
                <span className="text-sm font-semibold leading-6 text-white/76">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-black/10 bg-[#DED9FF] p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Project overview</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-black uppercase leading-[0.82] tracking-[-0.1em] text-neutral-950">Designed around clarity, trust and the next action.</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-400">Conversion path</p>
              <p className="mt-3 text-base font-bold leading-7 tracking-[-0.025em] text-neutral-800">Clear routes to explore the offer, contact the business and act with confidence.</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#CFFF72] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-600">Responsive layer</p>
              <p className="mt-3 text-base font-bold leading-7 tracking-[-0.025em] text-neutral-800">Readable, touch-friendly layouts designed for phones, tablets and large screens.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Technology</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-black uppercase leading-[0.82] tracking-[-0.1em] text-neutral-950">A project-backed implementation stack.</h2>
          <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((item) => <span key={item} className="rounded-full border border-black/10 bg-[#F7F7F2] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-neutral-600">{item}</span>)}</div>
        </div>
        <div className="rounded-[2rem] border border-black/10 bg-white p-5 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Screens</p>
          <div className="mt-5"><BrowserPreview project={project} /></div>
        </div>
      </section>

      {project.mobileImage ? (
        <section className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 sm:rounded-[3rem] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="mx-auto w-full max-w-[360px] rounded-[2.4rem] border border-black/10 bg-[#151515] p-2.5 shadow-[0_30px_90px_rgba(21,21,21,0.18)]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[1.9rem] bg-neutral-100">
                <Image src={project.mobileImage} alt={`${project.title} mobile website experience`} fill sizes="(max-width: 768px) 86vw, 360px" className="object-cover object-top" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Mobile experience</p>
              <h2 className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-[0.78] tracking-[-0.12em] text-neutral-950">The same project, intentionally composed for touch.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-neutral-600">This is a real mobile capture from the deployed project—not a duplicated desktop cover or generated placeholder. Navigation, hierarchy and primary actions remain clear at phone scale.</p>
            </div>
          </div>
        </section>
      ) : null}

      {nextProject ? (
        <section className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 sm:rounded-[3rem] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">Next project</p>
              <h2 className="mt-3 text-[clamp(2.4rem,7vw,6rem)] font-black uppercase leading-[0.78] tracking-[-0.12em] text-neutral-950">{nextProject.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">{nextProject.summary}</p>
            </div>
            <Link href={`/work/${nextProject.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">
              Open next <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
