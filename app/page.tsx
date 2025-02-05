'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Home as HomeIcon, User, Wrench, FolderGit2, Mail } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useEffect, useState } from 'react';
import { scrollToSection } from '@/lib/utils';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const navItems = [
    { name: 'Home', url: '#', icon: HomeIcon },
    { name: 'About', url: '#about', icon: User },
    { name: 'Skills', url: '#skills', icon: Wrench },
    { name: 'Projects', url: '#projects', icon: FolderGit2 },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar items={navItems} />
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-50" />
        </div>
        
        <motion.div 
          className="z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi, I'm Ian
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A passionate software engineer crafting elegant solutions to complex problems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-x-4"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? [0, 10, 0] : 20 
          }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ArrowDown className="w-6 h-6 text-white cursor-pointer" onClick={() => scrollToSection('about')} />
        </motion.div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
