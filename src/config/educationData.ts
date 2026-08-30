// Education Data
export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "data.edu_unpas_name",
    degree: "data.edu_unpas_degree",
    period: "data.edu_unpas_period",
  },
];
