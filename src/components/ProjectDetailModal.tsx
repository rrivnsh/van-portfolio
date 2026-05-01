import { ExternalLink, Github, X } from "lucide-react";
import { useEffect } from "react";
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
    repo: string;
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

  // Scroll lock and Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-100 transition-opacity"
            onClick={onClose}
          />

          {/* modal container */}
          <div
            className="fixed inset-0 z-110 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative bg-(--color-bg) w-full max-w-7xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-4xl shadow-2xl border border-(--color-border)/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close modal button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-full bg-(--color-fg)/5 hover:bg-(--color-fg)/10 transition-colors duration-200 z-50 cursor-pointer backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-(--color-fg)" />
              </button>

              {/* modal content */}
              <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-20 space-y-16 md:space-y-20">
                
                {/* modal header */}
                <div className="space-y-6 max-w-4xl pr-12">
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-(--color-fg) uppercase leading-none">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-(--color-muted)">
                    <span>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-(--color-border)" />
                    <span>{project.year || "2024"}</span>
                    <span className="w-1 h-1 rounded-full bg-(--color-border)" />
                    <span className="text-(--color-primary)">{project.role}</span>
                  </div>
                </div>

                  <div className="w-full aspect-video md:aspect-21/9 bg-(--color-fg)/5 overflow-hidden rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                  {/* project description */}
                  <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-(--color-subtle)">Overview</h3>
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-(--color-muted)">
                      {t(project.fullDesc)}
                    </p>
                  </div>

                  {/* technology stack */}
                  <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-(--color-subtle)">Technologies</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-base md:text-lg font-bold tracking-tight text-(--color-fg)"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* external links */}
                <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-(--color-border)/10">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-xs font-black tracking-[0.3em] uppercase text-(--color-fg)"
                    >
                      <span className="w-8 h-px bg-(--color-fg) group-hover:w-12 transition-all duration-500" />
                      Live Project
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-xs font-black tracking-[0.3em] uppercase text-(--color-fg)"
                  >
                    <span className="w-8 h-px bg-(--color-fg) group-hover:w-12 transition-all duration-500" />
                    Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { ProjectDetailModal };
