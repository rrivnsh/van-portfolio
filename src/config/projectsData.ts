// Projects Data
// Portfolio project information displayed in the ProjectsOverlay
import * as ProjectImages from "@/assets/projects/index";

export const projectsData = [
  {
    id: 1,
    title: "Apotek Doctor M+",
    desc: "data.apotek_desc",
    fullDesc: "data.apotek_full_desc",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: ProjectImages.apotekImg,
    link: "https://apotekdoctorm.id",
    repo: "https://github.com/rrivnsh",
    category: "Frontend",
    year: "2024-2025",
    role: "Project Lead",
  },
  {
    id: 2,
    title: "EWastepas",
    desc: "data.ewastepas_desc",
    fullDesc: "data.ewastepas_full_desc",
    tech: ["React", "Tailwind CSS", "Progressive Web App"],
    image: ProjectImages.ewastepasImg,
    link: "https://ewastepas.my.id",
    repo: "https://github.com/orgs/Ewastepas/repositories",
    category: "Frontend",
    year: "2023-2024",
    role: "Frontend Developer",
  },
  {
    id: 3,
    title: "BabyGrowth",
    desc: "data.babygrowth_desc",
    fullDesc: "data.babygrowth_full_desc",
    tech: ["Node.js", "Hapi.js", "Google Cloud Platform"],
    image: ProjectImages.babygrowthImg,
    link: null,
    repo: "https://github.com/Baby-Growth/backend-babygrowth",
    category: "Backend",
    year: "2024",
    role: "Backend Developer",
  },
];
