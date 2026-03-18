"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  badge,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4 mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Badge
          variant="outline"
          className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20"
        >
          {badge}
        </Badge>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "text-muted-foreground",
            align === "center" && "max-w-[600px] mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
