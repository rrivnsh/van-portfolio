import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Github,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData, type ProjectData } from "@/config";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  const currentProject = projectsData[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
  };

  // Keyboard left/right arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-[82vh] flex flex-col justify-center py-6 sm:py-8 md:py-10 w-full space-y-6">
      {/* Clean Header with Stepper Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
            <Layers className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
            <span>{t("projects.label", "PORTFOLIO")}</span>
          </div>
          <h2 className="text-headline font-bold text-(--color-fg)">
            {t("projects.heading", "Featured Projects")}
          </h2>
        </div>

        {/* Minimalist Slider Stepper Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-(--color-muted)">
            <strong className="text-(--color-fg)">{String(selectedIndex + 1).padStart(2, "0")}</strong>
            <span className="opacity-40"> / {String(projectsData.length).padStart(2, "0")}</span>
          </span>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-(--color-border) bg-(--color-surface)">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg hover:bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
              aria-label="Previous project (←)"
              title="Previous project (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg hover:bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
              aria-label="Next project (→)"
              title="Next project (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Premium Project Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 sm:p-8 md:p-10 shadow-xs"
        >
          {/* Left: Large Browser Visual Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface-raised) overflow-hidden relative flex-1 flex flex-col justify-between">
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-(--color-border) bg-(--color-surface) text-xs font-mono text-(--color-muted)">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40" />
                </div>
                <span className="text-[11px] opacity-70 tracking-wider truncate max-w-[200px]">
                  {currentProject.title.toLowerCase().replace(/\s+/g, "")}.preview
                </span>
                <button
                  onClick={() => setActiveModalProject(currentProject)}
                  className="p-1 rounded hover:bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer"
                  title="Inspect screenshot"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* High-res Image Preview */}
              <div
                onClick={() => setActiveModalProject(currentProject)}
                className="aspect-[16/10] w-full flex items-center justify-center p-6 sm:p-8 cursor-pointer relative"
              >
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  width={currentProject.imageWidth}
                  height={currentProject.imageHeight}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />

                {/* Award Banner Overlay if exists */}
                {currentProject.award && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-(--color-fg) text-(--color-bg) text-xs font-semibold font-mono shadow-md">
                    <Award className="w-3.5 h-3.5" />
                    <span>{currentProject.award}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Metadata Info */}
            <div className="flex items-center justify-between text-xs font-mono text-(--color-muted) px-1">
              <span>Category: <strong className="text-(--color-fg)">{currentProject.category}</strong></span>
              <span>Year: <strong className="text-(--color-fg)">{currentProject.year}</strong></span>
            </div>
          </div>

          {/* Right: Rich Project Case Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-(--color-muted)">
                  Project Case Study
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-(--color-fg)">
                  {currentProject.title}
                </h3>
                <div className="text-xs font-mono text-(--color-muted)">
                  <span>Role: </span>
                  <strong className="text-(--color-fg) font-semibold">{currentProject.role}</strong>
                </div>
              </div>

              {/* Comprehensive Description */}
              <p className="text-body text-sm sm:text-base leading-relaxed text-(--color-muted)">
                {t(currentProject.desc)}
              </p>

              {/* Technologies */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-(--color-muted) block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-fg)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-6 border-t border-(--color-border) space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {currentProject.link && (
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-(--color-fg) text-(--color-bg) font-semibold text-xs hover:opacity-90 transition-opacity min-h-[44px] shadow-xs"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {currentProject.repo && (
                  <a
                    href={currentProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-(--color-border) bg-(--color-surface-raised) text-(--color-fg) text-xs font-semibold hover:bg-(--color-surface) transition-colors min-h-[44px]"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}

                <button
                  onClick={() => setActiveModalProject(currentProject)}
                  className="px-4 py-3 rounded-xl border border-(--color-border) text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised) text-xs font-semibold transition-colors min-h-[44px] cursor-pointer"
                >
                  Full Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Progress Bar / Dots */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {projectsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              selectedIndex === idx
                ? "w-8 h-2 bg-(--color-fg)"
                : "w-2 h-2 bg-(--color-border) hover:bg-(--color-muted)"
            }`}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={!!activeModalProject}
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};
