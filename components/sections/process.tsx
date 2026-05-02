"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
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

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function ProcessSection() {
  // -1 = idle (section not yet reached)
  const [activePhase, setActivePhase] = useState(-1);
  const [typedCommand, setTypedCommand] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  const pinnedRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  // Pin the panel and map scroll progress → discrete phase (120 vh per phase)
  useGSAP(() => {
    if (!pinnedRef.current) return;

    const st = ScrollTrigger.create({
      trigger: pinnedRef.current,
      start: "top top",
      end: `+=${phases.length * 120}vh`,
      pin: true,
      pinSpacing: true,
      onEnter: () => setActivePhase((p) => (p < 0 ? 0 : p)),
      onLeaveBack: () => setActivePhase(-1),
      onUpdate: (self) => {
        const next = Math.min(
          Math.floor(self.progress * phases.length),
          phases.length - 1
        );
        setActivePhase((p) => (p !== next ? next : p));
      },
    });

    return () => st.kill();
  }, []);

  // Grow the green glow spine as phases complete
  useGSAP(() => {
    if (!glowLineRef.current) return;

    if (activePhase <= 0) {
      gsap.to(glowLineRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        transformOrigin: "top center",
      });
      return;
    }

    gsap.to(glowLineRef.current, {
      scaleY: Math.min(activePhase / (phases.length - 1), 1),
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "top center",
    });
  }, [activePhase]);

  // Terminal typing animation — re-runs on every phase change
  useEffect(() => {
    if (activePhase < 0) {
      setTypedCommand("");
      setTerminalLines([]);
      setShowCursor(true);
      return;
    }

    cancelRef.current?.();

    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const id = setTimeout(resolve, ms);
        cancelRef.current = () => {
          clearTimeout(id);
          reject(new Error("cancelled"));
        };
      });

    const run = async () => {
      try {
        setTypedCommand("");
        setTerminalLines([]);
        setShowCursor(true);

        await sleep(300);

        const cmd = PHASE_TERMINALS[activePhase].command;
        for (let i = 1; i <= cmd.length; i++) {
          setTypedCommand(cmd.slice(0, i));
          await sleep(50);
        }

        setShowCursor(false);

        for (const line of PHASE_TERMINALS[activePhase].output) {
          await sleep(300);
          setTerminalLines((prev) => [...prev, line]);
        }

        setShowCursor(true);
      } catch {
        // Cancelled by next phase — exit cleanly
      }
    };

    run();
    return () => { cancelRef.current?.(); };
  }, [activePhase]);

  return (
    <section id="process" className="bg-void">
      {/*
       * Pinned block — h-screen caps the panel to exactly the viewport height
       * so content never overflows below the fold. flex-col lets the heading
       * sit at the top while the grid fills the remaining space.
       */}
      <div ref={pinnedRef} className="bg-void h-screen flex flex-col">

        {/* Compact heading — smaller than SectionHeading to give the grid more room */}
        <div className="container mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-6 flex-none">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#666]">
              005 &mdash; PROCESS
            </span>
            <div className="h-px flex-1 bg-iron" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-cream leading-[1.1]">
            How every project <span className="serif-italic">runs</span>.
          </h2>
        </div>

        {/* Phase grid — flex-1 fills remaining height; overflow-hidden prevents any spill */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 pb-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* ── Left: phase timeline ── */}
              <div className="lg:col-span-7">
                <div className="relative">
                  {/* Dim spine */}
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-cream/10" />

                  {/* Animated green glow spine */}
                  <div
                    ref={glowLineRef}
                    className="absolute left-3 top-2 bottom-2 w-px"
                    style={{
                      backgroundColor: "#22c55e",
                      boxShadow: "0 0 6px 2px rgba(34,197,94,0.45)",
                      transform: "scaleY(0)",
                      opacity: 0,
                    }}
                  />

                  <div className="space-y-5">
                    {phases.map((phase, index) => {
                      const isActive = activePhase === index;
                      const isCompleted = activePhase > index;

                      return (
                        <motion.div
                          key={phase.number}
                          className="relative pl-10"
                          animate={{
                            opacity:
                              activePhase < 0
                                ? 1
                                : isActive
                                ? 1
                                : isCompleted
                                ? 0.45
                                : 0.2,
                          }}
                          transition={{ duration: 0.55, ease: EASE }}
                        >
                          {/* Node dot */}
                          <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center">
                            <motion.div
                              className="w-2.5 h-2.5 rounded-full flex items-center justify-center border"
                              animate={{
                                backgroundColor: isCompleted
                                  ? "#22c55e"
                                  : isActive
                                  ? "#ff4f33"
                                  : "transparent",
                                borderColor:
                                  isCompleted || isActive
                                    ? "transparent"
                                    : "rgba(240,236,230,0.2)",
                                boxShadow: isCompleted
                                  ? "0 0 8px rgba(34,197,94,0.4)"
                                  : isActive
                                  ? "0 0 8px rgba(255,79,51,0.4)"
                                  : "none",
                              }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                              <AnimatePresence>
                                {isCompleted && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[5px] text-void font-bold leading-none"
                                  >
                                    ✓
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>

                          {/* Phase label + title (always visible) */}
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666]">
                              Phase {phase.number}
                            </span>
                            <h3 className="font-serif text-lg md:text-xl text-cream serif-italic mt-0.5">
                              {phase.title}
                            </h3>

                            {/* Description — expands only for the active phase */}
                            <motion.div
                              animate={{
                                maxHeight: isActive ? 110 : 0,
                                opacity: isActive ? 1 : 0,
                                marginTop: isActive ? 5 : 0,
                              }}
                              transition={{ duration: 0.45, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm font-mono text-[#aaa] leading-[1.65] max-w-[480px]">
                                {phase.description}
                              </p>
                            </motion.div>

                            {/* Running badge — delayed slightly after description */}
                            <motion.div
                              animate={{
                                maxHeight: isActive ? 26 : 0,
                                opacity: isActive ? 1 : 0,
                                marginTop: isActive ? 5 : 0,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: EASE,
                                delay: isActive ? 0.1 : 0,
                              }}
                              className="overflow-hidden"
                            >
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#22c55e]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                                Running
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Right: terminal ── */}
              <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                <div className="w-full border border-iron overflow-hidden">
                  {/* Title bar */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-iron">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-coral" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    </div>
                    <span className="text-xs text-[#888] font-mono">pipeline.sh</span>
                  </div>

                  {/* Body fades on each phase transition via key */}
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-[#0a0c10] p-6 min-h-[220px] font-mono text-xs leading-[2]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-coral flex-shrink-0">▸</span>
                      <span className="text-cream/80">{typedCommand}</span>
                      {showCursor && terminalLines.length === 0 && (
                        <span className="inline-block w-[5px] h-[13px] bg-cream/50 cursor-blink align-middle" />
                      )}
                    </div>

                    {terminalLines.map((line, i) => (
                      <div
                        key={`${activePhase}-${i}`}
                        className={
                          line.type === "ok"
                            ? "text-[#22c55e]"
                            : line.type === "running"
                            ? "text-[#facc15]"
                            : "text-[#444] pl-3"
                        }
                      >
                        {line.text}
                      </div>
                    ))}

                    {showCursor && terminalLines.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-coral flex-shrink-0">▸</span>
                        <span className="inline-block w-[5px] h-[13px] bg-cream/50 cursor-blink align-middle" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CTA — lives after the GSAP spacer, appears once all phases are scrolled through */}
      <div className="container mx-auto px-6 md:px-8 pb-24">
        <div className="border-t border-iron pt-8 text-center">
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
