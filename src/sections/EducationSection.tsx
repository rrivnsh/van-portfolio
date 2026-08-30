import { educationData } from "@/config";
import { useTranslation } from "react-i18next";
import { GraduationCap, Award } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export const EducationSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[75vh] flex flex-col justify-center py-8 sm:py-12 md:py-16 w-full space-y-8">
      {/* Section Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
          <GraduationCap className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
          <span>{t("education.label", "PENDIDIKAN")}</span>
        </div>
        <h2 className="text-headline font-bold text-(--color-fg)">
          {t("education.heading", "Pendidikan & Penghargaan")}
        </h2>
        <p className="text-body text-sm sm:text-base text-(--color-muted)">
          {t("education.intro", "Pendidikan formal dan program pelatihan teknis yang telah saya selesaikan.")}
        </p>
      </div>

      {/* Academic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unpas Degree */}
        {educationData.map((edu) => (
          <SpotlightCard key={edu.id} className="p-6 sm:p-7 space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-(--color-fg) uppercase tracking-wider">
                  {t(edu.institution)}
                </span>
                <span className="font-mono text-xs text-(--color-muted)">
                  {t(edu.period)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-(--color-fg)">
                {t(edu.degree)}
              </h3>

              <p className="text-body text-sm text-(--color-muted) leading-relaxed">
                Focused on software engineering, web application development, algorithms, and cloud computing.
              </p>
            </div>

            <div className="pt-4 border-t border-(--color-border) flex items-center justify-between">
              <span className="text-xs font-mono text-(--color-muted)">Status</span>
              <span className="font-mono text-xs font-semibold text-(--color-fg) px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised)">
                Graduate (S.Kom)
              </span>
            </div>
          </SpotlightCard>
        ))}

        {/* Bangkit Google Capstone */}
        <SpotlightCard className="p-6 sm:p-7 space-y-4 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--color-fg) uppercase tracking-wider">
                Bangkit Academy (Google, GoTo, Traveloka)
              </span>
              <span className="font-mono text-xs text-(--color-muted)">
                Feb 2024 - Jul 2024
              </span>
            </div>

            <h3 className="text-xl font-bold text-(--color-fg)">
              Cloud Computing Graduate
            </h3>

            <p className="text-body text-sm text-(--color-muted) leading-relaxed">
              Comprehensive training in cloud architecture and backend APIs on Google Cloud Platform. Developed backend for BabyGrowth and received Best Capstone Product.
            </p>
          </div>

          <div className="pt-4 border-t border-(--color-border) flex items-center justify-between">
            <span className="text-xs font-mono text-(--color-muted)">Distinction</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-(--color-fg) px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised)">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Best Capstone (Top of 200+ Teams)</span>
            </span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};
