"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { ArrowRight } from "lucide-react";

const stats = [
  { number: 2, suffix: "+", label: "Years Experience", icon: "💼" },
  { number: 7, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { number: 5, suffix: "+", label: "Happy Clients", icon: "😊" },
  { number: 100, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Border line scaleY scrub animation
      gsap.from(".about-border-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-paragraphs",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      // Animated stat counters with ScrollTrigger
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const endValue = parseFloat(el.dataset.value || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: endValue,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.value) + suffix;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" className="bg-background py-20">
      <div ref={sectionRef} className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeading
          badge="ABOUT ME"
          title="About Me"
          description="Turning Ideas into Code, and Code into Impact"
          align="center"
        />

        {/* Two-column layout: content left, stats right */}
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left column - Content */}
          <div className="space-y-8 lg:col-span-7">
            <div className="about-paragraphs relative">
              {/* Vertical amber accent line on the left border */}
              <div className="about-border-line absolute left-0 top-0 bottom-0 w-1 rounded-full bg-amber-500" />

              <StaggerContainer className="space-y-6">
                <StaggerItem className="pl-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Hey, I&apos;m Ian—a full-stack developer and automation
                    engineer passionate about building elegant solutions for
                    complex problems. My journey started with an insatiable
                    curiosity about how things work, evolving into a career where
                    I craft seamless digital experiences.
                  </p>
                </StaggerItem>

                <StaggerItem className="pl-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    I specialize in modern web technologies, blending creativity
                    with technical expertise to build intuitive frontends and
                    scalable backend systems. Whether it&apos;s designing
                    user-friendly interfaces, automating workflows, or
                    engineering powerful applications, I thrive on solving
                    challenges that push the boundaries of innovation.
                  </p>
                </StaggerItem>

                <StaggerItem className="pl-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Beyond coding, you&apos;ll find me exploring emerging tech,
                    contributing to open-source projects, or sharing insights
                    with the developer community. Always learning, always
                    building—let&apos;s shape the future, one project at a time.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* CTA link */}
            <FadeIn>
              <a
                href="#projects"
                className="inline-flex items-center group"
              >
                <span className="text-primary font-medium mr-2 group-hover:text-primary/80 transition-colors">
                  View my work
                </span>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform group-hover:text-primary/80" />
              </a>
            </FadeIn>
          </div>

          {/* Right column - Stats */}
          <div className="lg:col-span-5">
            <SlideIn direction="right">
              <Card className="about-stats-card border-border bg-card">
                <CardContent className="p-6">
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="stat-card text-center p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors duration-300 group"
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div
                          className="stat-number text-2xl font-bold text-foreground group-hover:text-primary transition-colors"
                          data-value={stat.number}
                          data-suffix={stat.suffix}
                        >
                          0{stat.suffix}
                        </div>
                        <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-3">
                      Tech Stack
                    </h3>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {techStack.map((tech) => (
                        <motion.div key={tech} variants={staggerItem}>
                          <Badge
                            variant="outline"
                            className="px-3 py-1 bg-primary/10 border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all cursor-default"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
