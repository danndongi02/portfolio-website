import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="bg-gradient-to-b from-gray-900 to-gray-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">ABOUT ME</span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl font-medium text-blue-300 max-w-2xl mx-auto">
            🚀 Turning Ideas into Code, and Code into Impact
          </p>
        </motion.div>
        
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:col-span-7"
          >
            <div className="space-y-6 text-gray-200 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="pl-6"
              >
                <p className="text-lg leading-relaxed">
                  Hey, I'm Ian—a full-stack developer and automation engineer passionate about building elegant solutions for complex problems. My journey started with an insatiable curiosity about how things work, evolving into a career where I craft seamless digital experiences.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pl-6"
              >
                <p className="text-lg leading-relaxed">
                  I specialize in modern web technologies, blending creativity with technical expertise to build intuitive frontends and scalable backend systems. Whether it's designing user-friendly interfaces, automating workflows, or engineering powerful applications, I thrive on solving challenges that push the boundaries of innovation.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pl-6"
              >
                <p className="text-lg leading-relaxed">
                  Beyond coding, you'll find me exploring emerging tech, contributing to open-source projects, or sharing insights with the developer community. Always learning, always building—let's shape the future, one project at a time.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a href="#projects" className="inline-flex items-center group">
                <span className="text-blue-400 font-medium mr-2 group-hover:text-blue-300 transition-colors">View my work</span>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform group-hover:text-blue-300" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-70"></div>
              <div className="relative bg-gray-800 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "2+", label: "Years Experience", icon: "💼" },
                    { number: "7+", label: "Projects Completed", icon: "🚀" },
                    { number: "5+", label: "Happy Clients", icon: "😊" },
                    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors duration-300 border border-gray-700/50 hover:border-blue-500/30 group"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{stat.number}</div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <h3 className="text-lg font-medium text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="px-3 py-1 bg-gray-900/80 rounded-full text-sm text-gray-300 border border-gray-700/50 hover:border-blue-500/50 hover:text-blue-300 transition-all cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
