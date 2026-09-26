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

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Escape closes the mobile menu and returns focus to its toggle
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useGSAP(() => {
    const sections = items
      .filter((item) => item.url.startsWith("#") && item.url !== "#")
      .map((item) => ({
        id: item.url.substring(1),
        name: item.name,
      }));

    sections.forEach(({ id, name }, i) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveTab(name),
        onEnterBack: () => setActiveTab(name),
        // Scrolling back above a section hands the highlight to the one before it
        onLeaveBack: () => setActiveTab(i === 0 ? "Home" : sections[i - 1].name),
      });
    });

    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "100px top",
      onEnterBack: () => setActiveTab("Home"),
    });

    // Hide-on-scroll-down is spatial motion; under reduced motion the bar stays put
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (navBarRef.current && !reduceMotion) {
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
      aria-label="Primary"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-void/85 backdrop-blur-sm",
        className
      )}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 border-b border-iron/50">
          {/* Logo */}
          <Link
            href="#"
            className="py-3 -my-3 text-sm uppercase tracking-[0.3em] text-cream font-mono font-medium"
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
                aria-current={activeTab === item.name ? "location" : undefined}
                className={cn(
                  "py-3 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-200",
                  activeTab === item.name
                    ? "text-cream"
                    : "text-graphite hover:text-cream"
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
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen && isMobile}
            aria-controls="mobile-menu"
            className="md:hidden -mr-3 px-3 min-h-11 text-cream text-xs uppercase tracking-[0.2em] font-mono"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && isMobile && (
          <div id="mobile-menu" className="md:hidden py-3 border-b border-iron/50 bg-void">
            {items.filter(i => i.name !== "Home").map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name);
                  setMenuOpen(false);
                }}
                aria-current={activeTab === item.name ? "location" : undefined}
                className={cn(
                  "block py-3 text-xs uppercase tracking-[0.2em] font-mono transition-colors",
                  activeTab === item.name
                    ? "text-cream"
                    : "text-graphite hover:text-cream"
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
