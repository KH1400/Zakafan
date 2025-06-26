'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Language } from '@/lib/content-data';

const languageOptions: Record<Language, { dir: 'rtl' | 'ltr'; font: string }> = {
  fa: { dir: 'rtl', font: 'font-persian' },
  en: { dir: 'ltr', font: 'font-inter' },
  ar: { dir: 'rtl', font: 'font-arabic' },
  he: { dir: 'rtl', font: 'font-hebrew' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedLang: { dir: 'rtl' | 'ltr'; font: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const queryLang = searchParams.get('lang') as Language | null;

  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (queryLang && languageOptions[queryLang]) {
      setLanguage(queryLang);
    }
  }, [queryLang]);

  const selectedLang = languageOptions[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, selectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
