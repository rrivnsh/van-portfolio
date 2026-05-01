import type { TabType } from "@/config";
import { contactData } from "@/config";
import { useJakartaTime, useLanguage, useTheme } from "@/hooks";
import {
  EducationSection,
  ExperienceSection,
  OverviewSection,
  ProjectsSection,
  SkillsSection,
} from "@/sections";
import { Github, Linkedin, PhoneCall } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Section title lookup — single source of truth
const sectionTitleKeys: Record<Exclude<TabType, "overview">, string> = {
  projects: "overview.nav_projects",
  experience: "overview.nav_journey",
  skills: "overview.nav_skills",
  education: "overview.nav_foundations",
};

// Social links derived from contactData
const socialLinks = [
  {
    href: contactData.github,
    label: "GitHub",
    icon: <Github className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    href: contactData.linkedin,
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    href: `https://wa.me/${contactData.phone.replace(/\D/g, "")}`,
    label: "WhatsApp",
    icon: <PhoneCall className="w-4 h-4" strokeWidth={1.5} />,
  },
];

const EditorialPage = () => {
  const { t, i18n } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const time = useJakartaTime();

  return (
    <div className="fixed inset-0 bg-(--color-bg) text-(--color-fg) flex flex-col justify-between p-6 md:p-12 overflow-y-auto">
      {/* Top Bar */}
      <header className="flex items-center justify-between shrink-0 z-40 relative">
        <button
          onClick={() => setActiveTab("overview")}
          className="text-caption text-(--color-fg) hover:opacity-70 transition-opacity cursor-pointer"
        >
          RIVAN.ME
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleLanguage}
            className="text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
          >
            {i18n.language === "en" ? "ID" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
          >
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
        </div>
      </header>

      {/* Middle Content */}
      <main className="flex-1 flex flex-col my-8 md:my-12 relative min-h-0">
        {activeTab === "overview" && (
          <OverviewSection onNavigate={setActiveTab} />
        )}
        {activeTab !== "overview" && (
          <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto h-full overflow-y-auto pr-2 md:pr-4">
            <button
              onClick={() => setActiveTab("overview")}
              className="group flex items-center gap-3 text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors w-fit mb-8 md:mb-12 cursor-pointer"
            >
              <span className="w-8 h-px bg-(--color-subtle) group-hover:w-12 group-hover:bg-(--color-fg) transition-all duration-300" />
              {t("editorial.return", "BACK")}
            </button>
            <h1 className="text-headline text-(--color-fg) mb-12 md:mb-16">
              {t(sectionTitleKeys[activeTab as Exclude<TabType, "overview">])}
            </h1>
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "experience" && <ExperienceSection />}
            {activeTab === "skills" && <SkillsSection />}
            {activeTab === "education" && <EducationSection />}
          </div>
        )}
      </main>

      {/* Bottom Bar */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
        {/* Left: Socials */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-subtle) hover:text-(--color-fg) transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Center: Status */}
        <div className="hidden md:block">
          <p className="text-caption text-(--color-subtle)">
            {t("editorial.available", "TERBUKA UNTUK KERJA")}
          </p>
        </div>

        {/* Right: Location & Time */}
        <div className="text-center md:text-right w-full md:w-auto">
          <p className="text-caption text-(--color-subtle) mb-1">
            Bandung, Indonesia
          </p>
          <p className="text-caption text-(--color-fg)">{time}</p>
        </div>
      </footer>
    </div>
  );
};

export default EditorialPage;
