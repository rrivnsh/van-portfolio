import { skillsData } from "@/config";
import { useTranslation } from "react-i18next";

export const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full h-full flex flex-col"
    >
      {/* Intro */}
      <p
        className="text-body text-(--color-muted) mb-8 md:mb-12"
      >
        {t("editorial.skills_intro")}
      </p>

      {/* Skills Index Table */}
      <div className="flex flex-col border-t border-(--color-border)/20 mt-8">
        {skillsData.map((category) => (
          <div
            key={category.id}
            className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-12 border-b border-(--color-border)/20 py-8 group"
          >
            {/* Category */}
            <div className="w-full lg:w-1/3">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-(--color-fg) uppercase group-hover:translate-x-2 transition-transform duration-300">
                {t(category.key)}
              </h3>
            </div>

            {/* Skills List */}
            <div className="w-full lg:w-2/3 flex flex-wrap gap-x-3 gap-y-1">
              {category.skills.map((skill, index) => (
                <span
                  key={skill}
                  className="text-body md:text-xl font-medium text-(--color-muted) group-hover:text-(--color-fg) transition-colors duration-500"
                >
                  {skill}
                  {index < category.skills.length - 1 && (
                    <span className="text-(--color-border) ml-3 font-light select-none">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
