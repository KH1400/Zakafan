"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchComponent } from './search-component';

type Language = 'fa' | 'en' | 'ar' | 'he';

const languageOptions: Record<Language, { name: string; font: string; brandName: string; }> = {
  fa: { name: 'فارسی', font: 'font-persian', brandName: 'داینوگراف جنگ' },
  en: { name: 'English', font: 'font-body', brandName: 'War Dynograph' },
  ar: { name: 'العربية', font: 'font-arabic', brandName: 'داينوغراف الحرب' },
  he: { name: 'עברית', font: 'font-hebrew', brandName: 'דיינוגרף מלחמה' },
};

const logoTaglines = {
    en: "The Modern Warfare Reference",
    fa: "مرجع جنگ مدرن",
    ar: "مرجع الحرب الحديثة",
    he: "העיון למלחמה מודרנית",
};

const translations = {
  about: {
    en: 'About Us',
    fa: 'درباره ما',
    ar: 'معلومات عنا',
    he: 'עלינו',
  },
}

type HeaderProps = {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
};

export function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const currentFont = languageOptions[currentLang].font;
  const isRtl = currentLang === 'fa' || currentLang === 'ar' || currentLang === 'he';
  const fontFamily = isRtl ? "Noto Sans Arabic, sans-serif" : "Inter, sans-serif";

  return (
    <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
      <Link href={currentLang === 'en' ? '/' : `/?lang=${currentLang}`} className="flex items-center gap-3">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <text 
                x={isRtl ? "195" : "5"} 
                y="30" 
                fontFamily={fontFamily} 
                fontSize="22" 
                fontWeight="bold" 
                className="fill-accent drop-shadow-glow-accent"
                textAnchor={isRtl ? "end" : "start"}
            >
                {languageOptions[currentLang].brandName}
            </text>
            <text 
                x={isRtl ? "195" : "5"} 
                y="50" 
                fontFamily={fontFamily} 
                fontSize="10" 
                className="fill-muted-foreground"
                textAnchor={isRtl ? "end" : "start"}
            >
                {logoTaglines[currentLang]}
            </text>
        </svg>
      </Link>

      <div className="flex items-center gap-2">
        <SearchComponent lang={currentLang} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>{languageOptions[currentLang].name}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {(Object.keys(languageOptions) as Language[]).map((key) => (
                  <DropdownMenuItem key={key} onSelect={() => onLanguageChange(key)}>
                    {languageOptions[key].name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/about?lang=${currentLang}`}>{translations.about[currentLang]}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
