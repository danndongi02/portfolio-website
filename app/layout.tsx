import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ian Portfolio - Software Engineer",
  description: "Personal portfolio showcasing my projects, skills, and experience in software development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
        )}
      >
        {children}
      </body>
    </html>
  );
}
