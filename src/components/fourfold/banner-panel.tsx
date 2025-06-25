import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BannerPanelProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  image: string;
  imageHint: string;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  isLast?: boolean;
};

export function BannerPanel({
  icon,
  title,
  description,
  href,
  image,
  imageHint,
  isHovered,
  isAnyHovered,
  onMouseEnter,
  isLast = false,
}: BannerPanelProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative h-full shrink-0 overflow-hidden transition-all duration-700 ease-in-out",
        {
          "basis-1/4": !isAnyHovered,
          "basis-[64%]": isHovered,
          "basis-[12%]": isAnyHovered && !isHovered,
        },
        // If no item is hovered, all items should be able to grow to fill the container.
        // If an item IS hovered, only the LAST item should be allowed to grow to fill any rounding-error gaps.
        !isAnyHovered && "grow",
        isAnyHovered && isLast && "grow"
      )}
      onMouseEnter={onMouseEnter}
      aria-label={`Go to ${title} page`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        data-ai-hint={imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Shadow on the right edge for visual separation */}
      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />

      <div className="relative flex h-full flex-col justify-end p-4 md:p-8 text-white">
        <div
          className={cn(
            "transition-all duration-500 ease-in-out text-accent drop-shadow-glow-accent",
            isHovered ? "mb-4" : "mb-0"
          )}
        >
          {icon}
        </div>
        <h2 className="text-2xl md:text-4xl font-bold font-headline transition-all duration-500 ease-in-out text-white drop-shadow-lg">
          {title}
        </h2>
        <p
          className={cn(
            "mt-2 text-sm md:text-base max-w-md transition-all duration-500 ease-in-out",
            isHovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
