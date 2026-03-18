"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import {
  Workflow,
  GitBranch,
  MessageCircle,
  Rocket,
  Zap,
  Bot,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const skills = [
  {
    name: "Next.js + TailwindCSS",
    icon: <Zap className="size-5 text-blue-300" />,
    color: "from-blue-500 to-cyan-400",
    description:
      "My go-to duo for building fast, responsive, and beautiful web apps. With Next.js handling the brain and TailwindCSS dressing it up in style, I create full-stack magic that performs and impresses.",
    category: "Development",
    proficiency: 90,
  },
  {
    name: "N8N",
    icon: <Workflow className="size-5 text-green-300" />,
    color: "from-green-500 to-teal-600",
    description:
      "My automation playground. From scraping data to triggering complex workflows, I've used N8N to connect dots, streamline chaos, and bring ideas to life—no code, just clever logic.",
    category: "Automation",
    proficiency: 85,
  },
  {
    name: "Make.com",
    icon: <Workflow className="size-5 text-purple-300" />,
    color: "from-purple-500 to-indigo-600",
    description:
      "Visual automation, infinite possibilities. I use Make.com to craft smooth integrations that handle the heavy lifting behind the scenes—so systems talk, users flow, and businesses grow.",
    category: "Automation",
    proficiency: 80,
  },
  {
    name: "Git & GitHub",
    icon: <GitBranch className="size-5 text-orange-300" />,
    color: "from-orange-600 to-red-500",
    description:
      "My version control sidekicks. I keep my codebase clean, collaborative, and rollback-ready. Every commit is a breadcrumb on the trail of progress.",
    category: "Development",
    proficiency: 88,
  },
  {
    name: "Firebase",
    icon: <Rocket className="size-5 text-yellow-300" />,
    color: "from-yellow-500 to-orange-600",
    description:
      "More than hosting—it's my cloud-powered Swiss Army knife. From real-time databases to serverless functions, Firebase helps me launch scalable apps that just work.",
    category: "Development",
    proficiency: 82,
  },
  {
    name: "Manychat",
    icon: <MessageCircle className="size-5 text-blue-300" />,
    color: "from-blue-600 to-indigo-500",
    description:
      "Where conversations meet conversions. I've built smart, engaging chatbots with Manychat that do the talking, guiding, and selling—on autopilot.",
    category: "Automation",
    proficiency: 78,
  },
  {
    name: "Jumper by Vonage",
    icon: <Bot className="size-5 text-green-300" />,
    color: "from-green-600 to-emerald-700",
    description:
      "WhatsApp, meet automation. I've built seamless shopping and support bots with Jumper that turn messages into moments—and transactions.",
    category: "Automation",
    proficiency: 75,
  },
];

const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  // GSAP: progress bar scaleX fill animation on scroll
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((bar) => {
        gsap.from(bar, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [filteredSkills] }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-muted/30 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section header with whileInView via SectionHeading */}
        <SectionHeading
          badge="MY TOOLKIT"
          title="Skills & Expertise"
          description="Crafting code. Automating workflows. Deploying dreams. Here's my toolkit:"
          align="center"
        />

        {/* Category filter tabs */}
        <div className="flex justify-center mb-12">
          <Tabs
            defaultValue="All"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-fit"
          >
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Responsive grid with AnimatePresence filtering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  <Card className="relative h-full border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 shadow-sm group-hover:shadow-lg">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20 text-primary-foreground`}
                          >
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {skill.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Animated progress bar (GSAP scaleX on scroll) */}
                        <div className="skill-progress mt-3">
                          <Progress
                            value={skill.proficiency}
                            className="h-1 bg-muted"
                          />
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mt-2">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
