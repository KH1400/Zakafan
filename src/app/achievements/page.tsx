
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout } from "@/components/fourfold/mosaic-layout";
import { allContentItems, sections, type Language } from "@/lib/content-data";

const sectionInfo = sections.find(s => s.id === 'achievements')!;
const sectionContent = allContentItems.filter(item => item.sectionId === 'achievements');

const goBackTranslations = {
    en: "Go Back Home",
    fa: "بازگشت به خانه",
    ar: "العودة إلى الرئيسية",
    he: "חזור לדף הבית",
};

export default function AchievementsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = (searchParams?.lang || 'en') as Language;
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  const panelData = sectionContent.map(item => ({
      title: item.title[lang],
      image: item.image,
      imageHint: item.imageHint,
      gridArea: item.gridArea,
  }));
  
  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground overflow-hidden">
        <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
          <h1 className="text-xl md:text-2xl font-bold font-headline">{sectionInfo.title[lang]}</h1>
          <Button asChild variant="outline">
            <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
              <ArrowLeft className={isRtl ? "ml-2" : "mr-2"} /> {goBackTranslations[lang]}
            </Link>
          </Button>
        </header>
        <main className="flex-grow relative">
            <MosaicLayout panels={panelData} baseHref="/achievements" lang={lang} />
        </main>
        <Footer lang={lang} />
    </div>
  );
}
