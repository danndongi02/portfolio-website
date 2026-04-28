'use client';

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Button } from "./button";

interface BookSpreadProps {
  project: Project;
  spreadIndex: number;
}

export const BookSpread = ({ project, spreadIndex }: BookSpreadProps) => {
  // Page turn animation variants with 3D flip effect
  const leftPageVariants = {
    initial: { opacity: 0, rotateY: -30, x: -20 },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    exit: {
      opacity: 0,
      rotateY: 30,
      x: 20,
      transition: { duration: 0.5, ease: [0.4, 0, 1, 1] }
    }
  };

  const rightPageVariants = {
    initial: { opacity: 0, rotateY: 30, x: 20 },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.15
      }
    },
    exit: {
      opacity: 0,
      rotateY: -30,
      x: -20,
      transition: { duration: 0.5, ease: [0.4, 0, 1, 1] }
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-0" style={{ perspective: "2000px" }}>
      {/* Book Spine (Center) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-4 md:w-6 -ml-2 md:-ml-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 z-20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      </div>

      {/* Left Page - Title & Image */}
      <motion.div
        key={`left-${spreadIndex}`}
        variants={leftPageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] md:w-[380px] md:h-[550px] lg:w-[420px] lg:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
          boxShadow: "-10px 10px 30px rgba(0, 0, 0, 0.5), inset 5px 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Page Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Page Content */}
        <div className="relative h-full p-8 md:p-10 flex flex-col">
          {/* Page Number */}
          <div className="absolute top-6 left-8 text-xs text-gray-400 font-serif">
            {spreadIndex * 2 + 1}
          </div>

          {/* Project Title */}
          <div className="mb-6 pt-8">
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: project.color }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <div
              className="h-1 w-20 rounded-full"
              style={{
                background: `linear-gradient(to right, ${project.color}, transparent)`,
              }}
            />
          </div>

          {/* Project Image */}
          <motion.div
            className="relative flex-1 rounded-lg overflow-hidden shadow-lg mb-6"
            style={{ border: `2px solid ${project.color}30` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Image Overlay Gradient */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, transparent)`,
              }}
            />
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${project.color}10`,
                  borderColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600 border border-gray-300">
                +{project.technologies.length - 4}
              </span>
            )}
          </motion.div>
        </div>

        {/* Page Edge Shadow (Right side) */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      </motion.div>

      {/* Right Page - Description & Links */}
      <motion.div
        key={`right-${spreadIndex}`}
        variants={rightPageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] md:w-[380px] md:h-[550px] lg:w-[420px] lg:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5), inset -5px 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Page Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Page Content */}
        <div className="relative h-full p-8 md:p-10 flex flex-col">
          {/* Page Number */}
          <div className="absolute top-6 right-8 text-xs text-gray-400 font-serif">
            {spreadIndex * 2 + 2}
          </div>

          {/* Description Section */}
          <div className="flex-1 pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: project.color }}
              >
                About This Project
              </h4>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Technologies Section */}
              <h4
                className="text-lg font-semibold mb-3 mt-6"
                style={{ color: project.color }}
              >
                Technologies Used
              </h4>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {project.technologies.map((tech, idx) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Section */}
          <motion.div
            className="pt-6 border-t border-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-3">
              <Button
                size="sm"
                className="flex-1 gap-2 text-white"
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
                  View Code
                </a>
              </Button>

              {project.demoUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
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
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Page Edge Shadow (Left side) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};
