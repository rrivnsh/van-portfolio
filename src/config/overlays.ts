// Tab Navigation Configuration
// Centralized definition of all tab types and their navigation items

// Valid tab keys for the editorial page
export type TabType =
  | "overview"
  | "projects"
  | "experience"
  | "education"
  | "skills";

// Navigation items displayed in the bottom navbar
export const navItems = [
  { label: "Projects", translationKey: "overview.nav_projects", key: "projects" as const },
  { label: "Journey", translationKey: "overview.nav_journey", key: "experience" as const },
  { label: "Foundations", translationKey: "overview.nav_foundations", key: "education" as const },
  { label: "Skills", translationKey: "overview.nav_skills", key: "skills" as const },
] as const;
