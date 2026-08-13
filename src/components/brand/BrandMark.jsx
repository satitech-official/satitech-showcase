"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function BrandMark({ size = 48, className = "", priority = false, showWordmark = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <span
        className="relative grid shrink-0 place-items-center overflow-hidden rounded-[28%] border border-white/10 bg-[#0b0e14] text-white shadow-[0_10px_30px_rgba(13,17,24,0.18)]"
        style={{ width: size, height: size }}
      >
        {failed ? (
          <span className="text-[0.72rem] font-black tracking-[-0.08em]" aria-hidden="true">ST</span>
        ) : (
          <Image
            src={siteConfig.logo}
            alt="Sati Tech Pvt. Ltd. logo"
            fill
            priority={priority}
            sizes={`${size}px`}
            className="object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      {showWordmark ? (
        <span className="hidden min-w-0 leading-none sm:block">
          <span className="block truncate text-[0.8rem] font-extrabold tracking-[-0.035em]">SATI TECH</span>
          <span className="mt-1 block truncate text-[0.5rem] font-bold uppercase tracking-[0.17em] text-neutral-500">Creative Technology Studio</span>
        </span>
      ) : null}
    </span>
  );
}
