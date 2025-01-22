import { motion } from "framer-motion";
import { Button } from "./button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl: string;
  demoUrl?: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  demoUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg bg-gray-800/80 border border-gray-700 shadow-lg transition-colors hover:bg-gray-800/95 hover:border-gray-600"
    >
      {/* Project Image or Gradient Placeholder */}
      <div className="aspect-video w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-600/30 to-purple-600/30" />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-gray-300">{description}</p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-700/80 px-3 py-1 text-sm text-gray-100 border border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 bg-gray-700 text-white hover:bg-gray-600"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
          {demoUrl && (
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 bg-blue-600 text-white hover:bg-blue-500"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
