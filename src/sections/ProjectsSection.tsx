import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { SectionLayout } from "@/components";
import { projectsData } from "@/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  const { elementRef, isVisible } = useScrollReveal(0.05);

  return (
    <SectionLayout introText={t("editorial.projects_intro")}>
      <div 
        ref={elementRef}
        className="flex flex-col py-8 overflow-hidden"
      >
        {/* Table Header - Desktop Only */}
        <div className={`hidden md:grid grid-cols-12 gap-8 pb-8 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-(--color-subtle) transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="col-span-7">PROJECT / NO.</div>
          <div className="col-span-2">CATEGORY</div>
          <div className="col-span-3 text-right">METADATA</div>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 lg:gap-8 border-b border-(--color-border)/20 py-12 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Title & Index */}
              <div className="flex-1 lg:flex-none lg:w-7/12 flex items-start gap-8 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
                <span className="text-[0.65rem] font-mono text-(--color-subtle) opacity-60 mt-4">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-(--color-fg)">
                  {project.title}
                </h3>
              </div>

              {/* Metadata & Button */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:text-right w-full lg:w-5/12 mt-4 lg:mt-0 gap-6">
                <div className="flex flex-col">
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">
                    {project.category}
                  </p>
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-fg) mt-1">
                    {project.role}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[0.65rem] font-black tracking-[0.3em] uppercase text-(--color-fg) opacity-40 group-hover:opacity-100 transition-all duration-500">
                  <span>View Details</span>
                  <span className="w-6 h-px bg-(--color-fg) group-hover:w-10 transition-all duration-500" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </SectionLayout>
  );
};
