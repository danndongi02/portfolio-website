'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { BookSpread } from "./book-spread";

interface ProjectsBookProps {
  projects: Project[];
}

export const ProjectsBook = ({ projects }: ProjectsBookProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Set client-side state after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Automatically open the book after initial animation
  useEffect(() => {
    if (isClient && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAnimated(true);
      }, 1200); // Open book 1.2 seconds after section appears

      return () => clearTimeout(timer);
    }
  }, [isClient, hasAnimated]);

  // Calculate total spreads (each project takes 1 spread, but may overflow to next)
  // For simplicity, we'll allocate 1 spread per project
  const totalSpreads = projects.length;

  const handlePrevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(currentSpread - 1);
    }
  };

  const handleNextSpread = () => {
    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread(currentSpread + 1);
    }
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center">
        <div className="w-[560px] h-[400px] sm:w-[640px] sm:h-[460px] md:w-[760px] md:h-[550px] lg:w-[840px] lg:h-[600px] bg-gray-900 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[700px] md:min-h-[800px] flex items-center justify-center px-4" style={{ perspective: "2000px" }}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Closed Book State */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="closed-book"
              className="relative cursor-pointer group"
              onClick={() => setIsOpen(true)}
              initial={{ rotateX: 0 }}
              exit={{
                rotateX: -15,
                opacity: 0,
                transition: { duration: 0.6 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Book Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Book Cover */}
              <div
                className="relative w-[240px] h-[340px] sm:w-[280px] sm:h-[400px] md:w-[320px] md:h-[460px] lg:w-[350px] lg:h-[500px] rounded-r-xl overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset -5px 0 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Book Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Decorative Lines on Spine */}
                <div className="absolute left-2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-full" />

                {/* Book Cover Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Book className="w-16 h-16 md:w-20 md:h-20 text-blue-400 mb-6" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 mb-3">
                    My Projects
                  </h3>

                  <p className="text-sm md:text-base text-gray-400 text-center mb-8">
                    A Collection of Work
                  </p>

                  <motion.div
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-sm text-blue-300">Click to Open</p>
                  </motion.div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-blue-500/20 rounded-tr-lg" />
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-blue-500/20 rounded-br-lg" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open Book State */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="open-book"
              className="relative"
              initial={{ opacity: 0, scale: 0.95, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Book Pages Container */}
              <div className="relative">
                {/* Book Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-3xl" />

                {/* Book Spread */}
                <div className="relative">
                  <BookSpread
                    project={projects[currentSpread]}
                    spreadIndex={currentSpread}
                  />
                </div>

                {/* Page Navigation */}
                <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-6 z-30">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevSpread}
                    disabled={currentSpread === 0}
                    className="rounded-full border-gray-700 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Page Indicator */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700">
                    <span className="text-sm text-gray-400">
                      Project {currentSpread + 1} of {totalSpreads}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextSpread}
                    disabled={currentSpread === totalSpreads - 1}
                    className="rounded-full border-gray-700 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
