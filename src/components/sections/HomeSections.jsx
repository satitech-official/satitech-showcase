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

function SectionIntro({ eyebrow, title, text, align = "left" }) {
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

function HeroProjectConstellation({ projects, reduceMotion }) {
  const positions = [
    "left-[5%] top-[13%] w-[74%] -rotate-[5deg]",
    "right-[4%] top-[35%] w-[72%] rotate-[5deg]",
    "bottom-[6%] left-[12%] w-[67%] -rotate-[2deg]",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden p-8" aria-label="Animated previews of real Sati Tech projects">
      <div className="absolute inset-[12%] rounded-full border border-cyan-300/20" aria-hidden="true" />
      <div className="absolute inset-[23%] rounded-full border border-violet-300/20" aria-hidden="true" />
      {projects.slice(0, 3).map((project, index) => (
        <motion.div
          key={project.id}
          className={`absolute ${positions[index]} overflow-hidden rounded-[1.2rem] border border-white/20 bg-[#071126] p-2 shadow-[0_26px_80px_rgba(2,8,23,0.34)]`}
          initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, index % 2 ? -9 : 9, 0], scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { opacity: { delay: 0.18 + index * 0.1, duration: 0.5 }, y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5 } }}
        >
          <Link href={`/work/${project.slug}`} className="group block" aria-label={`View ${project.title} case study`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem] bg-slate-900">
              <Image src={project.image} alt={`${project.title} website preview`} fill priority={index === 0} sizes="(max-width: 768px) 76vw, 42vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/65 via-transparent to-transparent" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-white">
                <span className="min-w-0">
                  <span className="block text-[0.52rem] font-black uppercase tracking-[0.16em] text-cyan-200">Real project / 0{index + 1}</span>
                  <strong className="mt-1 block truncate text-xs uppercase">{project.title}</strong>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function Hero({ projects }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualExitY = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, -34]);
  const words = ["DESIGNED TO CONVERT.", "BUILT TO SCALE.", "ENGINEERED TO PERFORM.", "MADE TO STAND OUT."];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setWordIndex((value) => (value + 1) % words.length), 1800);
    return () => clearInterval(timer);
  }, [reduceMotion, words.length]);

  const onMove = (event) => {
    if (window.innerWidth < 900 || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  return (
    <section ref={heroRef} id="home" className="section-shell relative min-h-[100svh] overflow-hidden pb-12 pt-28 sm:pt-36 lg:pt-40" onMouseMove={onMove}>
      <div className="mb-7 grid grid-cols-2 gap-3 border-b border-black/10 pb-4 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-neutral-500 sm:grid-cols-4">
        <span>01 / Digital studio</span>
        <span>India Â· Working globally</span>
        <span className="hidden sm:block">Design + Development</span>
        <span className="justify-self-end text-neutral-950"><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#69d883] not-italic" />Available for projects</span>
      </div>
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-[32rem] max-w-5xl rounded-full bg-[#DED9FF]/28 blur-3xl" aria-hidden="true" />
      <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div className="relative z-10">
          <motion.div
            className="eyebrow-label text-[#4C5CFF]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SATI TECH / CREATIVE TECHNOLOGY STUDIO
          </motion.div>

          <motion.h1
            className="display-type mt-6 max-w-5xl text-[clamp(3.15rem,8.5vw,7.2rem)] uppercase leading-[0.74] text-neutral-950"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.span variants={maskReveal} className="block overflow-hidden">We build</motion.span>
            <motion.span variants={maskReveal} className="editorial-serif block overflow-hidden pr-[0.08em] font-normal normal-case leading-[0.78] tracking-[-0.06em] text-[#22d3ee]">digital experiences</motion.span>
            <motion.span variants={maskReveal} className="block overflow-hidden">that move</motion.span>
            <motion.span variants={maskReveal} className="block overflow-hidden">businesses <span className="text-[#8b5cf6]">forward.</span></motion.span>
          </motion.h1>

          <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-4 overflow-hidden">
            <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-neutral-400">Built for impact</span>
            <div className="editorial-rule" />
          </div>
          <div className="mt-3 min-h-[3rem] overflow-hidden sm:min-h-[4.2rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={wordIndex}
                initial={{ y: 36, opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ y: 0, opacity: 1, clipPath: "inset(0 0 0 0)" }}
                exit={{ y: -18, opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: motionTokens.normal, ease: premiumEase }}
                className="display-type text-[clamp(2rem,5.5vw,4.9rem)] uppercase leading-[0.82] text-neutral-950"
                aria-live="polite"
              >
                {words[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-5 max-w-xl text-[0.96rem] leading-7 text-neutral-600 sm:text-[1.04rem] sm:leading-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
          >
            Sati Tech designs and develops modern websites, e-commerce experiences and digital systems that help businesses build trust, convert visitors and grow online.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#projects" className="action-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#151515] px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white hover:bg-[#4C5CFF]">
              Explore Projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-neutral-950 hover:border-[#CFFF72] hover:bg-[#CFFF72]" data-cursor="OPEN â†—">
              Start a project <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-cyan-300/25 bg-[#0a1530]/75 px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white hover:border-cyan-300/70 hover:text-cyan-200" data-cursor="OPEN â†—">
              Follow on Instagram <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.url} target="_blank" rel="noreferrer noopener" className="action-secondary inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-violet-300/25 bg-[#0a1530]/75 px-6 text-xs font-extrabold tracking-[0.04em] text-white hover:border-violet-300/70 hover:text-violet-200" data-cursor="OPEN â†—">
              {siteConfig.websiteDisplay} <Globe2 className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-stage hero-stage-orbit relative min-h-[455px] overflow-hidden sm:min-h-[590px] lg:min-h-[680px]"
          style={{ y: reduceMotion ? 0 : visualExitY }}
          initial={{ opacity: 0, scale: 0.975, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-spotlight left-1/2 top-1/2" style={{ transform: `translate(calc(-50% + ${pointer.x * 14}px), calc(-50% + ${pointer.y * 14}px))` }} aria-hidden="true" />
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-neutral-600 backdrop-blur sm:left-5 sm:top-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4C5CFF]" aria-hidden="true" /> Sati Signal / Live work
          </div>
          <div className="absolute right-4 top-4 z-20 rounded-full bg-[#CFFF72] px-3 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] text-neutral-950 sm:right-5 sm:top-5">
            Real project signals
          </div>
          <HeroProjectConstellation projects={projects} reduceMotion={reduceMotion} />

          <div className="absolute bottom-5 right-5 z-20 hidden text-right text-[0.58rem] font-extrabold uppercase tracking-[0.17em] text-neutral-500 sm:block">
            Real builds<br /><span className="text-white">in motion</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-5 border-t border-black/10 pt-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <a href="#selected-work" className="inline-flex w-fit items-center gap-3 text-[0.66rem] font-extrabold uppercase tracking-[0.17em] text-neutral-500" aria-label="Scroll to selected work">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-neutral-950"><ArrowDown className="h-4 w-4" aria-hidden="true" /></span>
          Discover the studio
        </a>
        <div className="grid grid-cols-3 gap-3 sm:justify-self-end">
          {[{ value: "Mobile-first", label: "Responsive" }, { value: "Fast", label: "Performance" }, { value: "24/7", label: "Support" }].map((stat) => <div key={stat.label} className="mini-proof"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function TrustMarquee({ projects }) {
  const line = ["Design", "Development", "E-Commerce", "Next.js", "Motion", "SEO", "UI/UX", "Digital Experiences", "Business Growth"];
  const industries = Array.from(new Set(projects.map((project) => project.industry))).slice(0, 12);
  return (
    <section className="border-y border-black/10 bg-white/40 py-4">
      <div className="marquee">
        <div className="marquee-track flex text-[clamp(1.4rem,4vw,4rem)] font-black uppercase leading-none tracking-[-0.06em] text-neutral-950">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="marquee-set flex shrink-0 gap-5 pr-5" aria-hidden={setIndex === 1}>
              {line.map((item) => <span key={item} className="flex items-center gap-5 whitespace-nowrap">{item}<span className="h-3 w-3 rounded-full bg-[#4C5CFF]" /></span>)}
            </div>
          ))}
        </div>
      </div>
      {industries.length ? (
        <div className="marquee mt-3">
          <div className="marquee-track reverse flex text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="marquee-set flex shrink-0 gap-4 pr-4" aria-hidden={setIndex === 1}>
                {industries.map((item) => <span key={item} className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2">{item}</span>)}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function L×]½êÚ$z{-®éÜj×ÒÒÀ¢Ó°¢6öç7B¶æVVBÂ6WDæVVEÒÒW6U7FFR†æVVG5³Ò“°¢6öç7BÖW76vRÒ†VÆÆò6F’FV6‚ÂG¶æVVBæÆ&VÇÒâ’6r–÷W"&V6öÖÖVæFVB6W'f–6W2‚G¶æVVBç6W'f–6W2æ¦ö–â‚"Â"—Ò’æBv÷VÆBÆ–¶RFòF—67W72F†R&–v‡BF—&V7F–öâf÷"×’'W6–æW72æ° ¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ’Ób6Ó§’Ó#B#à¢ÆF—b6Æ74æÖSÒ&÷fW&fÆ÷rÖ†–FFVâ&÷VæFVBÕ³'&VÕÒ&÷&FW"&÷&FW"Ö&Æ6²ó&r×v†—FRÓR6Ó§&÷VæFVBÕ³7&VÕÒ6Ó§Ó‚Æs§Ó#à¢ÆF—b6Æ74æÖSÒ&w&–BvÓ‚Æs¦w&–BÖ6öÇ2Õ³ã–g%óãg%Ò#à¢ÆF—cà¢Ç6Æ74æÖSÒ'FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ã#&VÕÒFW‡BÕ²3D3T4deÒ#å6W'f–6RÖF6†W#Â÷à¢Æƒ"6Æ74æÖSÒ&×BÓBFW‡BÕ¶6Æ×ƒ"ãg&VÒÃ‡grÃbãw&VÒ•ÒföçBÖ&Æ6²WW&66RÆVF–ærÕ³ãs…ÒG&6¶–ærÕ²Óã&VÕÒ#åv†BFöW2–÷W"'W6–æW72æVVCóÂöƒ#à¢Ç6Æ74æÖSÒ&×BÓRFW‡BÖ&6RÆVF–ærÓrFW‡BÖæWWG&ÂÓc#ä6†ö÷6RF†R6—GVF–öâF†BfVVÇ26Æ÷6W7BâF†RÖF6†W"&V6öÖÖVæG2&7F–6Â6W'f–6R6öÖ&–æF–öâæB6'&–W2F†R6öçFW‡B–çFòv†G4ãÂ÷à¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–BvÓR#à¢ÆF—cà¢Æƒ26Æ74æÖSÒ'FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ã†VÕÒFW‡BÖæWWG&ÂÓS#ä7W'&VçB6—GVF–öãÂöƒ3à¢ÆF—b6Æ74æÖSÒ&×BÓ2fÆW‚fÆW‚×w&vÓ"#à¢¶æVVG2æÖ‚†÷F–öâ’ÓâÆ'WGFöâ¶W“×¶÷F–öâæÆ&VÇÒG—SÒ&'WGFöâ"öä6Æ–6³×²‚’Óâ6WDæVVB†÷F–öâ—Ò6Æ74æÖS×¶6â‚'&÷VæFVBÖgVÆÂ&÷&FW"‚ÓB’Ó"FW‡B×‡2föçBÖ&Æ6²G&6¶–ærÕ²ÓãVÕÒG&ç6—F–öâ"ÂæVVBæÆ&VÂÓÓÒ÷F–öâæÆ&VÂò&&÷&FW"Õ²3SSUÒ&rÕ²3SSUÒFW‡B×v†—FR"¢&&÷&FW"Ö&Æ6²ó&rÕ²4ctctc%ÒFW‡BÖæWWG&ÂÓc†÷fW#¦&÷&FW"Õ²3D3T4deÒóC"—Óç¶÷F–öâæÆ&VÇÓÂö'WGFöãâ—Ð¢ÂöF—cà¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ'&÷VæFVBÕ³ãW&VÕÒ&rÕ²4ctctc%ÒÓR#à¢Ç6Æ74æÖSÒ'FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ã†VÕÒFW‡BÖæWWG&ÂÓS#å&V6öÖÖVæFVB6W'f–6RÖ—ƒÂ÷à¢ÆF—b6Æ74æÖSÒ&×BÓBw&–BvÓ"6Ó¦w&–BÖ6öÇ2Ó2#à¢¶æVVBç6W'f–6W2æÖ‚‡6W'f–6RÂ–æFW‚’ÓâÆF—b¶W“×·6W'f–6WÒ6Æ74æÖSÒ'&÷VæFVBÓ'†Â&÷&FW"&÷&FW"Ö&Æ6²ó&r×v†—FRÓB#ãÇ7â6Æ74æÖSÒ'FW‡BÕ³ãc'&VÕÒföçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãfVÕÒFW‡BÕ²3D3T4deÒ#ã¶–æFW‚²ÓÂ÷7ããÇ7G&öær6Æ74æÖSÒ&×BÓ"&Æö6²FW‡B×6ÒÆVF–ærÓRFW‡BÖæWWG&ÂÓ“S#ç·6W'f–6WÓÂ÷7G&öæsãÂöF—câ—Ð¢ÂöF—cà¢Æ‡&Vc×¶7&VFUv†G4W&Â†ÖW76vR—ÒF&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W"æö÷VæW""6Æ74æÖSÒ&×BÓR–æÆ–æRÖfÆW‚—FV×2Ö6VçFW"vÓ"&÷VæFVBÖgVÆÂ&rÕ²44ddcs%Ò‚ÓR’Ó2FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãFVÕÒFW‡BÖæWWG&ÂÓ“S"FFÖ7W'6÷#Ò$õTâ(ir#à¢F—67W72F†—2&ö¦V7BÄÖW76vT6—&6ÆR6Æ74æÖSÒ&‚ÓBrÓB"&–Ö†–FFVãÒ'G'VR"óà¢Âöà¢ÂöF—cà¢ÂöF—cà¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢“°§Ð ¦gVæ7F–öâÆÅ&ö¦V7G5&Wf–Wr‡²&ö¦V7G2Ò’°¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ’Ób6Ó§’Ó#B#à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂvÓB6Ó¦fÆW‚×&÷r6Ó¦—FV×2ÖVæB6Ó¦§W7F–g’Ö&WGvVVâ#à¢Å6V7F–öä–çG&òW–V'&÷sÒ%&ö¦V7BW‡Æ÷&W""F—FÆSÒ$Ö÷&RV&Æ–2v÷&²ÂÇv—2WFF–ærâ"FW‡CÒ$æWrV&Æ–2&W÷6—F÷&–W26âV"F‡&÷Vv‚F†Rv—D‡V"–çFVw&F–öâv—F†÷WBÖçVÆÇ’&Ww&—F–ær†öÖWvR&ö¦V7B¥5‚â"óà¢ÄÆ–æ²‡&VcÒ"÷v÷&²"6Æ74æÖSÒ&Ö"Ó‚–æÆ–æRÖfÆW‚—FV×2Ö6VçFW"vÓ"&÷VæFVBÖgVÆÂ&rÕ²3SSUÒ‚ÓR’Ó2FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãFVÕÒFW‡B×v†—FR6Ó¦Ö"Ó"#à¢'&÷w6RÆÂ&ö¦V7G2Ä'&÷u&–v‡B6Æ74æÖSÒ&‚ÓBrÓB"&–Ö†–FFVãÒ'G'VR"óà¢ÂôÆ–æ³à¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–BvÓBÖC¦w&–BÖ6öÇ2Ó"†Ã¦w&–BÖ6öÇ2Ó2#à¢·&ö¦V7G2ç6Æ–6RƒÂb’æÖ‚‡&ö¦V7BÂ–æFW‚’ÓâÅ&ö¦V7D6&B¶W“×·&ö¦V7Bæ–GÒ&ö¦V7C×·&ö¦V7GÒ–æFWƒ×¶–æFW‡Òóâ—Ð¢ÂöF—cà¢Â÷6V7F–öãà¢“°§Ð ¦gVæ7F–öâv‡”6†ö÷6U6F’‚’°¢6öç7B&V6öç2Ò°¢²çVÖ&W#¢#"ÂF—FÆS¢%7G&FVw’&Vf÷&R67&VVç2"ÂFW‡C¢$WfW'’'V–ÆB7F'G2v—F‚F†RVF–Væ6RÂöffW"æB'W6–æW727F–öâF†RW‡W&–Væ6RæVVG2Fò7W÷'Bâ"ÒÀ¢²çVÖ&W#¢#""ÂF—FÆS¢$FW6–vâæB6öFRFövWF†W""ÂFW‡C¢%f—7VÂ7&gBÂ&W7öç6—fR&V†f–÷W"æB–×ÆVÖVçFF–öâFV6—6–öç2&R6†VB2öæR6öææV7FVB7—7FVÒâ"ÒÀ¢²çVÖ&W#¢#2"ÂF—FÆS¢%W&f÷&Öæ6R—2'BöbVÆ—G’"ÂFW‡C¢$Öö&–ÆRÖf—'7BÆ–÷WG2Â÷F–Ö—¦VBÖVF–æB66W76–&ÆR–çFW&7F–öç2¶VWF†RW‡W&–Væ6RW6VgVÂ&W–öæBF†Rf—'7B–×&W76–öââ"ÒÀ¢²çVÖ&W#¢#B"ÂF—FÆS¢%7W÷'B&W–öæBÆVæ6‚"ÂFW‡C¢$6ÆV"†æFöfbæB&VÆ–&ÆRöævö–ær7W÷'B†VÇF†RvV'6—FR7F’&VÆWfçB2F†R'W6–æW72Ö÷fW2f÷'v&Bâ"ÒÀ¢Ó° ¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ’Ób6Ó§’Ó#B#à¢Å6V7F–öä–çG&òW–V'&÷sÒ%v‡’6F’FV6‚"F—FÆSÒ$FV6†æ–6Â'FæW"Âæ÷BvRf7F÷'’â"FW‡CÒ$fö7W6VBFV6—6–öç2ÂG&ç7&VçBFVÆ—fW'’æBF–v—FÂ7&gBFW6–væVB&÷VæB&VÂ'W6–æW72ÖöÖVçGVÒâ"óà¢ÆF—b6Æ74æÖSÒ&w&–BvÓ2ÖC¦w&–BÖ6öÇ2Ó"†Ã¦w&–BÖ6öÇ2ÓB#à¢·&V6öç2æÖ‚‡&V6öâÂ–æFW‚’Óâ€¢ÆÖ÷F–öâæ'F–6ÆP¢¶W“×·&V6öâçF—FÆWÐ¢f&–çG3×¶fFUWÐ¢–æ—F–ÃÒ&†–FFVâ ¢v†–ÆT–åf–WsÒ'f—6–&ÆR ¢f–Ww÷'C×·f–Ww÷'Döæ6WÐ¢G&ç6—F–öã×·²FVÆ“¢–æFW‚¢ãR×Ð¢6Æ74æÖSÒ&vÆ72×æVÂ&÷VæFVBÕ³'&VÕÒÓR6Ó§Ób ¢à¢Ç7â6Æ74æÖSÒ&föçBÖÖöæòFW‡B×‡2föçBÖ&öÆBG&6¶–ærÕ³ã†VÕÒFW‡BÖ7–âÓ3#ç·&V6öâæçVÖ&W'Òò4D“Â÷7ãà¢Æƒ26Æ74æÖSÒ&×BÓ’FW‡BÓ'†ÂföçBÖ&Æ6²WW&66RÆVF–ærÕ³ã“UÒG&6¶–ærÕ²ÓãfVÕÒFW‡B×v†—FR#ç·&V6öâçF—FÆWÓÂöƒ3à¢Ç6Æ74æÖSÒ&×BÓBFW‡B×6ÒÆVF–ærÓbFW‡B×6ÆFRÓC#ç·&V6öâçFW‡GÓÂ÷à¢ÂöÖ÷F–öâæ'F–6ÆSà¢’—Ð¢ÂöF—cà¢Â÷6V7F–öãà¢“°§Ð ¦gVæ7F–öâ6ö×ÆWFU&ö¦V7DvÆÆW'’‡²&ö¦V7G2Ò’°¢6öç7Bf–ÇFW'2Ò²$ÆÂ&ö¦V7G2"Â$'W6–æW72vV'6—FW2"Â$RÔ6öÖÖW&6R"Â%T’õU‚"Â$'&æF–ær"Â$÷F†W"%Ó°¢6öç7B¶7F—fTf–ÇFW"Â6WD7F—fTf–ÇFW%ÒÒW6U7FFR‚$ÆÂ&ö¦V7G2"“°¢6öç7B·VW'’Â6WEVW'•ÒÒW6U7FFR‚""“°¢6öç7Bf–ÇFW&VE&ö¦V7G2ÒW6TÖVÖò‚‚’Óâ&ö¦V7G2æf–ÇFW"‚‡&ö¦V7B’Óâ°¢6öç7B6V&6†&ÆRÒG·&ö¦V7BçF—FÆWÒG·&ö¦V7Bç7VÖÖ'—ÒG·&ö¦V7Bæ6FVv÷'—ÒG·&ö¦V7Bæ–æGW7G'—ÒG·&ö¦V7BçFV6†æöÆöv–W2æ¦ö–â‚""—ÖçFôÆ÷vW$66R‚“°¢6öç7BÖF6†W5VW'’Ò6V&6†&ÆRæ–æ6ÇVFW2‡VW'’çG&–Ò‚’çFôÆ÷vW$66R‚’“°¢–b‚ÖF6†W5VW'’ÇÂ7F—fTf–ÇFW"ÓÓÒ$ÆÂ&ö¦V7G2"’&WGW&âÖF6†W5VW'“° ¢6öç7BFw2ÒµÓ°¢–b‡&ö¦V7Bæ6FVv÷'’ÓÓÒ$RÔ6öÖÖW&6R"’Fw2çW6‚‚$RÔ6öÖÖW&6R"“°¢–b…²$'W6–æW72"Â%&W7FW&çB"Â$†÷7—FÆ—G’"Â%F÷W&—6Ò%Òæ–æ6ÇVFW2‡&ö¦V7Bæ6FVv÷'’’’Fw2çW6‚‚$'W6–æW72vV'6—FW2"“°¢–b‡&ö¦V7Bæ–æGW7G'’ÓÓÒ$7&VF—fR7GVF–ò"ÇÂ&ö¦V7Bç&WôæÖRÓÓÒ'6F—FV6‚×6†÷v66R"’Fw2çW6‚‚%T’õU‚"“°¢–b‡&ö¦V7Bæ–æGW7G'’ÓÓÒ$f6†–öâ"’Fw2çW6‚‚$'&æF–ær"“°¢–b‡&ö¦V7Bç&WôæÖRÓÓÒ&–æF–2Öv÷BÖÆFVçB×6—FR"’Fw2çW6‚‚$÷F†W""“°¢&WGW&âFw2æ–æ6ÇVFW2†7F—fTf–ÇFW"“°¢Ò’Â¶7F—fTf–ÇFW"Â&ö¦V7G2ÂVW'•Ò“° ¢&WGW&â€¢Ç6V7F–öâ–CÒ'&ö¦V7G2"6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ67&öÆÂÖ×BÓ#’Ób6Ó§’Ó#B#à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂvÓR6Ó¦fÆW‚×&÷r6Ó¦—FV×2ÖVæB6Ó¦§W7F–g’Ö&WGvVVâ#à¢Å6V7F–öä–çG&òW–V'&÷sÒ$W‡Æ÷&R&ö¦V7G2"F—FÆSÒ$WfW'’V&Æ–2'V–ÆBâöæRf—7VÂÆ–'&'’â"FW‡CÒ%6V&6‚æBf–ÇFW"WfW'’6F’FV6‚&ö¦V7BâV6‚6&BW6W2—G2÷vâ÷F–Ö—¦VB&VÂ67&VVç6†÷BÂfW&–f–VB&W÷6—F÷'’Æ–æ²æBÆ—fRFVÖòöæÇ’v†VâöæR—26öæf—&ÖVBâ"óà¢ÆF—b6Æ74æÖSÒ&Ö"Ó‚&÷VæFVBÖgVÆÂ&÷&FW"&÷&FW"Ö7–âÓ3ó#&rÖ7–âÓ3ó‚‚ÓB’Ó"FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãfVÕÒFW‡BÖ7–âÓ#6Ó¦Ö"Ó"#ç¶f–ÇFW&VE&ö¦V7G2æÆVæwF‡Òöb·&ö¦V7G2æÆVæwF‡Ò&ö¦V7G3ÂöF—cà¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&Ö"Ó‚w&–BvÓB&÷VæFVBÕ³'&VÕÒ&÷&FW"&÷&FW"×v†—FRó&rÕ²3s#eÒóƒÓB6Ó§ÓRÆs¦w&–BÖ6öÇ2Õ¶Ö–æÖ‚ƒ#C‚ÃãcVg"•óg%ÒÆs¦—FV×2Ö6VçFW"#à¢ÆÆ&VÂ6Æ74æÖSÒ&fÆW‚Ö–âÖ‚Ó"—FV×2Ö6VçFW"vÓ2&÷VæFVBÖgVÆÂ&÷&FW"&÷&FW"×v†—FRó"&r×v†—FRór‚ÓBFW‡B×v†—FRfö7W2×v—F†–ã¦&÷&FW"Ö7–âÓ3óc#à¢Å6V&6‚6Æ74æÖSÒ&‚ÓBrÓB6‡&–æ²ÓFW‡BÖ7–âÓ#"&–Ö†–FFVãÒ'G'VR"óà¢Ç7â6Æ74æÖSÒ'7"ÖöæÇ’#å6V&6‚&ö¦V7G3Â÷7ãà¢Æ–çWBfÇVS×·VW'—Òöä6†ævS×²†WfVçB’Óâ6WEVW'’†WfVçBçF&vWBçfÇVR—ÒÆ6V†öÆFW#Ò%6V&6‚&ö¦V7G2÷"FV6†æöÆöv–W2"6Æ74æÖSÒ'rÖgVÆÂ&r×G&ç7&VçBFW‡B×6ÒföçB×6VÖ–&öÆB÷WFÆ–æRÖæöæRÆ6V†öÆFW#§FW‡B×6ÆFRÓS"óà¢ÂöÆ&VÃà¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚×w&vÓ""&–ÖÆ&VÃÒ%&ö¦V7Bf–ÇFW'2#à¢¶f–ÇFW'2æÖ‚†f–ÇFW"’Óâ€¢Æ'WGFöâ¶W“×¶f–ÇFW'ÒG—SÒ&'WGFöâ"öä6Æ–6³×²‚’Óâ6WD7F—fTf–ÇFW"†f–ÇFW"—Ò&–×&W76VC×¶7F—fTf–ÇFW"ÓÓÒf–ÇFW'Ò6Æ74æÖS×¶6â‚&Ö–âÖ‚Ó&÷VæFVBÖgVÆÂ&÷&FW"‚Ó2ãR’Ó"FW‡BÕ³ãcg&VÕÒföçBÖ&Æ6²WW&66RG&6¶–ærÕ³ã&VÕÒG&ç6—F–öâ"Â7F—fTf–ÇFW"ÓÓÒf–ÇFW"ò&&÷&FW"Ö7–âÓ3&rÖ7–âÓ3FW‡BÕ²33UÒ"¢&&÷&FW"×v†—FRó"&r×v†—FRóRFW‡B×6ÆFRÓ3†÷fW#¦&÷&FW"Ö7–âÓ3óS†÷fW#§FW‡B×v†—FR"—Óà¢¶f–ÇFW'Ð¢Âö'WGFöãà¢’—Ð¢ÂöF—cà¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–BvÓBÖC¦w&–BÖ6öÇ2Ó"†Ã¦w&–BÖ6öÇ2Ó2#à¢Äæ–ÖFU&W6Væ6RÖöFSÒ'÷Æ–÷WB#à¢¶f–ÇFW&VE&ö¦V7G2æÖ‚‡&ö¦V7BÂ–æFW‚’ÓâÅ&ö¦V7D6&B¶W“×·&ö¦V7Bæ–GÒ&ö¦V7C×·&ö¦V7GÒ–æFWƒ×¶–æFW‡Òóâ—Ð¢Âôæ–ÖFU&W6Væ6Sà¢ÂöF—cà¢²f–ÇFW&VE&ö¦V7G2æÆVæwF‚òÆF—b6Æ74æÖSÒ'&÷VæFVBÕ³'&VÕÒ&÷&FW"&÷&FW"×v†—FRó&r×v†—FRóRÓFW‡BÖ6VçFW"FW‡B×6ÆFRÓ3#äæò&ö¦V7G2ÖF6‚F†—26V&6‚–WBãÂöF—câ¢çVÆÇÐ¢Â÷6V7F–öãà¢“°§Ð ¦gVæ7F–öâ–ç7Fw&Õ6†÷v66R‡²&ö¦V7G2Ò’°¢6öç7B6†÷v66RÒ&ö¦V7G2ç6Æ–6R‚Ób“° ¢&WGW&â€¢Ç6V7F–öâ–CÒ&–ç7Fw&Ò"6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ’Ób6Ó§’Ó#B#à¢ÆF—b6Æ74æÖSÒ&–ç7Fw&Ò×6†VÆÂ÷fW&fÆ÷rÖ†–FFVâ&÷VæFVBÕ³'&VÕÒÓR6Ó§&÷VæFVBÕ³7&VÕÒ6Ó§Ó‚Æs§Ó#à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂvÓR6Ó¦fÆW‚×&÷r6Ó¦—FV×2ÖVæB6Ó¦§W7F–g’Ö&WGvVVâ#à¢ÆF—cà¢Ç6Æ74æÖSÒ&W–V'&÷rÖÆ&VÂFW‡BÖgV6‡6–Ó3#å6F’ò–ç7Fw&ÓÂ÷à¢Æƒ"6Æ74æÖSÒ&F—7Æ’×G—R×BÓRÖ‚×rÓW†ÂFW‡BÕ¶6Æ×ƒ"ãw&VÒÃ‡grÃw&VÒ•ÒWW&66RÆVF–ærÕ³ãƒ%ÒFW‡B×v†—FR#åv÷&²–â—†VÇ2ãÆ'"óãÇ7â6Æ74æÖSÒ'FW‡BÖw&F–VçB×FV6‚#ä–FV2–âÖ÷F–öâãÂ÷7ããÂöƒ#à¢Ç6Æ74æÖSÒ&×BÓRÖ‚×rÓ'†ÂFW‡B×6ÒÆVF–ærÓrFW‡B×6ÆFRÓ36Ó§FW‡BÖ&6R#ä6ö6–Â×7G–ÆRVF—Böb&VÂ6F’FV6‚&ö¦V7B6GW&W>(	Fæò67&VB÷7G2ÂÆ6V†öÆFW'2÷"–çfVçFVB6×–vç2ãÂ÷à¢ÂöF—cà¢Æ‡&Vc×·6—FT6öæf–ræ–ç7Fw&ÕW&ÇÒF&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W"æö÷VæW""6Æ74æÖSÒ&–æÆ–æRÖfÆW‚Ö–âÖ‚Ó"6‡&–æ²Ó—FV×2Ö6VçFW"§W7F–g’Ö6VçFW"vÓ"&÷VæFVBÖgVÆÂ&rÖw&F–VçB×Fò×"g&öÒÖ7–âÓ3f–Ö&ÇVRÓSFò×f–öÆWBÓS‚ÓRFW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãFVÕÒFW‡BÕ²33s%Ò6†F÷rÕ³óóC…÷&v&ƒ3BÃ#Ã#3‚Ãã#"•Ò"FFÖ7W'6÷#Ò$õTâ(ir#à¢föÆÆ÷r6F—FV6‚æöff–6–ÂÄ–ç7Fw&Ô–6öâ6Æ74æÖSÒ&‚ÓBrÓB"óà¢Âöà¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&×BÓ’w&–Bw&–BÖ6öÇ2Ó"vÓ"6Ó¦vÓ2Æs¦w&–BÖ6öÇ2Ó2#à¢·6†÷v66RæÖ‚‡&ö¦V7BÂ–æFW‚’Óâ€¢ÆÖ÷F–öâæ¢¶W“×·&ö¦V7Bæ–GÐ¢‡&Vc×·6—FT6öæf–ræ–ç7Fw&ÕW&ÇÐ¢F&vWCÒ%ö&Ææ² ¢&VÃÒ&æ÷&VfW'&W"æö÷VæW" ¢6Æ74æÖSÒ&–ç7Fw&Ò×F–ÆRw&÷W&VÆF—fR7V7BÕ³BóUÒ÷fW&fÆ÷rÖ†–FFVâ&÷VæFVBÕ³ã'&VÕÒ&÷&FW"&÷&FW"×v†—FRó&rÕ²3s#eÒ6Ó§&÷VæFVBÕ³ãw&VÕÒ ¢–æ—F–Ã×·²÷6—G“¢Â“¢‚×Ð¢v†–ÆT–åf–Ws×·²÷6—G“¢Â“¢×Ð¢f–Ww÷'C×·f–Ww÷'Döæ6WÐ¢G&ç6—F–öã×·²FVÆ“¢–æFW‚¢ãCRÂGW&F–öã¢ãCR×Ð¢&–ÖÆ&VÃ×¶6VRG·&ö¦V7BçF—FÆWÒæBföÆÆ÷r6F’FV6‚öâ–ç7Fw&ÖÐ¢FFÖ7W'6÷#Ò$õTâ(ir ¢à¢Ä–ÖvR7&3×·&ö¦V7Bæ–ÖvWÒÇC×·&ö¦V7Bæ–ÖvTÇBÇÂG·&ö¦V7BçF—FÆWÒ&ö¦V7B&Wf–WvÒf–ÆÂ6—¦W3Ò"†Ö‚×v–GFƒ¢cC‚’C‡grÂ†Ö‚×v–GFƒ¢#G‚’CggrÂ3gr"6Æ74æÖSÒ&ö&¦V7BÖ6÷fW"ö&¦V7B×F÷G&ç6—F–öâGW&F–öâÓsw&÷WÖ†÷fW#§66ÆRÕ³ã3UÒ"óà¢Ç7â6Æ74æÖSÒ&'6öÇWFR–ç6WBÓ&rÖw&F–VçB×Fò×Bg&öÒÕ²33s%Òó“Rf–×G&ç7&VçBFò×G&ç7&VçB"óà¢Ç7â6Æ74æÖSÒ&'6öÇWFR–ç6WB×‚Ó2&÷GFöÒÓ2fÆW‚—FV×2ÖVæB§W7F–g’Ö&WGvVVâvÓ26Ó¦–ç6WB×‚ÓR6Ó¦&÷GFöÒÓR#à¢Ç7â6Æ74æÖSÒ&Ö–â×rÓ#à¢Ç7â6Æ74æÖSÒ&&Æö6²G'Væ6FRFW‡BÕ³ãS‡&VÕÒföçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãvVÕÒFW‡BÖ7–âÓ##ç·&ö¦V7Bæ–æGW7G'—ÓÂ÷7ãà¢Ç7â6Æ74æÖSÒ&×BÓ&Æö6²G'Væ6FRFW‡B×6ÒföçBÖ&Æ6²WW&66RG&6¶–ærÕ²ÓãFVÕÒFW‡B×v†—FR6Ó§FW‡BÖÆr#ç·&ö¦V7BçF—FÆWÓÂ÷7ãà¢Â÷7ãà¢Ä–ç7Fw&Ô–6öâ6Æ74æÖSÒ&‚ÓRrÓR6‡&–æ²ÓFW‡B×v†—FR"óà¢Â÷7ãà¢ÂöÖ÷F–öâæà¢’—Ð¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢“°§Ð ¦gVæ7F–öâ6öçF7D5D‚’°¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ×6†VÆÂ’Ób6Ó§’Ó#B#à¢ÆF—b6Æ74æÖSÒ'&VÆF—fR÷fW&fÆ÷rÖ†–FFVâ&÷VæFVBÕ³'&VÕÒ&÷&FW"&÷&FW"Ö&Æ6²ó&rÕ²4DTC”deÒÓb6Ó§&÷VæFVBÕ³7&VÕÒ6Ó§ÓÆs§ÓB#à¢ÆF—b6Æ74æÖSÒ&'6öÇWFR&÷GFöÒÕ²Óg&VÕÒ&–v‡BÕ²ÓG&VÕÒ‚Ós"rÓs"&÷VæFVBÖgVÆÂ&rÕ²44ddcs%Ò"&–Ö†–FFVãÒ'G'VR"óà¢ÆF—b6Æ74æÖSÒ'&VÆF—fRÖ‚×rÓG†Â#à¢Ç6Æ74æÖSÒ'FW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ã#&VÕÒFW‡BÕ²3D3T4deÒ#ä6öçF7CÂ÷à¢Æƒ"6Æ74æÖSÒ&×BÓBFW‡BÕ¶6Æ×ƒ7&VÒÃgrÃ—&VÒ•ÒföçBÖ&Æ6²WW&66RÆVF–ærÕ³ãseÒG&6¶–ærÕ²Óã6VÕÒFW‡BÖæWWG&ÂÓ“S#ä†fRâ–FVóÆ'"óäÆWN(	—2GW&â—B–çFò6öÖWF†–ærV÷ÆR&VÖVÖ&W"ãÂöƒ#à¢ÆF—b6Æ74æÖSÒ&×BÓ‚fÆW‚fÆW‚Ö6öÂvÓ26Ó¦fÆW‚×&÷r6Ó¦fÆW‚×w&#à¢Æ‡&Vc×¶7&VFUv†G4W&Â‚—ÒF&vWCÒ%ö&Ææ²"&VÃÒ&æ÷&VfW'&W"æö÷VæW""6Æ74æÖSÒ&–æÆ–æRÖfÆW‚Ö–âÖ‚Ó"—FV×2Ö6VçFW"§W7F–g’Ö6VçFW"vÓ"&÷VæFVBÖgVÆÂ&rÕ²3SSUÒ‚ÓRFW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãFVÕÒFW‡B×v†—FR"FFÖ7W'6÷#Ò$õTâ(ir#à¢7F'Böâv†G4ÄÖW76vT6—&6ÆR6Æ74æÖSÒ&‚ÓBrÓB"&–Ö†–FFVãÒ'G'VR"óà¢Âöà¢ÄÆ–æ²‡&VcÒ"ö6öçF7B"6Æ74æÖSÒ&–æÆ–æRÖfÆW‚Ö–âÖ‚Ó"—FV×2Ö6VçFW"§W7F–g’Ö6VçFW"vÓ"&÷VæFVBÖgVÆÂ&r×v†—FR‚ÓRFW‡B×‡2föçBÖ&Æ6²WW&66RG&6¶–ærÕ³ãFVÕÒFW‡BÖæWWG&ÂÓ“S#à¢÷VâVçV—'’f÷&ÒÄ'&÷uW&–v‡B6Æ74æÖSÒ&‚ÓBrÓB"&–Ö†–FFVãÒ'G'VR"óà¢ÂôÆ–æ³à¢ÂöF—cà¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢“°§Ð ¦W‡÷'BFVfVÇBgVæ7F–öâ†öÖU6V7F–öç2‡²fVGW&VE&ö¦V7G2ÒµÒÂ&ö¦V7G2ÒµÒÂ&V6VçE&ö¦V7G2ÒµÒÂf6WG2Ò·ÒÒ’°¢6öç7B6fU&ö¦V7G2Ò&ö¦V7G2æÆVæwF‚ò&ö¦V7G2¢fVGW&VE&ö¦V7G3° ¢&WGW&â€¢ÆÖ–ãà¢Ä†W&ò&ö¦V7G3×¶fVGW&VE&ö¦V7G2æÆVæwF‚òfVGW&VE&ö¦V7G2¢6fU&ö¦V7G2ç6Æ–6RƒÂ2—Òóà¢ÅG'W7DÖ'VVR&ö¦V7G3×·6fU&ö¦V7G7Òóà¢ÄÆ—fU&ö¦V7E7G&VÒ&ö¦V7G3×¶fVGW&VE&ö¦V7G2æÆVæwF‚òfVGW&VE&ö¦V7G2¢6fU&ö¦V7G2ç6Æ–6RƒÂb—Òóà¢ÄfVGW&VEv÷&²&ö¦V7G3×¶fVGW&VE&ö¦V7G7Òóà¢Ä&÷WE7GVF–òóà¢Å7FG2óà¢Åv‡”6†ö÷6U6F’óà¢Å&ö¦V7EvÆÂ&ö¦V7G3×·6fU&ö¦V7G7Òóà¢Å6W'f–6W466÷&F–öâóà¢Ä–æGW7G'”W‡Æ÷&W"&ö¦V7G3×·6fU&ö¦V7G7Òóà¢ÅFV6„6&–Æ—F–W2FV6†æöÆöv–W3×¶f6WG2çFV6†æöÆöv–W7Òóà¢Å6F•6–væÄæWGv÷&²&ö¦V7G3×·6fU&ö¦V7G7Òóà¢Äv—D‡V$7F—f—G’&ö¦V7G3×·&V6VçE&ö¦V7G2æÆVæwF‚ò&V6VçE&ö¦V7G2¢6fU&ö¦V7G2ç6Æ–6RƒÂb—Òóà¢Å&ö6W75F–ÖVÆ–æRóà¢Å6W'f–6TÖF6†W"óà¢ÄÆÅ&ö¦V7G5&Wf–Wr&ö¦V7G3×·6fU&ö¦V7G7Òóà¢Ä6ö×ÆWFU&ö¦V7DvÆÆW'’&ö¦V7G3×·6fU&ö¦V7G7Òóà¢Ä–ç7Fw&Õ6†÷v66R&ö¦V7G3×·6fU&ö¦V7G7Òóà¢Ä6öçF7D5Dóà¢ÂöÖ–ãà¢“°§Ð