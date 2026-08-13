"use client";

import { RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="section-shell grid min-h-[80svh] place-items-center pb-20 pt-28 text-center sm:pt-36">
      <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-12">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4C5CFF]">Network / runtime state</p>
        <h1 className="mt-4 text-[clamp(3rem,11vw,8rem)] font-black uppercase leading-[0.76] tracking-[-0.13em] text-neutral-950">Something did not load cleanly.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600">{error?.message || "The page hit an unexpected state. You can retry safely or continue browsing the portfolio."}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white"><RefreshCcw className="h-4 w-4" aria-hidden="true" /> Retry</button>
          <Link href="/work" className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">Explore projects</Link>
        </div>
      </section>
    </main>
  );
}
