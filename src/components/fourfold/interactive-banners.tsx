"use client";

import { useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";
import { sections, type Language } from "@/lib/content-data";

export function InteractiveBanners({ lang = 'en' }: { lang: Language }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  return (
    <div
      className={cn("flex h-full w-full", isRtl && "flex-row-reverse")}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {sections.map((banner, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        const finalHref = `/${banner.href}${lang === 'en' ? '' : `?lang=${lang}`}`;
        
        return (
          <BannerPanel
            key={banner.href}
            icon={banner.icon}
            title={banner.title[lang]}
            description={banner.description[lang]}
            href={finalHref}
            image={banner.image}
            imageHint={banner.imageHint}
            isHovered={isHovered}
            isAnyHovered={isAnyHovered}
            onMouseEnter={() => setHoveredIndex(index)}
            isLast={index === sections.length - 1}
          />
        )
      })}
    </div>
  );
}
