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
              <rect width="50" height="50" rx="8" fill="hsl(var(--accent))"/>
              <g transform="translate(10,8)" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35.6 38.2c-1.3-0.5-2.7-0.8-4.2-0.8 -5.8 0-10.5-4.7-10.5-10.5V22.5c0-5.8 4.7-10.5 10.5-10.5 3.9 0 7.3 2.1 9.1 5.2" />
                <path d="M28.3 35.5L32.6 35.5" />
                <path d="M26.4 20.2L30.2 20.2" />
                <circle cx="25" cy="20.2" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L30.2 16" />
                <circle cx="30.2" cy="14.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L34.5 24.5" />
                <circle cx="35.5" cy="25.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L30.2 26" />
                <circle cx="30.2" cy="27.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 26L26.5 29" />
                <circle cx="25.5" cy="29.5" r="1.5" strokeWidth="0" className="fill-primary"/>
              </g>
            </g>
            <text x="245" y="28" direction="rtl" textAnchor="end" className={`${currentFont} text-2xl font-bold fill-primary`} >{languageOptions[currentLang].brandName}</text>
            <text x="245" y="48" direction="rtl" textAnchor="end" className={`${currentFont} text-xs fill-muted-foreground`}>{logoTaglines[currentLang]}</text>
          </svg>
        ) : (
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <text x="5" y="28" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="bold" className="fill-primary">{languageOptions.en.brandName}</text>
            <text x="5" y="48" fontFamily="Inter, sans-serif" fontSize="12" className="fill-muted-foreground">{logoTaglines.en}</text>
            <g transform="translate(190, 5)">
              <rect width="50" height="50" rx="8" fill="hsl(var(--accent))"/>
              <g transform="translate(10,8)" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35.6 38.2c-1.3-0.5-2.7-0.8-4.2-0.8 -5.8 0-10.5-4.7-10.5-10.5V22.5c0-5.8 4.7-10.5 10.5-10.5 3.9 0 7.3 2.1 9.1 5.2" />
                <path d="M28.3 35.5L32.6 35.5" />
                <path d="M26.4 20.2L30.2 20.2" />
                <circle cx="25" cy="20.2" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L30.2 16" />
                <circle cx="30.2" cy="14.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L34.5 24.5" />
                <circle cx="35.5" cy="25.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 20.2L30.2 26" />
                <circle cx="30.2" cy="27.5" r="1.5" strokeWidth="0" className="fill-primary"/>
                <path d="M30.2 26L26.5 29" />
                <circle cx="25.5" cy="29.5" r="1.5" strokeWidth="0" className="fill-primary"/>
              </g>
            </g>
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
