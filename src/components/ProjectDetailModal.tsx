import { ExternalLink, Github, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    image: string;
    tech: string[];
    link: string | null;
    repo: string | null;
    fullDesc: string;
    category: string;
    year?: string;
    role?: string;
  } | null;
}

const ProjectDetailModal = ({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) => {
  const { t } = useTranslation();
  const [isZoomed, setIsZoomed] = useState(false);

  // Scroll lock and Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, isZoomed, onClose]);

  if (!project) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-100 transition-opacity"
            onClick={onClose}
          />

          {/* Main Modal container */}
          <div className="fixed inset-0 z-110 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-none">
            <div
              className="relative bg-(--color-bg) w-full max-w-6xl max-h-[92vh] overflow-y-auto pointer-events-auto rounded-3xl md:rounded-4xl shadow-2xl border border-(--color-border)/15"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close modal button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-(--color-fg)/5 hover:bg-(--color-fg)/10 transition-colors duration-200 z-50 cursor-pointer backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-(--color-fg)" />
              </button>

              {/* Modal content */}
              <div className="flex-1 flex flex-col p-5 sm:p-8 md:p-12 lg:p-16 space-y-8 sm:space-y-12">
                {/* Header */}
                <div className="space-y-3 sm:space-y-4 max-w-4xl pr-10">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-(--color-fg) uppercase leading-none">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[0.65rem] sm:text-xs tracking-widest uppercase font-bold text-(--color-muted)">
                    <span>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-(--color-border)" />
                    <span>{project.year || "2024"}</span>
                    {project.role && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-(--color-border)" />
                        <span className="text-(--color-primary)">{project.role}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Project Image Container with Full Resolution & Zoom */}
                <div
                  className="w-full bg-(--color-fg)/5 rounded-2xl overflow-hidden cursor-zoom-in relative group border border-(--color-border)/10 flex items-center justify-center min-h-[200px] sm:min-h-[300px] max-h-[65vh]"
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-h-[65vh] object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/75 text-white text-[0.6rem] sm:text-[0.65rem] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                  {/* Overview */}
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-(--color-subtle)">Overview</h3>
                    <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-(--color-muted) whitespace-pre-line">
                      {t(project.fullDesc)}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-(--color-subtle)">Technologies</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs sm:text-sm font-semibold tracking-tight text-(--color-fg) bg-(--color-fg)/5 px-3 py-1.5 rounded-md border border-(--color-border)/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Links */}
                {(project.link || project.repo) && (
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-(--color-border)/10">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 text-xs font-black tracking-widest uppercase text-(--color-fg) hover:text-(--color-muted) transition-colors"
                      >
                        <span className="w-6 h-px bg-(--color-fg) group-hover:w-10 transition-all duration-300" />
                        <span>Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 text-xs font-black tracking-widest uppercase text-(--color-fg) hover:text-(--color-muted) transition-colors"
                      >
                        <span className="w-6 h-px bg-(--color-fg) group-hover:w-10 transition-all duration-300" />
                        <span>Repository</span>
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lightbox Fullscreen Zoom */}
          {isZoomed && (
            <div
              className="fixed inset-0 bg-black/95 z-130 flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
              onClick={() => setIsZoomed(false)}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-140 cursor-pointer backdrop-blur-md transition-colors"
                aria-label="Close Zoom"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export { ProjectDetailModal };
