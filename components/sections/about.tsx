"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { SectionHeading } from "@/components/ui/section-heading";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { FadeIn, SlideIn } from "@/components/ui/motion-wrapper";

const techStack = [
  { category: "LANGUAGES", items: "TypeScript, Python, JavaScript" },
  { category: "FRONTEND", items: "Next.js, React, Tailwind CSS" },
  { category: "BACKEND", items: "Node.js, FastAPI, Firebase" },
  { category: "AUTOMATION", items: "N8N, Manychat, Jumper, WhatsApp Business API" },
  { category: "AI / AGENTS", items: "LangChain, OpenAI API, Claude API, Google ADK" },
  { category: "INFRA", items: "Vercel, Google Cloud Platform (GCP)" },
];

const stats = [
  { number: "2+", label: "YEARS" },
  { number: "7+", label: "PROJECTS" },
  { number: "50+", label: "AUTOMATIONS", highlight: true },
  { number: "100%", label: "RETENTION" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const rawValue = el.dataset.value || "0";
        const isPercent = rawValue.includes("%");
        const hasPlus = rawValue.includes("+");
        const numValue = parseFloat(rawValue);
        const suffix = isPercent ? "%" : hasPlus ? "+" : "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: numValue,
          duration: 1.2,
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
    <section id="about" className="bg-void py-24 md:py-32">
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8">
        <SectionHeading
          number="002"
          label="ABOUT"
          title={
            <>
              The architect behind
              <br />
              the <span className="serif-italic">systems</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — Bio + Stats */}
          <div className="lg:col-span-5 space-y-10">
            {/* Decorative number */}
            <div className="relative">
              <span className="absolute -top-16 -left-4 font-serif text-[180px] leading-none text-[#151518] select-none pointer-events-none">
                02
              </span>
            </div>

            <SlideIn direction="left">
              <div className="space-y-6 relative">
                <p className="text-sm text-[#aaa] font-mono leading-[1.8]">
                  I&apos;m a full-stack developer and automation architect who
                  builds software that eliminates human bottlenecks. My work sits
                  at the intersection of clean code, workflow automation, and
                  agentic AI &mdash; creating systems that don&apos;t just execute,
                  but reason.
                </p>
                <p className="text-sm text-[#aaa] font-mono leading-[1.8]">
                  From pixel-perfect interfaces and conversational WhatsApp
                  systems to self-running agentic AI pipelines, I deliver
                  end-to-end solutions that scale.
                </p>
              </div>
            </SlideIn>

            {/* Stats */}
            <FadeIn>
              <div className="flex items-start gap-6 md:gap-8 pt-6 border-t border-iron">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className={`stat-number font-serif text-4xl ${
                        stat.highlight ? "text-coral" : "text-cream"
                      }`}
                      data-value={stat.number}
                    >
                      0
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Terminal */}
          <div className="lg:col-span-7">
            <SlideIn direction="right">
              <TerminalWindow title="ian.config.ts">
                <pre className="font-mono text-xs md:text-sm leading-[1.9] overflow-x-auto">
                  <code>
                    <span className="text-coral">const</span>{" "}
                    <span className="text-cream">developer</span>{" "}
                    <span className="text-[#555]">=</span>{" "}
                    <span className="text-[#555]">{"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-[#888]">name:</span>{" "}
                    <span className="text-cream">&quot;Ian&quot;</span>,{"\n"}
                    {"  "}
                    <span className="text-[#888]">role:</span>{" "}
                    <span className="text-cream">
                      &quot;Full-Stack Dev &amp; Automation Architect&quot;
                    </span>
                    ,{"\n"}
                    {"\n"}
                    {techStack.map((row) => (
                      <span key={row.category}>
                        {"  "}
                        <span className="text-[#888]">
                          {row.category.toLowerCase().replace(/\s\/\s/g, "_")}:
                        </span>{" "}
                        <span className="text-cream">
                          [{row.items.split(", ").map((item, i, arr) => (
                            <span key={item}>
                              &quot;{item}&quot;
                              {i < arr.length - 1 ? ", " : ""}
                            </span>
                          ))}]
                        </span>
                        ,{"\n"}
                      </span>
                    ))}
                    {"\n"}
                    {"  "}
                    <span className="text-[#888]">status:</span>{" "}
                    <span className="text-[#22c55e]">
                      &quot;available&quot;
                    </span>
                    ,{"\n"}
                    {"  "}
                    <span className="text-[#888]">location:</span>{" "}
                    <span className="text-cream">
                      &quot;Remote — Worldwide&quot;
                    </span>
                    ,{"\n"}
                    <span className="text-[#555]">{"}"}</span>{" "}
                    <span className="text-coral">satisfies</span>{" "}
                    <span className="text-cream">Developer</span>;
                  </code>
                </pre>
              </TerminalWindow>

              <p className="text-xs font-mono text-[#888] italic mt-4">
                Always shipping. Always learning.
              </p>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
