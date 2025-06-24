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

const languageOptions: Record<Language, { name: string; font: string; }> = {
  fa: { name: 'فارسی', font: 'font-persian' },
  en: { name: 'English', font: 'font-body' },
  ar: { name: 'العربية', font: 'font-arabic' },
  he: { name: 'עברית', font: 'font-hebrew' },
};

const translations = {
  about: {
    en: 'About Us',
    fa: 'درباره ما',
    ar: 'معلومات عنا',
    he: 'עלינו',
  },
  tagline: {
    en: 'Dynography Reference',
    fa: 'مرجع تخصصی هوش مصنوعی و فناوری شناختی',
    ar: 'المرجع المتخصص للذكاء الاصطناعي والتكنولوجيا المعرفية',
    he: 'התייחסות לדיינוגרפיה',
  },
}

type HeaderProps = {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
};

export function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const taglineFont = languageOptions[currentLang]?.font || 'font-body';
  const isRtlLanguage = currentLang === 'fa' || currentLang === 'ar';

  return (
    <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
      <Link href="/" className="flex items-center gap-3">
        {isRtlLanguage ? (
           <svg
              viewBox="0 0 350 100"
              className="h-12 w-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(10, 20)">
                <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
                <g
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M48,45 C48,35, 40,30, 35,22 C28,12, 30,8, 40,8" />
                  <path d="M35,22 L28,32" />
                  <path d="M28,32 L38,42" />
                  <path d="M28,32 L20,38" />
                  <path d="M40,8 L45,15" />

                  <circle cx="28" cy="32" r="3" />
                  <circle cx="38" cy="42" r="2.5" />
                  <circle cx="20" cy="38" r="2.5" />
                  <circle cx="45" cy="15" r="2.5" />
                </g>
              </g>
              <g transform="translate(80, 0)">
                <text
                  x="0"
                  y="60"
                  fontSize="48"
                  fontWeight="bold"
                  fill="hsl(var(--primary))"
                  className="font-persian"
                  textAnchor="start"
                >
                  زکافن
                </text>
                <text
                  x="0"
                  y="85"
                  fontSize="14"
                  fontWeight="bold"
                  fill="hsl(var(--foreground))"
                  opacity="0.8"
                  className={taglineFont}
                  textAnchor="start"
                >
                  {translations.tagline[currentLang]}
                </text>
              </g>
            </svg>
        ) : (
          <svg
            viewBox="0 0 250 60"
            className="h-10 w-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <text
                x="0"
                y="35"
                fontSize="32"
                fontWeight="bold"
                fill="hsl(var(--primary))"
                className="font-headline"
              >
                Zakafan
              </text>
              <text
                x="0"
                y="55"
                fontSize="14"
                fontWeight="bold"
                fill="hsl(var(--foreground))"
                opacity="0.8"
                className={taglineFont}
              >
                {translations.tagline[currentLang]}
              </text>
            </g>
            <g transform="translate(190, 0)">
              <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
              <g
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M42,21 C42,26.5228475 37.5228475,31 32,31 L28,31 C22.4771525,31 18,26.5228475 18,21 C18,15.4771525 22.4771525,11 28,11 C33.5228475,11 37.8,15.4771525 37.8,21" />
                <path d="M28,31 L28,38 C28,39.1045695 27.1045695,40 26,40 L22,40" />
                <path d="M32,17 L38,17" />
                <circle cx="40" cy="17" r="2.5" />
                <path d="M35,24 L42,24" />
                <circle cx="44" cy="24" r="2.5" />
                <path d="M32,31 L36,31" />
                <circle cx="38" cy="31" r="2.5" />
                <path d="M28,11 L28,15" />
                <circle cx="28" cy="17" r="2.5" />
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
