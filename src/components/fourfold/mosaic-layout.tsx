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

// Smart layout algorithm
function generateSmartLayout(panels: MosaicPanelData[]) {
  const layoutPanels = panels.map((panel, index) => ({
    ...panel,
    layoutSize: SIZES[index % 4], // Cycle through sizes
    originalIndex: index
  }));

  // Sort panels to optimize layout - larger panels first helps reduce gaps
  return layoutPanels.sort((a, b) => {
    const aArea = a.layoutSize.width * a.layoutSize.height;
    const bArea = b.layoutSize.width * b.layoutSize.height;
    return bArea - aArea; // Larger areas first
  });
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex h-full items-start p-4 md:p-6">
        <h3 className={`
          ${selectedLang.font} 
          ${layoutSize.width === 2 ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'} 
          font-bold text-white drop-shadow-lg font-headline
        `}>
          {panel.title[language]}
        </h3>
      </div>
      
      {/* Size indicator for development - remove in production */}
      {/* <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {layoutSize.width}x{layoutSize.height}
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
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[25vw] gap-2 overflow-y-auto overflow-x-hidden">
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