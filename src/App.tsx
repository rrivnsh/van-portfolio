import { useState } from "react";
import {
  OverviewSection,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  EducationSection,
  ContactSection,
} from "@/sections";
import { Sidebar, Footer, Loading, InteractiveBackground, BottomNavbar } from "@/components";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    activeSection,
    handleNavigateSection,
    goToNextSection,
    goToPrevSection,
    prevSection,
    nextSection,
    sections,
  } = useSectionNavigation();

  if (isLoading) {
    return <Loading onLoadingComplete={() => setIsLoading(false)} />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "work":
        return <ProjectsSection />;
      case "journey":
        return <ExperienceSection />;
      case "capabilities":
        return <SkillsSection />;
      case "foundations":
        return <EducationSection />;
      case "contact":
        return <ContactSection />;
      case "hero":
      default:
        return <OverviewSection onNavigateSection={handleNavigateSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg) flex flex-col relative selection:bg-(--color-fg) selection:text-(--color-bg)">
      <InteractiveBackground />

      <Sidebar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={`flex-1 flex flex-col justify-between transition-all duration-300 relative z-10 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72 xl:pl-80"
        } pb-24 lg:pb-0`}
      >
        <main className="flex-1 px-4 sm:px-8 md:px-12 lg:px-14 xl:px-18 max-w-6xl w-full mx-auto flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <div className="hidden lg:flex fixed bottom-6 right-8 z-30 items-center gap-2 p-1.5 rounded-2xl border border-(--color-border) bg-(--color-surface)/90 backdrop-blur-md shadow-lg">
        <button
          onClick={goToPrevSection}
          disabled={!prevSection}
          className={`p-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 ${
            prevSection
              ? "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised) cursor-pointer"
              : "opacity-30 cursor-not-allowed text-(--color-muted)"
          }`}
          title={prevSection ? `Prev: ${prevSection.label}` : undefined}
          aria-label="Previous section"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleNavigateSection(sec.id)}
              className={`transition-all rounded-full cursor-pointer ${
                activeSection === sec.id
                  ? "w-6 h-2 bg-(--color-fg)"
                  : "w-2 h-2 bg-(--color-border) hover:bg-(--color-muted)"
              }`}
              title={sec.label}
              aria-label={`Go to ${sec.label}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextSection}
          disabled={!nextSection}
          className={`p-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 ${
            nextSection
              ? "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised) cursor-pointer"
              : "opacity-30 cursor-not-allowed text-(--color-muted)"
          }`}
          title={nextSection ? `Next: ${nextSection.label}` : undefined}
          aria-label="Next section"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <BottomNavbar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}

export default App;
