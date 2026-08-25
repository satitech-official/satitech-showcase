"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SiteExperience from "@/components/layout/SiteExperience";

export default function LayoutShell({ children }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();
  const isStudioHome = pathname === "/";

  return (
    <>
      <SiteExperience commandOpen={commandOpen} setCommandOpen={setCommandOpen} />
      <Header openCommand={() => setCommandOpen(true)} />
      <div className={`site-content ${isStudioHome ? "site-content--home" : "site-content--editorial"}`}>{children}</div>
      <Footer />
    </>
  );
}
