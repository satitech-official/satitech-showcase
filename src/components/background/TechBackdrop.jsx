"use client";

import { useEffect, useRef } from "react";

const glyphs = ["</>", "{ }", "01", "API", "JS", "CSS"];
const nodes = [
  [8, 17], [21, 42], [34, 12], [47, 67], [58, 31], [69, 79], [81, 18], [92, 55],
];

export default function TechBackdrop() {
  const backdropRef = useRef(null);

  useEffect(() => {
    const root = backdropRef.current;
    if (!root) return undefined;

    let frame = 0;
    const updateSpotlight = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--spot-x", `${event.clientX}px`);
        root.style.setProperty("--spot-y", `${event.clientY}px`);
        frame = 0;
      });
    };
    const updateVisibility = () => root.classList.toggle("is-paused", document.hidden);

    document.addEventListener("pointermove", updateSpotlight, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", updateSpotlight);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return (
    <div ref={backdropRef} className="tech-backdrop" aria-hidden="true">
      <div className="tech-backdrop-grid" />
      <div className="tech-backdrop-circuit" />
      <div className="tech-backdrop-spotlight" />
      <div className="tech-backdrop-orb tech-backdrop-orb-one" />
      <div className="tech-backdrop-orb tech-backdrop-orb-two" />
      <div className="tech-backdrop-nodes">
        {nodes.map(([left, top], index) => (
          <span key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.7}s` }} />
        ))}
      </div>
      <div className="tech-backdrop-code">
        {glyphs.map((glyph, index) => (
          <span key={glyph} style={{ left: `${9 + index * 16}%`, top: `${14 + (index % 3) * 29}%`, animationDelay: `${index * -1.1}s` }}>{glyph}</span>
        ))}
      </div>
    </div>
  );
}
