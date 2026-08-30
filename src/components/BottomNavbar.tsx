import { Briefcase, Compass, Cpu, Layers, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BottomNavbarProps {
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const BottomNavbar = ({
  activeSection = "hero",
  onNavigateSection,
}: BottomNavbarProps) => {
  const { t } = useTranslation();

  const navItems = [
    { id: "hero", label: t("nav.overview", "Home"), icon: Compass },
    { id: "work", label: t("nav.work", "Projects"), icon: Layers },
    { id: "journey", label: t("nav.journey", "Experience"), icon: Briefcase },
    { id: "capabilities", label: t("nav.skills", "Skills"), icon: Cpu },
    { id: "contact", label: t("nav.contact", "Contact"), icon: Mail },
  ];

  const handleItemClick = (id: string) => {
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
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-(--color-surface)/95 backdrop-blur-lg border-t border-(--color-border) px-3 py-2 flex items-center justify-around shadow-lg"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer min-h-11 ${
              isActive
                ? "text-(--color-fg) font-semibold"
                : "text-(--color-muted) hover:text-(--color-fg)"
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 ${isActive ? "text-(--color-fg)" : "text-(--color-muted)"}`}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-(--color-fg)" />
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
