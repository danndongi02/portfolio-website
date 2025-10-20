'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "../ui/project-card";
import { ProjectModal } from "../ui/project-modal";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

/**
 * Projects Section Component
 *
 * Displays a showcase of projects using a card grid layout
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <AnimatedSection id="projects" className="bg-gradient-to-b from-gray-950 to-gray-900 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
              MY WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
              Featured Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto">
              A collection of my recent work showcasing my skills and expertise in full-stack development and automation
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          >
            {projects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 text-base"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Let's work together</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
