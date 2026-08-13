"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SiteExperience from "@/components/layout/SiteExperience";
import TechBackdrop from "@/components/background/TechBackdrop";

export default function LayoutShell({ children }) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <TechBackdrop />
      <SiteExperience commandOpen={commandOpen} setCommandOpen={setCommandOpen} />
      <Header openCommand={() => setCommandOpen(true)} />
      <div className="site-content">{children}</div>
      <Footer />
    </>
  );
}
