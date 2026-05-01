import type { TabType } from "@/config";
import { contactData, navItems } from "@/config";
import { useTranslation } from "react-i18next";

const OverviewSection = ({
  onNavigate,
}: {
  onNavigate: (tab: TabType) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-16 md:gap-12 w-full h-full">
      {/* Left Side: Hero Bio */}
      <div className="flex-1 flex flex-col justify-center max-w-xl">
        <h1 className="text-display text-(--color-fg) mb-2">RIVAN</h1>
        <p className="text-caption text-(--color-subtle) mb-8 md:mb-10 w-fit border-b border-(--color-border)/30 pb-2">
          Muhamad Rivan Sahronie
        </p>
        <p className="text-body text-(--color-muted) mb-12 max-w-md">
          {t(
            "editorial.statement",
            "Saya membangun web dengan rasa ingin tahu dan kepedulian.",
          )}
        </p>
        <a
          href={`https://wa.me/${contactData.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-caption text-(--color-fg) hover:text-(--color-muted) transition-colors w-fit"
        >
          <span className="w-8 h-px bg-(--color-fg) group-hover:w-12 transition-all duration-300" />
          {t("editorial.contact", "HUBUNGI SAYA")}
        </a>
      </div>

      {/* Right Side: Navigation Menu */}
      <div className="flex flex-col items-start md:items-end gap-6 md:gap-8 justify-center">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className="group relative text-label md:text-title text-(--color-subtle) hover:text-(--color-fg) transition-colors text-left md:text-right cursor-pointer py-2 overflow-hidden"
          >
            <span className="relative z-10">
              {t(item.translationKey, item.label)}
            </span>
            {/* Subtle strike-through line on hover for editorial feel */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-(--color-fg)/20 group-hover:w-full transition-all duration-500 ease-out z-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export { OverviewSection };
