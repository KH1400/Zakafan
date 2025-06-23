import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout, type MosaicPanelData } from "@/components/fourfold/mosaic-layout";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
    title: {
        en: "War Statistics",
        fa: "آمار و ارقام مرتبط با جنگ",
        ar: "إحصائيات الحرب",
        he: "סטטיסטיקות מלחמה",
    },
    goBack: {
        en: "Go Back Home",
        fa: "بازگشت به خانه",
        ar: "العودة إلى الرئيسية",
        he: "חזור לדף הבית",
    },
    panels: {
        en: [
            { title: "Timeline", image: "https://placehold.co/400x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 5 / 2" },
            { title: "Economic Impact", image: "https://placehold.co/800x400.png", imageHint: "financial charts graphs", gridArea: "1 / 2 / 3 / 4" },
            { title: "Casualties", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "1 / 4 / 2 / 5" },
            { title: "Key Battles", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "2 / 4 / 3 / 5" },
            { title: "Equipment Losses", image: "https://placehold.co/800x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 5 / 4" },
            { title: "Refugees", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 4 / 5 / 5" },
        ],
        fa: [
            { title: "گاه‌شمار", image: "https://placehold.co/400x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 5 / 2" },
            { title: "تاثیر اقتصادی", image: "https://placehold.co/800x400.png", imageHint: "financial charts graphs", gridArea: "1 / 2 / 3 / 4" },
            { title: "تلفات", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "1 / 4 / 2 / 5" },
            { title: "نبردهای کلیدی", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "2 / 4 / 3 / 5" },
            { title: "خسارات تجهیزات", image: "https://placehold.co/800x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 5 / 4" },
            { title: "پناهندگان", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 4 / 5 / 5" },
        ],
        ar: [
            { title: "الجدول الزمني", image: "https://placehold.co/400x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 5 / 2" },
            { title: "التأثير الاقتصادي", image: "https://placehold.co/800x400.png", imageHint: "financial charts graphs", gridArea: "1 / 2 / 3 / 4" },
            { title: "الخسائر", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "1 / 4 / 2 / 5" },
            { title: "المعارك الرئيسية", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "2 / 4 / 3 / 5" },
            { title: "خسائر المعدات", image: "https://placehold.co/800x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 5 / 4" },
            { title: "اللاجئين", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 4 / 5 / 5" },
        ],
        he: [
            { title: "ציר זמן", image: "https://placehold.co/400x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 5 / 2" },
            { title: "השפעה כלכלית", image: "https://placehold.co/800x400.png", imageHint: "financial charts graphs", gridArea: "1 / 2 / 3 / 4" },
            { title: "נפגעים", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "1 / 4 / 2 / 5" },
            { title: "קרבות מרכזיים", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "2 / 4 / 3 / 5" },
            { title: "אבדות בציוד", image: "https://placehold.co/800x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 5 / 4" },
            { title: "פליטים", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 4 / 5 / 5" },
        ],
    }
};

export default function ProjectsPage({ searchParams }: { searchParams?: { lang?: string } }) {
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
            <MosaicLayout panels={panelData} baseHref="/projects" lang={lang} />
        </main>
        <Footer lang={lang} />
    </div>
  );
}
