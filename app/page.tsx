"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Home as HomeIcon, User, Wrench, FolderGit2, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { scrollToSection } from "@/lib/utils";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  const navItems = [
    { name: "Home", url: "#", icon: HomeIcon },
    { name: "About", url: "#about", icon: User },
    { name: "Skills", url: "#skills", icon: Wrench },
    { name: "Projects", url: "#projects", icon: FolderGit2 },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar items={navItems} />

      {/* Hero Section */}
      <section className="relative w-full">
        <HeroGeometric
          badge="The Problem-Solver"
          title1="Hi, I'm Ian"
          title2="Full-Stack Dev & Automation Engineer"
          description="I don't just write code — I craft experiences. From intuitive web apps to intelligent automation, I bridge creativity with technology to shape the future."
          subDescription="Building Seamless, Smart, and Scalable Solutions"
          onViewWorkClick={() => scrollToSection("projects")}
          onContactClick={() => scrollToSection("contact")}
        />

        {/* Bouncing scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 3 },
            y: { duration: 2, ease: "easeInOut", repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <ArrowDown
            className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => scrollToSection("about")}
          />
        </motion.div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
