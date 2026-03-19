"use client";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { scrollToSection } from "@/lib/utils";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsSection } from "@/components/sections/projects";
import { ProcessSection } from "@/components/sections/process";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  const navItems = [
    { name: "Home", url: "#" },
    { name: "About", url: "#about" },
    { name: "Services", url: "#services" },
    { name: "Projects", url: "#projects" },
    { name: "Process", url: "#process" },
    { name: "Contact", url: "#contact" },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <NavBar items={navItems} />

      {/* Hero Section */}
      <section className="relative w-full">
        <HeroGeometric
          onViewWorkClick={() => scrollToSection("projects")}
          onContactClick={() => scrollToSection("contact")}
        />
      </section>

      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
