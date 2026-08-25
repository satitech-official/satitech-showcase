import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Studio",
  description: "Sati Tech is a focused digital studio for considered websites, e-commerce and modern brand experiences.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["Clear direction", "We start with what your business needs to say and what visitors need to do."],
  ["Considered design", "Every screen is shaped to feel distinct, easy to scan and unmistakably yours."],
  ["Solid delivery", "Responsive builds, clean handover and practical support after launch."],
];

export default function AboutPage() {
  return (
    <main className="section-shell studio-page">
      <section className="studio-page-hero">
        <div>
          <p className="page-kicker">The studio</p>
          <h1>A focused digital partner for your next move.</h1>
        </div>
        <div className="studio-page-intro">
          <p>Sati Tech creates refined websites and digital experiences for businesses that want to look credible, feel current and make it easier for customers to take action.</p>
          <div className="studio-page-actions">
            <Link href="/work" className="studio-link-button">View selected work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/contact" className="studio-link-button studio-link-button--quiet">Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="studio-stat-row" aria-label="Sati Tech highlights">
        {siteConfig.stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="studio-principles">
        <div className="studio-principles-intro">
          <p className="page-kicker">How we work</p>
          <h2>Less noise. More momentum.</h2>
          <p>Small, direct collaboration from the first brief to a confident launch.</p>
        </div>
        <div className="studio-principles-list">
          {principles.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <Check className="h-4 w-4" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
