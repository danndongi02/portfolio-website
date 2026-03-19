"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion-variants";

export function ProjectsSection() {
  const featured = projects[0];
  const rest = projects.slice(1, 5);

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
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-coral mb-4">
                FEATURED
              </span>
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
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-[0.15em] text-cream hover:text-coral transition-colors"
                >
                  GITHUB ↗
                </a>
                {featured.demoUrl && featured.demoUrl !== "#" && (
                  <a
                    href={featured.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors"
                  >
                    VIEW PROJECT &rarr;
                  </a>
                )}
              </div>
            </div>

            {/* Right — Wireframe placeholder */}
            <div className="bg-[#0a0c10] border-l border-iron p-8 md:p-12 flex items-center justify-center min-h-[300px]">
              <div className="w-full max-w-[300px] opacity-15">
                <svg viewBox="0 0 300 200" fill="none" className="w-full">
                  {/* Wireframe UI schematic */}
                  <rect x="0" y="0" width="300" height="200" stroke="#f0ece6" strokeWidth="1" />
                  <rect x="0" y="0" width="60" height="200" stroke="#f0ece6" strokeWidth="0.5" />
                  <rect x="75" y="15" width="100" height="12" stroke="#f0ece6" strokeWidth="0.5" />
                  <rect x="75" y="40" width="210" height="70" stroke="#f0ece6" strokeWidth="0.5" rx="0" />
                  <rect x="75" y="125" width="100" height="60" stroke="#f0ece6" strokeWidth="0.5" />
                  <rect x="185" y="125" width="100" height="60" stroke="#f0ece6" strokeWidth="0.5" />
                  <line x1="10" y1="20" x2="50" y2="20" stroke="#f0ece6" strokeWidth="0.5" />
                  <line x1="10" y1="35" x2="45" y2="35" stroke="#f0ece6" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="50" y2="50" stroke="#f0ece6" strokeWidth="0.5" />
                  <line x1="10" y1="65" x2="40" y2="65" stroke="#f0ece6" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project grid — staggered */}
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
                <span className="text-xs font-mono text-[#666]">
                  {String(i + 2).padStart(2, "0")}
                </span>
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

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors"
                >
                  VIEW &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
    </section>
  );
}
