"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const mechanical = [0.25, 0.1, 0.25, 1] as const;

function NodeGraph() {
  const nodes = [
    { x: 60, y: 80, label: "INPUT" },
    { x: 200, y: 40, label: "AGENT" },
    { x: 180, y: 160, label: "PROCESS" },
    { x: 320, y: 100, label: "DECIDE" },
    { x: 420, y: 60, label: "OUTPUT" },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
  ];

  return (
    <svg
      viewBox="0 0 480 220"
      className="w-full h-full"
      fill="none"
    >
      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="#f0ece6"
          strokeOpacity={0.12}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: mechanical }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <motion.rect
            x={node.x - 8}
            y={node.y - 8}
            width={16}
            height={16}
            stroke="#f0ece6"
            strokeOpacity={0.2}
            strokeWidth={1}
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
          />
          {/* Accent dots on key nodes */}
          {(i === 1 || i === 3) && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={3}
              fill="#ff4f33"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.4 }}
            />
          )}
          {/* Labels */}
          <motion.text
            x={node.x}
            y={node.y + 24}
            textAnchor="middle"
            fill="#f0ece6"
            fillOpacity={0.25}
            fontSize={8}
            fontFamily="monospace"
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

function HeroGeometric({
  onViewWorkClick,
  onContactClick,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  subDescription?: string;
  showButtons?: boolean;
  onViewWorkClick?: () => void;
  onContactClick?: () => void;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-void">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Content */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: mechanical }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#666] font-mono">
                001 &mdash; Introduction
              </span>
              <div className="h-px flex-1 bg-iron max-w-[200px]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: mechanical }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-cream leading-[1.05] mb-6"
            >
              Software that
              <br />
              <span className="serif-italic">thinks</span> for itself.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: mechanical }}
              className="text-sm md:text-[15px] text-[#aaa] font-mono leading-[1.8] max-w-[520px] mb-8"
            >
              Full-stack developer &amp; automation architect. I build intelligent
              systems, agentic workflows, and software that eliminates human
              bottlenecks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: mechanical }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button onClick={onViewWorkClick}>
                View Work &rarr;
              </Button>
              <Button variant="outline" onClick={onContactClick}>
                Get In Touch
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: mechanical }}
              className="flex items-center gap-6 text-xs font-mono text-[#888] uppercase tracking-[0.15em]"
            >
              <span>50+ Automations</span>
              <span className="text-iron">|</span>
              <span>7+ Projects</span>
              <span className="text-iron">|</span>
              <span>100% Retention</span>
            </motion.div>
          </div>

          {/* Right — Node Graph */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:block lg:col-span-5"
          >
            <NodeGraph />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#555]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent"
        />
      </motion.div>
    </div>
  );
}

export { HeroGeometric };
