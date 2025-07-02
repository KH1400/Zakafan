"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon } from 'lucide-react';
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
import type { Language } from '@/lib/content-types';
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
  // adminPanel: {
  //   en: 'Admin Panel',
  //   fa: 'پنل مدیریت',
  //   ar: 'لوحة الإدارة',
  //   he: 'פאנל ניהול',
  // },
  darkMode: {
    en: 'Dark Mode',
    fa: 'حالت تیره',
    ar: 'الوضع المظلم',
    he: 'מצב כהה',
  },
  lightMode: {
    en: 'Light Mode',
    fa: 'حالت روشن',
    ar: 'الوضع المضيء',
    he: 'מצב בהיר',
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
  const { theme, setTheme } = useTheme();
  
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

  useEffect(() => {
    handleLanguageChange('fa')
  }, [])
  

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
        <img
          className="h-10 w-auto drop-shadow-[0_4px_4px_rgba(245,158,11,0.6)]"
          src={currentLang === 'fa' ? '/logo/DynographFa.svg' : '/logo/DynographEn.svg'}
        />
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
        {/* <SearchComponent 
            lang={currentLang} 
            isExpanded={isSearchExpanded}
            onExpandedChange={setSearchExpanded}
        /> */}

        {/* Theme Toggle Button */}
        {/* <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? translations.lightMode[currentLang] : translations.darkMode[currentLang]}
          className="transition-transform hover:scale-110"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          )}
        </Button> */}

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
            {/* <DropdownMenuItem asChild>
              <Link href="/admin">{translations.adminPanel[currentLang]}</Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}