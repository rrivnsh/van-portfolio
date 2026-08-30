// Skills Data
// Categorized capabilities and expertise areas for the versatile generalist profile

export interface SkillCategory {
  id: number;
  category: string;
  key: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 1,
    category: "Frontend Engineering",
    key: "skills.build",
    skills: [
      "React.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Inertia.js",
      "HTML5 / CSS3",
      "Responsive UI",
    ],
  },
  {
    id: 2,
    category: "Backend & APIs",
    key: "skills.data_apis",
    skills: [
      "Node.js",
      "Express.js",
      "Laravel",
      "RESTful API",
      "JWT Authentication",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: 3,
    category: "Cloud & Infrastructure",
    key: "skills.cloud_devops",
    skills: [
      "Google Cloud Platform",
      "Google Compute Engine",
      "Cloud Storage",
      "Linux / Shell",
      "Docker",
      "Git / GitHub / GitLab",
    ],
  },
  {
    id: 4,
    category: "IT Operations & Support",
    key: "skills.tools_support",
    skills: [
      "Hardware Troubleshooting",
      "Network Configuration",
      "Software Installation",
      "Microsoft Excel",
      "Technical Documentation",
      "Figma",
    ],
  },
];
