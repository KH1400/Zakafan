// src/lib/iconMap.ts
import {
  Shield,
  BarChart3,
  Trophy,
  MessageSquareQuote,
  Brain
} from "lucide-react";

export const iconMap = {
  Shield,
  BarChart3,
  Trophy,
  MessageSquareQuote,
  Brain
};

export type IconName = keyof typeof iconMap; // "Shield" | "BarChart3" | ...
