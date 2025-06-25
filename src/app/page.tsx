
"use client";

import { useState } from "react";
import { Header } from "@/components/fourfold/header";
import { InteractiveBanners } from "@/components/fourfold/interactive-banners";
import { Footer } from "@/components/fourfold/footer";
import type { Language } from '@/lib/content-data';

const languageOptions: Record<Language, { dir: 'rtl' | 'ltr'; font: string }> = {
  fa: { dir: 'rtl', font: 'font-persian' },
  en: { dir: 'ltr', font: 'font-body' },
  ar: { dir: 'rtl', font: 'font-arabic' },
  he: { dir: 'rtl', font: 'font-hebrew' },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  const selectedLang = languageOptions[language];

  return (
    <div
      dir={selectedLang.dir}
      className={`${selectedLang.font} flex flex-col h-screen w-screen bg-background`}
    >
      <Header currentLang={language} onLanguageChange={setLanguage} />
      <main className="flex-grow overflow-hidden">
        <InteractiveBanners lang={language} />
      </main>
      <Footer lang={language} />
    </div>
  );
}
