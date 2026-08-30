import { useState, useEffect } from "react";
import { experienceData } from "@/config";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SpotlightCard } from "@/components/SpotlightCard";

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedExp = experienceData[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : experienceData.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < experienceData.length - 1 ? prev + 1 : 0));
  };

  // Keyboard left/right arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-[82vh] flex flex-col justify-center py-6 sm:py-8 md:py-10 w-full space-y-6">
      {/* Clean Header with Stepper Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
            <Briefcase className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
            <span>{t("journey.label", "EXPERIENCE")}</span>
          </div>
          <h2 className="text-headline font-bold text-(--color-fg)">
            {t("journey.heading", "Work Experience")}
          </h2>
        </div>

        {/* Minimalist Slider Stepper Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-(--color-muted)">
            <strong className="text-(--color-fg)">{String(selectedIndex + 1).padStart(2, "0")}</strong>
            <span className="opacity-40"> / {String(experienceData.length).padStart(2, "0")}</span>
          </span>

          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-(--color-border) bg-(--color-surface)">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg hover:bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
              aria-label="Previous milestone (←)"
              title="Previous milestone (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg hover:bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
              aria-label="Next milestone (→)"
              title="Next milestone (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Premium Executive Career Milestone Card */}
      <SpotlightCard className="p-8 sm:p-10 md:p-12 rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExp.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            {/* Left Column: Role, Company, Period */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-(--color-muted)">
                  <span className="text-(--color-fg) font-semibold">
                    Milestone {String(selectedIndex + 1).padStart(2, "0")} / {String(experienceData.length).padStart(2, "0")}
                  </span>
                  <span className="opacity-40">·</span>
                  <span>{t(selectedExp.period)}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-(--color-fg) leading-tight">
                  {t(selectedExp.role)}
                </h3>

                <div className="flex items-center gap-2.5 text-base font-mono text-(--color-muted) pt-1">
                  <Building2 className="w-4 h-4 text-(--color-fg)" />
                  <span className="font-semibold text-(--color-fg)">{t(selectedExp.company)}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono text-(--color-muted)">
                <Calendar className="w-3.5 h-3.5 text-(--color-fg)" />
                <span>{t(selectedExp.period)}</span>
              </div>
            </div>

            {/* Right Column: Key Deliverables & Tech Tags */}
            <div className="lg:col-span-7 space-y-6 border-t lg:border-t-0 lg:border-l border-(--color-border) pt-6 lg:pt-0 lg:pl-10">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) block">
                  Responsibilities & Key Impact
                </span>
                <p className="text-body text-base leading-relaxed text-(--color-muted)">
                  {t(selectedExp.desc)}
                </p>
              </div>

              {/* Technologies */}
              {selectedExp.tech && selectedExp.tech.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-(--color-muted) block">
                    Core Technologies & Competencies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.tech.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-fg)"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-(--color-muted)" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </SpotlightCard>

      {/* Slider Progress Bar / Dots */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {experienceData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              selectedIndex === idx
                ? "w-8 h-2 bg-(--color-fg)"
                : "w-2 h-2 bg-(--color-border) hover:bg-(--color-muted)"
            }`}
            aria-label={`Go to milestone ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
