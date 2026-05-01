import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { Pagination, SectionLayout } from "@/components";
import { projectsData } from "@/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePagination } from "@/hooks";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  
  const ITEMS_PER_PAGE = 1;
  const { currentPage, totalPages, currentData, handleNext, handlePrev } =
    usePagination(projectsData, ITEMS_PER_PAGE);

  return (
    <>
      <SectionLayout
        introText={t("editorial.projects_intro")}
        contentClassName="group/list"
      >
        {currentData.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group/row flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 border-b border-(--color-border)/20 py-8 md:py-12 text-left bg-transparent cursor-pointer transition-all duration-500 opacity-100 group-hover/list:opacity-30 hover:opacity-100!"
          >
            {/* project title and index */}
            <div className="flex items-start lg:items-center gap-6 md:gap-12 w-full lg:w-auto">
              <span className="text-caption text-(--color-subtle) font-mono w-6 md:w-8 pt-2 lg:pt-0">
                {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-(--color-fg) group-hover/row:-translate-y-2 transition-transform duration-500 uppercase leading-none mb-2 lg:mb-0">
                  {project.title}
                </h3>
                {/* mobile project description */}
                <p className="lg:hidden text-body text-(--color-muted) max-w-md mt-4">
                  {t(project.desc)}
                </p>
              </div>
            </div>

            {/* project metadata and stack */}
            <div className="flex flex-col lg:items-end gap-4 pl-12 md:pl-20 lg:pl-0 w-full lg:w-1/3">
              <p className="hidden lg:block text-body text-(--color-muted) text-right line-clamp-2">
                {t(project.desc)}
              </p>

              <div className="flex items-center lg:justify-end gap-3 flex-wrap">
                <span className="text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">
                  {project.role}
                </span>
                <span className="w-1 h-1 rounded-full bg-(--color-border)" />
                <div className="flex gap-2 flex-wrap">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[0.55rem] md:text-[0.65rem] font-bold tracking-widest uppercase text-(--color-fg) border border-(--color-border)/40 px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[0.55rem] md:text-[0.65rem] font-bold tracking-widest uppercase text-(--color-subtle) px-1 py-1">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </SectionLayout>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* project details modal */}
      <ProjectDetailModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
};
