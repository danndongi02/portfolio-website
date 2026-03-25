# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

This is a **Next.js 16 (App Router)** single-page portfolio website built with React 19 and TypeScript.

### Layout

The entire site lives in a single page (`app/page.tsx`) composed of sequential full-height sections:
**Navbar → Hero → About → Skills → Projects → Contact → Footer**

### Component Organization

- `components/sections/` — Full page sections (about, skills, projects, contact). Each section contains its own static data (project lists, skill arrays) defined inline.
- `components/ui/` — Reusable building blocks (button, navbar, hero, cards, forms, section-container). These follow the **shadcn/ui** pattern with CVA (Class Variance Authority) for variant management.
- `components/footer.tsx` — Footer component at the root level.
- `lib/utils.ts` — Shared utilities including `cn()` (clsx + tailwind-merge) and `scrollToSection()`.

### Styling System

- **Tailwind CSS** with HSL CSS variables for theming (defined in `app/globals.css`)
- Dark mode via class strategy (`.dark` selector)
- Semantic color tokens: `--background`, `--foreground`, `--primary`, `--card`, etc.
- shadcn/ui configured with `new-york` style variant (`components.json`)

### Animation Stack

- **Framer Motion** — Section reveals, card hovers, hero floating shapes, typewriter text
- **react-intersection-observer** — Triggers scroll-based animations when elements enter viewport
- `AnimatedSection` wrapper in `components/ui/section-container.tsx` handles scroll reveal for all sections

### Scroll-Aware Navigation

The navbar (`components/ui/tubelight-navbar.tsx`) tracks the active section using scroll position detection and highlights it with a glow effect. It renders at the bottom on mobile and top on desktop.

### Forms

Contact form uses **React Hook Form + Zod** for validation. Submission is currently simulated (no backend endpoint).

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

### MCP Integration

shadcn/ui MCP server is configured (`.mcp.json`) for component management. Add components via `npx shadcn@latest add [component]`.
