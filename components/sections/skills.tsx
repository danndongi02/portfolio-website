import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { ArrowRight, Workflow, GitBranch, Sparkles, MessageCircle, Rocket, Zap, Bot } from "lucide-react";

const skills = [
  {
    name: "Next.js + TailwindCSS",
    icon: <Zap className="size-5 text-blue-300" />,
    color: "from-blue-500 to-cyan-400",
    description: "My go-to duo for building fast, responsive, and beautiful web apps. With Next.js handling the brain and TailwindCSS dressing it up in style, I create full-stack magic that performs and impresses.",
    category: "Development"
  },
  {
    name: "N8N",
    icon: <Workflow className="size-5 text-green-300" />,
    color: "from-green-500 to-teal-600",
    description: "My automation playground. From scraping data to triggering complex workflows, I've used N8N to connect dots, streamline chaos, and bring ideas to life—no code, just clever logic.",
    category: "Automation"
  },
  {
    name: "Make.com",
    icon: <Workflow className="size-5 text-purple-300" />,
    color: "from-purple-500 to-indigo-600",
    description: "Visual automation, infinite possibilities. I use Make.com to craft smooth integrations that handle the heavy lifting behind the scenes—so systems talk, users flow, and businesses grow.",
    category: "Automation"
  },
  {
    name: "Git & GitHub",
    icon: <GitBranch className="size-5 text-orange-300" />,
    color: "from-orange-600 to-red-500",
    description: "My version control sidekicks. I keep my codebase clean, collaborative, and rollback-ready. Every commit is a breadcrumb on the trail of progress.",
    category: "Development"
  },
  {
    name: "Firebase",
    icon: <Rocket className="size-5 text-yellow-300" />,
    color: "from-yellow-500 to-orange-600",
    description: "More than hosting—it's my cloud-powered Swiss Army knife. From real-time databases to serverless functions, Firebase helps me launch scalable apps that just work.",
    category: "Development"
  },
  {
    name: "Manychat",
    icon: <MessageCircle className="size-5 text-blue-300" />,
    color: "from-blue-600 to-indigo-500",
    description: "Where conversations meet conversions. I've built smart, engaging chatbots with Manychat that do the talking, guiding, and selling—on autopilot.",
    category: "Automation"
  },
  {
    name: "Jumper by Vonage",
    icon: <Bot className="size-5 text-green-300" />,
    color: "from-green-600 to-emerald-700",
    description: "WhatsApp, meet automation. I've built seamless shopping and support bots with Jumper that turn messages into moments—and transactions.",
    category: "Automation"
  },
];

export function SkillsSection() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Skills are already in the right format with categories

  return (
    <AnimatedSection id="skills" className="bg-gradient-to-b from-gray-950 to-gray-900 py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">MY TOOLKIT</span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-blue-300 max-w-2xl mx-auto">
            🚧 Crafting code. Automating workflows. Deploying dreams. Here's my toolkit:
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={`${skill.category}-${skill.name}`}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group z-10"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="relative bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col shadow-lg group-hover:shadow-xl">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20 text-white`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{skill.name}</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">{skill.category}</span>
                    </div>
                  </div>
                  
                  <div className={`w-full h-1 bg-gradient-to-r ${skill.color} opacity-20 rounded-full mb-4`}></div>
                </div>
                
                <div className="mt-2">
                  <p className="text-gray-400 text-sm">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}


