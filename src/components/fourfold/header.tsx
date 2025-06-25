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

const languageOrder: Language[] = ['fa', 'ar', 'he', 'en'];

const languageOptions: Record<Language, { name: string; brandName: string; }> = {
  fa: { name: 'فارسی', brandName: 'داینوگراف جنگ' },
  en: { name: 'English', brandName: 'War Dynograph' },
  ar: { name: 'العربية', brandName: 'داينوغراف الحرب' },
  he: { name: 'עברית', brandName: 'דיינוגרף מלחמה' },
};

const logoTaglines = {
    en: "The Dynographic Reference for the Iran-Israel War",
    fa: "مرجع داینوگرافیک جنگ ایران و اسرائیل",
    ar: "المرجع الداينوغرافي للحرب الإيرانية الإسرائيلية",
    he: "המרجع הדינוגרפי למלחמת איראן-ישראל"
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
  const logoFontFamily = "Inter, sans-serif";
  const iconX = 30;
  const textX = 60;
  const textAnchor = "start";
  const titleTextLength = "370";

  return (
    <header 
      dir="ltr"
      className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0"
    >
      <Link href={currentLang === 'en' ? '/' : `/?lang=${currentLang}`} className="flex items-center gap-3">
        <svg width="500" height="100" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <g transform={`translate(${iconX}, 50)`} stroke="hsl(var(--accent))" strokeWidth="3" fill="none" className="drop-shadow-glow-accent">
                <path d="M-20 0 L0 -20 L20 0 L0 20 Z" />
                <path d="M-10 0 L0 -10 L10 0 L0 10 Z" fill="hsl(var(--accent))" />
            </g>
            <text 
                x={textX}
                y="50" 
                fontFamily={logoFontFamily} 
                fontSize="34" 
                fontWeight="bold" 
                className="fill-accent drop-shadow-glow-accent"
                textAnchor={textAnchor}
                dominantBaseline="middle"
            >
                {languageOptions['en'].brandName}
            </text>
            <text 
                x={textX}
                y="80" 
                fontFamily={logoFontFamily} 
                fontSize="16" 
                className="fill-white/80"
                textAnchor={textAnchor}
                textLength={titleTextLength}
                lengthAdjust="spacingAndGlyphs"
            >
                {logoTaglines['en']}
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
                {languageOrder.map((key) => (
                  <DropdownMenuItem key={key} onSelect={() => onLanguageChange(key as Language)}>
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
