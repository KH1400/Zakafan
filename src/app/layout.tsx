'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from "@/components/fourfold/header";
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import { Footer } from '../components/fourfold/footer';

// Inner Layout Component
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, selectedLang } = useLanguage();

  return (
    <html lang={language} className="dark" dir={selectedLang.dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${selectedLang.font} antialiased`}>
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
          <Header currentLang={language} onLanguageChange={setLanguage} />
          <main className="flex-grow overflow-hidden">
            {children}
          </main>
        </div>
        <Toaster />
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