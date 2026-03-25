"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mechanical = [0.25, 0.1, 0.25, 1] as const;

function HeroGeometric({
  onViewWorkClick,
  onContactClick,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  subDescription?: string;
  showButtons?: boolean;
  onViewWorkClick?: () => void;
  onContactClick?: () => void;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-void">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Content */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: mechanical }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#666] font-mono">
                001 &mdash; Introduction
              </span>
              <div className="h-px flex-1 bg-iron max-w-[200px]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: mechanical }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-cream leading-[1.05] mb-6"
            >
              Software that
              <br />
              <span className="serif-italic">thinks</span> for itself.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: mechanical }}
              className="text-sm md:text-[15px] text-[#aaa] font-mono leading-[1.8] max-w-[520px] mb-8"
            >
              Full-stack developer &amp; automation architect. I build intelligent
              systems, agentic workflows, and software that eliminates human
              bottlenecks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: mechanical }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button onClick={onViewWorkClick}>
                View Work &rarr;
              </Button>
              <Button variant="outline" onClick={onContactClick}>
                Get In Touch
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: mechanical }}
              className="flex items-center gap-6 text-xs font-mono text-[#888] uppercase tracking-[0.15em]"
            >
              <span>50+ Automations</span>
              <span className="text-iron">|</span>
              <span>7+ Projects</span>
              <span className="text-iron">|</span>
              <span>100% Retention</span>
            </motion.div>
          </div>

          {/* Right — Portrait (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:flex lg:col-span-5 justify-end"
          >
            <div className="relative group w-full max-w-[480px]">
              {/* Offset border frame — editorial brutalist aesthetic */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: mechanical }}
                className="absolute -top-3 -right-3 w-full h-full border border-[#1a1a1e]"
              />

              {/* Coral accent corner */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 1.8, ease: mechanical }}
                className="absolute -left-4 top-0 w-[2px] h-20 bg-coral origin-top"
              />

              {/* Image container — hover on parent group triggers grayscale removal */}
              <div className="relative w-full aspect-[3/4] overflow-hidden border border-iron">
                <Image
                  src="/me.png"
                  alt="Ian — Software Developer & Automation Architect"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  priority
                  sizes="(min-width: 1024px) 480px, 0px"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Label beneath the image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2, ease: mechanical }}
                className="mt-3 flex items-center justify-between"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">
                  Ian Muigai
                </span>
                <span className="text-[10px] font-mono text-[#333]">
                  // developer &amp; automation architect
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Portrait (mobile/tablet) — shown below content on smaller screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: mechanical }}
            className="lg:hidden flex justify-center mt-4"
          >
            <div className="relative group w-full max-w-[320px] sm:max-w-[380px]">
              {/* Coral accent corner */}
              <div className="absolute -left-3 top-0 w-[2px] h-12 bg-coral" />

              <div className="relative w-full aspect-[3/4] overflow-hidden border border-iron">
                <Image
                  src="/me.png"
                  alt="Ian — Software Developer & Automation Architect"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 320px, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">
                  Ian Muigai
                </span>
                <span className="text-[10px] font-mono text-[#333]">
                  // developer &amp; automation architect
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent"
        />
      </motion.div>
    </div>
  );
}

export { HeroGeometric };
