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
              <linearGradient id="logo-gradient-rtl-header" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g>
              <g transform="translate(180,0)">
                <path d="M14.4118 10.5882C11.9327 10.5882 9.55691 11.5647 7.7641 13.3575C5.97129 15.1503 5 17.5261 5 20V40C5 42.4739 5.97129 44.8497 7.7641 46.6425C9.55691 48.4353 11.9327 49.4118 14.4118 49.4118H25.5882C34.652 49.4118 41.7647 42.299 41.7647 33.2353V26.7647C41.7647 17.701 34.652 10.5882 25.5882 10.5882H14.4118Z" fill="#FFDA63" />
                <path d="M49.4118 20C49.4118 17.5261 48.4405 15.1503 46.6477 13.3575C44.8549 11.5647 42.479 10.5882 40 10.5882H28.8235C19.7598 10.5882 12.6471 17.701 12.6471 26.7647V33.2353C12.6471 42.299 19.7598 49.4118 28.8235 49.4118H40C42.479 49.4118 44.8549 48.4353 46.6477 46.6425C48.4405 44.8497 49.4118 42.4739 49.4118 40V20Z" fill="url(#logo-gradient-rtl-header)" transform="translate(5.5882, 0)" />
              </g>
              <text x="175" y="28" direction="rtl" textAnchor="end" className={`${currentFont} text-2xl font-bold fill-foreground`} >{languageOptions[currentLang].brandName}</text>
              <text x="175" y="48" direction="rtl" textAnchor="end" className={`${currentFont} text-xs fill-muted-foreground`}>{logoTaglines[currentLang]}</text>
            </g>
          </svg>
        ) : (
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
            <defs>
              <linearGradient id="logo-gradient-ltr-header" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g>
              <path d="M14.4118 10.5882C11.9327 10.5882 9.55691 11.5647 7.7641 13.3575C5.97129 15.1503 5 17.5261 5 20V40C5 42.4739 5.97129 44.8497 7.7641 46.6425C9.55691 48.4353 11.9327 49.4118 14.4118 49.4118H25.5882C34.652 49.4118 41.7647 42.299 41.7647 33.2353V26.7647C41.7647 17.701 34.652 10.5882 25.5882 10.5882H14.4118Z" fill="url(#logo-gradient-ltr-header)" />
              <path d="M49.4118 20C49.4118 17.5261 48.4405 15.1503 46.6477 13.3575C44.8549 11.5647 42.479 10.5882 40 10.5882H28.8235C19.7598 10.5882 12.6471 17.701 12.6471 26.7647V33.2353C12.6471 42.299 19.7598 49.4118 28.8235 49.4118H40C42.479 49.4118 44.8549 48.4353 46.6477 46.6425C48.4405 44.8497 49.4118 42.4739 49.4118 40V20Z" fill="#FFDA63" transform="translate(5.5882, 0)" />
              <text x="70" y="28" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="bold" className="fill-foreground">Zakafan</text>
              <text x="70" y="48" fontFamily="Inter, sans-serif" fontSize="12" className="fill-muted-foreground">{logoTaglines.en}</text>
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
