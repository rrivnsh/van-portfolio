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
    <div className="min-h-[75vh] flex flex-col justify-center py-8 sm:py-12 md:py-16 w-full space-y-8">
      {/* Section Header */}
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

      {/* 4-Pillar Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsData.map((category, idx) => (
          <SpotlightCard key={category.id} className="p-6 sm:p-7 space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              {/* Category Header */}
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

              {/* Skills Grid Tags */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono text-(--color-fg)"
                  >
                    <Check className="w-3 h-3 text-(--color-muted) shrink-0" />
                    <span className="truncate">{skill}</span>
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
