import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useJakartaTime } from "@/hooks";
import {
  Sun,
  Moon,
  FileDown,
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Clock,
  Compass,
  Briefcase,
  Layers,
  Cpu,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { socialLinks } from "@/config";
import profileImg from "@/assets/images/ppvan.png";

import cvEn from "@/assets/cv/CV_M Rivan Sahronie.pdf";
import cvId from "@/assets/cv/CV_Muhamad Rivan Sahronie.pdf";

interface SidebarProps {
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({
  activeSection = "hero",
  onNavigateSection,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  const { t, i18n } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const jakartaTime = useJakartaTime();

  const cvUrl = i18n.language === "en" ? cvEn : cvId;
  const cvFileName =
    i18n.language === "en"
      ? "CV_M_Rivan_Sahronie.pdf"
      : "CV_Muhamad_Rivan_Sahronie.pdf";

  const navLinks = [
    { id: "hero", label: t("nav.overview", "Overview"), icon: Compass },
    { id: "work", label: t("nav.work", "Projects"), icon: Layers },
    { id: "journey", label: t("nav.journey", "Experience"), icon: Briefcase },
    { id: "capabilities", label: t("nav.skills", "Skills"), icon: Cpu },
    { id: "foundations", label: t("nav.foundations", "Education"), icon: GraduationCap },
    { id: "contact", label: t("nav.contact", "Contact"), icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "id" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/95 backdrop-blur-md border-b border-(--color-border) px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 text-left focus-visible:outline-2 cursor-pointer"
        >
          <img
            src={profileImg}
            alt="M. Rivan Sahronie"
            className="w-8 h-8 rounded-lg object-cover border border-(--color-border)"
          />
          <div>
            <span className="text-sm font-bold tracking-tight text-(--color-fg) block">
              M. Rivan Sahronie
            </span>
            <span className="text-[10px] font-mono text-(--color-muted)">
              Informatics · Unpas
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Toggle language"
          >
            {i18n.language.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <aside
        className={`hidden lg:flex flex-col justify-between fixed top-0 left-0 bottom-0 bg-(--color-surface) border-r border-(--color-border) z-40 transition-all duration-300 ${
          isCollapsed ? "w-20 p-4" : "w-72 xl:w-80 p-6"
        }`}
        aria-label="Sidebar Navigation"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-(--color-fg)">
                Portfolio
              </span>
            )}
            
            <button
              onClick={onToggleCollapse}
              className={`p-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-all cursor-pointer ${
                isCollapsed ? "mx-auto" : "ml-auto"
              }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-(--color-fg)" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-(--color-muted)" />
              )}
            </button>
          </div>

          <div className={`space-y-4 ${isCollapsed ? "text-center" : ""}`}>
            <div className="relative inline-block">
              <div className={`rounded-xl overflow-hidden border border-(--color-border) transition-all ${
                isCollapsed ? "w-11 h-11 mx-auto" : "w-14 h-14"
              }`}>
                <img
                  src={profileImg}
                  alt="Muhamad Rivan Sahronie"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-(--color-fg) border-2 border-(--color-surface)"
                title="Available for opportunities"
              />
            </div>

            {!isCollapsed && (
              <div className="space-y-1">
                <h1 className="text-base font-bold text-(--color-fg) leading-tight">
                  M. Rivan Sahronie
                </h1>
                <p className="text-xs text-(--color-muted) font-medium">
                  Informatics Graduate
                </p>
                <p className="text-[11px] font-mono text-(--color-subtle)">
                  Universitas Pasundan
                </p>
              </div>
            )}

            {!isCollapsed && (
              <div className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-surface-raised) space-y-1 text-xs text-(--color-muted) font-mono">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-(--color-fg)" />
                    <span>Bandung, ID</span>
                  </span>
                  <span className="text-[11px] text-(--color-subtle)">WIB</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-(--color-border)/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-(--color-muted)" />
                    <span>Local Time</span>
                  </span>
                  <strong className="text-(--color-fg) text-[11px]">
                    {jakartaTime || "08:00"}
                  </strong>
                </div>
              </div>
            )}
          </div>

          <nav className="space-y-1" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center p-2.5" : "justify-between px-3.5 py-2.5"
                  } rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                    isActive
                      ? "bg-(--color-fg) text-(--color-bg) font-semibold shadow-xs"
                      : "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised)"
                  }`}
                  title={isCollapsed ? link.label : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-(--color-bg)" : "text-(--color-fg)"}`} />
                    {!isCollapsed && <span>{link.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ArrowUpRight className={`w-3 h-3 transition-opacity ${isActive ? "opacity-90" : "opacity-0 group-hover:opacity-60"}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-(--color-border)">
          <div className={`flex items-center gap-2 ${isCollapsed ? "flex-col" : "justify-between"}`}>
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono font-semibold text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer text-center ${
                isCollapsed ? "w-full" : "flex-1"
              }`}
              aria-label="Switch Language"
            >
              {i18n.language.toUpperCase()}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer flex items-center justify-center ${
                isCollapsed ? "w-full" : "min-w-[36px]"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>

          {!isCollapsed && (
            <div className="flex items-center justify-between px-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-subtle) hover:text-(--color-fg) transition-colors p-1.5 rounded-md hover:bg-(--color-surface-raised)"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}

          <a
            href={cvUrl}
            download={cvFileName}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-fg) text-(--color-bg) text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-xs ${
              isCollapsed ? "w-full p-2.5" : "w-full px-4 py-2.5"
            }`}
            title="Download CV"
          >
            <FileDown className="w-3.5 h-3.5" />
            {!isCollapsed && <span>Unduh CV</span>}
          </a>
        </div>
      </aside>
    </>
  );
};
