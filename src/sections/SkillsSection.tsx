import { SectionLayout } from "@/components";
import { skillsData } from "@/config";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks";

export const SkillsSection = () => {
  const { t } = useTranslation();
  const { elementRef, isVisible } = useScrollReveal(0.05);

  return (
    <SectionLayout introText={t("editorial.skills_intro")}>
      <div 
        ref={elementRef}
        className="flex flex-col gap-0 py-8 overflow-hidden"
      >
        {skillsData.map((category, idx) => (
          <div 
            key={category.id} 
            className={`group flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-12 border-b border-(--color-border)/20 py-12 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Category Label */}
            <div className="w-full lg:w-1/4">
              <h3 className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-(--color-subtle) mt-1">
                {t(category.key)}
              </h3>
            </div>
            
            {/* Skills List */}
            <div className="flex-1 flex flex-wrap gap-x-8 gap-y-4 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-2xl md:text-4xl font-extrabold tracking-tight text-(--color-fg) hover:text-(--color-muted) transition-colors cursor-default leading-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
