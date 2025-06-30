'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from "@/components/fourfold/header";
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import { yekanBakh } from '../lib/fonts';
import { ThemeProvider } from 'next-themes'

// Inner Layout Component
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, selectedLang } = useLanguage();

  return (
    <html lang={language} className={`dark ${yekanBakh.variable}`} dir={selectedLang.dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/YekanBakh-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className={`${selectedLang.font} font-persian antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
            <Header currentLang={language} onLanguageChange={setLanguage} />
            <main className="flex-grow overflow-hidden">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
      {/* <Footer lang={language} /> */}
    </html>
  );
}

// Main Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}