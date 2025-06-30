'use client';

import { useLanguage } from '@/lib/language-context';
import { Header } from "@/components/fourfold/header";
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

export function LayoutBody({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, selectedLang } = useLanguage();

  return (
    <div className={`${selectedLang.font} font-persian antialiased`} dir={selectedLang.dir}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
          <Header currentLang={language} onLanguageChange={setLanguage} />
          <main className="flex-grow overflow-hidden">
            {children}
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
