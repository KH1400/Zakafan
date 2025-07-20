"use client";

import { useEffect, useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";
import { DynoCategory, type Language } from "@/lib/content-types";
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
      setCategories(cates.categories.sort((a: any, b: any) => b.id - a.id).map((c: any) => ({...c, image: c.image_file, imageHint: c.image_hint})));
    } catch (error) {
      console.log(error)
    }
  }

  if(categories.length === 0){
    return <Loding/>
  }
  
  return (
    <div
      className={cn("flex flex-col shrink md:flex-row h-full w-full")}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {categories.sort((a,b) => a.order - b.order).map((category, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        const finalHref = `/${category.href}${lang === 'en' ? '' : `?lang=${lang}`}`;
        
        return (
          <BannerPanel
            key={category.href}
            icon={category.icon}
            title={category.title[lang]}
            description={category.description[lang]}
            href={finalHref}
            image={category.image.file_url}
            imageHint={category.imageHint}
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
