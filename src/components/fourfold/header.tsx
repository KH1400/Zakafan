"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import type { Language } from '@/lib/content-data';
import { cn } from '@/lib/utils';

const languageOrder: Language[] = ['fa', 'ar', 'he', 'en'];

// Only keep language names, as brand name is now static
const languageOptions: Record<Language, { name: string; }> = {
  fa: { name: 'فارسی' },
  en: { name: 'English' },
  ar: { name: 'العربية' },
  he: { name: 'עברית' },
};

// Translations for menu items
const translations = {
  about: {
    en: 'About Us',
    fa: 'درباره ما',
    ar: 'معلومات عنا',
    he: 'עלינו',
  },
  adminPanel: {
    en: 'Admin Panel',
    fa: 'پنل مدیریت',
    ar: 'لوحة الإدارة',
    he: 'פאנל ניהול',
  },
}

// Static English branding
const brandName = "War Dynograph";
const tagline = "The Dynographic Reference for the Iran-Israel War";
const fontFamily = "Inter, sans-serif";

type HeaderProps = {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
};

export function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Function to handle language change with URL update
  const handleLanguageChange = (lang: Language) => {
    // Update the callback
    onLanguageChange(lang);
    
    // Update URL
    const currentPath = window.location.pathname;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    if (lang === 'en') {
      // Remove lang parameter for English (default)
      newSearchParams.delete('lang');
    } else {
      // Set lang parameter for other languages
      newSearchParams.set('lang', lang);
    }
    
    const queryString = newSearchParams.toString();
    const newUrl = queryString ? `${currentPath}?${queryString}` : currentPath;
    
    router.push(newUrl);
  };
  
  // Fixed LTR layout values
  const brandTextLength = "370";
  const forcedTextLength = "370";
  const iconX = 30;
  const textX = 60;
  const textAnchor = "start";
  
  return (
    <header 
      dir="ltr" // Force LTR for header layout
      className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0"
    >
      <Link 
        href={currentLang === 'en' ? '/' : `/?lang=${currentLang}`} 
        className={cn(
            "flex items-center gap-3 transition-opacity duration-300",
            isSearchExpanded && "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
        )}
      >
        <svg width="500" height="100" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto">
            <g transform={`translate(${iconX}, 50)`} stroke="hsl(var(--accent))" strokeWidth="3" fill="none" className="drop-shadow-glow-accent">
                <path d="M-20 0 L0 -20 L20 0 L0 20 Z" />
                <path d="M-10 0 L0 -10 L10 0 L0 10 Z" fill="hsl(var(--accent))" />
            </g>
            <text 
                x={textX}
                y="50" 
                fontFamily={fontFamily} 
                fontSize="34" 
                fontWeight="bold" 
                className="fill-accent drop-shadow-glow-accent"
                textAnchor={textAnchor}
                dominantBaseline="middle"
                textLength={brandTextLength}
                lengthAdjust="spacingAndGlyphs"
            >
                {brandName}
            </text>
            <text 
                x={textX}
                y="80" 
                fontFamily={fontFamily}
                fontSize="16" 
                className="fill-white/80"
                textAnchor={textAnchor}
                textLength={forcedTextLength}
                lengthAdjust="spacingAndGlyphs"
            >
                {tagline}
            </text>
        </svg>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
        <SearchComponent 
            lang={currentLang} 
            isExpanded={isSearchExpanded}
            onExpandedChange={setSearchExpanded}
        />

        <DropdownMenu dir="rtl">
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
                  <DropdownMenuItem key={key} onSelect={() => handleLanguageChange(key as Language)}>
                    {languageOptions[key].name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/about?lang=${currentLang}`}>{translations.about[currentLang]}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin">{translations.adminPanel[currentLang]}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}