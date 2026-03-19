"use client";

import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div className={cn("border border-iron overflow-hidden", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-iron">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-coral" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-xs text-[#888] font-mono">{title}</span>
      </div>
      {/* Content */}
      <div className="bg-[#0a0c10] p-6">
        {children}
      </div>
    </div>
  );
}
