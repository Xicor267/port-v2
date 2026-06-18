/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SKILLS } from "../data";
import { useLanguage } from "../LanguageContext";

const skillImageModules = import.meta.glob("../assets/images/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

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

const getSkillImageSrc = (skillName: string): string | null => {
  const baseName = getSkillImageName(skillName);
  if (!baseName) {
    return null;
  }

  const extensionOrder = ["png", "svg", "webp", "jpg", "jpeg"];
  for (const extension of extensionOrder) {
    const fileKey = `../assets/images/${baseName}.${extension}`;
    if (skillImageModules[fileKey]) {
      return skillImageModules[fileKey];
    }
  }

  return null;
};

const SkillIcon = ({ name, fallbackSvg }: { name: string; fallbackSvg: ReactNode }) => {
  const imgSrc = getSkillImageSrc(name);

  if (!imgSrc) {
    return <>{fallbackSvg}</>;
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      className="w-10 h-10 object-contain"
    />
  );
};

// Return the matching image key name for each skill.
const getSkillSvg = (skillName: string) => {
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
