import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
};
