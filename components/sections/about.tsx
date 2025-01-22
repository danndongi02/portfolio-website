import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";

export function AboutSection() {
  return (
    <AnimatedSection id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="text-gray-400 max-w-[600px]">
              Passionate about crafting digital experiences that make a difference
            </p>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              I'm a software engineer with a deep passion for creating elegant solutions to complex problems. 
              My journey in software development began with a curiosity about how things work, 
              which evolved into a professional career building impactful applications.
            </p>
            <p>
              I specialize in full-stack development, with expertise in modern web technologies 
              and a keen eye for user experience. Whether it's crafting responsive frontends 
              or architecting scalable backend solutions, I'm always excited to take on new challenges.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8">
                {[
                  { number: "5+", label: "Years Experience" },
                  { number: "50+", label: "Projects Completed" },
                  { number: "30+", label: "Happy Clients" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
