'use client';

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Users, Award } from "lucide-react";
import { Project } from "@/types/project";
import { Button } from "./button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-start sm:items-center justify-center p-2 sm:p-4">
              <motion.div
                className="relative w-full max-w-4xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700/50 my-4 sm:my-8"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
              {/* Glow Effect */}
              <div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700/50 hover:border-gray-600 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
              </button>

              {/* Modal Content */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Project Image Header */}
                <div className="relative h-48 sm:h-56 md:h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 0%, rgba(31, 41, 55, 0.8) 70%, rgb(31, 41, 55) 100%), linear-gradient(to right, ${project.color}20, transparent)`,
                    }}
                  />

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <motion.h2
                      className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {project.title}
                    </motion.h2>
                    <div
                      className="h-0.5 sm:h-1 w-16 sm:w-20 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                  {/* Project Stats/Meta */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center p-2 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2" style={{ color: project.color }} />
                      <p className="text-[10px] sm:text-xs text-gray-400">Timeline</p>
                      <p className="text-xs sm:text-sm font-medium text-white">3 months</p>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2" style={{ color: project.color }} />
                      <p className="text-[10px] sm:text-xs text-gray-400">Team Size</p>
                      <p className="text-xs sm:text-sm font-medium text-white">Solo</p>
                    </div>
                    <div className="text-center p-2 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2" style={{ color: project.color }} />
                      <p className="text-[10px] sm:text-xs text-gray-400">Status</p>
                      <p className="text-xs sm:text-sm font-medium text-white">Done</p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: project.color }}
                    >
                      Overview
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: project.color }}
                    >
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Feature 1: Detailed description of first major feature",
                        "Feature 2: Detailed description of second major feature",
                        "Feature 3: Detailed description of third major feature",
                        "Feature 4: Detailed description of fourth major feature",
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3">
                          <div
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Implementation */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: project.color }}
                    >
                      Technical Implementation
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      This project was built using modern web technologies and best practices.
                      The architecture focuses on scalability, performance, and maintainability.
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: project.color }}
                    >
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border"
                          style={{
                            backgroundColor: `${project.color}15`,
                            borderColor: `${project.color}30`,
                            color: project.color,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: project.color }}
                    >
                      Challenges & Solutions
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Throughout development, several technical challenges were overcome,
                      including optimization for performance, implementing real-time features,
                      and ensuring cross-browser compatibility.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      className="flex-1 gap-2 text-white w-full sm:w-auto"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                      }}
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm sm:text-base">View Source Code</span>
                      </a>
                    </Button>

                    {project.demoUrl && (
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 w-full sm:w-auto"
                        style={{
                          borderColor: `${project.color}50`,
                          color: project.color,
                        }}
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm sm:text-base">View Live Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
