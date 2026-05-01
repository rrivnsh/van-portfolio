import { Pagination, SectionLayout } from "@/components";
import { experienceData } from "@/config";
import { useTranslation } from "react-i18next";
import { usePagination } from "@/hooks";

export const ExperienceSection = () => {
  const { t } = useTranslation();

  const { currentPage, totalPages, currentData, handleNext, handlePrev } =
    usePagination(experienceData, 3);

  return (
    <>
      <SectionLayout introText={t("editorial.journey_intro")}>
        {currentData.map((exp) => (
          <article
            key={exp.id}
            className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8 border-b border-(--color-border)/20 py-8 group"
          >
            {/* role and company */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-(--color-fg) group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
                {t(exp.role)}
              </h3>
              <p className="text-label text-(--color-muted) mt-3 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 delay-75">
                {t(exp.company)}
              </p>
              <p className="text-body text-(--color-muted) mt-6 max-w-2xl leading-relaxed lg:hidden">
                {t(exp.desc)}
              </p>
            </div>

            {/* metadata details */}
            <div className="flex flex-col lg:items-end text-left lg:text-right w-full lg:w-1/3 mt-4 lg:mt-0">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">
                {exp.period}
              </p>
              <p className="hidden lg:block text-body text-(--color-muted) mt-4 max-w-sm text-right leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {t(exp.desc)}
              </p>
            </div>
          </article>
        ))}
      </SectionLayout>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};
