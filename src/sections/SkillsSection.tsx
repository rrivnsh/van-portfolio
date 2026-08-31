import { skillsData } from "@/config";
import { useTranslation } from "react-i18next";
import { Code2, Server, Cloud, Wrench, Cpu, Check } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export const SkillsSection = () => {
  const { t } = useTranslation();

  const domainIcons = [
    <Code2 key="code" className="w-5 h-5 text-(--color-fg)" aria-hidden="true" />,
    <Server key="server" className="w-5 h-5 text-(--color-fg)" aria-hidden="true" />,
    <Cloud key="cloud" className="w-5 h-5 text-(--color-fg)" aria-hidden="true" />,
    <Wrench key="wrench" className="w-5 h-5 text-(--color-fg)" aria-hidden="true" />,
  ];

  return (
    <div className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center py-4 sm:py-8 md:py-12 w-full space-y-6 sm:space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
          <Cpu className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
          <span>{t("skills_section.label", "KETERAMPILAN TEKNIS")}</span>
        </div>
        <h2 className="text-headline font-bold text-(--color-fg)">
          {t("skills_section.heading", "Keahlian & Teknologi")}
        </h2>
        <p className="text-body text-sm sm:text-base text-(--color-muted)">
          {t("skills_section.intro", "Teknologi dan tools yang saya gunakan dalam pengembangan web, cloud computing, dan dukungan teknis IT.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillsData.map((category, idx) => (
          <SpotlightCard key={category.id} className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-(--color-border) pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-(--color-surface-raised) border border-(--color-border)">
                    {domainIcons[idx % domainIcons.length]}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-(--color-fg)">
                    {t(category.key, category.category)}
                  </h3>
                </div>
                <span className="text-xs font-mono text-(--color-subtle)">
                  {category.skills.length} skills
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono text-(--color-fg)"
                  >
                    <Check className="w-3.5 h-3.5 text-(--color-muted) shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
