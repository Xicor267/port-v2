/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "../data";
import { useLanguage } from "../LanguageContext";

const AvatarImage = ({ alt, className }: { alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState<string>(image("avatar3"));
  const [attempt, setAttempt] = useState<number>(0);
  const fallbackUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXu00TQsqaS_6Hps4f1H5U8ypwzgabnBDDeR-mSaavwciqUTtH9CmApByLbertwhS4KI0knWjmVvgTlMPfUfLXIRc0xIcNdM4PUGEQdAF8lfAUv41nJwP9pELyKSsATtq1eV6ojwBa3gHKMS8x5EzFaQx9GVpDYe0IrmnU0MXvC3qQnI4vm5ux2lloatuARBlBJ-4jzRNU9OhPprW6XbhemFj2YyatYCOWyOq9XLbHewMn94-HDx_Zdb_F9QBFrki9GLZNQgYf86TztE";

  const handleError = () => {
    if (attempt === 0) {
      setImgSrc("/avatar3.jpg");
      setAttempt(1);
    } else if (attempt === 1) {
      setImgSrc("/avatar3.webp");
      setAttempt(2);
    } else if (attempt === 2) {
      setImgSrc("/avatar3.svg");
      setAttempt(3);
    } else {
      setImgSrc(fallbackUrl);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      id="navbar-avatar-img"
    />
  );
};

interface NavigationProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  setResumeOpen: (open: boolean) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

export default function Navigation({
  activeSection,
  scrollToSection,
  setResumeOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: NavigationProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* ----------------- DESKTOP SIDEBAR NAVIGATION ----------------- */}
      <aside 
        id="desktop-sidebar-navigation"
        className="hidden md:flex flex-col w-72 bg-[#f2f3f7] hover:bg-[#eaecef] transition-colors border-r border-gray-200 h-screen fixed left-0 top-0 select-none py-10 px-6 z-30 overflow-y-auto"
      >
        {/* Profile Circle Accent */}
        <div id="desktop-profile-wrapper" className="flex flex-col items-center mb-8">
          <div className="w-32 h-44 rounded-[50%_50%_50%_50%] overflow-hidden border-4 border-white shadow-sm mb-4 relative bg-gray-200">
            <AvatarImage alt={t("portfolio.page.name")} className="w-full h-full object-cover" />
          </div>
          <h1 id="desktop-profile-name" className="text-lg font-bold font-serif text-gray-950 text-center tracking-tight leading-tight px-1 uppercase">
            {t("portfolio.page.name")}
          </h1>
          <p id="desktop-profile-job" className="text-[10px] font-mono tracking-wider text-blue-500 font-bold uppercase mt-2">
            {t("portfolio.page.job.title")}
          </p>
        </div>

        {/* Sidebar Nav Links */}
        <nav id="desktop-nav-links" className="flex flex-col space-y-4 text-[11px] font-mono uppercase tracking-widest font-bold text-gray-600 pl-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`desktop-nav-btn-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-left outline-none transition-colors relative py-1 hover:text-blue-500 cursor-pointer ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }`}
              >
                {t(item.labelKey)}
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActiveIndicator"
                    className="absolute -left-4 top-[50%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Copyright */}
        <div id="desktop-sidebar-footer" className="mt-auto pt-8 text-[10px] text-gray-400 text-center leading-relaxed font-sans select-none pointer-events-none">
          <p className="px-1 text-xs">{t("portfolio.page.copyright")}</p>
        </div>
      </aside>

      {/* ----------------- RESPONSIVE MOBILE TOP HEADER ----------------- */}
      <header 
        id="mobile-top-header"
        className="md:hidden sticky top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur border-b border-gray-150 flex items-center justify-between px-6 z-40 select-none shadow-sm"
      >
        <button 
          id="mobile-header-home-btn"
          onClick={() => scrollToSection("home")}
          className="font-serif font-bold text-base text-gray-900 tracking-tight cursor-pointer"
        >
          {t("portfolio.page.name")}
        </button>
        
        <div className="flex items-center gap-3">
          <button
            id="mobile-download-cv-btn"
            onClick={() => setResumeOpen(true)}
            className="p-1.5 text-blue-600 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
            title={t("portfolio.page.download.my.cv")}
          >
            <Download size={16} />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="text-gray-600 hover:text-gray-900 p-1.5 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ----------------- MOBILE NAVIGATION DRAWER ----------------- */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-[#f2f3f7] z-45 border-r border-gray-200 md:hidden flex flex-col py-10 px-6 shadow-2xl overflow-y-auto"
          >
            {/* Drawer Profile accent */}
            <div id="mobile-drawer-profile" className="flex flex-col items-center mb-8">
              <div className="w-24 h-32 rounded-[50%_50%_50%_50%] overflow-hidden border-4 border-white shadow-sm mb-3 bg-gray-200">
                <AvatarImage alt={t("portfolio.page.name")} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-sm font-bold font-serif text-gray-900">{t("portfolio.page.name")}</h2>
              <p className="text-[9px] font-mono text-blue-500 uppercase font-bold tracking-widest mt-1">{t("portfolio.page.job.title")}</p>
            </div>

            {/* List links */}
            <nav id="mobile-drawer-links" className="flex flex-col space-y-4 text-xs font-mono uppercase tracking-wider font-bold text-gray-600 pl-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left transition-colors relative py-1 cursor-pointer ${
                      isActive ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </nav>

            <div id="mobile-drawer-footer" className="mt-auto pt-8 text-[9px] text-gray-400 text-center select-none">
              {t("portfolio.page.copyright")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Overlay backdrop */}
      {mobileSidebarOpen && (
        <div 
          id="mobile-nav-drawer-overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </>
  );
}
