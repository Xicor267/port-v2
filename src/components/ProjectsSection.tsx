import { motion } from "motion/react";
import { PROJECTS } from "../data";
import { useLanguage } from "../LanguageContext";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";

interface ProjectsSectionProps {
  onOpenProjectModal: (project: Project, mode: "demo" | "source") => void;
  onPreviewImage: (images: string[], index: number) => void;
}

export default function ProjectsSection({
  onOpenProjectModal,
  onPreviewImage,
}: ProjectsSectionProps) {
  const { t } = useLanguage();

  return (
    <section 
      id="projects" 
      className="py-20 px-6 sm:px-16 max-w-4xl bg-white border-b border-gray-100 text-gray-800"
    >
      <motion.div
        id="projects-motion-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div id="projects-header-stack" className="space-y-4 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span id="projects-sub-label" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block">
              {t("portfolio.page.project.name")}
            </span>
            <h2 id="projects-title-h2" className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight leading-tight uppercase">
              {t("portfolio.page.project.desc")}
            </h2>
          </div>
          <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded font-bold self-start select-none">
            {t("portfolio.page.project.labs_badge")}
          </span>
        </div>

        <div id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-8 select-text">
          {PROJECTS.map((proj) => (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              onOpenModal={onOpenProjectModal} 
              onPreviewImage={onPreviewImage}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
