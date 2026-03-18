"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP: ScrollTrigger section detection + show/hide on scroll direction
  useGSAP(() => {
    const sections = items
      .filter((item) => item.url.startsWith("#") && item.url !== "#")
      .map((item) => ({
        id: item.url.substring(1),
        name: item.name,
      }));

    sections.forEach(({ id, name }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveTab(name),
        onEnterBack: () => setActiveTab(name),
      });
    });

    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "100px top",
      onEnterBack: () => setActiveTab("Home"),
    });

    if (navBarRef.current) {
      const hideValue = isMobile ? 100 : -100;

      const showAnim = gsap
        .from(navBarRef.current, {
          yPercent: hideValue,
          paused: true,
          duration: 0.3,
          ease: "power2.out",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    }
  }, { dependencies: [isMobile] });

  return (
    <TooltipProvider delayDuration={200}>
      <div
        ref={navBarRef}
        className={cn(
          "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
          className
        )}
      >
        <div className="relative flex items-center gap-3 bg-background/60 border border-border/50 backdrop-blur-xl py-1 px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            const linkContent = (
              <Link
                key={item.name}
                href={item.url}
                data-tab={item.name}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-muted-foreground hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                {/* FM layoutId indicator — shared layout animation */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  >
                    {/* Tubelight glow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    </div>
                  </motion.div>
                )}

                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
              </Link>
            );

            if (isMobile) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-card text-card-foreground border-border"
                  >
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
