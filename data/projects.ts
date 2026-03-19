import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Phoetic",
    description:
      "A premium photography portfolio featuring advanced scroll-driven GSAP animations, parallax floating images, filterable masonry galleries with lightbox, and a validated contact system — designed and built for a professional photographer.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "GSAP",
      "Framer Motion",
      "shadcn/ui",
      "Radix UI",
      "Zod",
      "React Hook Form",
    ],
    demoUrl: "https://phoetic.vercel.app/",
    image: "/projects/phoetic.png",
    color: "#10B981",
    status: "in-progress",
    category: "Software Dev",
  },
  {
    title: "Portfolio Website",
    description:
      "An editorial brutalist-tech portfolio with Framer Motion scroll animations, SVG grain textures, and a dark monochrome design system with coral accents — the site you're looking at right now.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "shadcn/ui",
      "Radix UI",
      "Zod",
    ],
    image: "/projects/portfolio.png",
    color: "#ff4f33",
    status: "in-progress",
    category: "Software Dev",
  },
];
