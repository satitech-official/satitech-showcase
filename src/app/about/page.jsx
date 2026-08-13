import { ArrowUpRight, Check } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getProjects, getRecentActivity } from "@/lib/github";
import { ActivityList } from "@/components/projects/ProjectPieces";

export const metadata = {
  title: "About",
  description: "Learn how Sati Tech builds business websites, e-commerce stores, SEO-ready systems, UI/UX and website support for modern businesses.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [projects, recent] = await Promise.all([getProjects(), getRecentActivity(4)]);

  return (
    <main className="section-shell pb-20 pt-28 sm:pt-36">
      <section className="grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div className="min-w-0 rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">About Sati Tech</p>
          <h1 className="mt-4 text-[clamp(3.2rem,12vw,10rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">Websites connected to growth.</h1>
        </div>
        <div className="min-w-0 rounded-[2rem] border border-black/10 bg-[#DED9FF] p-5 sm:rounded-[3rem] sm:p-8">
          <p className="text-[clamp(1.5rem,4vw,3.3rem)] font-black leading-[0.98] tracking-[-0.07em] text-neutral-950">
            Sati Tech designs modern, fast and high-converting web experiences that help businesses attract customers, build trust and grow online.
          </p>
          <p className="mt-5 text-base leading-8 text-neutral-700">
            The verified company offering includes business websites, e-commerce stores, landing pages, SEO-ready structures, mobile-first design, UI/UX and reliable website support.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="rounded-[2rem] border border-black/10 bg-white p-6 text-center">
            <div className="text-[clamp(3rem,9vw,7rem)] font-black leading-none tracking-[-0.1em] text-neutral-950">{stat.value}</div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Studio position</p>
          <h2 className="mt-3 text-[clamp(2.6rem,8vw,6.6rem)] font-black uppercase leading-[0.78] tracking-[-0.12em]">Serious design for serious business presence.</h2>
        </div>
        <div className="grid gap-4">
          {[
            "Business websites shaped around clarity, trust and enquiry conversion.",
            "E-commerce and catalogue experiences that make products easier to discover.",
            "SEO-friendly structure, responsive layouts and fast-loading front-end implementation.",
            "Website support for updates, improvements and launch confidence.",
          ].map((item) => (
            <div key={item} className="flex gap-4 rounded-[1.75rem] border border-black/10 bg-white p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#CFFF72]"><Check className="h-4 w-4" aria-hidden="true" /></span>
              <p className="text-base font-semibold leading-7 text-neutral-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Studio principles</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["What we believe", "A website should clarify the business, earn trust and make the next action feel natural."],
            ["How we work", "Small, focused collaboration from discovery through launch, with decisions explained clearly."],
            ["Who we build for", "Ambitious businesses that want a distinctive digital presence without sacrificing usability."],
            ["Design philosophy", "Editorial hierarchy, purposeful motion and brand-specific character instead of generic template patterns."],
            ["Technology philosophy", "Modern tools chosen for speed, maintainability and the life of the product after launch."],
          ].map(([title, text], index) => (
            <article key={title} className="rounded-[1.75rem] border border-black/10 bg-white p-5">
              <span className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-neutral-400">0{index + 1}</span>
              <h2 className="mt-5 text-xl font-black uppercase leading-[0.95] tracking-[-0.05em] text-neutral-950">{title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2rem] border border-black/10 bg-[#151515] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">GitHub-backed portfolio</p>
          <h2 className="mt-3 text-[clamp(2.2rem,7vw,5.5rem)] font-black uppercase leading-[0.78] tracking-[-0.11em]">{projects.length} public repositories currently indexed.</h2>
          <p className="mt-5 text-base leading-7 text-white/62">This count comes from the GitHub organization feed and can change as public repositories are added or updated.</p>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer noopener" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">
            Open GitHub <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
        <ActivityList projects={recent} />
      </section>

      <section className="mt-16 rounded-[2rem] border border-black/10 bg-white p-6 sm:rounded-[3rem] sm:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">Next step</p>
            <h2 className="mt-2 text-[clamp(2rem,5vw,4.6rem)] font-black uppercase leading-[0.82] tracking-[-0.1em]">Explore the real work or start a conversation.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">View work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">Contact <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
