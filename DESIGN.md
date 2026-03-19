# Design System: Ian's Portfolio — Editorial Brutalist V2
**Stitch Project ID:** `9340752088896243811`

---

## 1. Visual Theme & Atmosphere

**Aesthetic Direction:** Editorial Brutalist-Tech — the visual language of a high-end architecture monograph crossed with a Bloomberg terminal. Every pixel communicates precision, confidence, and technical mastery.

**Mood:** Dark, restrained, monochromatic. The design is intentionally austere — it earns visual impact through typography and composition, not decoration. Warmth comes from the grain texture and the off-white cream tones, preventing the dark theme from feeling cold or sterile.

**Philosophy:** Less is authority. The near-total absence of color makes the single coral accent feel electric. Sharp corners and monospace labels signal engineering precision. Generous negative space says "I don't need to fill every pixel to prove my worth." The overall effect is a portfolio that feels *designed*, not *decorated*.

**Texture & Depth:** A subtle grain/noise overlay sits across every surface at 3–5% opacity, adding analog warmth and tactile quality to the digital canvas. Select sections use faint radial gradients (`#111116` → `#08080a`) to create subtle depth pools behind primary content. The hero section features a ghostly blueprint grid (40px intervals) that reinforces the architectural metaphor.

---

## 2. Color Palette & Roles

### Primary Palette

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `bg-base` | Midnight Void | `#08080a` | Primary background — the canvas everything lives on |
| `bg-surface` | Obsidian Surface | `#0f0f12` | Elevated surfaces: cards, project blocks, terminal windows |
| `bg-footer` | Abyssal Dark | `#050507` | Footer zone — subtly darker than base for separation |
| `bg-radial-center` | Shadow Pool | `#111116` | Center of radial gradients creating depth behind content |
| `border-rule` | Iron Line | `#1a1a1e` | Section dividers, horizontal rules, card borders, grid lines |

### Text Hierarchy

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `text-primary` | Warm Cream | `#f0ece6` | Headlines, primary text, navigation, important labels |
| `text-body` | Soft Ash | `#aaaaaa` / `#b0b0b0` | Body copy, descriptions, bio text — readable without competing |
| `text-label` | Weathered Steel | `#888888` / `#999999` | Form labels, tech tags, stat labels, secondary info |
| `text-muted` | Faded Graphite | `#555555` / `#666666` | Section numbers (001–006), monospace labels, placeholder text |
| `text-ghost` | Phantom Gray | `#333333` | Decorative code snippets, barely-visible atmospheric text |
| `text-decorative` | Whisper Dark | `#151518` / `#1a1a1e` | Massive background numbers ("02", "03"), nearly invisible decorative type |

### Accent Colors

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `accent-primary` | Hot Coral | `#ff4f33` | THE accent. Used for: CTA buttons, interactive arrows, active borders, hover states, coral dots, "FEATURED" labels, focus rings. Appears sparingly — maximum 2–3 elements per section |
| `accent-amber` | Signal Amber | `#f59e0b` | Terminal window title bar dot (middle dot only) — extremely rare |
| `accent-green` | System Green | `#22c55e` | Terminal window title bar dot (right dot only) — extremely rare, reserved for status |

> **Critical Rule:** Hot Coral (`#ff4f33`) is the ONLY accent used in the design system proper. Amber and green appear exclusively in the terminal window title bar's three-dot motif. Do not introduce additional accent colors.

---

## 3. Typography Rules

### Font Stack

| Role | Font Family | Fallback | Usage |
|------|-------------|----------|-------|
| **Display** | `Instrument Serif` | `Playfair Display`, serif | Headlines, section titles, project names, large decorative numbers |
| **Monospace** | `JetBrains Mono` | `Space Mono`, monospace | Body text, labels, navigation, tags, stats, buttons, form fields, code |
| **Sans-serif** | `Space Grotesk` | sans-serif | Fallback/system — not used as a primary choice |

### Type Scale & Hierarchy

| Level | Size | Font | Weight | Style | Usage |
|-------|------|------|--------|-------|-------|
| **Hero Headline** | 80–96px | Instrument Serif | Regular | Normal + *Italic for emphasis word* | Main hero statement |
| **Section Headline** | 48–56px | Instrument Serif | Regular | Normal | Section titles ("Selected work.", "Three disciplines.") |
| **Subsection Title** | 32–36px | Instrument Serif | Regular | *Italic* | Service names, featured project titles |
| **Project Title** | 24–28px | Instrument Serif | Regular | *Italic* | Individual project card titles |
| **CTA / Pull Quote** | 20px | Instrument Serif | Regular | *Italic* | "Ready to start?" prompts |
| **Body Copy** | 14–15px | JetBrains Mono | Regular | Normal | Descriptions, bio, paragraphs |
| **Labels & Tags** | 12–13px | JetBrains Mono | Regular | Uppercase + letterspaced | Section labels, tech tags, stat labels, nav links |
| **Decorative Number** | 120–200px | Instrument Serif | Regular | Normal | Faded background numbers ("02", "03") |

### Typographic Patterns

- **Serif italic** is reserved for emphasis words within headlines (e.g., "*thinks*" in "Software that *thinks* for itself") and for service/project titles. Never use bold serif — italic carries all the emphasis.
- **Monospace uppercase with letter-spacing** is the standard for all labels, navigation, tags, and small informational text. This creates a systematic, data-driven feel.
- **Line-height** is generous (1.7–1.8) on monospace body text to ensure readability and editorial breathing room.
- **Section numbering** uses the format "001 — SECTION NAME" in muted monospace (#555/#666) with a thin horizontal line extending from the text. This creates a systematic indexing feel throughout the site.

---

## 4. Component Stylings

### Buttons

| Variant | Background | Text | Border | Shape | Usage |
|---------|-----------|------|--------|-------|-------|
| **Primary CTA** | Solid Hot Coral (`#ff4f33`) | Black (`#000000`) monospace uppercase | None | Sharp rectangle, 0px radius | "VIEW WORK →", "SEND MESSAGE →", "INITIALIZE PROJECT →" |
| **Ghost/Outlined** | Transparent | Warm Cream (`#f0ece6`) monospace uppercase | 1px solid `#f0ece6` at ~40% opacity | Sharp rectangle, 0px radius | "GET IN TOUCH", secondary actions |
| **Text Link** | None | Hot Coral (`#ff4f33`) monospace | None | Inline | "VIEW PROJECT →", "LET'S TALK →", "GITHUB ↗" |

> Buttons are always sharp-cornered rectangles. Never pill-shaped, never rounded. The coral CTA is the single most prominent colored element on any given viewport.

### Cards & Containers

- **Project Blocks:** Sharp-cornered rectangles with Obsidian Surface (`#0f0f12`) background and 1px Iron Line (`#1a1a1e`) border. No shadow, no glow, no gradient fill. On hover/active: thin coral left border appears.
- **Terminal Windows:** Sharp-cornered container with a title bar (slightly lighter `#0f0f12` background, 1px bottom border `#1a1a1e`). Three dots in the title bar: coral, amber, green — the ONLY place multiple accent colors appear. Body uses `#0a0c10` for subtle differentiation.
- **Service Bands:** Full-width horizontal regions separated by 1px Iron Line rules. No background difference — they float on the base canvas.
- **Stat Cards:** No visible container — just numbers and labels floating in space, separated by faint vertical pipes or generous whitespace.

### Forms & Inputs

- **Input Style:** Bottom-border-only — a single horizontal line (`#f0ece6` at 40–50% opacity) beneath the input area. No box, no background fill, no rounded corners.
- **Labels:** Monospace uppercase in Weathered Steel (`#888`), positioned above the input.
- **Placeholder Text:** Faded Graphite (`#666`), monospace, lowercase or with format hints ("software | automation | agentic_ai | other").
- **Focus State:** Bottom border color transitions to Hot Coral (`#ff4f33`), with `outline: none`.
- **Textarea:** Same bottom-border-only style, taller. No visible border on sides or top.

### Separators & Rules

- **Horizontal Rules:** 1px solid Iron Line (`#1a1a1e`). Used generously between sections, service bands, and content blocks.
- **Vertical Accent Lines:** 1px wide, gradient from `#555` to transparent, 100px tall. Sometimes topped with a small 5px coral dot (`#ff4f33`).
- **Dotted Lines:** Created via CSS gradient: `to right, #333 10%, transparent 0%` at 8px × 1px intervals. Used in the tech stack data table between rows.
- **Section Label Lines:** Thin horizontal lines extending right from the "001 — SECTION" label text, fading out.

### Interactive States

- **Hover on service bands:** Thin coral left border appears + arrow extends slightly rightward.
- **Hover on links:** Text color shifts from Warm Cream to Hot Coral, or arrow symbol becomes more visible.
- **Hover on project cards:** Subtle border color shift toward coral.
- **Active/Current indicators:** Coral dot, coral border, or coral text on the active element (e.g., active process phase, current nav item).

---

## 5. Layout Principles

### Grid & Composition

- **Asymmetric by default.** Column splits are deliberate off-balance: 55/45, 60/40, 45/55, 65/35. Never a clean 50/50. This creates editorial dynamism and avoids the "template" look.
- **Full-width bands** for services — horizontal rows spanning the viewport, separated by rules. This conveys organization and methodical thinking.
- **Staggered grids** for projects — deliberately uneven positioning, with cards offset vertically and varying in width (35–60% of container). Magazine-style, not uniform.
- **Container max-width:** Content sits within a constrained column (~1200px) centered on the page, but decorative elements (rules, background textures) may extend to viewport edges.

### Whitespace Strategy

- **Generous to the point of dramatic.** Sections have 120–160px vertical padding. The space itself is a design element — it communicates confidence and lets typography breathe.
- **Between service bands:** 40–60px vertical padding each.
- **Between project cards:** 40–80px, deliberately uneven in the staggered layout.
- **Within cards/blocks:** 32–48px internal padding.
- **Text blocks:** Maximum width of ~600px for body copy to maintain comfortable line lengths.

### Section Architecture

Every section follows a consistent structure:

1. **Section label** — top-left, monospace: "00X — SECTION NAME" in muted gray with thin extending line
2. **Headline** — large serif, off-white, often with one italic emphasis word
3. **Content area** — asymmetric columns or full-width bands
4. **Closing element** — thin rule + CTA text or navigational prompt

This creates a rhythm of: *label → statement → evidence → invitation* that repeats throughout the page.

### Responsive Considerations

- **Desktop-first** design. The asymmetric multi-column layouts collapse to single-column on mobile.
- **Navigation** shifts from horizontal text links to a compact format on smaller viewports.
- **Staggered project grids** become a single-column stack on mobile.
- **Service bands** remain full-width but stack their internal elements vertically.
- **Hero headline** scales down but maintains serif display treatment.

---

## 6. Texture & Background Effects

### Grain Overlay

Applied globally across the entire page surface. Created via either:
- SVG `feTurbulence` filter (baseFrequency: 0.65, numOctaves: 3) rendered to a full-viewport element
- Or an external noise texture image

**Properties:** `opacity: 0.03–0.05`, `pointer-events: none`, `mix-blend-mode: overlay`, `background-repeat: repeat`, `position: fixed` covering the full viewport.

**Purpose:** Adds analog warmth and prevents the dark background from feeling flat or digital. Subtlety is critical — it should be felt more than seen.

### Blueprint Grid (Hero Only)

A CSS-generated grid pattern on the hero section background:
- Created via intersecting linear gradients at 40px intervals
- Color: Iron Line (`#1a1a1e`)
- Very faint — purely atmospheric, evoking architectural blueprints and technical precision

### Radial Depth Gradients

Select sections use a subtle radial gradient behind the primary content area:
- `radial-gradient(circle at 50% 40%, #111116 0%, #08080a 70%)`
- Creates a barely-perceptible lighter pool that draws the eye to the content center
- Used in: Contact section, Projects section

---

## 7. Iconography & Visual Elements

### Approach

**No decorative icons.** This design system does not use icon libraries or illustrative graphics. Visual interest comes from:
- Typography (serif/mono contrast, scale variation, italic emphasis)
- Geometric line work (thin rules, node connections, grid patterns)
- Spatial composition (asymmetry, staggering, dramatic whitespace)

### Arrow & Symbol Language

| Symbol | Usage | Style |
|--------|-------|-------|
| `→` | Primary directional indicator | Inline with CTAs and links, coral colored |
| `↗` | External link indicator | Used for GITHUB ↗, LINKEDIN ↗ etc. |
| `·` | Stat separator | Inline between horizontal stat items |
| `—` | Section label separator | "001 — ABOUT" format |
| `\|` | Alternative separator | Between filter options or inline items |

### Decorative Numbers

Large serif numerals ("02", "03", "04") at 120–200px, colored in Whisper Dark (`#151518`), positioned behind section content. They create depth layering and reinforce the systematic numbering without competing for attention.

---

## 8. Animation & Motion Guidelines

### Philosophy

Motion should feel **mechanical and precise** — like a well-oiled system clicking into place. No bouncy springs, no playful wobbles. Think: a deployment terminal printing lines, not a beach ball bouncing.

### Recommended Patterns

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| **Section entry** | Fade up (opacity 0→1, translateY 20px→0) | 600ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| **Staggered children** | Sequential fade-up, 80–100ms delay between items | 400ms each | Same ease |
| **Service band hover** | Left border width 0→3px in coral, arrow translateX 0→4px | 200ms | `ease-out` |
| **Stat counters** | Count from 0 to final value on scroll entry | 1200ms | `ease-out` |
| **Grain texture** | Static — no animation | — | — |
| **Hero headline** | Character-by-character reveal or line-by-line fade | 800ms total | `ease` |
| **Scroll indicator** | Subtle vertical pulse (translateY 0→8px→0) | 2000ms | `ease-in-out`, infinite |

### What to Avoid

- Elastic/spring physics — too playful for the brutalist tone
- Parallax scrolling — overused, breaks the editorial flatness
- Color transitions on backgrounds — keep surfaces static
- Flashy page transitions — simple crossfades if needed
- Anything that feels "fun" — the motion language is *purposeful*, not *delightful*

---

## 9. Voice & Copy Guidelines

### Tone

Confident, direct, technical but human. Every heading is a statement, not a question. Copy is sparse — if it can be said in fewer words, cut it.

### Patterns

- **Headlines:** Short declarative statements with one italic emphasis word. ("Software that *thinks* for itself.", "Three disciplines. One system.", "Selected work.")
- **Section labels:** Systematic index format: "001 — INTRODUCTION", "002 — ABOUT", etc.
- **CTAs:** Action-oriented, developer-flavored: "VIEW WORK →", "INITIALIZE PROJECT →", "LET'S TALK →"
- **Stats:** Number-first, label-second: "50+ AUTOMATIONS", "100% RETENTION"
- **Micro-copy:** Code-comment style where appropriate: "// typically responds within 24 hours"
