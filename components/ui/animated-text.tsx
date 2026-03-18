"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  charClassName?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  charClassName,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className={cn("inline-block", charClassName)}
          style={{ perspective: 500 }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
