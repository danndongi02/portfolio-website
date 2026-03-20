"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion-variants";

function StatusBadge({ status }: { status?: string }) {
  if (status !== "in-progress") return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0a030]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#f0a030] animate-pulse" />
      In Progress
    </span>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="bg-void py-24 md:py-32 relative">
      {/* Subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#111116_0%,#08080a_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <SectionHeading
          number="004"
          label="WORK"
          title={
            <>
              Selected <span className="serif-italic">work</span>.
            </>
          }
        />

        {/* Featured project */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-iron bg-surface mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-coral">
                  FEATURED
                </span>
                <StatusBadge status={featured.status} />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-cream serif-italic mb-4">
                {featured.title}
              </h3>
              <p className="text-sm font-mono text-[#aaa] leading-[1.7] mb-6">
                {featured.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-8">
                {featured.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#888]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6">
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-[0.15em] text-cream hover:text-coral transition-colors"
                  >
                    GITHUB ↗
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(featured)}
                  className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors cursor-pointer"
                >
                  LEARN MORE &rarr;
                </button>
              </div>
            </div>

            {/* Right — Project screenshot */}
            <div className="bg-[#0a0c10] border-l border-iron relative overflow-hidden min-h-[300px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Project grid — staggered */}
        {rest.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {rest.map((project, i) => (
              <motion.div
                key={project.title}
                variants={staggerItem}
                className={`group border border-iron bg-surface hover:border-coral/30 transition-colors duration-200 ${
                  i % 2 === 1 ? "md:mt-12" : ""
                }`}
              >
                {/* Accent bar */}
                <div className="h-0.5 bg-coral" />

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#666]">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-cream serif-italic mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#aaa] leading-[1.7] mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#888]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono uppercase tracking-[0.15em] text-cream hover:text-coral transition-colors"
                      >
                        GITHUB ↗
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors cursor-pointer"
                    >
                      LEARN MORE &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom */}
        <div className="border-t border-iron mt-16 pt-8 flex items-center justify-between">
          <span className="text-xs font-mono text-[#888]">
            More work available on request.
          </span>
          <a
            href="https://github.com/danndongi02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors"
          >
            GITHUB ↗
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
