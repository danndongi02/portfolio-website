"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/danndongi02",
    color: "#2ea043",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "#0a66c2",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "#1da1f2",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:your.email@example.com",
    color: "#ea4335",
  },
];

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-muted-foreground hover:text-primary transition-colors duration-200"
  >
    {children}
  </Link>
);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // GSAP: Particle system infinite tweens (keep — 30 particles with random params)
  useGSAP(
    () => {
      if (particlesRef.current) {
        const particles =
          particlesRef.current.querySelectorAll<HTMLElement>(".footer-particle");
        particles.forEach((particle) => {
          gsap.to(particle, {
            opacity: gsap.utils.random(0.03, 0.12),
            scale: gsap.utils.random(1, 1.8),
            duration: gsap.utils.random(2, 5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: gsap.utils.random(0, 3),
          });
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <TooltipProvider delayDuration={200}>
      <footer ref={footerRef} className="relative w-full bg-muted/50">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,hsl(38_92%_60%_/_0.03),transparent)]" />
          <div ref={particlesRef} className="absolute w-full h-full">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`footer-particle absolute w-1 h-1 rounded-full ${
                  i % 2 === 0 ? "bg-primary/5" : "bg-accent/5"
                }`}
                style={{
                  left: `${((i * 3.33 + 7) % 100).toFixed(1)}%`,
                  top: `${((i * 7.77 + 13) % 100).toFixed(1)}%`,
                  opacity: 0.05,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <FadeIn className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Ian</h3>
              <p className="text-muted-foreground">
                Crafting elegant solutions to complex problems
              </p>
            </FadeIn>

            {/* Quick Links */}
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.h4
                variants={staggerItem}
                className="text-foreground font-semibold"
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-2">
                {["About", "Skills", "Projects", "Contact"].map((link) => (
                  <motion.li key={link} variants={staggerItem}>
                    <FooterLink href={`#${link.toLowerCase()}`}>
                      {link}
                    </FooterLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <div className="space-y-4">
              <FadeIn>
                <h4 className="text-foreground font-semibold">Connect</h4>
              </FadeIn>
              <StaggerContainer className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <StaggerItem key={social.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-colors duration-300"
                            >
                              <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Icon size={18} />
                              </a>
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-card text-card-foreground border-border"
                        >
                          {social.name}
                        </TooltipContent>
                      </Tooltip>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>

          {/* Bottom Bar */}
          <Separator className="bg-border/50" />
          <FadeIn className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                {new Date().getFullYear()} Ian. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm">
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </TooltipProvider>
  );
}
