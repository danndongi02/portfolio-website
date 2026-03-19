"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const showAnim = gsap
        .from(navBarRef.current, {
          yPercent: -100,
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
    <nav
      ref={navBarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        className
      )}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 border-b border-iron/50">
          {/* Logo */}
          <Link
            href="#"
            className="text-sm uppercase tracking-[0.3em] text-cream font-mono font-medium"
          >
            IAN
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {items.filter(i => i.name !== "Home").map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-200",
                  activeTab === item.name
                    ? "text-cream"
                    : "text-[#666] hover:text-cream"
                )}
              >
                {item.name}
                {item.name === "Contact" && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral ml-2 relative -top-0.5" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cream text-xs uppercase tracking-[0.2em] font-mono"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && isMobile && (
          <div className="md:hidden py-6 space-y-4 border-b border-iron/50 bg-void">
            {items.filter(i => i.name !== "Home").map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name);
                  setMenuOpen(false);
                }}
                className={cn(
                  "block text-xs uppercase tracking-[0.2em] font-mono transition-colors",
                  activeTab === item.name
                    ? "text-cream"
                    : "text-[#666] hover:text-cream"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
