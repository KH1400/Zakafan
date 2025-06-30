"use client";
import Link from "next/link";
import Image from "next/image";
import { MosaicPanelData } from "../../lib/content-data";
import { useLanguage } from "../../lib/language-context";
import { Languages } from "lucide-react";

type MosaicLayoutProps = {
  panels: MosaicPanelData[];
  baseHref: string;
  lang: string;
};

// Define size configurations
const SIZES = [
  { width: 1, height: 1, class: 'col-span-1 row-span-1' }, // Size 1: 1x1
  { width: 2, height: 1, class: 'col-span-2 row-span-1' }, // Size 2: 2x1
  { width: 1, height: 2, class: 'col-span-1 row-span-2' }, // Size 3: 1x2
  { width: 2, height: 2, class: 'col-span-2 row-span-2' }, // Size 4: 2x2
];

// Advanced smart layout algorithm to minimize gaps with more size variety
function generateSmartLayout(panels: MosaicPanelData[]) {
  if (panels.length === 0) return [];
  
  // Enhanced patterns with more variety and interesting combinations
  const patterns = [
    // Pattern 1: Big statement piece with small accents
    [3, 0, 0, 0, 1, 2, 0, 1, 0, 0, 2, 0], // 2x2, 1x1, 1x1, 1x1, 2x1, 1x2, 1x1, 2x1, 1x1, 1x1, 1x2, 1x1
    
    // Pattern 2: Alternating rhythm
    [0, 2, 0, 1, 0, 0, 3, 0, 2, 1, 0, 0], // 1x1, 1x2, 1x1, 2x1, 1x1, 1x1, 2x2, 1x1, 1x2, 2x1, 1x1, 1x1
    
    // Pattern 3: Vertical emphasis
    [2, 0, 2, 1, 0, 0, 0, 2, 3, 0, 1, 0], // 1x2, 1x1, 1x2, 2x1, 1x1, 1x1, 1x1, 1x2, 2x2, 1x1, 2x1, 1x1
    
    // Pattern 4: Horizontal flow
    [1, 0, 0, 2, 1, 0, 2, 0, 0, 3, 0, 1], // 2x1, 1x1, 1x1, 1x2, 2x1, 1x1, 1x2, 1x1, 1x1, 2x2, 1x1, 2x1
    
    // Pattern 5: Mixed large pieces
    [3, 1, 0, 0, 0, 2, 3, 0, 1, 0, 2, 0], // 2x2, 2x1, 1x1, 1x1, 1x1, 1x2, 2x2, 1x1, 2x1, 1x1, 1x2, 1x1
    
    // Pattern 6: Compact clusters
    [0, 0, 1, 2, 0, 2, 0, 0, 1, 3, 0, 0], // 1x1, 1x1, 2x1, 1x2, 1x1, 1x2, 1x1, 1x1, 2x1, 2x2, 1x1, 1x1
  ];
  
  const layoutPanels = panels.map((panel, index) => {
    // Choose pattern based on total number of panels with more variety
    const patternIndex = Math.floor(index / 12) % patterns.length;
    const positionInPattern = index % 12;
    const sizeIndex = patterns[patternIndex][positionInPattern];
    
    return {
      ...panel,
      layoutSize: SIZES[sizeIndex],
      originalIndex: index,
      patternGroup: Math.floor(index / 12)
    };
  });

  // Group panels by pattern groups and arrange them
  const groupedPanels: any[] = [];
  const groups = layoutPanels.reduce((acc: any, panel) => {
    if (!acc[panel.patternGroup]) acc[panel.patternGroup] = [];
    acc[panel.patternGroup].push(panel);
    return acc;
  }, {});

  // Process each group with enhanced sorting for better visual flow
  Object.keys(groups).forEach(groupKey => {
    const group = groups[groupKey];
    
    // More sophisticated sorting: create visual rhythm
    const sortedGroup = group.sort((a: any, b: any) => {
      const aArea = a.layoutSize.width * a.layoutSize.height;
      const bArea = b.layoutSize.width * b.layoutSize.height;
      
      // Create clusters: big pieces first, then medium, then small
      if (aArea === 4 && bArea !== 4) return -1; // 2x2 first
      if (bArea === 4 && aArea !== 4) return 1;
      
      if (aArea === 2 && bArea === 1) return -1; // 2x1 and 1x2 before 1x1
      if (bArea === 2 && aArea === 1) return 1;
      
      // Within same area, vary the dimensions for better fit
      if (aArea === bArea) {
        return Math.random() - 0.5; // Add some randomness for natural feel
      }
      
      return bArea - aArea;
    });
    
    groupedPanels.push(...sortedGroup);
  });

  return groupedPanels;
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
        h-60 md:h-auto
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
          ${layoutSize.width === 2 ? 'text-xl md:text-2xl lg:text-3xl xl:text-4xl' : 'text-lg md:text-xl lg:text-2xl xl:text-3xl'} 
          font-bold text-white drop-shadow-lg font-headline
          transition-all duration-300
        `}>
          {panel.title[language]}
        </h3>
      </div>

      {/* Title overlay that appears on scroll - positioned at top */}
      {/* <div className="absolute top-0 left-0 right-0 p-4 md:p-6 lg:p-8 transform -translate-y-full transition-all duration-500 group-hover:translate-y-0 bg-gradient-to-b from-black/80 to-transparent">
        <h3 className={`
          ${selectedLang.font} 
          ${layoutSize.width === 2 ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg lg:text-xl'} 
          font-bold text-white drop-shadow-lg font-headline
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200
        `}>
          {panel.title[language]}
        </h3>
      </div> */}
    </Link>
  );
}

export function MosaicLayout({ panels, baseHref, lang }: MosaicLayoutProps) {
  const { language } = useLanguage();
  
  // Generate smart layout
  const layoutPanels = generateSmartLayout(panels);
 
  return (
    <div className="w-full h-full">
      <div className="grid w-full h-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[50vw] md:auto-rows-[20vw] gap-2 overflow-y-auto overflow-x-hidden" style={{gridAutoFlow: 'row dense'}}>
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