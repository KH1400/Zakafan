"use client";

import { useEffect, useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";
import { DynoCategory, type Language } from "@/lib/content-data";
import { fetchCategories } from "../../lib/api";
import Loding from "./loading";

export function InteractiveBanners({ lang = 'en' }: { lang: Language }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<DynoCategory[]>([]);
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';
  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    try {
      const cates: any = await fetchCategories().json();
      setCategories(cates.categories.map((c: any) => ({...c, image: c.image_file, imageHint: c.image_hint})));
    } catch (error) {
      console.log(error)
    }
  }

  if(categories.length === 0){
    return <Loding/>
  }
  
  return (
    <div
      className={cn("flex h-full w-full", isRtl && "flex-row-reverse")}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {categories.map((banner, index) => {
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
            isLast={index === categories.length - 1}
          />
        )
      })}
    </div>
  );
}
