/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

interface HomeSectionProps {
  homeBg: string;
}

export default function HomeSection({ homeBg }: HomeSectionProps) {
  const { t } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-start p-6 sm:p-16 md:p-24 overflow-hidden bg-[#2d5c7f]/10"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.25)), ${homeBg}`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div id="home-z-container" className="z-10 text-left max-w-xl select-text">
        <motion.h2 
          id="home-greeting-h2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-extrabold text-blue-500 italic font-serif leading-none tracking-tight select-text"
        >
          {t("portfolio.page.home.hi")}
        </motion.h2>
        <motion.h1 
          id="home-name-h1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="text-4xl sm:text-7xl font-extrabold text-blue-900 leading-[1.05] tracking-tight mt-2.5 font-sans select-text"
        >
          {t("portfolio.page.home.myname")}
        </motion.h1>
        <motion.p 
          id="home-tagline-p"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xs sm:text-sm font-mono tracking-[0.25em] text-blue-700 font-extrabold uppercase mt-4 block"
        >
          {t("portfolio.page.home.tagline")}
        </motion.p>
      </div>
    </section>
  );
}
