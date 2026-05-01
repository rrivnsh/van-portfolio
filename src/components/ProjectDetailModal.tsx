import { ExternalLink, Github, X } from "lucide-react";
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

  if (!project) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 pointer-events-none"
          >
            <div
              className="relative bg-(--color-bg) shadow-2xl shadow-black/50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-(--color-fg)/5 hover:bg-(--color-fg)/10 transition-colors duration-200 z-10 cursor-pointer backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-(--color-fg)" />
              </button>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6 md:p-10 space-y-8 md:space-y-10">
                
                {/* Header */}
                <div className="space-y-4 pr-12">
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-(--color-fg) leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm tracking-widest uppercase font-semibold text-(--color-muted)">
                    <span>{project.category}</span>
                    {(project.year || project.role) && <span className="w-1.5 h-1.5 rounded-full bg-(--color-border)" />}
                    {project.year && <span>{project.year}</span>}
                    {project.role && project.year && <span className="w-1.5 h-1.5 rounded-full bg-(--color-border)" />}
                    {project.role && <span>{project.role}</span>}
                  </div>
                </div>

                {/* Project Image */}
                <div className="rounded-2xl overflow-hidden bg-(--color-fg)/5 aspect-video w-full ring-1 ring-(--color-border)/20 shadow-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {/* Description (Takes 2 columns on desktop) */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-(--color-subtle) border-b border-(--color-border)/20 pb-2">About</h3>
                    <p className="text-body md:text-lg text-(--color-muted) leading-relaxed">
                      {t(project.fullDesc)}
                    </p>
                  </div>

                  {/* Tech Stack (Takes 1 column on desktop) */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-(--color-subtle) border-b border-(--color-border)/20 pb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-full border border-(--color-border)/40 bg-transparent text-[0.65rem] font-bold tracking-widest uppercase text-(--color-fg)"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-(--color-fg) text-(--color-bg) text-sm font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-opacity duration-200 shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-transparent border-2 border-(--color-fg) text-(--color-fg) text-sm font-bold tracking-[0.2em] uppercase hover:bg-(--color-fg)/5 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
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
