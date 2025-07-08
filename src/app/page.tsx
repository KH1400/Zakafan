'use client';

import { InteractiveBanners } from "@/components/fourfold/interactive-banners";
import { Footer } from "@/components/fourfold/footer";
import { useLanguage } from '@/lib/language-context';

export default function Home() {
  const { language } = useLanguage();
  console.log(language)
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <InteractiveBanners lang={language} />
      </div>
    </div>
  );
}