
"use client";

import Link from "next/link";
import Image from "next/image";

export type MosaicPanelData = {
  title: string;
  image: string;
  imageHint: string;
  gridArea: string; // "row-start / col-start / row-end / col-end"
};

type MosaicLayoutProps = {
  panels: MosaicPanelData[];
  baseHref: string;
  lang: string;
};

function MosaicPanel({ panel, baseHref, lang }: { panel: MosaicPanelData, baseHref: string, lang:string }) {
  const slug = panel.title.toLowerCase().trim().replace(/[\s\W-]+/g, '-');
  const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
  const href = `${baseHref}/${slug}${langQuery}`;
  
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:z-10 h-60 md:h-auto"
      style={{ gridArea: panel.gridArea }}
      aria-label={panel.title}
    >
      <Image
        src={panel.image}
        alt={panel.title}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        data-ai-hint={panel.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative flex h-full items-end p-4 md:p-6">
        <h3 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg font-headline">
          {panel.title}
        </h3>
      </div>
    </Link>
  );
}

export function MosaicLayout({ panels, baseHref, lang }: MosaicLayoutProps) {
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  const processedPanels = isRtl ? panels.map(panel => {
    const [rowStart, colStart, rowEnd, colEnd] = panel.gridArea.split(' / ').map(Number);
    // The grid has 3 columns, defined by 4 vertical lines (1, 2, 3, 4).
    // To mirror, a line at position `x` becomes `5 - x`.
    // A span from `colStart` to `colEnd` becomes a span from `5 - colEnd` to `5 - colStart`.
    const newColStart = 5 - colEnd;
    const newColEnd = 5 - colStart;
    return {
      ...panel,
      gridArea: `${rowStart} / ${newColStart} / ${rowEnd} / ${newColEnd}`
    };
  }) : panels;

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-3 md:auto-rows-[15rem] gap-2 overflow-y-auto">
        {processedPanels.map((panel) => (
          <MosaicPanel key={panel.title} panel={panel} baseHref={baseHref} lang={lang} />
        ))}
      </div>
    </div>
  );
}
