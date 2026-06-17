/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Terminal, Globe, Smartphone } from "lucide-react";
import { SERVICES } from "../data";
import { useLanguage } from "../LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="services" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="services-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="services-header-stack" className="space-y-4">
          <span id="services-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.service.name")}
          </span>
          <h2 id="services-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.service.desc")}
          </h2>
        </div>

        <div id="services-cards-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 select-text">
          {SERVICES.map((srv) => {
            const IconComponent = {
              terminal: Terminal,
              globe: Globe,
              smartphone: Smartphone
            }[srv.icon] || Terminal;

            return (
              <motion.div 
                key={srv.id}
                id={`services-card-${srv.id}`}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 12px 20px -3px rgba(0, 0, 0, 0.05)" }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`p-6 bg-white border border-gray-150 border-b-4 ${srv.borderColorClass} rounded-lg shadow-xs transition-colors space-y-4`}
              >
                <div className={`w-12 h-12 ${srv.bgColorClass} ${srv.textColorClass} rounded-lg border border-current/20 flex items-center justify-center`}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{t(srv.titleKey)}</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {t(srv.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
