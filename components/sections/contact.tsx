"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { SlideIn } from "@/components/ui/motion-wrapper";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const contactLinks = [
  { label: "EMAIL", href: `mailto:${contactEmail}`, display: contactEmail },
  { label: "GITHUB", href: "https://github.com/danndongi02", display: "danndongi02" },
  { label: "LINKEDIN", href: linkedinUrl, display: "Profile" },
  { label: "WHATSAPP", href: `https://wa.me/${whatsappNumber}`, display: "Message" },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-void py-24 md:py-32 relative"
    >
      {/* Radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#111116_0%,#08080a_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <SectionHeading
          number="006"
          label="CONTACT"
          title={
            <>
              Let&apos;s build something
              <br />
              that runs{" "}
              <span className="serif-italic relative">
                itself
                <span className="absolute bottom-0 left-0 right-0 h-px bg-coral" />
              </span>
              .
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — Info */}
          <SlideIn direction="left" className="lg:col-span-5 space-y-8">
            <p className="text-sm font-mono text-[#aaa] leading-[1.8] max-w-[420px]">
              I&apos;m currently available for contract work &mdash; software
              development, automation systems, and agentic AI workflows.
              Let&apos;s talk about what you need.
            </p>

            {/* Availability indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-coral">
                Available for Work
              </span>
            </div>

            {/* Contact links */}
            <div className="space-y-3 pt-4 border-t border-iron">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-cream group-hover:text-coral transition-colors">
                    {link.label} ↗
                  </span>
                  <span className="text-xs font-mono text-[#888]">
                    {link.display}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-[11px] font-mono text-[#666]">
              Based in Nairobi, KE &mdash; Available worldwide
            </p>
          </SlideIn>

          {/* Right — Form */}
          <SlideIn direction="right" className="lg:col-span-7">
            <ContactForm />
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
