/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, ChevronUp, ChevronDown } from "lucide-react";
import { EDUCATIONS } from "../data";
import { useLanguage } from "../LanguageContext";

export default function EducationsSection() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "ud-use": true, // university expanded by default
    "eng-b2": false
  });

  const toggleEducation = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section 
      id="educations" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="educations-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="educations-heading-stack" className="space-y-4 mb-10">
          <span id="educations-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.education.sub")}
          </span>
          <h2 id="educations-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.education")}
          </h2>
        </div>

        {/* Accordion Blocks */}
        <div id="educations-accordion-list" className="space-y-4 select-text font-sans">
          {EDUCATIONS.map((acad) => {
            const isExpanded = !!expanded[acad.id];
            return (
              <div 
                key={acad.id} 
                id={`education-block-${acad.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs"
              >
                <button
                  id={`education-btn-${acad.id}`}
                  onClick={() => toggleEducation(acad.id)}
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200 font-bold cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <GraduationCap className="text-blue-500 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {t(acad.titleKey)}
                      </h3>
                      {(acad.metaLabelKey || acad.metaKey) && (
                        <p className="text-xs text-blue-600 font-semibold font-mono mt-1">
                          {acad.metaLabelKey ? `${t(acad.metaLabelKey)}` : ""}{" "}
                          {acad.metaKey ? `(${t(acad.metaKey)})` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`education-transition-wrapper-${acad.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-200 space-y-3">
                        {acad.descriptionKeys.map((key) => (
                          <p key={key}>{t(key)}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
