import { useLanguage, useTheme } from "@/hooks";
import { useTranslation } from "react-i18next";
import { type TabType } from "@/config";

interface HeaderProps {
  setActiveTab: (tab: TabType) => void;
}

export const Header = ({ setActiveTab }: HeaderProps) => {
  const { i18n } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const { toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 md:p-12 z-50 bg-(--color-bg)/80 backdrop-blur-md">
      <button
        onClick={() => setActiveTab("overview")}
        className="text-caption text-(--color-fg) hover:opacity-70 transition-opacity cursor-pointer font-black"
      >
        RIVAN.ME
      </button>
      <div className="flex items-center gap-6 md:gap-8">
        <button
          onClick={toggleLanguage}
          className="text-[0.6rem] font-bold tracking-[0.2em] text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
        >
          {i18n.language === "en" ? "ID" : "EN"}
        </button>
        <button
          onClick={toggleTheme}
          className="text-[0.6rem] font-bold tracking-[0.2em] text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
        >
          {theme === "light" ? "DARK" : "LIGHT"}
        </button>
      </div>
    </header>
  );
};
