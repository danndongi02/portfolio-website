"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGsap3DTilt } from "@/hooks/use-gsap-3d-tilt";
import { useMagnetic } from "@/hooks/use-magnetic";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  const cardRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useGsap3DTilt(cardRef, 20);
  useMagnetic(prevBtnRef, 0.3);
  useMagnetic(nextBtnRef, 0.3);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const progressPercent = ((activeIndex + 1) / projects.length) * 100;

  return (
    <section id="projects" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeading
          badge="My Work"
          title="Featured Projects"
          description="A collection of my recent work showcasing my skills and expertise in full-stack development and automation."
        />

        {/* Featured Project Card */}
        <div className="max-w-[850px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                ref={cardRef}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card
                  className="relative overflow-hidden border-border/50 bg-card shadow-2xl"
                  style={{
                    boxShadow: `0 25px 50px -12px hsl(var(--foreground) / 0.15), 0 0 40px 0px ${project.color}30`,
                  }}
                >
                  {/* Image background with content overlay */}
                  <div className="relative h-[350px] sm:h-[420px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent 10%, hsl(var(--background) / 0.7) 50%, hsl(var(--background)) 100%), linear-gradient(to right, ${project.color}30, transparent)`,
                      }}
                    />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[600px] mb-4">
                        {project.description}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-border/50 text-muted-foreground"
                            style={{
                              backgroundColor: `${project.color}15`,
                              borderColor: `${project.color}30`,
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        {project.githubUrl && project.githubUrl !== "#" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 border-border/50 text-foreground hover:bg-accent"
                            asChild
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <Button
                            size="sm"
                            className="gap-2"
                            style={{
                              backgroundColor: project.color,
                              color: "#fff",
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
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{project.title}</span>
              <span>
                {activeIndex + 1} / {projects.length}
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${project.color}, ${project.color}cc)`,
                }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Left arrow */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                ref={prevBtnRef}
                variant="outline"
                size="icon"
                className="rounded-full border-border/50 text-foreground hover:bg-accent"
                onClick={goToPrev}
                aria-label="Previous project"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View project: ${p.title}`}
                  className="relative p-1 group"
                >
                  <motion.div
                    className="rounded-full transition-colors"
                    animate={{
                      width: i === activeIndex ? 32 : 10,
                      height: 10,
                      backgroundColor:
                        i === activeIndex
                          ? p.color
                          : "hsl(var(--muted-foreground) / 0.3)",
                    }}
                    whileHover={{
                      scale: 1.3,
                      backgroundColor: p.color,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </button>
              ))}
            </div>

            {/* Right arrow */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                ref={nextBtnRef}
                variant="outline"
                size="icon"
                className="rounded-full border-border/50 text-foreground hover:bg-accent"
                onClick={goToNext}
                aria-label="Next project"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
