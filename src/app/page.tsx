"use client";

import { useState } from "react";
import { InteractiveBanners } from "@/components/fourfold/interactive-banners";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/fourfold/header";

type Language = 'fa' | 'en' | 'ar' | 'he';

const languageOptions: Record<Language, { name: string; flag: string; dir: 'rtl' | 'ltr'; font: string }> = {
  fa: { name: 'فارسی', flag: '🇮🇷', dir: 'rtl', font: 'font-persian' },
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr', font: 'font-body' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl', font: 'font-arabic' },
  he: { name: 'עברית', flag: '🇮🇱', dir: 'rtl', font: 'font-hebrew' },
};

export default function Home() {
  const [language, setLanguage] = useState<Language | null>(null);

  if (!language) {
    return (
      <main className="flex flex-col items-center justify-center h-screen w-screen bg-background text-foreground">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 font-headline">Select Your Language</h1>
            <h2 className="text-2xl font-bold mb-8 font-persian">زبان خود را انتخاب کنید</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {(Object.keys(languageOptions) as Language[]).map((key) => (
            <Button
              key={key}
              variant="outline"
              className="p-8 text-2xl h-auto"
              onClick={() => setLanguage(key)}
            >
              <span className="text-4xl me-4">{languageOptions[key].flag}</span>
              <span className={languageOptions[key].font}>{languageOptions[key].name}</span>
            </Button>
          ))}
        </div>
      </main>
    );
  }

  const selectedLang = languageOptions[language];

  return (
    <div
      dir={selectedLang.dir}
      className={`${selectedLang.font} flex flex-col h-screen w-screen bg-background`}
    >
      <Header onLanguageChangeClick={() => setLanguage(null)} />
      <main className="flex-grow overflow-hidden">
        <InteractiveBanners lang={language} />
      </main>
    </div>
  );
}
