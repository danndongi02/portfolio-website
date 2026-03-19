"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { scrollToSection } from "@/lib/utils";

const phases = [
  {
    number: "01",
    title: "Discovery & Scope",
    description:
      "Understanding your business goals, mapping existing systems, and defining what success looks like. Every project starts with listening.",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description:
      "Choosing the right stack, designing data flows, and planning for scale. I architect systems that grow with your business, not against it.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "Iterative development with weekly demos. Clean, typed, tested code. You see progress in real-time, not after months of silence.",
    active: true,
  },
  {
    number: "04",
    title: "Automate & Integrate",
    description:
      "Connecting the pieces. Automation workflows, API integrations, and AI agents that eliminate manual overhead and scale operations.",
  },
  {
    number: "05",
    title: "Deploy & Evolve",
    description:
      "Launch with CI/CD, monitoring, and documentation. Then: ongoing optimization based on real usage data.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-void py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <SectionHeading
          number="005"
          label="PROCESS"
          title={
            <>
              How every project <span className="serif-italic">runs</span>.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — Timeline */}
          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-cream/10" />

              <div className="space-y-10">
                {phases.map((phase) => (
                  <motion.div
                    key={phase.number}
                    variants={staggerItem}
                    className="relative pl-10"
                  >
                    {/* Node dot */}
                    <div
                      className={`absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          phase.active
                            ? "bg-coral shadow-[0_0_8px_rgba(255,79,51,0.4)]"
                            : "border border-cream/20 bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Phase content */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666]">
                        Phase {phase.number}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl text-cream serif-italic mt-1 mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-sm font-mono text-[#aaa] leading-[1.7] max-w-[480px]">
                        {phase.description}
                      </p>
                      {phase.active && (
                        <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#22c55e]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          Running
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Decorative code */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <pre className="font-mono text-xs leading-[2] text-[#222] select-none">
{`pipeline:
  trigger: "client.request"
  stages:
    - discover
    - architect
    - build
    - automate
    - deploy
  status: "running"
  uptime: "99.9%"
  delivery: "on_time"`}
            </pre>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-iron mt-16 pt-8 text-center">
          <p className="font-serif text-xl text-cream serif-italic mb-3">
            Ready to start?
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors cursor-pointer"
          >
            LET&apos;S TALK &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
