"use client";
import Link from "next/link";
import Image from "next/image";
import { MosaicPanelData } from "../../lib/content-data";
import { useLanguage } from "../../lib/language-context";

type MosaicLayoutProps = {
  panels: MosaicPanelData[];
  baseHref: string;
  lang: string;
};

function MosaicPanel({ 
  panel, 
  baseHref, 
  lang, 
  index = 0,
  priority = false 
}: { 
  panel: MosaicPanelData, 
  baseHref: string, 
  lang: string,
  index?: number,
  priority?: boolean
}) {
  const { selectedLang } = useLanguage();
  const slug = panel.title.toLowerCase().trim().replace(/[\s\W-]+/g, '-');
  const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
  const href = `${baseHref}/${slug}${langQuery}`;
     
  return (
    <Link
      href={href}
      className={`${selectedLang.font} group relative block overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:z-10 h-60 md:h-auto ${panel.size === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
      aria-label={panel.title}
    >
      <Image
        src={panel.image}
        alt={panel.title}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        data-ai-hint={panel.imageHint}
        // Lazy Loading Properties
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        // بهینه‌سازی‌های اضافی
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex h-full items-end p-4 md:p-6">
        <h3 className={`${selectedLang.font} text-lg md:text-2xl font-bold text-white drop-shadow-lg font-headline`}>
          {panel.title}
        </h3>
      </div>
    </Link>
  );
}

export function MosaicLayout({ panels, baseHref, lang }: MosaicLayoutProps) {
//   const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';
 
//   const processedPanels = isRtl ? panels.map(panel => {
//     const [rowStart, colStart, rowEnd, colEnd] = panel.size.split(' / ').map(Number);
//     // The grid has 3 columns, defined by 4 vertical lines (1, 2, 3, 4).
//     // To mirror, a line at position `x` becomes `5 - x`.
//     // A span from `colStart` to `colEnd` becomes a span from `5 - colEnd` to `5 - colStart`.
//     const newColStart = 5 - colEnd;
//     const newColEnd = 5 - colStart;
//     return {
//       ...panel,
//       gridArea: `${rowStart} / ${newColStart} / ${rowEnd} / ${newColEnd}`
//     };
//   }) : panels;
 
  return (
    <div className="w-full h-full">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-3 md:auto-rows-[15rem] gap-2 overflow-y-auto overflow-x-hidden">
        {panels.map((panel, index) => (
          <MosaicPanel 
            key={panel.title} 
            panel={panel} 
            baseHref={baseHref} 
            lang={lang}
            index={index}
            // اولین 2-3 تصویر priority دارند، بقیه lazy load می‌شوند
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}