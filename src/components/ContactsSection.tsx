/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Eye } from "lucide-react";
import ContactForm from "./ContactForm";
import { CONTACT_METHODS } from "../data";
import { useLanguage } from "../LanguageContext";

interface ContactsSectionProps {
  visitorCount: number;
}

export default function ContactsSection({ visitorCount }: ContactsSectionProps) {
  const { t } = useLanguage();

  return (
    <section 
      id="contacts" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white text-gray-800"
    >
      <motion.div
        id="contacts-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="contacts-header-stack" className="space-y-4 mb-10">
          <span id="contacts-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.contact.name")}
          </span>
          <h2 id="contacts-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.contact")}
          </h2>
        </div>

        <div id="contacts-layout-grid" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left direct contact details Column */}
          <div className="md:col-span-5 space-y-4 flex flex-col justify-start">
            
            {CONTACT_METHODS.map((method) => {
              const IconComponent = {
                mail: Mail,
                phone: Phone,
                mapPin: MapPin
              }[method.icon] || Mail;

              const isLocation = method.id === "location";
              const label = method.labelKey.includes(".") ? t(method.labelKey) : method.labelKey;

              return (
                <motion.div 
                  key={method.id}
                  id={`contact-method-card-${method.id}`}
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 440, damping: 20 }}
                  className="p-5 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4 hover:border-blue-400 transition-colors shadow-xs"
                >
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                    <IconComponent size={18} />
                  </div>
                  <div className="truncate select-text font-sans">
                    <span className="text-[9px] font-mono uppercase text-gray-400 font-semibold tracking-wider block">
                      {label}
                    </span>
                    {isLocation ? (
                      <strong className="text-xs sm:text-sm font-bold text-gray-900 block">
                        {method.valueKey ? t(method.valueKey) : ""}
                      </strong>
                    ) : (
                      <a href={method.href} className="text-xs sm:text-sm font-bold text-gray-900 truncate block hover:underline">
                        {method.value}
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Real persistent visitor counter card! */}
            <motion.div 
              id="visitor-counter-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="p-5 bg-blue-50/50 border border-blue-100 rounded-lg flex items-center gap-4 shadow-xs select-none mt-4"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg animate-pulse">
                <Eye size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-blue-600 font-extrabold tracking-widest block">
                  {t("portfolio.page.page.view.user.visits")}
                </span>
                <strong className="text-lg font-mono text-blue-900 mt-1 block">
                  {visitorCount}
                </strong>
              </div>
            </motion.div>

          </div>

          {/* Right direct message formulation Column */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>

        </div>
      </motion.div>
    </section>
  );
}
