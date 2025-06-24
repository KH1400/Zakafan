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
  const currentFont = languageOptions[currentLang].font;

  return (
    <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
      <Link href={currentLang === 'en' ? '/' : `/?lang=${currentLang}`} className="flex items-center gap-3">
        <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <text x="5" y="28" fontFamily={currentFont} fontSize="22" fontWeight="bold" className="fill-primary">{languageOptions[currentLang].brandName}</text>
            <text x="5" y="48" fontFamily={currentFont} fontSize="12" className="fill-muted-foreground">{logoTaglines[currentLang]}</text>
            <g transform="translate(190, 5)">
                <rect width="50" height="50" rx="8" fill="hsl(var(--accent))"/>
                <g transform="translate(10,8)" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M31.4,35.4C32,35.6,32.6,35.7,33.2,35.7c4.6,0,8.4-3.8,8.4-8.4v-4.2c0-4.6-3.8-8.4-8.4-8.4c-3.1,0-5.8,1.7-7.3,4.2"/>
                    <path d="M25.8,12.5c0,1.4-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5S25.8,11.1,25.8,12.5z"/>
                    <path d="M20.8,27.5c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S22.2,27.5,20.8,27.5z"/>
                    <path d="M19.1,19.2c-0.8,0.8-0.8,2.1,0,2.8c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8C21.2,18.4,19.9,18.4,19.1,19.2z"/>
                    <path d="M27.5,19.2c0,0.8-0.7,1.7-1.7,1.7c-0.8,0-1.7-0.7-1.7-1.7c0-1.7,0.8-2.5,1.7-2.5C26.7,16.7,27.5,17.5,27.5,19.2z"/>
                    <path d="M30,23.3c-1.7,0-2.5-0.8-2.5-1.7c0-0.8,0.8-1.7,1.7-1.7c1.7,0,2.5,0.8,2.5,1.7C31.7,22.5,30.8,23.3,30,23.3z"/>
                    <path d="M29.2,28.3c-0.8,0.8-0.8,2.1,0,2.8c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8C31.3,27.5,30,27.5,29.2,28.3z"/>
                    <path d="M23.3,16.7L23.3,16.7c-1.7,0-2.5-1.7-2.5-2.5c0-0.8,0.8-1.7,1.7-1.7c0.8,0,1.7,0.8,1.7,1.7C24.2,15,24.2,16.7,23.3,16.7z"/>
                    <path d="M21.7,25.8c-0.8,0-1.7-0.8-1.7-1.7c0-0.8,0.8-1.7,1.7-1.7c1.7,0,2.5,0.8,2.5,1.7C24.2,25,23.3,25.8,21.7,25.8z"/>
                    <path d="M25.8,29.2c-0.8,0-1.7,0.7-1.7,1.7c0,0.8,0.8,1.7,1.7,1.7c0.8,0,1.7-0.8,1.7-1.7C27.5,29.9,26.7,29.2,25.8,29.2z"/>
                </g>
            </g>
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
