/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code, Eye, Play } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { Project } from "../types";

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  onOpenModal: (project: Project, mode: "demo" | "source") => void;
  onPreviewImage: (images: string[], index: number) => void;
}

export default function ProjectCard({ project, onOpenModal, onPreviewImage }: ProjectCardProps) {
  const { t, language } = useLanguage();

  const isTyGraph = project.id === "tygraph";
  const fullDesc = isTyGraph ? t("portfolio.page.project.description.tygraph") : t("portfolio.page.project.description");
  const description = fullDesc.length > 140 ? fullDesc.substring(0, 137) + "..." : fullDesc;

  const liveDemoLabel = t("portfolio.page.project.live_demo");
  const sourceCodeLabel = t("portfolio.page.project.source_code");
  const previewImgLabel = t("portfolio.page.project.preview");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeInOut" } }}
      className="group bg-white rounded-xl overflow-hidden flex flex-col border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      
      {/* Decorative top-border line in Blue */}
      <div className="h-[3px] bg-blue-500 w-full" />

      {/* Image Block with Antd Hover Preview Overlay */}
      <div 
        onClick={() => onPreviewImage(project.gallery || [project.image], 0)}
        className="relative h-48 overflow-hidden bg-gray-150 cursor-pointer group/image"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Antd Inspired Hover Overlay */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white">
          <Eye size={22} className="text-white transform scale-90 group-hover/image:scale-100 transition-transform duration-200" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider">{previewImgLabel}</span>
        </div>
      </div>

      {/* Main Content Block */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-gray-600 mb-5 leading-relaxed min-h-[48px]">
            {description}
          </p>
        </div>

        <div>
          {/* Tech stack badge list */}
          <div className="flex flex-wrap gap-1 mb-5">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="font-mono text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action links interceptors */}
          <div className="flex justify-between items-center pt-3.5 border-t border-gray-100 text-xs font-mono">
            <button 
              onClick={() => onOpenModal(project, "demo")}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-extrabold cursor-pointer py-1"
            >
              <Play size={12} fill="currentColor" /> {liveDemoLabel}
            </button>
            <button 
              onClick={() => onOpenModal(project, "source")}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 font-bold cursor-pointer py-1"
            >
              <Code size={13} /> {sourceCodeLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
