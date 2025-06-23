"use client";

import { useState } from "react";
import { Briefcase, FolderGit2, Info, Mail } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";

const bannerData = [
  {
    icon: <Briefcase className="h-12 w-12" />,
    title: "Services",
    description: "Discover our professional service offerings tailored for you.",
    href: "/services",
    image: "https://placehold.co/1200x800.png",
    imageHint: "business professional",
  },
  {
    icon: <FolderGit2 className="h-12 w-12" />,
    title: "Projects",
    description: "Explore our portfolio of innovative and successful projects.",
    href: "/projects",
    image: "https://placehold.co/1200x800.png",
    imageHint: "technology blueprint",
  },
  {
    icon: <Info className="h-12 w-12" />,
    title: "About Us",
    description: "Learn more about our company's mission, vision, and team.",
    href: "/about",
    image: "https://placehold.co/1200x800.png",
    imageHint: "team collaboration",
  },
  {
    icon: <Mail className="h-12 w-12" />,
    title: "Contact",
    description: "Get in touch with us for inquiries and collaborations.",
    href: "/contact",
    image: "https://placehold.co/1200x800.png",
    imageHint: "modern office",
  },
];

export function InteractiveBanners() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="flex h-full w-full"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {bannerData.map((banner, index) => (
        <BannerPanel
          key={banner.href}
          {...banner}
          isHovered={hoveredIndex === index}
          isAnyHovered={hoveredIndex !== null}
          onMouseEnter={() => setHoveredIndex(index)}
        />
      ))}
    </div>
  );
}
