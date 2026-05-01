import { Pagination, SectionLayout } from "@/components";
import { educationData } from "@/config";
import { useTranslation } from "react-i18next";
import { usePagination } from "@/hooks";

export const EducationSection = () => {
  const { t } = useTranslation();

  const { currentPage, totalPages, currentData, handleNext, handlePrev } =
    usePagination(educationData, 3);

  return (
    <>
      <SectionLayout introText={t("editorial.foundations_intro")}>
        {currentData.map((edu) => (
          <article
            key={edu.id}
            className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 lg:gap-8 border-b border-(--color-border)/20 py-8 group"
          >
            {/* institution and degree */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-(--color-fg) group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
                {t(edu.institution)}
              </h3>
              <p className="text-body text-(--color-muted) mt-2 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 delay-75">
                {t(edu.degree)}
              </p>
            </div>

            {/* metadata details */}
            <div className="flex flex-col lg:items-end text-left lg:text-right w-full lg:w-1/3 mt-4 lg:mt-0">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">
                {t(edu.period)}
              </p>
              {edu.gpa && (
               <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-(--color-fg) mt-1">
                 {t(edu.gpa)}
               </p>
              )}
              {edu.description && (
               <p className="text-[0.55rem] tracking-widest uppercase text-(--color-muted) mt-2 max-w-xs">
                 {t(edu.description)}
               </p>
              )}
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
