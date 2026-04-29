"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

const services = [
  {
    number: "01",
    title: "Software Development",
    description:
      "Full-stack web applications. Clean architecture, type-safe code, blazing performance. From concept to production.",
    tags: ["NEXT.JS", "REACT", "TYPESCRIPT", "NODE.JS", "TAILWIND"],
  },
  {
    number: "02",
    title: "Automation Systems",
    description:
      "End-to-end workflow automation. Eliminating manual processes, connecting tools, scaling operations without scaling headcount.",
    tags: ["N8N", "WHATSAPP API", "MANYCHAT", "REST APIS", "WEBHOOKS"],
    active: true,
  },
  {
    number: "03",
    title: "Agentic Workflows",
    description:
      "AI agent systems that reason, decide, and execute. Multi-step autonomous workflows powered by large language models.",
    tags: ["LANGCHAIN", "OPENAI", "CLAUDE API", "GOOGLE ADK", "TOOL USE"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-void py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <SectionHeading
          number="003"
          label="SERVICES"
          title={
            <>
              Three disciplines.
              <br />
              One <span className="serif-italic">system</span>.
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={staggerItem}
              className={`group border-t border-iron py-10 md:py-14 transition-colors duration-200 ${
                service.active ? "border-l-2 border-l-coral pl-6" : "pl-0 hover:border-l-2 hover:border-l-coral hover:pl-6"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-serif text-6xl md:text-7xl text-[#1a1a1e] select-none">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-3">
                  <h3 className="font-serif text-2xl md:text-3xl text-cream serif-italic">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-4">
                  <p className="text-sm font-mono text-[#aaa] leading-[1.7]">
                    {service.description}
                  </p>
                </div>

                {/* Tags + Arrow */}
                <div className="md:col-span-4 flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#888]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-coral font-mono text-sm shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                    &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom rule + note */}
          <div className="border-t border-iron pt-8">
            <p className="text-center text-sm font-mono text-[#888] italic">
              Each discipline reinforces the others. That&apos;s the advantage.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
