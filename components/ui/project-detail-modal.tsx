"use client";

import Image from "next/image";
import { Project, ProjectTask } from "@/types/project";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function StatusBadge({ status }: { status?: string }) {
  if (status !== "in-progress") return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-cream">
      <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse motion-reduce:animate-none" />
      In Progress
    </span>
  );
}

// Scattered screenshot positions — alternating left/right with slight rotations
const scatterStyles: { className: string; rotate: string }[] = [
  { className: "ml-0 mr-auto", rotate: "-1.5deg" },
  { className: "ml-auto mr-0", rotate: "1.2deg" },
  { className: "ml-4 mr-auto", rotate: "0.8deg" },
  { className: "ml-auto mr-4", rotate: "-1deg" },
  { className: "ml-2 mr-auto", rotate: "1.5deg" },
];

function ScatteredScreenshot({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const style = scatterStyles[index % scatterStyles.length];
  return (
    <div
      className={`relative w-[85%] md:w-[70%] border border-iron overflow-hidden my-6 ${style.className}`}
      style={{ transform: `rotate(${style.rotate})` }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 85vw, 500px"
        />
      </div>
    </div>
  );
}

/**
 * Interleaves screenshots between task items.
 * If there are more screenshots than gaps, remaining ones go after the tasks.
 * If there are fewer, they're spread evenly.
 */
function buildInterleavedContent(
  tasks: ProjectTask[],
  screenshots: string[],
  projectTitle: string
) {
  if (!screenshots.length) {
    // No screenshots — just render tasks
    return tasks.map((task, i) => (
      <TaskItem key={`task-${i}`} task={task} index={i} />
    ));
  }

  const elements: React.ReactNode[] = [];
  // Calculate which task indices should be followed by a screenshot
  const gaps = tasks.length + 1; // before first, between each, after last
  const step = Math.max(1, Math.floor(gaps / (screenshots.length + 1)));
  let screenshotIdx = 0;

  for (let i = 0; i < tasks.length; i++) {
    elements.push(<TaskItem key={`task-${i}`} task={tasks[i]} index={i} />);

    // Insert screenshot after certain tasks
    if (
      screenshotIdx < screenshots.length &&
      (i + 1) % step === 0
    ) {
      elements.push(
        <ScatteredScreenshot
          key={`ss-${screenshotIdx}`}
          src={screenshots[screenshotIdx]}
          alt={`${projectTitle} screenshot ${screenshotIdx + 1}`}
          index={screenshotIdx}
        />
      );
      screenshotIdx++;
    }
  }

  // Any remaining screenshots go at the end
  while (screenshotIdx < screenshots.length) {
    elements.push(
      <ScatteredScreenshot
        key={`ss-${screenshotIdx}`}
        src={screenshots[screenshotIdx]}
        alt={`${projectTitle} screenshot ${screenshotIdx + 1}`}
        index={screenshotIdx}
      />
    );
    screenshotIdx++;
  }

  return elements;
}

function TaskItem({ task, index }: { task: ProjectTask; index: number }) {
  return (
    <div className="border-l border-iron pl-4">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-mono text-coral">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="text-sm font-mono text-cream">{task.title}</h4>
      </div>
      <p className="text-xs font-mono text-steel leading-[1.7] mt-1 ml-8">
        {task.description}
      </p>
    </div>
  );
}

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!project) return null;

  const screenshots = project.screenshots || [];
  const tasks = project.tasks || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              {project.category && (
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-graphite">
                  {project.category}
                </span>
              )}
              {project.category && project.status === "in-progress" && (
                <span className="text-graphite">&middot;</span>
              )}
              <StatusBadge status={project.status} />
            </div>
            <DialogTitle className="font-serif text-3xl md:text-4xl text-cream serif-italic leading-tight">
              {project.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Details about the {project.title} project
            </DialogDescription>
          </div>

          {/* Divider */}
          <div className="h-px bg-iron mb-6" />

          {/* Description */}
          <p className="text-sm font-mono text-ash leading-[1.8] mb-6">
            {project.longDescription || project.description}
          </p>

          {/* First scattered screenshot — hero-like, full width */}
          {screenshots.length > 0 && (
            <div className="relative w-full border border-iron overflow-hidden mb-6">
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={screenshots[0]}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            </div>
          )}

          {/* Tasks interleaved with scattered screenshots */}
          {tasks.length > 0 && (
            <>
              <div className="h-px bg-iron mb-6" />
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-graphite mb-4 block">
                  What I Did
                </span>
                <div className="space-y-4">
                  {buildInterleavedContent(
                    tasks,
                    screenshots.slice(1), // first screenshot already used above
                    project.title
                  )}
                </div>
              </div>
            </>
          )}

          {/* Technologies */}
          <div className="h-px bg-iron mb-6" />
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-graphite mb-4 block">
              Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono uppercase tracking-[0.1em] text-ash border border-iron px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.demoUrl || project.githubUrl) && (
            <>
              <div className="h-px bg-iron mb-6" />
              <div className="flex gap-6">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-[0.15em] text-coral hover:text-coral/80 transition-colors"
                  >
                    VISIT PROJECT <span aria-hidden="true">&rarr;</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-[0.15em] text-cream hover:text-coral transition-colors"
                  >
                    GITHUB <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
