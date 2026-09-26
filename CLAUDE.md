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

- `components/sections/` — Full page sections (about, services, projects, process, contact). Most sections define data inline; project data lives in `data/projects.ts`.
- `components/ui/` — Reusable building blocks (button, navbar, hero, terminal window, section heading, motion wrappers, forms, project detail modal). These follow the **shadcn/ui** pattern with CVA (Class Variance Authority) for variant management.
- `components/footer.tsx` — Footer component (direct child of `components/`, imported as `@/components/footer`).
- `data/` — Static data files. `data/projects.ts` holds all project entries typed against `types/project.ts`.
- `types/` — TypeScript interfaces. `types/project.ts` exports `Project` and `ProjectTask`.
- `lib/utils.ts` — Shared utilities: `cn()` (clsx + tailwind-merge) and `scrollToSection()`.

### Styling System

- **Tailwind CSS** with HSL CSS variables for theming (defined in `app/globals.css`)
- Dark mode via class strategy (`.dark` selector)
- Semantic color tokens: `--background`, `--foreground`, `--primary`, `--card`, etc.
- Brand tokens in `tailwind.config.ts`: `void`, `surface`, `terminal`, `abyss`, `iron`, `cream`, `coral`, and text tiers `ash` / `steel` / `graphite` (all ≥4.5:1). Use these instead of arbitrary hex classes; `signal-green` / `signal-amber` are for terminal windows only (see DESIGN.md)
- shadcn/ui configured with `new-york` style variant (`components.json`)

### Animation Stack

- **Framer Motion** — Section reveals and hero entrance; `FadeIn` / `SlideIn` in `components/ui/motion-wrapper.tsx` use `whileInView` for scroll-triggered reveals. `app/page.tsx` wraps everything in `<MotionConfig reducedMotion="user">`
- **GSAP + ScrollTrigger** — Configured in `lib/gsap-config.ts`; `scrollToSection()` in `lib/utils.ts` drives smooth scrolling via `ScrollToPlugin`
- **`lib/motion-variants.ts`** — Shared Framer Motion variant presets (`fadeUp`, `fadeIn`, etc.)
- **Reduced motion** — GSAP work is gated with `gsap.matchMedia()` on `(prefers-reduced-motion: no-preference)`; the Process section falls back to its static layout on desktop too

### Scroll-Aware Navigation

The navbar (`components/ui/tubelight-navbar.tsx`) tracks the active section with ScrollTrigger and marks it with cream text and `aria-current`. It is fixed to the top at every size, collapsing to a MENU toggle below `md`.

### Forms

Contact form uses **React Hook Form + Zod** for validation. It posts to `app/api/contact/route.ts`, which sends the owner notification and a confirmation email via **Resend** (`RESEND_API_KEY`).

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

### Image Configuration

External image hostnames must be whitelisted in `next.config.ts` under `images.remotePatterns`. Currently only `images.unsplash.com` is listed — add new domains there before using `<Image>` with remote URLs.

### MCP Integration

shadcn/ui MCP server is configured (`.mcp.json`) for component management. Add components via `npx shadcn@latest add [component]`.
