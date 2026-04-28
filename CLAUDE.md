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
**Navbar → Hero → About → Services → Projects → Process → Contact → Footer**

### Component Organization

- `components/sections/` — Full page sections (about, services, projects, process, contact). Each section contains its own static data defined inline.
- `components/ui/` — Reusable building blocks (button, navbar, hero, cards, forms, section-container). These follow the **shadcn/ui** pattern with CVA (Class Variance Authority) for variant management.
- `components/footer.tsx` — Footer component at the root level.
- `lib/utils.ts` — Shared utilities including `cn()` (clsx + tailwind-merge) and `scrollToSection()`.

### Styling System

- **Tailwind CSS** with HSL CSS variables for theming (defined in `app/globals.css`)
- Dark mode via class strategy (`.dark` selector)
- Semantic color tokens: `--background`, `--foreground`, `--primary`, `--card`, etc.
- shadcn/ui configured with `new-york` style variant (`components.json`)

### Animation Stack

- **Framer Motion** — Section reveals, card hovers, hero floating shapes; `AnimatedSection` in `section-container.tsx` uses `whileInView` for scroll-triggered reveals
- **GSAP + ScrollTrigger** — Configured in `lib/gsap-config.ts`; `scrollToSection()` in `lib/utils.ts` drives smooth scrolling via `ScrollToPlugin`
- **`lib/motion-variants.ts`** — Shared Framer Motion variant presets (`fadeUp`, `fadeIn`, etc.)
- **`lib/use-gsap-3d-tilt.ts`**, **`lib/use-magnetic.ts`** — Custom interaction hooks

### Scroll-Aware Navigation

The navbar (`components/ui/tubelight-navbar.tsx`) tracks the active section using scroll position detection and highlights it with a glow effect. It renders at the bottom on mobile and top on desktop.

### Forms

Contact form uses **React Hook Form + Zod** for validation. Submission is currently simulated (no backend endpoint).

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

### State & Data

- **Zustand** — Client-side state management
- **`@octokit/rest`** — GitHub API client (used in projects section)
- **Google reCAPTCHA v3** — Contact form bot protection
- **Embla Carousel** — Used for carousel UI components

### MCP Integration

shadcn/ui MCP server is configured (`.mcp.json`) for component management. Add components via `npx shadcn@latest add [component]`.
