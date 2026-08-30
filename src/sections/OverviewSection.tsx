import { useTranslation } from "react-i18next";
import { ArrowDownRight, Mail, FileDown, MapPin, Award, CheckCircle2, Terminal } from "lucide-react";

import cvEn from "@/assets/cv/CV_M Rivan Sahronie.pdf";
import cvId from "@/assets/cv/CV_Muhamad Rivan Sahronie.pdf";

interface OverviewSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const OverviewSection = ({ onNavigateSection }: OverviewSectionProps) => {
  const { t, i18n } = useTranslation();

  const cvUrl = i18n.language === "en" ? cvEn : cvId;
  const cvFileName =
    i18n.language === "en"
      ? "CV_M_Rivan_Sahronie.pdf"
      : "CV_Muhamad_Rivan_Sahronie.pdf";

  const handleNavigate = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center py-8 sm:py-12 md:py-16 w-full">
      <div className="w-full space-y-8 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-fg) font-medium">
            <span className="w-2 h-2 rounded-full bg-(--color-fg)" aria-hidden="true" />
            <span>{t("hero.available", "Open to work opportunities")}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-muted) font-mono">
            <MapPin className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
            <span>Bandung, Indonesia</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-display font-bold tracking-tight text-(--color-fg)">
            Muhamad Rivan Sahronie
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-(--color-muted) leading-relaxed">
            {t("hero.headline", "Mengubah masalah kompleks menjadi solusi digital yang rapi, efisien, dan terstruktur.")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-mono">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-fg)">
            <Award className="w-3.5 h-3.5 text-(--color-fg)" />
            <span>Best Capstone · Bangkit '24</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-fg)">
            <CheckCircle2 className="w-3.5 h-3.5 text-(--color-fg)" />
            <span>Informatics · Unpas</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-fg)">
            <Terminal className="w-3.5 h-3.5 text-(--color-fg)" />
            <span>Vue · React · Laravel · Node · GCP</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          <button
            onClick={() => handleNavigate("work")}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-(--color-fg) text-(--color-bg) font-semibold text-sm rounded-xl hover:opacity-90 transition-all cursor-pointer min-h-[44px] focus-visible:outline-2"
          >
            <span>{t("hero.cta_work", "Lihat Proyek")}</span>
            <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            onClick={() => handleNavigate("contact")}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-(--color-surface) text-(--color-fg) font-semibold text-sm rounded-xl border border-(--color-border) hover:bg-(--color-surface-raised) transition-all cursor-pointer min-h-[44px] focus-visible:outline-2"
          >
            <Mail className="w-4 h-4 text-(--color-muted)" aria-hidden="true" />
            <span>{t("hero.cta_contact", "Hubungi Saya")}</span>
          </button>

          <a
            href={cvUrl}
            download={cvFileName}
            className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono font-semibold tracking-wider text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[44px]"
          >
            <FileDown className="w-4 h-4 text-(--color-fg)" aria-hidden="true" />
            <span>{t("hero.cta_cv", "Unduh CV")} ({i18n.language.toUpperCase()})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
