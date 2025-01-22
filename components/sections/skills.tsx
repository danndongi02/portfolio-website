import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";

const skills = {
  Frontend: [
    { name: "React", proficiency: 90 },
    { name: "TypeScript", proficiency: 85 },
    { name: "Next.js", proficiency: 85 },
    { name: "Tailwind CSS", proficiency: 90 },
    { name: "HTML/CSS", proficiency: 95 },
  ],
  Backend: [
    { name: "Node.js", proficiency: 85 },
    { name: "Python", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 75 },
    { name: "MongoDB", proficiency: 80 },
  ],
  DevOps: [
    { name: "Docker", proficiency: 75 },
    { name: "AWS", proficiency: 70 },
    { name: "CI/CD", proficiency: 75 },
    { name: "Git", proficiency: 90 },
  ],
  Other: [
    { name: "Agile", proficiency: 85 },
    { name: "Problem Solving", proficiency: 90 },
    { name: "Team Leadership", proficiency: 85 },
  ],
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof skills>("Frontend");

  return (
    <AnimatedSection id="skills" className="bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-[600px] mx-auto"
          >
            A comprehensive overview of my technical skills and proficiency levels.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as keyof typeof skills)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills[selectedCategory].map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-gray-800/80 border border-gray-700 p-6 rounded-lg hover:bg-gray-800/95 hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-blue-400 font-medium">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
