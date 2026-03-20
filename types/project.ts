export interface ProjectTask {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  screenshots?: string[];
  color: string;
  status?: "completed" | "in-progress";
  category?: string;
  tasks?: ProjectTask[];
}
