'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative group h-full"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
        }}
      />

      <div className="relative bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col shadow-lg group-hover:shadow-2xl">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(31, 41, 55, 0.9) 100%), linear-gradient(135deg, ${project.color}30, transparent)`,
            }}
          />

          {/* Quick Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 border border-gray-700/50 transition-colors"
            >
              <Github className="w-4 h-4 text-gray-300" />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 border border-gray-700/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-300" />
              </a>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h3
            className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors"
            style={{ color: 'white' }}
          >
            {project.title}
          </h3>

          {/* Color Bar */}
          <div
            className="w-full h-1 rounded-full mb-4 opacity-30"
            style={{
              background: `linear-gradient(to right, ${project.color}, transparent)`,
            }}
          />

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${project.color}15`,
                  borderColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-700">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Learn More Button */}
          <button
            onClick={onClick}
            className="flex items-center gap-2 text-sm font-medium group/btn transition-colors mt-auto"
            style={{ color: project.color }}
          >
            <span className="group-hover/btn:underline">Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
