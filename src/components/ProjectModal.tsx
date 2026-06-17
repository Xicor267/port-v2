/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ExternalLink, 
  Code, 
  Play, 
  RefreshCw, 
  Zap, 
  Cpu, 
  Settings, 
  Database, 
  Layers, 
  CheckCircle, 
  Activity, 
  Server,
  Terminal,
  FileText,
  Search,
  Filter,
  Eye
} from "lucide-react";
import { Project } from "../types";
import { useLanguage } from "../LanguageContext";

interface ProjectModalProps {
  project: Project | null;
  mode: "demo" | "source" | null;
  onClose: () => void;
  onPreviewImage?: (images: string[], index: number) => void;
}

function LinkFormatter({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        // Regex to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = line.split(urlRegex);
        return (
          <div key={index} className="flex flex-wrap items-baseline">
            {parts.map((part, pIdx) => {
              if (urlRegex.test(part)) {
                return (
                  <a 
                    key={pIdx} 
                    href={part.replace(/[\•\s]/g, "").trim()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 underline break-all inline-block font-bold hover:scale-[1.002] transition-all cursor-pointer"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={pIdx} className="text-gray-700 mr-1">{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectModal({ project, mode, onClose, onPreviewImage }: ProjectModalProps) {
  const { t, language } = useLanguage();

  if (!project) return null;

  const isTyGraph = project.id === "tygraph";

  const customer = isTyGraph ? t("portfolio.page.project.customer.tygraph") : t("portfolio.page.project.customer.individual");
  const descLabel = t("portfolio.page.project.customer.desc");
  const description = isTyGraph ? t("portfolio.page.project.description.tygraph") : t("portfolio.page.project.description");
  const teamSize = isTyGraph ? t("portfolio.page.project.team_size.tygraph") : t("portfolio.page.project.team_size.number");
  const position = isTyGraph ? t("portfolio.page.project.position.tygraph") : t("portfolio.page.project.position.developer");
  const responsibilities = isTyGraph ? t("portfolio.page.project.responsibilities.tygraph") : t("portfolio.page.project.responsibilities.details");
  const technologies = isTyGraph ? t("portfolio.page.project.technologies.tygraph") : t("portfolio.page.project.technologies.details");
  const linkRef = isTyGraph ? t("portfolio.page.project.link_reference.tygraph") : t("portfolio.page.project.link_reference.project");

  const projectDuration = isTyGraph 
    ? t("portfolio.page.project.duration.tygraph")
    : t("portfolio.page.project.duration.shareblog");

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

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden text-gray-800 shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex border-b border-gray-150 items-center justify-between p-5 bg-gray-50/80">
            <div>
              <span className="text-xs font-mono tracking-wider uppercase text-blue-600 mb-1 block font-bold">
                {t("portfolio.page.project.modal.title")}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-gray-900 flex items-center gap-2 flex-wrap">
                {project.title} <span className="text-gray-400 font-light font-sans text-sm md:text-base">~ {projectDuration}</span>
                <span className="text-[10px] md:text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-mono font-bold">
                  {mode === "demo" ? t("portfolio.page.project.modal.sandbox") : t("portfolio.page.project.modal.source_inspect")}
                </span>
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 bg-white">
            
            {/* Project Hero Banner / Image Gallery Hook */}
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 h-52 sm:h-64 bg-gray-50 group flex items-center justify-center animate-fade">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-101"
              />
              <div 
                onClick={() => onPreviewImage && onPreviewImage(project.gallery || [project.image], 0)}
                className="absolute inset-x-0 bottom-0 bg-black/60 hover:bg-black/75 p-4 transition-colors flex flex-col sm:flex-row items-center justify-between gap-3 text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Eye size={20} className="text-blue-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-left">
                    {t("portfolio.page.project.modal.gallery_desc")}
                  </span>
                </div>
                {project.gallery && project.gallery.length > 1 && (
                  <span className="text-[10px] bg-blue-600 px-3 py-1 rounded-full font-mono font-bold text-white mt-1 sm:mt-0">
                    {project.gallery.length} {t("portfolio.page.project.modal.photos")}
                  </span>
                )}
              </div>
            </div>

            {/* Detailed Project Attributes Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden text-sm bg-white shadow-sm">
              {/* Row: Customer */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50/50 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/50">
                  {t("portfolio.page.project.customer")}
                </div>
                <div className="md:col-span-9 p-4 text-gray-900 font-bold">
                  {customer}
                </div>
              </div>

              {/* Row: Description */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {descLabel}
                </div>
                <div className="md:col-span-9 p-4 text-gray-750 leading-relaxed text-xs sm:text-sm">
                  {description}
                </div>
              </div>

              {/* Row: Team Size */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {t("portfolio.page.project.team_size")}
                </div>
                <div className="md:col-span-9 p-4 text-gray-800 font-medium">
                  {teamSize}
                </div>
              </div>

              {/* Row: Position */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {t("portfolio.page.project.position")}
                </div>
                <div className="md:col-span-9 p-4 text-gray-800 font-medium">
                  {position}
                </div>
              </div>

              {/* Row: Responsibilities */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {t("portfolio.page.project.responsibilities")}
                </div>
                <div className="md:col-span-9 p-4 text-gray-750 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {responsibilities}
                </div>
              </div>

              {/* Row: Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {t("portfolio.page.project.technologies")}
                </div>
                <div className="md:col-span-9 p-4 text-gray-750 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {technologies}
                </div>
              </div>

              {/* Row: Link Reference */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-3 p-4 text-gray-500 font-semibold md:border-r border-gray-200 bg-gray-50/20">
                  {t("portfolio.page.project.link_reference")}
                </div>
                <div className="md:col-span-9 p-4">
                  <LinkFormatter text={linkRef} />
                </div>
              </div>
            </div>

            {/* Inner Content depending on Mode */}
            {mode === "demo" ? (
              <InteractiveDemo sandboxId={project.id} />
            ) : (
              <SourceViewer projectId={project.id} />
            )}

          </div>

          {/* Footer controls */}
          <div className="bg-gray-50 border-t border-gray-150 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
            <span className="text-gray-500">
              {t("portfolio.page.project.modal.verified")} <span className="text-green-600 font-bold">{t("portfolio.page.project.modal.secure_env")}</span>
            </span>
            <div className="flex gap-3 w-full sm:w-auto">
              {mode === "demo" ? (
                <button 
                  onClick={() => window.open(isTyGraph ? "https://tygraph.avepointonlineservices.com" : "https://github.com/Xicor267/ShareBlogUpdate", "_blank")}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2 px-4 bg-white border border-gray-200 text-gray-755 rounded hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                >
                  <Code size={14} /> {t("portfolio.page.project.modal.github_repo")}
                </button>
              ) : (
                <button 
                  onClick={() => window.open(isTyGraph ? "https://tygraph.avepointonlineservices.com" : "http://shareblog.tech/", "_blank")}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2 px-4 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Play size={14} /> {t("portfolio.page.project.modal.test_live")} <ExternalLink size={12} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ==========================================================================
   TyGraph Metrics or Share Blog SQL Interactive Sandbox
   ========================================================================== */
function InteractiveDemo({ sandboxId }: { sandboxId: string }) {
  const { t } = useLanguage();
  // --- 1. TYGRAPH ANALYTICS PLAYGROUND ---
  const [activeMetric, setActiveMetric] = useState<"licensing" | "onedrive" | "sharepoint">("licensing");
  const [selectedDept, setSelectedDept] = useState<"All" | "Sales" | "IT" | "Product">("All");
  const [aggInterval, setAggInterval] = useState<number>(30); // in minutes
  const [tyMetrics, setTyMetrics] = useState<number[]>(Array(12).fill(60));

  useEffect(() => {
    if (sandboxId !== "tygraph") return;
    // Generate base metrics
    let multiplier = 1;
    if (selectedDept === "IT") multiplier = 1.3;
    if (selectedDept === "Sales") multiplier = 0.85;
    if (selectedDept === "Product") multiplier = 1.1;

    let baseFactor = activeMetric === "licensing" ? 80 : activeMetric === "onedrive" ? 45 : 110;

    const simulatedData = Array(12).fill(0).map((_, idx) => {
      const noise = Math.sin(idx * 0.5) * 15 + Math.random() * 8;
      const intervalAdjustment = aggInterval > 30 ? -5 : 2;
      return Math.max(10, Math.round((baseFactor + noise + intervalAdjustment) * multiplier));
    });

    setTyMetrics(simulatedData);
  }, [sandboxId, activeMetric, selectedDept, aggInterval]);

  // --- 2. SHARE BLOG LINQ/SQL QUERY PLAYGROUND ---
  const [sqlQuery, setSqlQuery] = useState(`db.Articles
  .Where(a => a.IsPublished && a.Category == "React")
  .OrderByDescending(a => a.Views)
  .Select(a => new { a.Title, a.Views });`);
  
  const [sqlResult, setSqlResult] = useState<any[]>([
    { Title: "Modern Component State with React 19", Author: "Nam Nguyen", Views: 9841, Date: "2026-02-14", Category: "React" },
    { Title: "Building High Performance Dashboards with Redux Toolkit", Author: "Nam Nguyen", Views: 7420, Date: "2026-03-10", Category: "React" },
  ]);
  const [isQuerying, setIsQuerying] = useState(false);

  const runQuery = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      const queryLower = sqlQuery.toLowerCase();
      if (queryLower.includes("csharp") || queryLower.includes("c#") || queryLower.includes("dotnet") || queryLower.includes(".net")) {
        setSqlResult([
          { Title: "Dependency Injection in ASP.NET Core 8.0 APIs", Author: "Nam Nguyen", Views: 5410, Date: "2025-11-20", Category: ".NET" },
          { Title: "Optimizing Entity Framework Queries with AsNoTracking", Author: "Nam Nguyen", Views: 4980, Date: "2025-12-05", Category: ".NET" }
        ]);
      } else if (queryLower.includes("typescript") || queryLower.includes("typescript")) {
        setSqlResult([
          { Title: "Strict Generics and Type Guards", Author: "Nam Nguyen", Views: 6120, Date: "2026-01-18", Category: "TypeScript" },
          { Title: "Typing API payloads successfully in large frontends", Author: "Nam Nguyen", Views: 3204, Date: "2026-02-01", Category: "TypeScript" }
        ]);
      } else if (queryLower.includes("views") || queryLower.includes("all") || queryLower.includes("articles")) {
        setSqlResult([
          { Title: "Modern Component State with React 19", Author: "Nam Nguyen", Views: 9841, Date: "2026-02-14", Category: "React" },
          { Title: "Building High Performance Dashboards with Redux Toolkit", Author: "Nam Nguyen", Views: 7420, Date: "2026-03-10", Category: "React" },
          { Title: "Strict Generics and Type Guards", Author: "Nam Nguyen", Views: 6120, Date: "2026-01-18", Category: "TypeScript" },
          { Title: "Dependency Injection in ASP.NET Core 8.0 APIs", Author: "Nam Nguyen", Views: 5410, Date: "2025-11-20", Category: ".NET" }
        ]);
      } else {
        setSqlResult([
          { Title: "No records matched this simulated query filter.", Views: 0, Date: "N/A", Category: "N/A" }
        ]);
      }
    }, 600);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-2">
        <Zap className="text-blue-500 animate-pulse" size={16} />
        <h5 className="text-sm font-bold tracking-tight uppercase text-gray-900 font-sans">
          {t("portfolio.page.project.sandbox.env")}
        </h5>
      </div>

      {/* TYGRAPH ANALYTICS SANDBOX */}
      {sandboxId === "tygraph" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Visual panel */}
          <div className="md:col-span-8 bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-gray-600 font-bold">
                <Activity size={12} className="text-blue-600 animate-pulse" /> {t("portfolio.page.project.sandbox.telemetry_feed")}
              </span>
              <span className="text-gray-500">
                {t("portfolio.page.project.sandbox.type")} <strong className="text-blue-600 uppercase font-bold">{activeMetric}</strong>
              </span>
            </div>

            {/* Simulated Live charts bars */}
            <div className="h-44 w-full flex items-end gap-2 px-2 border-b border-l border-gray-300 bg-white p-2 rounded-t">
              {tyMetrics.map((val, idx) => {
                const heightPercentage = Math.min(100, (val / 170) * 100);
                const isHigh = val > 120;
                let bgClass = "bg-blue-500 hover:bg-blue-600";
                if (isHigh) bgClass = "bg-green-500 hover:bg-green-600";

                return (
                  <div key={idx} className="flex-grow flex flex-col items-center justify-end h-full relative group">
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-300 ${bgClass}`}
                      style={{ height: `${heightPercentage}%` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none font-mono whitespace-nowrap z-10">
                      {t("portfolio.page.project.sandbox.value")} {val}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-gray-500 px-1">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
              <span className="font-bold text-gray-700">Dec (Aggregated)</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-3">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-4 text-xs">
              <div className="flex items-center gap-1 font-mono text-blue-600 font-bold uppercase tracking-wider mb-2">
                <Filter size={13} /> {t("portfolio.page.project.sandbox.metric_config")}
              </div>

              {/* Metric selector */}
              <div className="space-y-1">
                <label className="text-gray-500 block">{t("portfolio.page.project.sandbox.telemetry_dim")}</label>
                <div className="grid grid-cols-3 gap-1">
                  {(["licensing", "onedrive", "sharepoint"] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setActiveMetric(m)}
                      className={`py-1 rounded text-[10px] font-medium border font-mono transition-all capitalize ${
                        activeMetric === m
                          ? "bg-blue-600 border-blue-600 text-white font-bold"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Department selector */}
              <div className="space-y-1">
                <label className="text-gray-500 block">{t("portfolio.page.project.sandbox.office_dept")}</label>
                <div className="grid grid-cols-4 gap-1">
                  {(["All", "Sales", "IT", "Product"] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`py-1 rounded text-[9px] border font-mono transition-all ${
                        selectedDept === d
                          ? "bg-blue-600 border-blue-600 text-white font-bold"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aggregation Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500 font-mono">{t("portfolio.page.project.sandbox.interval")}</span>
                  <span className="text-blue-600 font-bold font-mono">{aggInterval} min</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="5"
                  value={aggInterval} 
                  onChange={(e) => setAggInterval(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-gray-200 outline-none h-1 rounded"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-3 rounded text-[11px] font-mono leading-relaxed text-blue-800">
              <strong className="block text-blue-900 font-extrabold mb-0.5">{t("portfolio.page.project.sandbox.telemetry_pipe")}</strong>
              {t("portfolio.page.project.sandbox.redux_pipeline_desc")}
            </div>
          </div>
        </div>
      )}

      {/* SHARE BLOG SANDBOX */}
      {sandboxId === "shareblog" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Query input panel */}
          <div className="md:col-span-6 bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
              <span className="text-[11px] font-mono text-gray-700 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Settings size={12} className="text-blue-600" /> {t("portfolio.page.project.sandbox.linq_selector")}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSqlQuery(`db.Articles\n  .Where(a => a.Category == "React")\n  .OrderByDescending(x => x.Views);`)}
                  className="text-[9px] font-mono bg-white text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 hover:bg-gray-100 font-semibold"
                >
                  {t("portfolio.page.project.sandbox.react_cat")}
                </button>
                <button 
                  onClick={() => setSqlQuery(`db.Articles\n  .Where(a => a.Category == ".NET" || a.Category == "C#")\n  .Select(x => x);`)}
                  className="text-[9px] font-mono bg-white text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 hover:bg-gray-100 font-semibold"
                >
                  {t("portfolio.page.project.sandbox.dotnet_articles")}
                </button>
              </div>
            </div>

            <textarea 
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-40 bg-[#0e0e0e] border border-gray-200 rounded p-3 font-mono text-xs text-green-400 outline-none focus:border-blue-500 transition-all"
              spellCheck={false}
              style={{ resize: "none" }}
            />

            <button 
              onClick={runQuery}
              disabled={isQuerying}
              className="mt-3 py-2 px-4 bg-blue-600 text-white rounded font-bold font-mono text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 font-extrabold cursor-pointer"
            >
              {isQuerying ? (
                <>
                  <RefreshCw className="animate-spin" size={13} fill="none" /> {t("portfolio.page.project.sandbox.compiling")}
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" /> {t("portfolio.page.project.sandbox.execute")}
                </>
              )}
            </button>
          </div>

          {/* Database Output view */}
          <div className="md:col-span-6 bg-[#0e0e0e] border border-gray-900 rounded-lg p-4 flex flex-col justify-between h-[275px]">
            <div className="flex border-b border-gray-800 pb-2 mb-3 items-center justify-between text-[11px] font-mono">
              <span className="text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Database size={12} className="text-blue-500" /> {t("portfolio.page.project.sandbox.mssql_out")}
              </span>
              <span className="text-green-500 text-[10px]">{t("portfolio.page.project.sandbox.compile_ok")}</span>
            </div>

            <div className="overflow-auto flex-grow scrollbar-thin text-xs font-mono text-gray-300 pr-1">
              {isQuerying ? (
                <div className="flex items-center justify-center h-full flex-col gap-2 text-gray-400">
                  <RefreshCw size={24} className="animate-spin text-blue-500" />
                  <span>{t("portfolio.page.project.sandbox.translating")}</span>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <span className="text-[10px] text-gray-500 block">{t("portfolio.page.project.sandbox.query_result")}</span>
                  {sqlResult.map((res, idx) => (
                    <div key={idx} className="border-l-2 border-blue-500 pl-3 py-1 bg-gray-950 rounded-r">
                      <p className="text-white font-bold text-xs">{res.Title || t("portfolio.page.project.sandbox.no_records")}</p>
                      <div className="flex gap-4 text-[10px] text-gray-500 mt-1">
                        <span>{t("portfolio.page.project.sandbox.category")} <strong className="text-blue-400">{res.Category}</strong></span>
                        <span>{t("portfolio.page.project.sandbox.views")} <strong className="text-green-400">{res.Views}</strong></span>
                        {res.Date !== "N/A" && <span>{t("portfolio.page.project.sandbox.date")} {res.Date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Static clean Developer Code-Source snippet viewer (Highly polished aesthetic)
   ========================================================================== */
function SourceViewer({ projectId }: { projectId: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Simulated real source code snippets matching actual architecture!
  let filename = "TelemetryChart.tsx";
  let language = "typescript";
  let code = ``;

  if (projectId === "tygraph") {
    filename = "TelemetryChart.tsx";
    language = "typescript";
    code = `import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DimensionSelector } from './DimensionSlice';

export const TelemetrySliceComp: React.FC = () => {
  const metricValues = useSelector(state => state.analytics.rawTimeseries);
  const selectedDept = useSelector(state => state.filters.activeDepartment);

  // Multi-dimensional dynamic slice calculation
  const aggregatedData = useMemo(() => {
    return metricValues
      .filter(item => selectedDept === 'All' || item.department === selectedDept)
      .map(entry => ({
        timestamp: entry.date,
        totalSeats: entry.metrics.seatsUsed,
        uniqueReaders: entry.metrics.readers
      }));
  }, [metricValues, selectedDept]);

  return (
    <div className="chart-wrapper font-sans bg-white border rounded shadow">
      {/* Heavy computation handled inside useMemo to preserve 60FPS */}
      <D3Renderer timeseries={aggregatedData} scale="linear" />
    </div>
  );
};`;
  } else {
    filename = "BlogRepository.cs";
    language = "csharp";
    code = `using Microsoft.EntityFrameworkCore;
using ShareBlog.Models;

public class BlogRepository : IBlogRepository
{
    private readonly BlogDbContext _context;

    public BlogRepository(BlogDbContext context) {
        _context = context;
    }

    public async Task<List<Article>> GetArticlesByFilterAsync(string category, bool sortedByViews)
    {
        // Strictly optimized query leveraging AsNoTracking for read-only speeds
        IQueryable<Article> query = _context.Articles
            .AsNoTracking()
            .Where(a => a.IsPublished);

        if (!string.IsNullOrEmpty(category)) {
            query = query.Where(a => a.Category == category);
        }

        if (sortedByViews) {
            query = query.OrderByDescending(a => a.Views);
        }

        return await query.ToListAsync();
    }
}`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-t-lg border border-gray-200 border-b-0 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-gray-700 font-bold">
          <Code size={14} className="text-blue-600" /> {filename} ({language})
        </span>
        <button 
          onClick={handleCopy}
          className="text-blue-600 hover:text-blue-800 transition-colors font-bold"
        >
          {copied ? t("portfolio.page.project.source.copied") : t("portfolio.page.project.source.copy")}
        </button>
      </div>

      <div className="bg-gray-950 text-[#e0e0e0] border border-gray-200 rounded-b-lg p-5 font-mono text-xs overflow-x-auto max-h-72 select-text scrollbar-thin">
        <pre><code className="text-emerald-400">{code}</code></pre>
      </div>

      <div className="bg-blue-50 p-3 rounded border border-blue-200 text-[11px] font-mono text-gray-600 flex items-start gap-2">
        <Layers size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          {t("portfolio.page.project.source.snippet_desc")}
        </div>
      </div>
    </div>
  );
}
