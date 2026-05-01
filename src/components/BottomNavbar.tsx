import { navItems } from "@/config";
import type { TabType } from "@/config";
import {
  BookOpen,
  Briefcase,
  Lightbulb,
  Plane,
} from "lucide-react";

interface BottomNavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  projects: <Briefcase className="w-5 h-5" strokeWidth={1.5} />,
  experience: <Plane className="w-5 h-5" strokeWidth={1.5} />,
  skills: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
  education: <BookOpen className="w-5 h-5" strokeWidth={1.5} />,
};

export const BottomNavbar = ({ activeTab, onTabChange }: BottomNavbarProps) => {

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
      <div className="flex items-center gap-2 p-2 rounded-full bg-(--color-bg)/80 backdrop-blur-md border border-(--color-border)/30 shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-(--color-fg) text-(--color-bg)"
                  : "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-fg)/5"
              }`}
              aria-label={item.label}
            >
              <span className={isActive ? "scale-110 transition-transform" : "transition-transform"}>
                {iconMap[item.key]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
