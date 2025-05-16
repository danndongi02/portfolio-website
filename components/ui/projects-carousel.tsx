'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard3D } from "./project-card-3d";
import { Project } from "@/types/project";

interface ProjectsCarouselProps {
  projects: Project[];
}

export const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressRef = useRef(null);
  const controls = useAnimation();
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, projects.length]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Handle navigation with transition lock to prevent rapid clicking
  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
    setAutoplay(false);
    
    // Reset transition lock after animation completes
    setTimeout(() => setIsTransitioning(false), 400);
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActive((prev) => (prev + 1) % projects.length);
    setAutoplay(false);
    
    // Reset transition lock after animation completes
    setTimeout(() => setIsTransitioning(false), 400);
  };
  
  return (
    <div 
      className="relative w-full h-[600px] md:h-[650px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Progress Indicator - Now shown as dots at the bottom */}
      
      {/* Project Cards Container */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1200 }}>
        <div 
          className="relative w-[350px] md:w-[450px] h-[500px] md:h-[550px]" 
          style={{ 
            transformStyle: "preserve-3d",
            transform: "translateZ(0)", // Force GPU acceleration for smoother animations
          }}>
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.title}
              project={project}
              index={index}
              active={active}
              setActive={setActive}
              progress={((active + 1) / projects.length) * 100}
              totalProjects={projects.length}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 z-20">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handlePrev}
          className="rounded-full border-gray-700 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 hover:border-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          {projects.map((_, index: number) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${active === index ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-500'}`}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setActive(index);
                setAutoplay(false);
                setTimeout(() => setIsTransitioning(false), 400);
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleNext}
          className="rounded-full border-gray-700 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 hover:border-gray-600"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
