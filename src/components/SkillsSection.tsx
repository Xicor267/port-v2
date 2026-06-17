/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SKILLS } from "../data";
import { useLanguage } from "../LanguageContext";

// Helpers for dynamic image rendering with format fallbacks
const getSkillImageName = (skillName: string) => {
  switch (skillName) {
    case "HTML 5":
      return "html-5";
    case "SCSS":
      return "sass";
    case "JavaScript (ES6+)":
      return "js";
    case "TypeScript":
      return "typescript";
    case "React":
      return "react";
    case "Git":
      return "social";
    case "C# .NET":
      return "dotnet";
    case "MSSQL":
      return "sql";
    case "MongoDB":
      return "mongodb";
    case "REST API":
      return "api";
    case "Entity Framework Core":
      return "efcore";
    default:
      return "";
  }
};

const SkillIcon = ({ name, fallbackSvg }: { name: string; fallbackSvg: React.ReactNode }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<number>(0);
  const baseName = getSkillImageName(name);

  useEffect(() => {
    if (baseName) {
      setImgSrc(`/${baseName}.png`);
      setAttempt(0);
    }
  }, [baseName]);

  const handleError = () => {
    if (attempt === 0) {
      setImgSrc(`/${baseName}.svg`);
      setAttempt(1);
    } else if (attempt === 1) {
      setImgSrc(`/${baseName}.webp`);
      setAttempt(2);
    } else if (attempt === 2) {
      setImgSrc(`/${baseName}.jpg`);
      setAttempt(3);
    } else {
      setImgSrc(null); // Full fallback to original inline SVG element
    }
  };

  if (!baseName || !imgSrc) {
    return <>{fallbackSvg}</>;
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      onError={handleError}
      className="w-10 h-10 object-contain"
    />
  );
};

// SVG Tech Icons Mapping
const getSkillSvg = (skillName: string) => {
  switch (skillName) {
    case "HTML 5":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#E34F26" d="M1.5 22L0 2h24l-1.5 20L12 24z"/>
          <path fill="#F06529" d="M12 21.7l7.6-2.1L21 4H12z"/>
          <path fill="#EFEFEF" d="M12 11.2h4.4l-.4 4.5-4 1.1v-5.6zm0-5.4h4.8l-.2 1.7H12V5.8z"/>
          <path fill="#FFF" d="M12 11.2V16.8l-4-1.1-.3-2.8h1.7l.2 1.4 2.4.7V11.2H7.3l-.2-1.7h4.9V5.8H6.8L6.4 2H12z"/>
        </svg>
      );
    case "SCSS":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#CF649A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.95 13.91c-.48.87-1.42 1.4-2.43 1.4-1.57 0-2.85-1.28-2.85-2.85 0-1.57 1.28-2.85 2.85-2.85.94 0 1.83.47 2.33 1.25.13.21.39.29.61.18l.78-.39c.23-.11.31-.38.19-.61C16.63 10.51 15.11 9.7 13.52 9.7c-2.42 0-4.39 1.97-4.39 4.39s1.97 4.39 4.39 4.39c1.64 0 3.12-.91 3.84-2.38.12-.23.03-.51-.19-.61l-.81-.41c-.24-.13-.5-.04-.61.17v.06z"/>
        </svg>
      );
    case "JavaScript (ES6+)":
      return (
        <svg className="w-10 h-10 rounded-sm" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" fill="#F7DF1E"/>
          <path d="M1.34 21.02c-.08-.83.52-1.48 1.44-1.48.91 0 1.42.53 1.47 1.34h1.01c-.11-1.39-1.1-2.18-2.48-2.18-1.44 0-2.43.91-2.43 2.31v.05c0 1.47 1.05 2.21 2.5 2.21 1.34 0 2.35-.74 2.45-2.19H4.28c-.06.74-.53 1.34-1.48 1.34-.89 0-1.42-.51-1.46-1.4z" fill="#000" transform="scale(3) translate(-2, -2)"/>
        </svg>
      );
    case "TypeScript":
      return (
        <svg className="w-10 h-10 rounded-sm" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" fill="#3178C6"/>
          <path d="M20 20h-4v-1.5h1.25v-5h-1.25V12H20v1.5h-1.25v5H20V20zm-6-6.5h1.5v-1.5H11l-.01 1.5h1.51v5h-1.5V20H14v-1.5h-1.5v-5H14z" fill="#FFF"/>
        </svg>
      );
    case "React":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
          <path d="M12 2C17.52 2 22 6.48 22 12s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" stroke="#61DAFB" strokeWidth="1" strokeDasharray="3 3"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" transform="rotate(150 12 12)"/>
        </svg>
      );
    case "Git":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#F05032" d="M23.18 10.38L13.62.82c-.83-.83-2.18-.83-3 0L8.52 2.9l3.05 3.05c.8-.26 1.73-.08 2.38.57.65.65.83 1.58.57 2.38l3.12 3.12c.8-.26 1.73-.08 2.38.57.83.83.83 2.18 0 3-.83.83-2.18.83-3 0-.65-.65-.83-1.58-.57-2.38L13.33 10.1c-.26.8-.08 1.73-.57 2.38-.65.65-1.58.83-2.38.57l-3.13 3.13c.26.8.08 1.73-.57 2.38-.83.83-2.18.83-3 0-.83-.83-.83-2.18 0-3 .65-.65 1.58-.83 2.38-.57L9.19 12.3c-.26-.8-.08-1.73.57-2.38l-3.13-3.13L1.13 12.3c-.83.83-.83 2.18 0 3l9.56 9.56c.83.83 2.18.83 3 0l9.56-9.56c.83-.83.83-2.18 0-3.04z"/>
        </svg>
      );
    case "C# .NET":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#5C2D91" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
        </svg>
      );
    case "MSSQL":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#CC292B" d="M12 2C6.48 2 2 3.8 2 6v12c0 2.2 4.48 4 10 4s10-1.8 10-4V6c0-2.2-4.48-4-10-4zm0 2c4.4 0 8 1.34 8 3s-3.6 3-8 3-8-1.34-8-3 3.6-3 8-3zm0 14c-4.4 0-8-1.34-8-3V9.8c1.8 1.4 4.8 2.2 8 2.2s6.2-.8 8-2.2V15c0 1.66-3.6 3-8 3z"/>
        </svg>
      );
    case "MongoDB":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#47A248" d="M12 1.5C11.5 1.5 6 9.5 6 12.5s4 7.5 6 10c2-2.5 6-7 6-10s-5.5-11-6-11zm0 17.5c-1.5-1.5-3-5-3-6.5s1.5-3.5 3-3.5s3 2 3 3.5s-1.5 5-3 6.5z"/>
        </svg>
      );
    case "REST API":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#009688" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      );
    case "Entity Framework Core":
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#1A5694" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/>
        </svg>
      );
  }
};

export default function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="skills" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="skills-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="skills-header-stack" className="space-y-4 mb-10">
          <span id="skills-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
            {t("portfolio.page.skills.name")}
          </span>
          <h2 id="skills-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
            {t("portfolio.page.skills.desc")}
          </h2>
        </div>

        {/* Grid layout of tech stack */}
        <div id="skills-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-6 select-none animate-fade">
          {SKILLS.map((skill) => (
            <motion.div 
              key={skill.name} 
              id={`skills-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ y: -6, scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)", borderColor: "#3b82f6" }}
              className="bg-white border border-gray-150 p-4 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-between transition-colors duration-200 group cursor-pointer"
            >
              <div className="mb-3 transform group-hover:scale-105 duration-205 flex items-center justify-center">
                <SkillIcon name={skill.name} fallbackSvg={getSkillSvg(skill.name)} />
              </div>
              <div className="w-full text-center">
                <span className="text-xs font-bold text-gray-900 block group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </span>
                <div className="h-[2.5px] w-8 mx-auto bg-blue-500 mt-2 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
