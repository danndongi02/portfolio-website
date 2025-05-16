'use client';

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCard3DProps {
  project: Project;
  index: number;
  active: number;
  setActive: (index: number) => void;
  progress: number;
  totalProjects: number;
}

export const ProjectCard3D = ({ 
  project, 
  index, 
  active, 
  setActive, 
  progress,
  totalProjects
}: ProjectCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const dampen = 30; // Lower number = more rotation
  const rotateX = useSpring(useTransform(mouseY, [0, dampen], [dampen / 3, -dampen / 3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, dampen], [-dampen / 3, dampen / 3]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const resetMouse = () => {
    mouseX.set(dampen / 2);
    mouseY.set(dampen / 2);
  };

  const isActive = active === index;
  const distance = Math.abs(active - index);
  const siblingFade = Math.max(0, 1 - distance * 0.4);

  // Calculate 3D circular position based on active index
  const position = index - active;
  const totalItems = totalProjects; // Use actual number of projects
  const angleStep = (2 * Math.PI) / totalItems;
  const angle = position * angleStep;
  
  // Calculate 3D position on a circle
  const radius = 300; // Radius of the carousel circle
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius - radius; // Subtract radius to position circle in front
  
  // Scale and opacity based on z position (items further back are smaller)
  const scale = isActive ? 1 : Math.max(0.65, 1 - (Math.abs(z) / (radius * 2)) * 0.4);
  const zIndex = 100 - Math.abs(position * 10);

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        opacity: siblingFade,
        zIndex,
      }}
      initial={{
        x,
        z,
        scale,
        opacity: siblingFade,
        rotateY: -angle * (180 / Math.PI), // Convert radians to degrees
      }}
      animate={{
        x,
        z,
        scale,
        opacity: siblingFade,
        rotateY: -angle * (180 / Math.PI), // Convert radians to degrees
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 25,
        mass: 1.2 // Slightly higher mass for more natural motion
      }}
      onClick={() => setActive(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 40px 0px ${project.color}40`,
          background: "linear-gradient(to bottom, #0f172a, #020617)",
        }}
      >
        {/* Background Glow */}
        <div 
          className="absolute inset-0 opacity-60 z-0" 
          style={{
            background: `radial-gradient(circle at center, ${project.color}30 0%, transparent 70%)`,
            filter: "blur(40px)"
          }}
        />

        {/* Project Image with Overlay */}
        <div className="relative h-[40%] overflow-hidden">
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to bottom, transparent, #0f172a), linear-gradient(to right, ${project.color}40, transparent)`
            }}
          />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.05)" }}
          />
          
          {/* Animated Mesh Overlay */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z' fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 space-y-4 relative z-10">
          <h3 
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm md:text-base line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span 
                key={tech} 
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${project.color}15`,
                  borderColor: `${project.color}30`,
                  color: project.color
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          {/* Links */}
          <div className="flex gap-4 pt-4">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium group"
              style={{ color: project.color }}
            >
              <Github className="w-4 h-4" />
              <span className="group-hover:underline">Code</span>
            </a>
            
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium group"
                style={{ color: project.color }}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="group-hover:underline">Live Demo</span>
              </a>
            )}
          </div>
        </div>
        
        {/* 3D Effect Elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
            transform: "translateZ(20px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
