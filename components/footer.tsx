"use client";

import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GITHUB", href: "https://github.com/danndongi02" },
  { name: "LINKEDIN", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com" },
  { name: "EMAIL", href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""}` },
];

export function Footer() {
  return (
    <footer className="bg-[#050507] w-full">
      <div className="container mx-auto px-6 md:px-8">
        {/* Top rule */}
        <div className="h-px bg-iron" />

        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-cream">
              IAN.
            </span>
            <p className="text-[11px] font-mono text-[#555] mt-1">
              Building intelligent systems
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#777] hover:text-cream transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#777] hover:text-cream transition-colors"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-iron" />
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[#555]">
            &copy; {new Date().getFullYear()} IAN
          </span>
          <span className="text-[11px] font-mono text-[#555]">
            NAIROBI, KE &mdash; AVAILABLE WORLDWIDE
          </span>
        </div>
      </div>
    </footer>
  );
}
