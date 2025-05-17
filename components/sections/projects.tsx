'use client';

import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectsCarousel } from "../ui/projects-carousel";
import { projects } from "@/data/projects";

/**
 * Projects Section Component
 * 
 * Displays a showcase of projects using a 3D circular carousel
 */
export function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="space-y-12 relative">
        
        {/* Section Header */}
        <div className="text-center space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-2"
          >
            My Work
          </motion.div>
          
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
            A collection of my recent work showcasing my skills and expertise in full-stack development and automation
          </motion.p>
        </div>

        {/* Projects Carousel */}
        <ProjectsCarousel projects={projects} />
        
        {/* Call to Action */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 text-base"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Let's work together</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
