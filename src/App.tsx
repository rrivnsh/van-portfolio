import { type TabType } from "@/config";
import {
  EducationSection,
  ExperienceSection,
  OverviewSection,
  ProjectsSection,
  SkillsSection,
} from "@/sections";
import { Header, Footer, Loading } from "@/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const sectionTitleKeys: Record<Exclude<TabType, "overview">, string> = {
  projects: "overview.nav_projects",
  experience: "overview.nav_journey",
  skills: "overview.nav_skills",
  education: "overview.nav_foundations",
};

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loading onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg) flex flex-col relative">
      <Header setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col pt-32 pb-40 md:pt-40 md:pb-48 px-6 md:px-12 relative">
        {activeTab === "overview" && (
          <OverviewSection onNavigate={setActiveTab} />
        )}

        {activeTab !== "overview" && (
          <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto pr-0">
            <div className="flex justify-end mb-8 md:mb-12">
              <button
                onClick={() => setActiveTab("overview")}
                className="group flex items-center gap-3 text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
              >
                {t("editorial.return", "BACK")}
                <span className="w-8 h-px bg-(--color-subtle) group-hover:w-12 group-hover:bg-(--color-fg) transition-all duration-300" />
              </button>
            </div>

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

      <Footer />
    </div>
  );
}

export default App;
