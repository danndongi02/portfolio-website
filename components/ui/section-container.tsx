"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionContainer({
  children,
  id,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full py-24 sm:py-32 flex items-center justify-center",
        className
      )}
    >
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}

export function AnimatedSection({
  children,
  id,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full py-24 sm:py-32 flex items-center justify-center",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container px-4 md:px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
