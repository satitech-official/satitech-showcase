import { ArrowUpRight, Home } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "This Sati Tech page could not be found.",
};

export default function NotFound() {
  return (
    <main className="section-shell grid min-h-[80svh] place-items-center pb-20 pt-28 text-center sm:pt-36">
      <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-12">
        <div className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-[#DED9FF] blur-2xl" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">404</p>
          <h1 className="mt-4 text-[clamp(3.3rem,13vw,10rem)] font-black uppercase leading-[0.74] tracking-[-0.13em] text-neutral-950">This page missed the deploy.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600">The route you opened is not available. Head back home or explore Sati Tech’s real project portfolio.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white"><Home className="h-4 w-4" aria-hidden="true" /> Back home</Link>
            <Link href="/work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">Explore projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
