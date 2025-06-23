
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout, type MosaicPanelData } from "@/components/fourfold/mosaic-layout";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
    title: {
        en: "Achievements & Victories",
        fa: "دستاوردها و پیروزی ها",
        ar: "الإنجازات والانتصارات",
        he: "הישגים וניצחונות",
    },
    goBack: {
        en: "Go Back Home",
        fa: "بازگشت به خانه",
        ar: "العودة إلى الرئيسية",
        he: "חזור לדף הבית",
    },
    panels: {
        en: [
            { title: "Liberation of Khorramshahr", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
            { title: "Operation Fath-ol-Mobin", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
            { title: "Breaking Abadan Siege", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
            { title: "Operation Valfajr 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
            { title: "Naval Victories", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
            { title: "Air Superiority", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        ],
        fa: [
            { title: "آزادسازی خرمشهر", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
            { title: "عملیات فتح‌المبین", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
            { title: "شکست حصر آبادان", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
            { title: "عملیات والفجر ۸", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
            { title: "پیروزی‌های دریایی", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
            { title: "برتری هوایی", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        ],
        ar: [
            { title: "تحرير المحمرة", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
            { title: "عملية الفتح المبين", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
            { title: "كسر حصار عبادان", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
            { title: "عملية والفجر 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
            { title: "انتصارات بحرية", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
            { title: "التفوق الجوي", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        ],
        he: [
            { title: "שחרור ח'וראמשהר", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
            { title: "מבצע פתח אל-מובין", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
            { title: "שבירת המצור על אבאדאן", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
            { title: "מבצע ואלפג'ר 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
            { title: "ניצחונות ימיים", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
            { title: "עליונות אווירית", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        ],
    }
};

export default function AboutPage({ searchParams }: { searchParams?: { lang?: string } }) {
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
            <MosaicLayout panels={panelData} baseHref="/about" lang={lang} />
        </main>
        <Footer lang={lang} />
    </div>
  );
}
