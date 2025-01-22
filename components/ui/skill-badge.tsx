import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  proficiency?: number;
  className?: string;
}

export function SkillBadge({ name, icon, proficiency = 85, className }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg bg-secondary/50 p-3 transition-colors hover:bg-secondary",
        className
      )}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="font-medium">{name}</span>
      {proficiency && (
        <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-lg bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
      )}
    </motion.div>
  );
}
