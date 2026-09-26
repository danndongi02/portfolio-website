import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Ndururu",
    description:
      "A Kenya-rooted personal finance app with a grounded AI financial advisor, Paystack subscription billing, and a full double-entry-style ledger — built end to end and live in production.",
    longDescription:
      "Ndururu (\"coin\" in Sheng/Swahili — tagline \"Every cent, accounted for.\") is a production multi-user personal finance platform covering accounts, ten transaction types, categories, budgets, savings goals, loans with amortization, recurring payments, balance reconciliation, net-worth snapshots, and reports with CSV/PDF export, with each user able to pick their own currency and KES and other African currencies prioritized. The core differentiator is Rafiki, an AI financial advisor built with Google's Agent Development Kit and deployed on Vertex AI Agent Engine. It reads the user's real financial data through tools, grounds answers with search, sends a proactive weekly insights digest, and proposes budgets and savings goals that only apply after the user confirms. Around it sits a complete commercial layer: Paystack subscription billing (Free / Plus / Pro tiers, 30-day reverse trial, automated renewals with grace periods and dunning, M-Pesa renewals, plan upgrades and downgrades), server-side quota enforcement, transactional email, and a live-key cutover that was smoke-tested with a real KES 5 charge. Because it handles real money, most of the engineering effort went into integrity and safety: every write goes through validated Cloud Functions, per-user rate limiting and Firebase App Check protect every callable, Firestore security rules are covered by an emulator test suite, every domain action is written to an audit log exported to BigQuery, and deletion and reversal logic compensates linked goals, loans and balances rather than silently corrupting them.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Firebase (Auth, Firestore, Functions)",
      "Google ADK",
      "Vertex AI Agent Engine",
      "Gemini",
      "Paystack",
      "BigQuery",
      "Sentry",
    ],
    demoUrl: "https://ndururuapp.co.ke",
    image: "/projects/ndururu-dashboard.webp",
    screenshots: [
      "/projects/ndururu-dashboard.webp",
      "/projects/ndururu-advisor-chat.webp",
      "/projects/ndururu-budgets.webp",
      "/projects/ndururu-reports.webp",
      "/projects/ndururu-loans.webp",
    ],
    color: "#D97706",
    status: "completed",
    category: "Full-Stack",
    tasks: [
      {
        title: "Full-Stack Personal Finance Platform",
        description:
          "Designed and built a complete multi-user personal finance platform from the ground up, covering accounts, ten transaction types, budgets, savings goals, loans with amortization, recurring payments, reconciliation, net-worth snapshots, reports, and CSV/PDF export.",
      },
      {
        title: "Rafiki, the Grounded AI Financial Advisor",
        description:
          "Built the advisor as a Python ADK agent on Vertex AI Agent Engine with read tools over the user's own data, search grounding, and a confirm-before-apply flow for budget and savings-goal proposals. Added a weekly insights digest by email, per-tier usage quotas, and a rubric-based LLM-judge evalset.",
      },
      {
        title: "Subscription Billing with Paystack",
        description:
          "Delivered a nine-phase billing system: signature-verified webhooks, idempotent entitlement grants, a Cloud Tasks renewal engine with grace periods and dunning, M-Pesa STK renewals limited to business hours, plan changes, and a dual live/test mode. Validated end to end with a real live-money smoke test.",
      },
      {
        title: "Server-Side Entitlements and Quota Enforcement",
        description:
          "Made the subscription document the single source of truth for feature tiers, with a 30-day reverse trial, admin comp grants, and server-enforced caps on accounts, budgets, goals, history window and advisor messages. Advisor chat is deliberately capped on every tier so it can never become an uncapped cost.",
      },
      {
        title: "Security, Data Integrity and Audit Trail",
        description:
          "Moved every write behind roughly 60 validated Cloud Functions, added per-user rate limiting and App Check, locked sensitive collections to server-only writes with rules covered by emulator tests, and audit-logged every domain event to BigQuery. Fixed deletion and reversal bugs so linked goals, loans and balances stay correct.",
      },
      {
        title: "Account Lifecycle, Onboarding and Transactional Email",
        description:
          "Built a 9-step onboarding wizard with an escape hatch, a guided product tour, forgot/change-password and change-email flows, and account deletion with an audit trail. Added Resend-powered billing, digest and welcome emails with user preferences and unsubscribe.",
      },
    ],
  },
  {
    title: "Intric Solves Website",
    description:
      "A modern, high-converting landing page for Intric Solves — an AI automation agency — built to communicate their \"Max Compute\" brand, showcase their 4 core service engines, and drive consultation bookings.",
    longDescription:
      "Intric Solves is a Johannesburg-based AI automation agency operating under the \"Max Compute\" philosophy — the belief that no business resource should ever remain idle. I designed and built their full website from scratch using Next.js, creating a multi-page experience that positions the brand as a premium B2B AI partner. The site features an animated hero section with live-style metrics widgets, a scrolling client logo marquee, a detailed breakdown of their 4 productized service engines (Client Acquisition, Talent Acquisition, Data Analytics, and Data Acquisition), an animated stats section, a testimonials carousel, and a clear call-to-action funnel driving visitors to book a consultation. The site is fully responsive and designed to build credibility, communicate ROI-focused value propositions, and convert visitors into leads.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
    ],
    demoUrl: "https://intricsolves.com/",
    image: "/projects/intric-solves-landing-page.png",
    screenshots: [
      "/projects/intric-solves-landing-page.png",
      "/projects/intric-solves-services-page.png",
      "/projects/intric-solves-contact-page.png",
    ],
    color: "#6366F1",
    status: "completed",
    category: "Full-Stack",
    tasks: [
      {
        title: "Full Website Design & Development",
        description:
          "Designed and built the entire Intric Solves website from scratch in Next.js, covering all pages including Home, About, Services, Products, and Contact — translating the brand's \"Max Compute\" identity into a cohesive, professional visual experience.",
      },
      {
        title: "Animated Hero Section with Live Metrics UI",
        description:
          "Built an eye-catching hero section featuring animated real-time-style analytics widgets (tasks automated, accuracy rate, time saved, workflow statuses) to immediately communicate the platform's automation value to visitors.",
      },
      {
        title: "Scrolling Client Logo Marquee",
        description:
          "Implemented an infinite-scroll animated marquee showcasing trusted client and partner logos, including AA, DBSA, Lifestyle Aviation, and others, to build credibility above the fold.",
      },
      {
        title: "4 Productized Service Engine Cards",
        description:
          "Designed and developed detailed, structured cards for each of Intric's 4 service engines — Client Acquisition, Talent Acquisition, Data Analytics, and Data Acquisition — each with target audience, outcomes, and included features clearly laid out.",
      },
      {
        title: "Animated Stats & Social Proof Sections",
        description:
          "Built an animated counters/stats section highlighting key metrics (success rates, resource utilization, hiring speed), and a scrolling testimonials carousel featuring client quotes to reinforce trust and credibility.",
      },
      {
        title: "Multi-Page Structure & Navigation",
        description:
          "Architected a clean multi-page Next.js site with a responsive navigation bar, structured routing across all pages, and a consistent footer with contact details, service links, and legal pages.",
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
    title: "Data Analysis Chatbot",
    description:
      "A WhatsApp-connected AI agent that lets political analysts query a large voter database in plain English and instantly receive detailed analysis, summaries, and auto-generated data visualizations.",
    longDescription:
      "Built for a political party (client confidential), this project transforms how analysts interact with large-scale voter data. Instead of writing SQL queries or navigating dashboards, users simply ask questions in natural language over WhatsApp. The message is routed to an AI agent with direct access to a Google BigQuery database, which autonomously constructs the appropriate queries, retrieves the relevant data, and returns a detailed written analysis alongside a contextually appropriate data visualization — bar charts, histograms, and more — generated on the fly. Use cases ranged from identifying rejection rate patterns and youth voter targeting opportunities, to pinpointing high-priority voting districts and looking up individual voter records. The system effectively democratizes data access, enabling non-technical campaign staff to extract actionable intelligence from complex datasets in seconds.",
    technologies: [
      "WhatsApp Business API",
      "Google ADK (Agent Development Kit)",
      "Google BigQuery",
      "Data Visualization",
      "Natural Language to SQL",
    ],
    image: "/projects/data-analysis-chatbot.png",
    color: "#4285F4",
    status: "completed",
    category: "AI/Agents",
    tasks: [
      {
        title: "Natural Language Query Interface via WhatsApp",
        description:
          "Built a WhatsApp-based interface that accepts plain English questions from users and routes them to an AI agent, eliminating the need for technical knowledge or query languages to access complex voter data.",
      },
      {
        title: "AI Agent with BigQuery Access",
        description:
          "Developed an AI agent capable of interpreting user questions, constructing appropriate database queries against a large Google BigQuery voter dataset, and retrieving accurate, relevant results autonomously.",
      },
      {
        title: "Automated Data Analysis & Summarization",
        description:
          "Configured the agent to go beyond raw data retrieval — synthesizing query results into detailed written analyses and actionable summaries, including strategic recommendations such as campaign targeting and resource allocation insights.",
      },
      {
        title: "Dynamic Data Visualization Generation",
        description:
          "Implemented automatic generation of contextually appropriate visualizations (e.g. bar charts for provincial comparisons, histograms for age distributions) returned directly to the user alongside the written analysis, enabling quick visual comprehension of complex data.",
      },
      {
        title: "Individual Voter Lookup",
        description:
          "Built a conversational voter search flow where users can provide a name and date of birth to retrieve individual voter registration details, district assignments, and address information from the database.",
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
    title: "Bloom & Bond",
    description:
      "A complete e-commerce platform for a Nairobi floral, gifting and event-styling brand: a 3D-animated storefront with Paystack checkout and M-Pesa support, backed by a real-time admin dashboard that runs orders, catalog, delivery, promotions, sales analytics and website traffic.",
    longDescription:
      "Bloom & Bond is a Nairobi floral, gifting and event-styling business that needed to stop taking orders by hand and sell online, with a proper back office to run the operation. The platform is two Next.js applications sharing one Firebase backend. The customer storefront offers a catalog filtered by occasion, category and price, product pages with size variants and personalised add-ons, a two-step guest checkout through Paystack (M-Pesa, cards and bank transfer), a live-updating order confirmation page, sitewide sales and promo codes, and an events inquiry form for weddings, showers and corporate styling, all behind a landing page with a 3D rotating bouquet hero and scroll-driven motion. The separate admin dashboard is the business's day-to-day operating system: a real-time order queue with guided status transitions and a status-journey stepper, manual order entry for phone and walk-in sales, full management of products, categories, add-ons, delivery areas, blackout dates, recurring closures, offer periods and promo codes, Chart.js sales analytics for revenue, order status and sales channel, a Website Traffic page that pulls visitors, traffic sources, the shopping funnel and Google search performance from the GA4 Data API and Search Console, and an append-only activity log of every staff change. Because the store takes money from anonymous visitors, the backend never trusts the browser: Cloud Functions re-price every cart from Firestore, enforce delivery zones, blackout dates and same-day cutoffs, verify Paystack webhook signatures and cross-check amounts, apply per-IP rate limiting, and sit behind Firebase App Check. Promo codes are reserved atomically only once payment is confirmed, every staff write is gated by Firestore rules covered by an emulator test suite, and staff sessions use server-verified cookies with idle timeout and cross-tab sign-out. Every paid order instantly alerts the owner on Telegram and email, and customers receive branded status emails from the store's own domain. Both apps run on Firebase App Hosting, with the storefront live on its custom domain and the end-to-end payment path verified in Paystack's test environment ahead of the live-payments switch.",
    technologies: [
      "Next.js",
      "JavaScript",
      "Firebase (Auth, Firestore, Functions, App Hosting)",
      "Paystack",
      "Three.js / React Three Fiber",
      "GSAP",
      "Chart.js",
      "Resend",
      "GA4 & Search Console APIs",
      "Telegram Bot API",
    ],
    demoUrl: "https://bloomandbond.co.ke",
    image: "/projects/bloom-and-bond-home.png",
    screenshots: [
      "/projects/bloom-and-bond-home.png",
      "/projects/bloom-and-bond-admin-overview.png",
      "/projects/bloom-and-bond-admin-orders.png",
      "/projects/bloom-and-bond-admin-order-detail.png",
      "/projects/bloom-and-bond-admin-analytics.png",
      "/projects/bloom-and-bond-admin-traffic.png",
      "/projects/bloom-and-bond-catalog.png",
      "/projects/bloom-and-bond-product.png",
    ],
    color: "#C4876A",
    status: "in-progress",
    category: "Full-Stack",
    tasks: [
      {
        title: "Customer Storefront and Catalog",
        description:
          "Designed and built the public storefront: a catalog filtered by occasion, category and price, product pages with a swipeable image gallery, size variants and per-product add-ons, and an events inquiry form for the Bloom Events service line. Added per-page metadata, a sitemap, structured data and a consent-gated GA4 ecommerce funnel.",
      },
      {
        title: "Brand Experience and Motion Design",
        description:
          "Applied the brand's pink, cream and sage identity across a landing page with a 3D rotating rose-bouquet hero in React Three Fiber, GSAP scroll reveals and Framer Motion transitions. Low-power, touch and reduced-motion visitors get a lightweight fallback.",
      },
      {
        title: "Paystack Checkout and Order Notifications",
        description:
          "Built a two-step guest checkout that hands off to Paystack's inline popup for M-Pesa, card and bank payments. A signature-verified webhook confirms payment, the confirmation page updates live, the owner is alerted instantly on Telegram and email, and customers receive branded status emails through Resend.",
      },
      {
        title: "Admin Dashboard: Real-Time Order Operations",
        description:
          "Delivered a separate, mobile-responsive back-office app on the same Firebase project, with a live order queue and search, guided status transitions with a status-journey stepper, and manual entry for phone and walk-in orders. Added an append-only activity log that records every staff change against the writer's identity and server time.",
      },
      {
        title: "Admin Dashboard: Catalog, Delivery and Promotions",
        description:
          "Built real-time management for products (with image upload and size variants), categories, add-ons, delivery areas, blackout dates and recurring closures, with guarded deletes that block removing anything still in use. Added sitewide offer periods and usage-limited promo codes that never stack, with the better discount applied automatically at checkout.",
      },
      {
        title: "Admin Dashboard: Sales Analytics and Website Traffic",
        description:
          "Built an overview and analytics section on Chart.js with revenue trends, order status and sales-channel breakdowns, and week-over-week summaries. Added a Website Traffic page that reads the GA4 Data API and Search Console server-side to show visitors, traffic sources, the shopping funnel, top pages, devices and Google search queries, cached in Firestore with per-source fallbacks.",
      },
      {
        title: "Server-Side Pricing, Security and Access Control",
        description:
          "Moved all order creation into Cloud Functions that re-price every cart from Firestore and enforce delivery zones, blackout dates and same-day cutoffs, with per-IP rate limiting, payment-time promo reservation and Firebase App Check on checkout. Secured staff access with server-verified session cookies, an admin custom claim enforced by emulator-tested Firestore and Storage rules, idle timeout and cross-tab sign-out.",
      },
      {
        title: "Cloud Deployment on Firebase App Hosting",
        description:
          "Deployed the storefront and admin dashboard as two App Hosting backends with secrets in Secret Manager, autoscaling sized for launch traffic, and the storefront on its own custom domain with a verified email-sending domain. Separated Paystack test and live keys by environment and verified the full payment path end to end in Paystack's test environment.",
      },
    ],
  },
];
