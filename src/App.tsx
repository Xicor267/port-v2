/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

import ProjectModal from "./components/ProjectModal";
import ResumeModal from "./components/ResumeModal";
import ImagePreview from "./components/ImagePreview";
import Navigation from "./components/Navigation";

import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import EducationsSection from "./components/EducationsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactsSection from "./components/ContactsSection";

import { useLanguage } from "./LanguageContext";
import { Project } from "./types";

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalMode, setProjectModalMode] = useState<"demo" | "source" | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Home background formatting fallbacks
  const [homeBg, setHomeBg] = useState<string>(`url('${image("background2")}')`);

  useEffect(() => {
    const urls = [
      "/background2.png",
      "/background2.jpg",
      "/background2.webp",
      "/background2.svg",
      "https://images.unsplash.com/photo-1549880181-56a44cf8a4a1?auto=format&fit=crop&w=1600&q=80"
    ];

    const tryLoad = (idx: number) => {
      if (idx >= urls.length) return;
      const img = new Image();
      img.src = urls[idx];
      img.onload = () => {
        setHomeBg(`url('${urls[idx]}')`);
      };
      img.onerror = () => {
        tryLoad(idx + 1);
      };
    };

    tryLoad(0);
  }, []);

  // States for dynamic Ant Design-style image preview modal
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreviewImage = (images: string[], index: number) => {
    setPreviewImages(images);
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  // Visitor Counter
  const [visitorCount, setVisitorCount] = useState<number>(3);

  // Increment visitor counter on mount from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nam_portfolio_visits");
      let count = 3; // Start from 3 as requested in the app
      if (stored) {
        count = parseInt(stored, 10) + 1;
      } else {
        count = 3;
      }
      localStorage.setItem("nam_portfolio_visits", count.toString());
      setVisitorCount(count);
    } catch (e) {
      setVisitorCount(3);
    }
  }, []);

  // Monitor scrolling to automatically highlight the current sidebar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "skills", "educations", "experiences", "projects", "contacts"];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenProjectModal = (project: Project, mode: "demo" | "source") => {
    setSelectedProject(project);
    setProjectModalMode(mode);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setProjectModalMode(null);
  };

  const scrollToSection = (id: string) => {
    setMobileSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-white text-gray-800 font-sans flex flex-col md:flex-row relative">
      
      <Navigation 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setResumeOpen={setResumeOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* ----------------- UPPER-RIGHT FLOAT BAR (CV DOWNLOAD & LANGUAGE SELECTOR) -------------- */}
      <div id="float-control-bar" className="absolute md:fixed top-4 md:top-6 right-6 md:right-10 z-20 flex items-center gap-3">
        {/* Real Dynamic Language switcher */}
        <div id="language-switcher-wrapper" className="flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
          <button
            id="lang-selector-en"
            onClick={() => setLanguage("en")}
            className={`px-3 py-1.5 text-xs font-bold font-sans rounded-md transition-all cursor-pointer ${
              language === "en" 
                ? "bg-blue-600 text-white shadow-xs" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🇬🇧 EN
          </button>
          <button
            id="lang-selector-vi"
            onClick={() => setLanguage("vi")}
            className={`px-3 py-1.5 text-xs font-bold font-sans rounded-md transition-all cursor-pointer ${
              language === "vi" 
                ? "bg-blue-600 text-white shadow-xs" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🇻🇳 VI
          </button>
        </div>

        {/* Dynamic Download action button */}
        <button
          id="cv-download-float-btn"
          onClick={() => setResumeOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow hover:scale-[1.01] transition-all cursor-pointer font-sans h-[34px]"
        >
          <Download size={14} fill="none" /> {t("portfolio.page.download.my.cv")}
        </button>
      </div>

      {/* ----------------- MAIN SCROLL CONTENT AREA ----------------- */}
      <main id="main-content-scroll" className="md:ml-72 flex-1 w-full bg-white relative min-h-screen p-0 m-0 overflow-x-hidden flex flex-col justify-start">
        <HomeSection homeBg={homeBg} />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <EducationsSection />
        <ExperiencesSection />
        <ProjectsSection onOpenProjectModal={handleOpenProjectModal} onPreviewImage={handlePreviewImage} />
        <ContactsSection visitorCount={visitorCount} />
      </main>

      {/* ----------------- DIALOG LIGHTBOX MODALS ----------------- */}
      {/* 1. Project sandbox detail module */}
      <ProjectModal 
        project={selectedProject} 
        mode={projectModalMode} 
        onClose={handleCloseProjectModal} 
        onPreviewImage={handlePreviewImage}
      />

      {/* 2. Interactive print CV model sheet */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />

      {/* 3. Ant Design scaleable and rotatable full-screen image viewer */}
      <ImagePreview
        images={previewImages}
        currentIndex={previewIndex}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onIndexChange={(idx) => setPreviewIndex(idx)}
      />

    </div>
  );
}
