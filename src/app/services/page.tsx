import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout, type MosaicPanelData } from "@/components/fourfold/mosaic-layout";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
    title: {
        en: "Iran's Military Power",
        fa: "قدرت نظامی ایران",
        ar: "القوة العسكرية الإيرانية",
        he: "הכוח הצבאי של איראן",
    },
    goBack: {
        en: "Go Back Home",
        fa: "بازگشت به خانه",
        ar: "العودة إلى الرئيسية",
        he: "חזור לדף הבית",
    },
    panels: {
        en: [
            { title: "Missile Program", image: "https://placehold.co/800x600.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
            { title: "Drone Fleet", image: "https://placehold.co/600x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 5" },
            { title: "Naval Forces", image: "https://placehold.co/400x600.png", imageHint: "warship at sea", gridArea: "3 / 1 / 5 / 2" },
            { title: "Cyber Warfare", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "2 / 3 / 4 / 4" },
            { title: "Ground Troops", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "2 / 4 / 4 / 5" },
            { title: "Air Defense", image: "https://placehold.co/600x400.png", imageHint: "radar system night", gridArea: "4 / 2 / 5 / 4" },
        ],
        fa: [
            { title: "برنامه موشکی", image: "https://placehold.co/800x600.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
            { title: "ناوگان پهپادی", image: "https://placehold.co/600x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 5" },
            { title: "نیروی دریایی", image: "https://placehold.co/400x600.png", imageHint: "warship at sea", gridArea: "3 / 1 / 5 / 2" },
            { title: "جنگ سایبری", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "2 / 3 / 4 / 4" },
            { title: "نیروهای زمینی", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "2 / 4 / 4 / 5" },
            { title: "پدافند هوایی", image: "https://placehold.co/600x400.png", imageHint: "radar system night", gridArea: "4 / 2 / 5 / 4" },
        ],
        ar: [
            { title: "برنامج الصواريخ", image: "https://placehold.co/800x600.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
            { title: "أسطول الطائرات بدون طيار", image: "https://placehold.co/600x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 5" },
            { title: "القوات البحرية", image: "https://placehold.co/400x600.png", imageHint: "warship at sea", gridArea: "3 / 1 / 5 / 2" },
            { title: "الحرب السيبرانية", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "2 / 3 / 4 / 4" },
            { title: "القوات البرية", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "2 / 4 / 4 / 5" },
            { title: "الدفاع الجوي", image: "https://placehold.co/600x400.png", imageHint: "radar system night", gridArea: "4 / 2 / 5 / 4" },
        ],
        he: [
            { title: "תוכנית טילים", image: "https://placehold.co/800x600.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
            { title: "צי כטב\"מים", image: "https://placehold.co/600x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 5" },
            { title: "כוחות ימיים", image: "https://placehold.co/400x600.png", imageHint: "warship at sea", gridArea: "3 / 1 / 5 / 2" },
            { title: "לוחמת סייבר", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "2 / 3 / 4 / 4" },
            { title: "כוחות קרקע", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "2 / 4 / 4 / 5" },
            { title: "הגנה אווירית", image: "https://placehold.co/600x400.png", imageHint: "radar system night", gridArea: "4 / 2 / 5 / 4" },
        ],
    }
};

export default function ServicesPage({ searchParams }: { searchParams?: { lang?: string } }) {
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
            <MosaicLayout panels={panelData} baseHref="/services" lang={lang} />
        </main>
        <Footer lang={lang} />
    </div>
  );
}
