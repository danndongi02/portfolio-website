"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/motion-wrapper";

const testimonials = [
  {
    quote:
      "Ian automated our entire client onboarding workflow in under two weeks. What used to take our team 3 hours a day now runs without us touching it.",
    name: "A.K.",
    title: "Operations Lead",
    company: "[Company Name]",
    initials: "AK",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-void py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <SectionHeading
          number="006"
          label="TESTIMONIALS"
          title={
            <>
              What clients <span className="serif-italic">say</span>.
            </>
          }
        />

        <FadeIn>
          <div className="max-w-2xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-iron bg-surface p-8 md:p-10">
                <span className="font-serif text-5xl text-coral leading-none select-none">
                  &ldquo;
                </span>

                <p className="font-mono text-sm text-[#ccc] leading-[1.8] mt-2 mb-6">
                  {t.quote}
                </p>

                <div className="border-t border-iron pt-6 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1e] border border-iron flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-mono uppercase text-[#888]">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-mono text-cream">{t.name}</p>
                    <p className="text-xs font-mono text-[#888]">
                      {t.title} &middot; {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
