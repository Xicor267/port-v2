/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { TIMELINE } from "../data";
import { useLanguage } from "../LanguageContext";

export default function ExperiencesSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="experiences" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="experiences-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="experiences-header-stack" className="space-y-4 mb-12 font-sans">
          <span id="experiences-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.experience.sub")}
          </span>
          <h2 id="experiences-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.experience.desc")}
          </h2>
        </div>

        <div id="experiences-timeline-container" className="relative border-l-2 border-gray-200 pl-4 sm:pl-7 ml-4 space-y-12 select-text">
          {TIMELINE.map((item, idx) => (
            <motion.div 
              key={item.id} 
              id={`experience-timeline-node-${item.id}`}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="relative group"
            >
              
              {/* Timeline Circle pin */}
              <div id={`experience-timeline-dot-${item.id}`} className="absolute -left-[23px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-white group-hover:bg-blue-500 transition-colors z-10" />

              <div>
                <span className="text-[10px] font-mono font-extrabold tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-100 inline-block select-none">
                  {t(item.yearKey)}
                </span>
                
                <h3 className="text-lg font-bold text-gray-900 mt-3 flex flex-wrap items-baseline gap-2">
                  {t(item.roleKey)} 
                  <span className="text-xs font-mono text-gray-400 font-semibold">
                    @ {t(item.companyKey)}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed pr-2 whitespace-pre-line font-sans">
                  {t(item.descKey)}
                </p>

                {/* Skills tags used */}
                <div className="flex flex-wrap gap-1 mt-5 select-none font-sans">
                  {item.skills.map(s => (
                    <span key={s} className="bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded font-mono text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
