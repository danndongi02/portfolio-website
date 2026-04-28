import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Phoetic",
    description:
      "A premium photography portfolio featuring advanced scroll-driven GSAP animations, parallax floating images, filterable masonry galleries with lightbox, and a validated contact system — designed and built for a professional photographer.",
    longDescription:
      "Phoetic is a high-end photography portfolio website built for a professional photographer. The project demanded a visually immersive experience that would let the photography speak for itself while maintaining buttery-smooth performance. Every section features custom scroll-driven animations powered by GSAP ScrollTrigger, from center-outward clip-path text reveals to parallax depth-layered floating images that respond to mouse movement. The portfolio page includes a filterable masonry gallery with a direction-aware lightbox viewer, sticky filter bar, and dynamic category routing. The contact system uses React Hook Form with Zod validation and features a morphing submit button with animated state transitions.",
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
    screenshots: [
      "/projects/phoetic.png",
      "/projects/phoetic-portfolio.png",
      "/projects/phoetic-services.png",
      "/projects/phoetic-about.png",
      "/projects/phoetic-contact.png",
    ],
    color: "#10B981",
    status: "in-progress",
    category: "Software Dev",
    tasks: [
      {
        title: "Scroll-Driven Animation System",
        description:
          "Built a comprehensive GSAP ScrollTrigger animation system with pinned sections, scrub-based parallax, staggered grid reveals, and clip-path text animations that trigger on viewport entry.",
      },
      {
        title: "Parallax Floating Image Engine",
        description:
          "Implemented mouse-responsive floating images with depth layers using useAnimationFrame for high-performance position calculations across multiple z-depth planes.",
      },
      {
        title: "Masonry Gallery with Lightbox",
        description:
          "Created a filterable responsive masonry gallery (2/3/4 columns) with a sticky filter bar, GSAP sliding underline, and a direction-aware lightbox viewer with keyboard navigation.",
      },
      {
        title: "Contact Form with Animated States",
        description:
          "Built a validated contact form using React Hook Form + Zod with a morphing submit button that transitions through idle, sending, success, and error states via GSAP timelines.",
      },
      {
        title: "Multi-Page Architecture",
        description:
          "Designed and implemented 5 distinct pages (Home, Portfolio, Services, About, Contact) with shared layout components, page transition animations, and dynamic category routing.",
      },
      {
        title: "3D Perspective Interactions",
        description:
          "Added 3D perspective tilt cards in the Why Choose Us section and per-character rotateY flip animations for hero text across multiple pages.",
      },
    ],
  },
  {
    title: "Kamunic8",
    description:
      "An AI-powered appointment management platform where users book, reschedule, and cancel appointments by simply texting or calling a WhatsApp number — no forms, no apps, just conversation.",
    longDescription:
      "Kamunic8 is a full-stack appointment management platform built for organizations that want to eliminate friction from the booking process. Instead of traditional booking flows, customers interact through WhatsApp — texting a chatbot that uses AI to understand intent, generate contextual responses, and make tool calls to create, cancel, or reschedule appointments. The bot is also connected to a knowledge base, allowing it to answer organization-specific queries on the fly. For users who prefer voice, the platform integrates a VAPI-powered AI voice agent on the same number, offering identical capabilities over a phone call. Human support is also available — when a customer requests it, their messages or calls are silently routed to a real support agent's WhatsApp or phone, without ever exposing the agent's personal number. On the dashboard side, owners and managers get a full metrics view including interaction counts, costs, peak activity hours, appointment calendars, and broadcast tools (WhatsApp messages or voice call campaigns). Advisors get their own focused dashboard with calendar and client list views.",
    technologies: [
      "Next.js",
      "Firebase",
      "WhatsApp Business API",
      "VAPI",
      "AI/LLM",
      "Node.js",
    ],
    image: "/projects/kamunic8.svg",
    color: "#25D366",
    status: "in-progress",
    category: "AI/Agents",
    tasks: [
      {
        title: "AI WhatsApp Chatbot with Tool Calling",
        description:
          "Built an AI-powered chatbot routed through Firebase Functions that handles the full appointment lifecycle — creating, cancelling, and rescheduling — by understanding natural language and making the appropriate tool calls, rather than relying on a rigid step-by-step flow.",
      },
      {
        title: "Knowledge Base Integration",
        description:
          "Connected the chatbot to a dynamic knowledge base so it can accurately answer organization-specific questions and queries from customers in real time, without needing human intervention.",
      },
      {
        title: "VAPI Voice Agent Integration",
        description:
          "Integrated a VAPI AI voice calling agent that mirrors all chatbot capabilities over a phone call, allowing customers to book or manage appointments by voice on the same official organization number.",
      },
      {
        title: "Human Support Routing System",
        description:
          "Built a seamless support handoff system where customers requesting human support are silently routed — via text or call — to a real support agent's personal number, while always communicating through the organization's official number, keeping agent contact details private.",
      },
      {
        title: "Manager / Owner Dashboard",
        description:
          "Developed a metrics-rich dashboard for owners and managers featuring total interaction counts, AI cost tracking, peak activity hour charts, appointment calendars, and a broadcast tool for sending WhatsApp messages or triggering voice call campaigns to clients.",
      },
      {
        title: "Advisors Dashboard",
        description:
          "Built a dedicated dashboard for advisors showing a calendar view of their upcoming appointments and a client list, giving them a focused, clutter-free workspace.",
      },
      {
        title: "Meta & VAPI Programmatic Phone Linking",
        description:
          "Implemented Firebase Functions logic to programmatically link organization phone numbers to both the Meta WhatsApp Business API and VAPI, automating the onboarding process for new organizations on the platform.",
      },
    ],
  },
  {
    title: "Emergency Services Chatbot",
    description:
      "A WhatsApp-based roadside rescue assistant that automates emergency dispatch, membership management, and sales for a leading roadside assistance provider — replacing traditional call center workflows with a scalable digital system.",
    longDescription:
      "Built for a leading roadside assistance and emergency services provider, this WhatsApp chatbot serves as a 24/7 automated rescue assistant that handles everything from emergency triage to membership renewals. Users are guided through structured interactive menus — eliminating typing errors — while the system verifies membership status in real time, collects precise GPS location via WhatsApp location pins, and extracts vehicle details from license disc photos using OCR. Safety triage protocols assess whether police or security presence is needed, and diagnostic question trees ensure patrol teams arrive with the right equipment. For mechanical breakdowns, the bot surfaces nearby approved repair centers ranked by rating. On the sales side, it acts as a fully compliant digital sales agent — capturing CRM data, checking IDs against databases to prevent duplicates, displaying product tiers with pricing, obtaining legal consent, and generating secure payment links for renewals. The solution replaces inconsistent, error-prone call center operations with a uniform, scalable system that maintains data accuracy and compliance across every interaction.",
    technologies: [
      "WhatsApp Business API",
      "OCR (Optical Character Recognition)",
      "Real-time Geolocation / Maps API",
      "Payment Gateway Integration",
      "CRM Integration",
      "Backend Database",
    ],
    image: "/projects/emergency-services-chatbot.png",
    color: "#E63946",
    status: "completed",
    category: "Automation",
    tasks: [
      {
        title: "Emergency Triage & Dispatch Flow",
        description:
          "Designed and built the core emergency workflow — from initial greeting to dispatch — using interactive WhatsApp menus to guide users through safety triage, passenger and accessibility checks, and issue classification, ensuring the right resources are sent every time.",
      },
      {
        title: "Membership Verification & Dual-Path Journeys",
        description:
          "Implemented real-time membership status checks that split users into tailored flows — verified members get personalized service, while non-members are offered a pay-as-you-use model to capture leads without turning them away.",
      },
      {
        title: "OCR-Powered License Disc Scanning",
        description:
          "Integrated optical character recognition so users can simply photograph their license disc and have their vehicle's make, model, VIN, and registration extracted automatically — removing manual data entry and reducing errors.",
      },
      {
        title: "GPS Location Pinning for Dispatch",
        description:
          "Leveraged WhatsApp's native location sharing to capture precise GPS coordinates from users, feeding exact pickup points directly to dispatch teams rather than relying on verbal descriptions.",
      },
      {
        title: "Patrol Diagnostic Mode",
        description:
          "Built a customizable diagnostic question tree for roadside patrol issues (flat tyres, fuel, jump starts, etc.) that collects specific vehicle and situation details so patrol teams arrive on scene fully prepared with the correct tools and parts.",
      },
      {
        title: "Repair Centre Recommendation Engine",
        description:
          "Integrated a geolocation-based search that identifies and surfaces a shortlist of top-rated, approved repair centres near the user's breakdown location, simplifying a stressful decision for members in the field.",
      },
      {
        title: "Automated Membership Sales & Renewals",
        description:
          "Developed a fully compliant sales flow that captures CRM data, validates ID numbers against existing records to prevent duplicates, presents product tiers with pricing, records legal consent and marketing preferences, and generates unique secure payment links for instant membership purchase or renewal.",
      },
    ],
  },
  {
    title: "Portfolio Website",
    description:
      "An editorial brutalist-tech portfolio with Framer Motion scroll animations, SVG grain textures, and a dark monochrome design system with coral accents — the site you're looking at right now.",
    longDescription:
      "This portfolio website follows an editorial brutalist-tech design direction — near-black backgrounds, serif + monospace typography pairing, and a strict monochrome palette with a single coral accent color. The design system was built from scratch with semantic HSL CSS variables, SVG grain texture overlays, and deliberate asymmetric layouts. Every section uses Framer Motion for scroll-triggered entrance animations with mechanical easing curves. The project detail system includes modal views with task breakdowns, technology tags, and screenshot galleries.",
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
    tasks: [
      {
        title: "Editorial Brutalist Design System",
        description:
          "Created a complete design system with HSL CSS variables, grain texture overlays, Instrument Serif + JetBrains Mono typography pairing, and semantic color tokens for a dark monochrome aesthetic.",
      },
      {
        title: "Scroll-Based Section Animations",
        description:
          "Implemented Framer Motion scroll-triggered animations with mechanical easing curves, staggered reveals, and viewport-aware entrance transitions for every section.",
      },
      {
        title: "Project Detail Modal System",
        description:
          "Built a Radix UI dialog-based modal for detailed project views, featuring task breakdowns, technology tags, screenshot galleries, and external links.",
      },
      {
        title: "Responsive Navigation",
        description:
          "Designed a scroll-aware navbar that tracks active sections with a glow effect, rendering at the bottom on mobile and top on desktop.",
      },
    ],
  },
];
