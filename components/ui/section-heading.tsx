"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number: string;
  label: string;
  title: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  number,
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 space-y-6", className)}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center gap-4"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#666]">
          {number} &mdash; {label}
        </span>
        <div className="h-px flex-1 bg-iron" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-serif text-4xl text-cream sm:text-5xl md:text-[3.5rem] leading-[1.1]"
      >
        {title}
      </motion.h2>
    </div>
  );
}
