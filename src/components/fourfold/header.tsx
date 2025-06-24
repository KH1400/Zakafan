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
  fa: { name: 'فارسی', font: 'font-persian', brandName: 'زکافن' },
  en: { name: 'English', font: 'font-body', brandName: 'Zakafan' },
  ar: { name: 'العربية', font: 'font-arabic', brandName: 'زكافن' },
  he: { name: 'עברית', font: 'font-hebrew', brandName: 'זקפן' },
};

const logoTaglines = {
  en: "The Dynography Reference",
  fa: "مرجع داینوگرافی",
  ar: "مرجع للدينوغرافيا",
  he: "אתר עיון לדיינוגרפיה"
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
  const isRtlLanguage = currentLang === 'fa' || currentLang === 'ar' || currentLang === 'he';
  const currentFont = languageOptions[currentLang].font;

  return (
    <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
      <Link href="/" className="flex items-center gap-3">
        {isRtlLanguage ? (
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
            <defs>
              <linearGradient id="logo-gradient-rtl-header" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g transform="translate(180, 5)">
                <path d="M 15,10 C 8,10 5,15 5,20 V 40 C 5,45 8,50 15,50 H 30 C 20,40 20,20 30,10 H 15 Z" fill="url(#logo-gradient-rtl-header)" />
                <path d="M 30,10 C 40,20 40,40 30,50 H 45 C 52,50 55,45 55,40 V 20 C 55,15 52,10 45,10 H 30 Z" fill="#FFDA63" />
            </g>
            <text x="170" y="28" direction="rtl" textAnchor="end" className={`${currentFont} text-2xl font-bold fill-foreground`} >{languageOptions[currentLang].brandName}</text>
            <text x="170" y="48" direction="rtl" textAnchor="end" className={`${currentFont} text-xs fill-muted-foreground`}>{logoTaglines[currentLang]}</text>
          </svg>
        ) : (
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <defs>
              <linearGradient id="logo-gradient-ltr-header" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g transform="translate(0, 5)">
              <path d="M 15,10 C 8,10 5,15 5,20 V 40 C 5,45 8,50 15,50 H 30 C 20,40 20,20 30,10 H 15 Z" fill="url(#logo-gradient-ltr-header)" />
              <path d="M 30,10 C 40,20 40,40 30,50 H 45 C 52,50 55,45 55,40 V 20 C 55,15 52,10 45,10 H 30 Z" fill="#FFDA63" />
            </g>
            <text x="70" y="28" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="bold" className="fill-foreground">Zakafan</text>
            <text x="70" y="48" fontFamily="Inter, sans-serif" fontSize="12" className="fill-muted-foreground">{logoTaglines.en}</text>
          </svg>
        )}
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
