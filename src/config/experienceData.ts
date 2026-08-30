export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  desc: string;
  tech: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "data.exp_dremaxtion_role",
    company: "data.exp_dremaxtion_company",
    period: "data.exp_dremaxtion_period",
    desc: "data.exp_dremaxtion_desc",
    tech: ["Vue.js", "TypeScript", "Tailwind CSS", "Laravel", "Inertia.js", "Component Architecture"],
  },
  {
    id: 2,
    role: "data.exp_gdc_role",
    company: "data.exp_gdc_company",
    period: "data.exp_gdc_period",
    desc: "data.exp_gdc_desc",
    tech: ["Google Cloud Platform", "Virtual Machines", "Curriculum Design", "Mentoring"],
  },
  {
    id: 3,
    role: "data.exp_bangkit_role",
    company: "data.exp_bangkit_company",
    period: "data.exp_bangkit_period",
    desc: "data.exp_bangkit_desc",
    tech: ["Node.js", "REST API", "JWT Auth", "Google Compute Engine", "Cloud Storage"],
  },
  {
    id: 4,
    role: "data.exp_smk_role",
    company: "data.exp_smk_company",
    period: "data.exp_smk_period",
    desc: "data.exp_smk_desc",
    tech: ["Hardware Troubleshooting", "Network Configuration", "Data Admin", "MS Excel"],
  },
];
