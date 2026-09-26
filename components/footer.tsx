"use client";

import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

// Channels whose env var is missing are dropped rather than rendered as dead links
const socialLinks = [
  { name: "GITHUB", href: "https://github.com/danndongi02", external: true },
  linkedinUrl && { name: "LINKEDIN", href: linkedinUrl, external: true },
  contactEmail && { name: "EMAIL", href: `mailto:${contactEmail}`, external: false },
].filter((link): link is { name: string; href: string; external: boolean } => Boolean(link));

export function Footer() {
  return (
    <footer className="bg-abyss w-full">
      <div className="container mx-auto px-6 md:px-8">
        {/* Top rule */}
        <div className="h-px bg-iron" />

        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-cream">
              IAN.
            </span>
            <p className="text-[11px] font-mono text-graphite mt-1">
              Building intelligent systems
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-3 -my-3 text-[11px] font-mono uppercase tracking-[0.15em] text-graphite hover:text-cream transition-colors"
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
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="py-3 -my-3 text-[11px] font-mono uppercase tracking-[0.15em] text-graphite hover:text-cream transition-colors"
              >
                {link.name} {link.external ? (<><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></>) : <span aria-hidden="true">→</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-iron" />
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-graphite">
            &copy; {new Date().getFullYear()} IAN
          </span>
          <span className="text-[11px] font-mono text-graphite">
            NAIROBI, KE &mdash; AVAILABLE WORLDWIDE
          </span>
        </div>
      </div>
    </footer>
  );
}
