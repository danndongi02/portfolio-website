import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ianmuigai.dev";

const metaDescription =
  "Freelance full-stack developer and automation architect based in Nairobi, available worldwide. I build web applications, workflow automation systems, and agentic AI pipelines that eliminate manual overhead.";

export const metadata: Metadata = {
  title: "Ian Muigai — Full-Stack Developer & Automation Architect",
  description: metaDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Ian Muigai — Full-Stack Developer & Automation Architect",
    description: metaDescription,
    url: siteUrl,
    siteName: "Ian Muigai",
    images: [
      {
        url: `${siteUrl}/me.png`,
        width: 1200,
        height: 630,
        alt: "Ian Muigai — Full-Stack Developer & Automation Architect",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Muigai — Full-Stack Developer & Automation Architect",
    description: metaDescription,
    images: [`${siteUrl}/me.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Ian Muigai",
      jobTitle: "Full-Stack Developer & Automation Architect",
      url: siteUrl,
      sameAs: [
        "https://github.com/danndongi02",
        process.env.NEXT_PUBLIC_LINKEDIN_URL,
      ].filter(Boolean),
    },
    {
      "@type": "ProfessionalService",
      name: "Ian Muigai — Development & Automation",
      description:
        "Full-stack web development, workflow automation, and agentic AI systems",
      areaServed: "Worldwide",
      provider: {
        "@type": "Person",
        name: "Ian Muigai",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          instrumentSerif.variable,
          jetbrainsMono.variable,
          "font-mono min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
