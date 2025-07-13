"use client";
import Link from "next/link";
import Image from "next/image";
import { MosaicPanelData } from "../../lib/content-types";
import { useLanguage } from "../../lib/language-context";
import { Languages } from "lucide-react";
import { useMemo } from "react";

type MosaicLayoutProps = {
  panels: MosaicPanelData[];
  baseHref: string;
  lang: string;
};

// Define size configurations
const SIZES = [
  { width: 1, height: 1, class: 'md:col-span-1 md:row-span-1' }, // Size 0: 1x1
  { width: 2, height: 1, class: 'md:col-span-2 md:row-span-1' }, // Size 1: 2x1
  { width: 1, height: 2, class: 'md:col-span-1 md:row-span-2' }, // Size 2: 1x2
  { width: 2, height: 2, class: 'md:col-span-2 md:row-span-2' }, // Size 3: 2x2
];

// Fixed patterns based on panel count
function generateFixedLayout(panels: MosaicPanelData[]) {
  if (panels.length === 0) return [];
  
  const basePatterns: { [key: number]: number[] } = {
    3: [3, 1, 1],
    4: [3, 2, 0, 0],
    5: [2, 1, 1, 0, 0],
    6: [2, 1, 0, 0, 0, 0],
    7: [3, 1, 1, 2, 3, 0, 0],
    8: [3, 1, 1, 2, 1, 1, 0, 0], // Combination of 3 and 5 patterns
    9: [3, 2, 0, 0, 2, 1, 1, 0, 0], // Combination of 4 and 5 patterns
    10: [3, 2, 0, 0, 2, 1, 0, 0, 0, 0], // Combination of 4 and 6 patterns
  };

  let finalPattern: number[];

  if (panels.length <= 10) {
    // Use predefined patterns for 10 or fewer panels
    finalPattern = basePatterns[panels.length] || new Array(panels.length).fill(0);
  } else {
    // Smart combination for more than 10 panels
    finalPattern = generateSmartCombination(panels.length, basePatterns);
  }

  return panels.map((panel, index) => {
    const sizeIndex = finalPattern[index] || 0; // Default to 1x1 if pattern is shorter
    
    return {
      ...panel,
      layoutSize: SIZES[sizeIndex],
      originalIndex: index,
    };
  });
}

// Smart combination function for panels > 10
function generateSmartCombination(totalPanels: number, basePatterns: { [key: number]: number[] }): number[] {
  const result: number[] = [];
  let remaining = totalPanels;
  
  // Available pattern sizes (prioritize larger, more interesting patterns)
  const patternSizes = [10, 9, 8, 7, 6, 5, 4, 3];
  
  while (remaining > 0) {
    // Find the largest pattern that fits
    let selectedSize = 0;
    for (const size of patternSizes) {
      if (size <= remaining && basePatterns[size]) {
        selectedSize = size;
        break;
      }
    }
    
    // If no pattern fits, fill with 1x1 (size 0)
    if (selectedSize === 0) {
      result.push(...new Array(remaining).fill(0));
      break;
    }
    
    // Add the selected pattern
    result.push(...basePatterns[selectedSize]);
    remaining -= selectedSize;
  }
  
  return result;
}

function MosaicPanel({ 
  panel, 
  baseHref, 
  lang, 
  priority = false,
  layoutSize
}: { 
  panel: MosaicPanelData, 
  baseHref: string, 
  lang: string,
  priority?: boolean,
  layoutSize: typeof SIZES[0]
}) {
  const { language, selectedLang } = useLanguage();
  const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
  const href = `${baseHref}/${panel.slug}${langQuery}`;
     
  return (
    <Link
      href={href}
      className={`
        ${selectedLang.font} 
        group relative block overflow-hidden 
        transition-transform duration-300 ease-in-out 
        hover:scale-[1.02] hover:z-10 
        h-44 md:h-auto
        ${layoutSize.class}
      `}
      aria-label={panel.title[language]}
    >
      <Image
        src={panel.image || `/categories/c${panel.categories[0]}.jpg`}
        alt={panel.slug}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        data-ai-hint={panel.imageHint}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Dark overlay - lighter initially */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/70 group-hover:via-black/40" />
      
      {/* Title - initially at bottom, moves up on scroll/hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <h3 className={`
          ${selectedLang.font} 
          text-lg md:text-xl lg:text-2xl 
          text-white/50 drop-shadow-lg font-headline
          transition-all duration-300  group-hover:text-white
        `}>
          {panel.title[language]}
        </h3>
      </div>
    </Link>
  );
}

export function MosaicLayout({ panels, baseHref, lang }: MosaicLayoutProps) {
  const { language } = useLanguage();
  
  // Use useMemo to prevent regenerating layout on every render
  const layoutPanels = useMemo(() => {
    return generateFixedLayout(panels);
  }, [panels]); // Only regenerate when panels actually change
 
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[20vw] gap-2 md:overflow-y-auto overflow-x-hidden" style={{gridAutoFlow: 'row dense'}}>
        {layoutPanels.map((panel, index) => (
          <MosaicPanel 
            key={`${panel.title[language]}-${panel.originalIndex}`}
            panel={panel} 
            baseHref={baseHref} 
            lang={lang}
            layoutSize={panel.layoutSize}
            priority={panel.originalIndex < 4}
          />
        ))}
      </div>
    </div>
  );
}