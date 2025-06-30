// ❌ بدون 'use client'

import './globals.css';
import { yekanBakh } from '../lib/fonts';
import { LanguageProvider } from '@/lib/language-context';
import { LayoutBody } from './layout-body'; // فایل client جداگانه
import { Suspense } from 'react';

export const metadata = {
  title: 'War Dynograph',
  description: 'The Dynographic Reference for the Iran-Israel War',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${yekanBakh.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/YekanBakh-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense fallback={null}>
          <LanguageProvider>
            <LayoutBody>{children}</LayoutBody>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
