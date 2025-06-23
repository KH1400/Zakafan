
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout, type MosaicPanelData } from "@/components/fourfold/mosaic-layout";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
    title: {
        en: "Answering Questions",
        fa: "پاسخ به شبهات",
        ar: "الرد على الشبهات",
        he: "מענה לשאלות",
    },
    goBack: {
        en: "Go Back Home",
        fa: "بازگشت به خانه",
        ar: "العودة إلى الرئيسية",
        he: "חזור לדף הבית",
    },
    panels: {
        en: [
            { title: "Misconceptions", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
            { title: "Expert Analysis", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
            { title: "Fact vs. Fiction", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
            { title: "Historical Archives", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
            { title: "FAQs", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
            { title: "Media Analysis", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        ],
        fa: [
            { title: "تصورات غلط", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
            { title: "تحلیل کارشناسان", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
            { title: "واقعیت در برابر داستان", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
            { title: "آرشیوهای تاریخی", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
            { title: "سوالات متداول", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
            { title: "تحلیل رسانه‌ها", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        ],
        ar: [
            { title: "مفاهيم خاطئة", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
            { title: "تحليل الخبراء", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
            { title: "حقيقة أم خيال", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
            { title: "الأرشيف التاريخي", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
            { title: "أسئلة شائعة", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
            { title: "تحليل الإعلام", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        ],
        he: [
            { title: "תפיסות שגויות", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
            { title: "ניתוח מומחים", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
            { title: "עובדה מול בדיה", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
            { title: "ארכיונים היסטוריים", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
            { title: "שאלות נפוצות", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
            { title: "ניתוח מדיה", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        ],
    }
};

export default function ContactPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = (searchParams?.lang || 'en') as Language;
  const panelData = translations.panels[lang] || translations.panels.en;
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden">
        <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
          <h1 className="text-xl md:text-2xl font-bold font-headline">{translations.title[lang]}</h1>
          <Button asChild variant="outline">
            <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
              <ArrowLeft className={isRtl ? "ml-2" : "mr-2"} /> {translations.goBack[lang]}
            </Link>
          </Button>
        </header>
        <main className="flex-grow relative">
            <MosaicLayout panels={panelData} baseHref="/contact" lang={lang} />
        </main>
        <Footer lang={lang} />
    </div>
  );
}
