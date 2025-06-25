'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Language } from '@/lib/content-data';

const languageOptions: Record<Language, { dir: 'rtl' | 'ltr'; font: string }> = {
  fa: { dir: 'rtl', font: 'font-persian' },
  en: { dir: 'ltr', font: 'font-body' },
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
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const selectedLang = languageOptions[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, selectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
};