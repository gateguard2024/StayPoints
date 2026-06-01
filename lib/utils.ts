import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPoints(pts: number) {
  return pts.toLocaleString();
}

export function getTier(points: number): "bronze" | "silver" | "gold" | "platinum" {
  if (points >= 7500) return "platinum";
  if (points >= 5000) return "gold";
  if (points >= 2500) return "silver";
  return "bronze";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}
