/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Linkedin, Github, Facebook } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="about" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="about-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="about-heading-stack" className="space-y-4">
          <span id="about-desc-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.about.desc")}
          </span>
          <h2 id="about-title-h2" className="text-2xl sm:text-3.5xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.about.name")}
          </h2>
        </div>

        <p id="about-details-p" className="text-sm text-gray-600 mt-6 leading-relaxed font-sans select-text">
          {t("portfolio.page.about.details")}
        </p>

        {/* Social Profiles Blocks */}
        <div id="about-socials-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 select-none">
          {/* LinkedIn */}
          <motion.a 
            id="social-link-linkedin"
            whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            href="https://www.linkedin.com/in/nam-nguyen-1a5206310/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white border border-gray-200 rounded-lg flex items-center gap-3.5 hover:border-blue-400 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors group cursor-pointer"
          >
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded border border-blue-100 group-hover:bg-blue-100 transition-colors">
              <Linkedin size={18} />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">LinkedIn</span>
              <strong className="text-gray-800 text-sm font-semibold truncate block">Nam Nguyen</strong>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a 
            id="social-link-github"
            whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            href="https://github.com/Xicor267"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white border border-gray-200 rounded-lg flex items-center gap-3.5 hover:border-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors group cursor-pointer"
          >
            <div className="p-2.5 bg-gray-50 text-gray-800 rounded border border-gray-200 group-hover:bg-gray-150 transition-colors">
              <Github size={18} />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">GitHub</span>
              <strong className="text-gray-800 text-sm font-semibold truncate block">Xicor267</strong>
            </div>
          </motion.a>

          {/* Facebook */}
          <motion.a 
            id="social-link-facebook"
            whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            href="https://www.facebook.com/nguyen.nam.814165/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white border border-gray-200 rounded-lg flex items-center gap-3.5 hover:border-blue-500 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors group cursor-pointer"
          >
            <div className="p-2.5 bg-blue-50/50 text-blue-700 rounded border border-blue-100 group-hover:bg-blue-100 transition-colors">
              <Facebook size={18} />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Facebook</span>
              <strong className="text-gray-800 text-sm font-semibold truncate block">Nguyen Nam</strong>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
