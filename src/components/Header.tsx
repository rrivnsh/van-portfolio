import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon, FileDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import cvEn from "@/assets/cv/CV_M Rivan Sahronie.pdf";
import cvId from "@/assets/cv/CV_Muhamad Rivan Sahronie.pdf";

interface HeaderProps {
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header = ({ activeSection = "hero", onNavigateSection }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cvUrl = i18n.language === "en" ? cvEn : cvId;
  const cvFileName =
    i18n.language === "en"
      ? "CV_M_Rivan_Sahronie.pdf"
      : "CV_Muhamad_Rivan_Sahronie.pdf";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "id" : "en";
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { id: "hero", label: t("nav.overview", "Overview") },
    { id: "work", label: t("nav.work", "Work") },
    { id: "journey", label: t("nav.journey", "Journey") },
    { id: "capabilities", label: t("nav.skills", "Capabilities") },
    { id: "foundations", label: t("nav.foundations", "Education") },
    { id: "contact", label: t("nav.contact", "Contact") },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-(--color-bg)/95 backdrop-blur-md border-b border-(--color-border) py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-2"
          aria-label="Rivan portfolio homepage"
        >
          <span className="w-8 h-8 rounded-lg bg-(--color-fg) text-(--color-bg) font-mono text-xs font-bold flex items-center justify-center transition-transform group-hover:scale-105">
            RS
          </span>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold tracking-tight text-(--color-fg)">
              M. RIVAN SAHRONIE
            </span>
            <span className="text-[11px] font-mono text-(--color-subtle) uppercase tracking-wider hidden sm:block">
              Software Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation links */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full border border-(--color-border) bg-(--color-surface)/80 backdrop-blur-xs shadow-xs"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative ${
                  isActive
                    ? "text-(--color-accent-contrast) bg-(--color-accent) font-semibold"
                    : "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised)"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action controls (Theme, Lang, CV) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg border border-(--color-border) bg-(--color-surface) text-xs font-mono font-semibold text-(--color-muted) hover:text-(--color-fg) hover:border-(--color-fg)/30 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
            aria-label={`Switch to ${i18n.language === "en" ? "Indonesian" : "English"}`}
            title={`Switch to ${i18n.language === "en" ? "Indonesian" : "English"}`}
          >
            {i18n.language === "en" ? "ID" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:text-(--color-fg) hover:border-(--color-fg)/30 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:outline-2"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Sun className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Download CV quick link (Desktop) */}
          <a
            href={cvUrl}
            download={cvFileName}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-(--color-border) bg-(--color-surface) text-xs font-semibold text-(--color-fg) hover:border-(--color-accent) hover:text-(--color-accent) transition-all cursor-pointer min-h-[36px]"
          >
            <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>CV</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-fg) hover:bg-(--color-surface-raised) transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-(--color-surface) border-b border-(--color-border) px-6 py-5 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? "bg-(--color-accent-soft) text-(--color-accent) font-semibold"
                        : "text-(--color-fg) hover:bg-(--color-surface-raised)"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-(--color-border) flex items-center justify-between">
                <a
                  href={cvUrl}
                  download={cvFileName}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-(--color-accent) text-(--color-accent-contrast) text-xs font-semibold w-full justify-center min-h-[44px]"
                >
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  <span>{t("hero.cta_cv", "Download CV")} ({i18n.language.toUpperCase()})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
