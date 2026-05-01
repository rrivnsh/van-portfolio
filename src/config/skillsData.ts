// Skills Data
// Categorized skills and expertise areas
export interface SkillCategory {
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
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
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
    category: "Database & Storage",
    key: "data.skills.database",
    skills: [
      "MySQL",
      "Google Cloud Storage",
      "Data Management",
      "SQL Optimization",
    ],
  },
  {
    id: 4,
    category: "Cloud & Infrastructure",
    key: "data.skills.cloud",
    skills: [
      "Google Cloud Platform",
      "Compute Engine",
      "Virtual Machine",
      "App Deployment",
    ],
  },
  {
    id: 5,
    category: "IT Support & System",
    key: "data.skills.itsupport",
    skills: [
      "Hardware Troubleshooting",
      "OS Installation (Windows/Linux)",
      "Software Maintenance",
      "Network Basics",
    ],
  },
  {
    id: 6,
    category: "Tools & Development",
    key: "data.skills.tools",
    skills: [
      "Git & GitHub",
      "Microsoft 365",
      "System Documentation",
      "Agile Methodology",
    ],
  },
  {
    id: 7,
    category: "Soft Skills",
    key: "data.skills.softskills",
    skills: [
      "Team Collaboration",
      "Time Management",
      "Problem Solving",
      "Project Management",
      "Communication",
    ],
  },
];
