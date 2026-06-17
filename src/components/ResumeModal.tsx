/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Printer, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Globe, 
  CheckCircle,
  FileText,
  Bookmark,
  Phone,
  MapPin,
  Download
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const timelineItems = [
    {
      id: "avepoint-se",
      year: t("portfolio.page.experience.junior.duration"),
      role: t("portfolio.page.experience.junior.title"),
      company: t("portfolio.page.experience.junior.company"),
      description: t("portfolio.page.experience.junior.description"),
      skills: ["React", "TypeScript", "Redux", "REST API", "SCSS"]
    },
    {
      id: "avepoint-intern",
      year: t("portfolio.page.experience.intern.duration"),
      role: t("portfolio.page.experience.intern.title"),
      company: t("portfolio.page.experience.intern.company"),
      description: t("portfolio.page.experience.intern.description"),
      skills: ["React", "SCSS", "Redux", "JavaScript", "Git"]
    },
    {
      id: "grocery-staff",
      year: t("portfolio.page.experience.grocery.duration"),
      role: t("portfolio.page.experience.grocery.title"),
      company: t("portfolio.page.experience.grocery.company"),
      description: t("portfolio.page.experience.grocery.description"),
      skills: ["Communication", "Soft Skills"]
    }
  ];

  const handleCopyText = () => {
    let text = `${t("portfolio.page.name").toUpperCase()} - RESUME\n`;
    text += `==========================\n`;
    text += `Email: nguyennamnvl267@gmail.com | Phone: +84372928669 | Location: ${t("portfolio.page.contact.address")}\n`;
    text += `Role: ${t("portfolio.page.job.title")}\n\n`;

    text += `SUMMARY\n`;
    text += `${t("portfolio.page.about.details")}\n\n`;

    text += `WORK EXPERIENCE\n`;
    timelineItems.forEach(item => {
      text += `- ${item.role} @ ${item.company} (${item.year})\n`;
      text += `  ${item.description}\n`;
    });
    text += `\nEDUCATION\n`;
    text += `- ${t("portfolio.page.education.label")} (${t("portfolio.page.education.duration")})\n`;
    text += `  * ${t("portfolio.page.education.major")}\n`;
    text += `  * ${t("portfolio.page.certification.b1.title")} (${t("portfolio.page.certification.b1.description")})\n`;

    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const professionalResumeLabel = t("portfolio.page.resume.title");
  const copyTextLabel = copied ? t("portfolio.page.resume.copy.copied") : t("portfolio.page.resume.copy.text");
  const tipLabel = t("portfolio.page.resume.tip");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-3xl bg-white rounded-xl border border-gray-200 flex flex-col max-h-[92vh] text-gray-800 shadow-2xl z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex border-b border-gray-200 items-center justify-between p-5 bg-gray-50/80">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              <div>
                <h3 className="text-base sm:text-lg font-bold font-sans text-gray-900 leading-tight">{professionalResumeLabel}</h3>
                <p className="text-[10px] sm:text-[11px] font-mono text-gray-500">{t("portfolio.page.name")} — {t("portfolio.page.job.title")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
              <button
                onClick={handleCopyText}
                className="hidden md:inline-flex items-center gap-1.5 py-1.5 px-3 bg-white text-xs font-mono text-gray-700 border border-gray-200 rounded hover:bg-gray-100 transition-all font-semibold cursor-pointer"
                title="Copy plaintext CV to clipboard"
              >
                {copyTextLabel}
              </button>
              
              {/* Download PDF CV Button */}
              <a
                href="/NGUYEN-PHUONG-NAM-SOFTWARE-ENGINEER-CV.pdf"
                download="NGUYEN-PHUONG-NAM-SOFTWARE-ENGINEER-CV.pdf"
                className="inline-flex items-center gap-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono rounded transition-all font-bold cursor-pointer"
                title={t("portfolio.page.download.my.cv")}
              >
                <Download size={13} /> <span className="hidden sm:inline">PDF</span>
              </a>

              <button
                onClick={handlePrint}
                className="p-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
                title="Print Resume or Save as PDF"
              >
                <Printer size={16} />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Printable Resume Canvas */}
          <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-6 printable-area bg-white text-gray-800 selection:bg-blue-100 selection:text-blue-900">
            
            {/* Top Sheet */}
            <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-sans tracking-tight">{t("portfolio.page.name")}</h1>
                <p className="text-blue-500 font-mono text-xs sm:text-sm mt-1 uppercase font-semibold">{t("portfolio.page.job.title")}</p>
              </div>
              <div className="space-y-1 text-[11px] sm:text-xs font-mono text-gray-600">
                <div className="flex items-center gap-1.5"><Mail size={12} className="text-blue-500" /> nguyennamnvl267@gmail.com</div>
                <div className="flex items-center gap-1.5"><Phone size={12} className="text-blue-500" /> +84372928669</div>
                <div className="flex items-center gap-1.5"><MapPin size={12} className="text-blue-500" /> {t("portfolio.page.contact.address")}</div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={11} className="text-green-600" /> 
                  <span className="text-green-700 font-bold">{t("portfolio.page.resume.status.available")}</span>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-2 font-bold flex items-center gap-1.5 select-none text-blue-500">
                <Bookmark size={12} /> {t("portfolio.page.resume.who_am_i")}
              </h2>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {t("portfolio.page.about.details")}
              </p>
            </div>

            {/* Experience timeline */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5 pt-2 select-none text-blue-500">
                <Briefcase size={12} /> {t("portfolio.page.experience.title")}
              </h2>

              <div className="space-y-5">
                {timelineItems.map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-blue-200">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-gray-905">{item.role}</h3>
                        <p className="text-xs text-gray-500 font-mono">{item.company}</p>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-blue-600 bg-blue-50/50 border border-blue-100 px-2 py-0.5 rounded font-bold">{item.year}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line pr-1 mt-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Summary */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5 pt-2 mb-2 select-none text-blue-500">
                <GraduationCap size={12} /> {t("portfolio.page.education")}
              </h2>
              
              {/* College */}
              <div className="relative pl-4 border-l-2 border-blue-200">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1.5">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{t("portfolio.page.education.label")}</h3>
                    <p className="text-xs text-gray-500 font-semibold font-mono mt-0.5">{t("portfolio.page.education.major")}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-blue-600 bg-blue-50/50 border border-blue-100 px-2.5 py-0.5 rounded font-bold">{t("portfolio.page.education.duration")}</span>
                </div>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                  {t("portfolio.page.education.description")}
                </p>
              </div>

              {/* B2 Language Certificate */}
              <div className="relative pl-4 border-l-2 border-blue-200">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1.5">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{t("portfolio.page.certification.b1.label")}</h3>
                    <p className="text-xs text-gray-500 font-semibold font-mono mt-0.5">{t("portfolio.page.certification.b1.level")}: {t("portfolio.page.certification.b1.description")}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                  {t("portfolio.page.certification.b1.details")}
                </p>
              </div>
            </div>

            {/* Tech stack summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5 pt-2 mb-2 select-none text-blue-500">
                <Globe size={12} /> {t("portfolio.page.resume.tech_profile")}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "HTML 5", 
                  "SCSS", 
                  "JavaScript (ES6+)", 
                  "TypeScript", 
                  "React", 
                  "Redux", 
                  "Git", 
                  "C# .NET", 
                  "MSSQL", 
                  "MongoDB", 
                  "REST API", 
                  "Entity Framework Core"
                ].map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 text-blue-700 border border-gray-200 px-2 py-1 rounded text-[10px] font-mono font-bold select-none">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer print advice */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 text-[10px] font-mono text-gray-500 text-center select-none">
            {tipLabel}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
