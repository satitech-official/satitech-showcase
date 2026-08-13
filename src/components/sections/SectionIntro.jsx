"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, MessageCircle, MousePointer2, Search, Sparkles } from "lucide-react";
import { GitHubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { ActivityList, BrowserPreview, FeaturedProject, ProjectCard } from "@/components/projects/ProjectPieces";
import { cn } from "@/lib/utils";
import { fadeUp, maskReveal, motionTokens, premiumEase, staggerContainer, viewportOnce } from "@/motion/variants";


export function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={cn("min-w-0 mb-9 sm:mb-14", align === "center" && "mx-auto max-w-3xl text-center")}>
      <motion.div
        className={cn("flex items-center gap-4", align === "center" && "justify-center")}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="eyebrow-label text-[#4C5CFF]">Sati / {eyebrow}</p>
        <span className="hidden h-px flex-1 bg-black/10 sm:block" />
      </motion.div>
      <motion.h2
        className="display-type mt-4 text-[clamp(2.55rem,7vw,7rem)] uppercase leading-[0.82] text-neutral-950"
        initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 28% 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true }}
        transition={{ delay: 0.05, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>
      {text ? <p className={cn("mt-5 max-w-2xl text-[0.96rem] leading-7 text-neutral-600 sm:text-base", align === "center" && "mx-auto")}>{text}</p> : null}
    </div>
  );
}

