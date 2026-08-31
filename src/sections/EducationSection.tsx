import { educationData } from "@/config";
import { useTranslation } from "react-i18next";
import { GraduationCap, Award } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export const EducationSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center py-4 sm:py-8 md:py-12 w-full space-y-6 sm:space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {educationData.map((edu) => (
          <SpotlightCard key={edu.id} className="p-4 sm:p-6 md:p-7 space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-(--color-fg) uppercase tracking-wider">
                  {t(edu.institution)}
                </span>
                <span className="font-mono text-xs text-(--color-muted) shrink-0">
                  {t(edu.period)}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-(--color-fg)">
                {t(edu.degree)}
              </h3>

              <p className="text-body text-sm text-(--color-muted) leading-relaxed">
                Focused on software engineering, web application development, algorithms, and cloud computing.
              </p>
            </div>

            <div className="pt-4 border-t border-(--color-border) flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-(--color-muted)">Status</span>
              <span className="font-mono text-xs font-semibold text-(--color-fg) px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised)">
                Graduate (S.Kom)
              </span>
            </div>
          </SpotlightCard>
        ))}

        <SpotlightCard className="p-4 sm:p-6 md:p-7 space-y-4 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-(--color-fg) uppercase tracking-wider">
                Bangkit Academy (Google, GoTo, Traveloka)
              </span>
              <span className="font-mono text-xs text-(--color-muted) shrink-0">
                Feb 2024 - Jul 2024
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-(--color-fg)">
              Cloud Computing Graduate
            </h3>

            <p className="text-body text-sm text-(--color-muted) leading-relaxed">
              Comprehensive training in cloud architecture and backend APIs on Google Cloud Platform. Developed backend for BabyGrowth and received Best Capstone Product.
            </p>
          </div>

          <div className="pt-4 border-t border-(--color-border) flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-(--color-muted)">Distinction</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-(--color-fg) px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised)">
              <Award className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Best Capstone (Top of 200+ Teams)</span>
            </span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};
