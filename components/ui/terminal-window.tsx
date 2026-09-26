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
          <div className="w-2.5 h-2.5 rounded-full bg-signal-amber" />
          <div className="w-2.5 h-2.5 rounded-full bg-signal-green" />
        </div>
        <span className="text-xs text-steel font-mono">{title}</span>
      </div>
      {/* Content */}
      <div className="bg-terminal p-6">
        {children}
      </div>
    </div>
  );
}
