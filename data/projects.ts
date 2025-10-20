import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe", "Redis"],
    githubUrl: "https://github.com/danndongi02/bekoHomeAppliances",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    color: "#4F46E5", // Indigo
  },
  {
    title: "AI-Powered Task Manager",
    description: "Smart task management application that uses AI to prioritize and categorize tasks, with natural language processing for task creation.",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
    githubUrl: "#",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
    color: "#10B981", // Emerald
  },
  {
    title: "Real-time Chat Application",
    description: "Feature-rich chat application with real-time messaging, file sharing, and video calls, built with WebSocket technology.",
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "Redis"],
    githubUrl: "#",
    demoUrl: "#",
    image: "https://images.unsplash.com/photo-1587463272361-565200f82b33?q=80&w=2070&auto=format&fit=crop",
    color: "#3B82F6", // Blue
  },
];
