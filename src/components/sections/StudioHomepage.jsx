"use client";

import { ArrowDownRight, ArrowUpRight, Check, MoveRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createWhatsAppUrl, siteConfig } from "@/config/site";

const capabilities = [
  ["01", "Web development", "Fast, intentional websites that make a business easy to understand and easy to choose.", ["Content-led architecture", "Responsive build system", "SEO and performance basics"]],
  ["02", "E-commerce", "Storefronts that make discovery, confidence and the next purchase feel uncomplicated.", ["Collection journeys", "Mobile commerce UX", "Checkout or WhatsApp flows"]],
  ["03", "UI / UX design", "Clear interfaces with a distinct visual point of view and a practical route to action.", ["Experience direction", "Interface systems", "Clickable prototypes"]],
  ["04", "Digital products", "Useful web applications shaped around the real workflows behind a growing business.", ["Workflow mapping", "Product UI", "Scalable hand-off"]],
];

const process = [
  ["01", "Listen", "The business goal, the audience and the real problem come first."],
  ["02", "Shape", "We turn the brief into a clear structure and visual direction."],
  ["03", "Build", "The approved design becomes a fast site for every important screen."],
  ["04", "Refine", "We test the details, launch thoughtfully and improve what matters."],
];

function ProjectImage({ project, priority = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="premium-project-media">
      {!failed && project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt || `${project.title} website preview`}
          fill
          priority={priority}
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 62vw, 54vw"
          className="premium-project-image"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="premium-project-fallback"><span>{project.title?.slice(0, 2).toUpperCase()}</span></div>
      )}
      <span className="premium-browser-dots" aria-hidden="true"><i /><i /><i /></span>
    </div>
  );
}

function ProjectLink({ project, children, className = "" }) {
  if (project.liveUrl) {
    return <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className={className} data-cursor="OPEN ↗">{children}</a>;
  }

  return <Link href={`/work/${project.slug}`} className={className} data-cursor="VIEW">{children}</Link>;
}

function WorkCard({ project, index, priority = false }) {
  return (
    <article className="premium-work-card">
      <ProjectLink project={project} className="premium-work-link">
        <ProjectImage project={project} priority={priority} />
        <span className="premium-work-view">View project <ArrowUpRight aria-hidden="true" /></span>
      </ProjectLink>
      <div className="premium-work-meta">
        <span>{String(index + 1).padStart(2, "0")} / {project.industry}</span>
        <h3>{project.title}</h3>
        <p>{project.technologies?.slice(0, 3).join(" · ")}</p>
      </div>
    </article>
  );
}

export default function StudioHomepage({ projects = [], featuredProjects = [] }) {
  const featured = (featuredProjects.length ? featuredProjects : projects).slice(0, 4);
  const [lead, ...selected] = featured;
  const startHref = createWhatsAppUrl("Hello Sati Tech, I would like to discuss a website or digital project for my business.");

  return (
    <main className="premium-home">
      <section className="premium-hero">
        <div className="premium-hero-copy">
          <p className="premium-eyebrow"><i /> Sati Tech / creative technology studio</p>
          <h1>Websites built to<br /><em>move business forward.</em></h1>
          <p className="premium-hero-intro">Clear strategy, distinctive design and reliable development for businesses that need a credible, high-performing website on every screen.</p>
          <div className="premium-hero-actions">
            <a href="#selected-work" className="premium-button premium-button-dark">See selected work <ArrowDownRight aria-hidden="true" /></a>
            <a href={startHref} target="_blank" rel="noreferrer noopener" className="premium-button premium-button-light" data-cursor="OPEN ↗">Start a project <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <dl className="premium-hero-facts">
            <div><dt>Approach</dt><dd>Strategy, design &amp; build</dd></div>
            <div><dt>Based in</dt><dd>India / working globally</dd></div>
          </dl>
        </div>

        {lead ? (
          <ProjectLink project={lead} className="premium-lead-project">
            <ProjectImage project={lead} priority />
            <div className="premium-lead-caption">
              <span>Latest selected project</span>
              <strong>{lead.title}</strong>
              <MoveRight aria-hidden="true" />
            </div>
          </ProjectLink>
        ) : null}
      </section>

      <section className="premium-standards" aria-label="Sati Tech design principles">
        <span>Clear positioning</span><i /> <span>Useful motion</span><i /> <span>Responsive detail</span><i /> <span>Built to perform</span>
      </section>

      <section className="premium-section premium-selected" id="selected-work">
        <header className="premium-section-heading">
          <div><p className="premium-eyebrow">01 / Selected work</p><h2>A portfolio with<br /><em>purpose behind it.</em></h2></div>
          <p>Each project starts with a business question, then earns its personality through the details.</p>
        </header>
        <div className="premium-work-grid">
          {selected.map((project, index) => <WorkCard key={project.id || project.slug} project={project} index={index + 1} priority={index === 0} />)}
        </div>
        <Link href="/work" className="premium-text-link">Browse the full archive <ArrowUpRight aria-hidden="true" /></Link>
      </section>

      <section className="premium-section premium-services" id="capabilities">
        <header className="premium-section-heading">
          <div><p className="premium-eyebrow">02 / Capabilities</p><h2>Useful by design.<br /><em>Built to last.</em></h2></div>
          <p>One connected team for the strategic, visual and technical decisions that make a website work harder.</p>
        </header>
        <div className="premium-service-list">
          {capabilities.map(([number, title, copy, points], index) => (
            <details key={title} open={index === 0}>
              <summary><span>{number}</span><strong>{title}</strong><Plus aria-hidden="true" /></summary>
              <div className="premium-service-detail"><p>{copy}</p><ul>{points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul></div>
            </details>
          ))}
        </div>
      </section>

      <section className="premium-process" id="process">
        <div><p className="premium-eyebrow">03 / Working together</p><h2>Strong work needs<br /><em>a steady process.</em></h2></div>
        <div className="premium-process-grid">
          {process.map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="premium-cta" id="contact">
        <p className="premium-eyebrow">04 / New project</p>
        <div><h2>Good work starts<br />with a good <em>conversation.</em></h2><p>Tell us what you are building, changing or trying to improve. We&apos;ll help find the right next step.</p></div>
        <div className="premium-cta-actions"><a href={startHref} target="_blank" rel="noreferrer noopener" className="premium-button premium-button-dark" data-cursor="OPEN ↗">Talk on WhatsApp <ArrowUpRight aria-hidden="true" /></a><a href={`mailto:${siteConfig.contactEmail}`} className="premium-email">{siteConfig.contactEmail}</a></div>
      </section>
    </main>
  );
}
