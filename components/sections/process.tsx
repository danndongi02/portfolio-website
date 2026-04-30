"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap-config";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { scrollToSection } from "@/lib/utils";

type TerminalLine = {
  text: string;
  type: "ok" | "running" | "note";
};

const PHASE_TERMINALS: { command: string; output: TerminalLine[] }[] = [
  {
    command: "scope --analyze client.brief",
    output: [
      { text: "✓ stakeholder goals    parsed", type: "ok" },
      { text: "✓ existing systems     mapped", type: "ok" },
      { text: "✓ constraints          defined", type: "ok" },
      { text: "  deliverable: scope.md", type: "note" },
    ],
  },
  {
    command: "design --stack next,postgres",
    output: [
      { text: "✓ data flow            mapped", type: "ok" },
      { text: "✓ api surface          planned", type: "ok" },
      { text: "✓ schema               drafted", type: "ok" },
      { text: "  deliverable: arch.diagram", type: "note" },
    ],
  },
  {
    command: "npm run dev --watch",
    output: [
      { text: "✓ tsc                  0 errors", type: "ok" },
      { text: "✓ tests                24 passed", type: "ok" },
      { text: "◉ hot reload           active", type: "running" },
      { text: "  demo: friday 3pm", type: "note" },
    ],
  },
  {
    command: "integrate --env production",
    output: [
      { text: "✓ webhooks             connected", type: "ok" },
      { text: "✓ ai agents            deployed", type: "ok" },
      { text: "◉ workflows            running", type: "running" },
      { text: "  overhead: -40%", type: "note" },
    ],
  },
  {
    command: "vercel deploy --prod",
    output: [
      { text: "✓ build                success", type: "ok" },
      { text: "✓ cdn                  propagated", type: "ok" },
      { text: "✓ uptime               99.9%", type: "ok" },
      { text: "  monitoring: active", type: "note" },
    ],
  },
];

const phases = [
  {
    number: "01",
    title: "Discovery & Scope",
    description:
      "Understanding your business goals, mapping existing systems, and defining what success looks like. Every project starts with listening.",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description:
      "Choosing the right stack, designing data flows, and planning for scale. I architect systems that grow with your business, not against it.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "Iterative development with weekly demos. Clean, typed, tested code. You see progress in real-time, not after months of silence.",
  },
  {
    number: "04",
    title: "Automate & Integrate",
    description:
      "Connecting the pieces. Automation workflows, API integrations, and AI agents that eliminate manual overhead and scale operations.",
  },
  {
    number: "05",
    title: "Deploy & Evolve",
    description:
      "Launch with CI/CD, monitoring, and documentation. Then: ongoing optimization based on real usage data.",
  },
];

export function ProcessSection() {
  const [activePhase, setActivePhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [typedCommand, setTypedCommand] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [showCursor, setShowCursor] = useState(false);

  const mountedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedRef.current = true;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(resolve, ms);
      });

    const runLoop = async () => {
      let phase = 0;

      while (mountedRef.current) {
        // Activate phase: dot turns coral, terminal clears
        setActivePhase(phase);
        setTypedCommand("");
        setTerminalLines([]);
        setShowCursor(true);

        // Brief pause before typing starts
        await sleep(300);
        if (!mountedRef.current) return;

        // Type command character by character
        const cmd = PHASE_TERMINALS[phase].command;
        for (let i = 1; i <= cmd.length; i++) {
          if (!mountedRef.current) return;
          setTypedCommand(cmd.slice(0, i));
          await sleep(50);
        }

        // Hide cursor while output prints
        setShowCursor(false);

        // Print each output line
        for (const line of PHASE_TERMINALS[phase].output) {
          if (!mountedRef.current) return;
          await sleep(300);
          setTerminalLines((prev) => [...prev, line]);
        }

        // Show trailing cursor on new prompt line
        setShowCursor(true);

        // Hold before advancing
        await sleep(1500);
        if (!mountedRef.current) return;

        // Mark this phase complete
        const done = phase;
        setCompletedPhases((prev) => new Set([...prev, done]));

        phase = (phase + 1) % PHASE_TERMINALS.length;

        // After completing phase 05 (index 4), phase wraps to 0 — reset visual state
        if (phase === 0) {
          await sleep(700);
          if (!mountedRef.current) return;
          setCompletedPhases(new Set());
          await sleep(300);
        }
      }
    };

    runLoop();

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useGSAP(() => {
    if (!glowLineRef.current) return;

    const completed = completedPhases.size;

    if (completed === 0) {
      // Reset: shrink line back to invisible
      gsap.to(glowLineRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        transformOrigin: "top center",
      });
      return;
    }

    // Each completed phase fills 1/(total-1) of the line height
    // Cap at 1 to prevent scaleY > 1
    const fraction = Math.min(completed / (PHASE_TERMINALS.length - 1), 1);

    gsap.to(glowLineRef.current, {
      scaleY: fraction,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "top center",
    });
  }, [completedPhases]);

  return (
    <section id="process" className="bg-void py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-8">
        <SectionHeading
          number="005"
          label="PROCESS"
          title={
            <>
              How every project <span className="serif-italic">runs</span>.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — Timeline */}
          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative">
              {/* Background dim line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-cream/10" />

              {/* GSAP glow overlay — scaleY(0) initially, expands as phases complete */}
              <div
                ref={glowLineRef}
                className="absolute left-3 top-2 bottom-2 w-px"
                style={{
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 6px 2px rgba(34,197,94,0.45)",
                  transform: "scaleY(0)",
                  transformOrigin: "top center",
                }}
              />

              <div className="space-y-10">
                {phases.map((phase, index) => {
                  const isActive = activePhase === index;
                  const isCompleted = completedPhases.has(index);

                  return (
                    <motion.div
                      key={phase.number}
                      variants={staggerItem}
                      className="relative pl-10"
                    >
                      {/* Node dot */}
                      <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center">
                        <div
                          className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            isCompleted
                              ? "bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                              : isActive
                              ? "bg-coral shadow-[0_0_8px_rgba(255,79,51,0.4)]"
                              : "border border-cream/20 bg-transparent"
                          }`}
                        >
                          {isCompleted && (
                            <span className="text-[5px] text-void font-bold leading-none">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Phase content */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666]">
                          Phase {phase.number}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl text-cream serif-italic mt-1 mb-2">
                          {phase.title}
                        </h3>
                        <p className="text-sm font-mono text-[#aaa] leading-[1.7] max-w-[480px]">
                          {phase.description}
                        </p>
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#22c55e]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                            Running
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right — Animated Terminal */}
          <div className="hidden lg:flex lg:col-span-5 items-start justify-center pt-2">
            <div className="w-full max-w-sm bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a1a1a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a1a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a2a1a]" />
                <span className="ml-auto font-mono text-[10px] text-[#2a2a2a] uppercase tracking-widest">
                  pipeline.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-4 min-h-[180px] font-mono text-[11px] leading-[1.9]">
                {/* Command line with typing cursor */}
                <div className="flex items-center gap-2">
                  <span className="text-coral flex-shrink-0">▸</span>
                  <span className="text-cream/80">{typedCommand}</span>
                  {showCursor && terminalLines.length === 0 && (
                    <span className="inline-block w-[5px] h-[13px] bg-cream/50 cursor-blink align-middle" />
                  )}
                </div>

                {/* Output lines */}
                {terminalLines.map((line, i) => (
                  <div
                    key={`${activePhase}-${i}`}
                    className={
                      line.type === "ok"
                        ? "text-[#22c55e]"
                        : line.type === "running"
                        ? "text-[#facc15]"
                        : "text-[#3a3a3a] pl-3"
                    }
                  >
                    {line.text}
                  </div>
                ))}

                {/* Trailing cursor on new prompt line after output */}
                {showCursor && terminalLines.length > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-coral flex-shrink-0">▸</span>
                    <span className="inline-block w-[5px] h-[13px] bg-cream/50 cursor-blink align-middle" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-iron mt-16 pt-8 text-center">
          <p className="font-serif text-xl text-cream serif-italic mb-3">
            Ready to start?
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors cursor-pointer"
          >
            LET&apos;S TALK &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
