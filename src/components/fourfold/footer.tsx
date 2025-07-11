
import { cn } from "@/lib/utils";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
  copyright: {
    en: "© War Dynograph. All rights reserved.",
    fa: "© داینوگراف جنگ. تمام حقوق محفوظ است.",
    ar: "© داينوغراف الحرب. كل الحقوق محفوظة.",
    he: "© דיינוגרף מלחמה. כל הזכויות שמורות.",
  },
};

const languageOptions: Record<Language, { dir: 'rtl' | 'ltr', font: string }> = {
    fa: { dir: 'rtl', font: 'font-persian' },
    en: { dir: 'ltr', font: 'font-body' },
    ar: { dir: 'rtl', font: 'font-arabic' },
    he: { dir: 'rtl', font: 'font-hebrew' },
};

export function Footer({ lang = 'en' }: { lang?: Language }) {
    const langConfig = languageOptions[lang] || languageOptions.en;
    
    return (
        <footer
          dir={langConfig.dir}
          className={cn(
              "w-full shrink-0 py-3 px-6 text-center text-xs text-muted-foreground bg-background border-t border-border/50",
              langConfig.font
          )}
        >
          <p>{translations.copyright[lang] || translations.copyright.en}</p>
        </footer>
    );
}
