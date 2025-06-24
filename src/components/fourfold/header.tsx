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
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
            <g transform="translate(5, 5)">
                <rect width="50" height="50" rx="8" fill="#FFDA63"/>
                <g transform="translate(10,8)" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M25,23.5 C25,29.85 19.85,35 13.5,35 C7.15,35 2,29.85 2,23.5 C2,17.15 7.15,12 13.5,12 C15.5,12 17.5,12.5 19,13.5" />
                    <path d="M19,13.5 L22,10.5" />
                    <circle cx="23" cy="9.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                    <path d="M13.5,12 V5" />
                    <circle cx="13.5" cy="4" r="1.5" strokeWidth="0" className="fill-primary"/>
                    <path d="M13.5,18 L8,18" />
                    <circle cx="7" cy="18" r="1.5" strokeWidth="0" className="fill-primary"/>
                    <path d="M13.5,25 L8,25" />
                    <circle cx="7" cy="25" r="1.5" strokeWidth="0" className="fill-primary"/>
                    <path d="M18,30 L21,27" />
                    <circle cx="22" cy="26" r="1.5" strokeWidth="0" className="fill-primary"/>
                </g>
            </g>
            <text x="245" y="28" direction="rtl" textAnchor="end" className={`${currentFont} text-2xl font-bold fill-foreground`} >{languageOptions[currentLang].brandName}</text>
            <text x="245" y="48" direction="rtl" textAnchor="end" className={`${currentFont} text-xs fill-muted-foreground`}>{logoTaglines[currentLang]}</text>
          </svg>
        ) : (
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <g transform="translate(190, 5)">
              <rect width="50" height="50" rx="8" fill="#FFDA63"/>
              <g transform="translate(10,8)" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M25,23.5 C25,29.85 19.85,35 13.5,35 C7.15,35 2,29.85 2,23.5 C2,17.15 7.15,12 13.5,12 C15.5,12 17.5,12.5 19,13.5" />
                  <path d="M19,13.5 L22,10.5" />
                  <circle cx="23" cy="9.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                  <path d="M13.5,12 V5" />
                  <circle cx="13.5" cy="4" r="1.5" strokeWidth="0" className="fill-primary"/>
                  <path d="M13.5,18 L8,18" />
                  <circle cx="7" cy="18" r="1.5" strokeWidth="0" className="fill-primary"/>
                  <path d="M13.5,25 L8,25" />
                  <circle cx="7" cy="25" r="1.5" strokeWidth="0" className="fill-primary"/>
                  <path d="M18,30 L21,27" />
                  <circle cx="22" cy="26" r="1.5" strokeWidth="0" className="fill-primary"/>
              </g>
            </g>
            <text x="5" y="28" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="bold" className="fill-foreground">{languageOptions.en.brandName}</text>
            <text x="5" y="48" fontFamily="Inter, sans-serif" fontSize="12" className="fill-muted-foreground">{logoTaglines.en}</text>
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
