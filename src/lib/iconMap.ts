// src/lib/iconMap.ts
import {
  Shield,
  BarChart3,
  Trophy,
  MessageSquareQuote,
} from "lucide-react";

export const iconMap = {
  Shield,
  BarChart3,
  Trophy,
  MessageSquareQuote,
};

export type IconName = keyof typeof iconMap; // "Shield" | "BarChart3" | ...
