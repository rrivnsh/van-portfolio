// Skills Data
// Categorized skills and expertise areas
interface SkillCategory {
  id: number;
  category: string;
  key: string; // for i18n
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 1,
    category: "Frontend Development",
    key: "data.skills.frontend",
    skills: [
      "React.js",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    category: "Backend Development",
    key: "data.skills.backend",
    skills: [
      "Node.js",
      "Express.js",
      "Laravel",
      "REST API",
      "JWT Authentication",
    ],
  },
  {
    id: 3,
    category: "Database & Cloud",
    key: "data.skills.database_cloud",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Google Cloud Platform",
      "Compute Engine",
      "Cloud Storage",
    ],
  },
  {
    id: 4,
    category: "Tools & Development",
    key: "data.skills.tools",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Linux",
      "Docker",
      "Figma",
    ],
  },
  {
    id: 5,
    category: "IT Support & Administration",
    key: "data.skills.itsupport",
    skills: [
      "Microsoft Excel",
      "Windows/Linux",
      "Software Installation",
      "Hardware Troubleshooting",
      "System Documentation",
    ],
  },
];

