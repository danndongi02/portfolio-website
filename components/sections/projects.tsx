import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { ProjectCard } from "../ui/project-card";
import { Button } from "../ui/button";

// Placeholder projects data
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "AI-Powered Task Manager",
    description: "Smart task management application that uses AI to prioritize and categorize tasks, with natural language processing for task creation.",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Real-time Chat Application",
    description: "Feature-rich chat application with real-time messaging, file sharing, and video calls, built with WebSocket technology.",
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "Redis"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Personal Finance Dashboard",
    description: "Comprehensive financial management dashboard with expense tracking, budget planning, and interactive data visualizations.",
    technologies: ["Vue.js", "D3.js", "Express", "MySQL", "Docker"],
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Fitness Tracking Platform",
    description: "Mobile-first fitness tracking platform with workout planning, progress monitoring, and social features for sharing achievements.",
    technologies: ["React Native", "GraphQL", "Node.js", "PostgreSQL"],
    githubUrl: "#",
  },
  {
    title: "Weather Forecast App",
    description: "Beautiful weather application with detailed forecasts, interactive maps, and severe weather alerts integration.",
    technologies: ["Next.js", "TypeScript", "Leaflet", "OpenWeatherAPI"],
    githubUrl: "#",
    demoUrl: "#",
  },
];

// All unique technologies from projects
const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ProjectsSection() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? projects.filter((project) => project.technologies.includes(selectedTech))
    : projects;

  return (
    <AnimatedSection id="projects" className="bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-[600px] mx-auto"
          >
            A collection of my recent work and personal projects
          </motion.p>
        </div>

        {/* Technology Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            variant={selectedTech === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
              ${
                selectedTech === null
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
              }`}
          >
            All
          </Button>
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
                ${
                  selectedTech === tech
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {tech}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
