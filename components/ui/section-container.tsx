import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionContainer({ children, id, className }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full py-24 sm:py-32 flex items-center justify-center",
        className
      )}
    >
      <div className="container px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

export function AnimatedSection({ children, id, className }: SectionContainerProps) {
  return (
    <SectionContainer id={id} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </SectionContainer>
  );
}
