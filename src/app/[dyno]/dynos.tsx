"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout } from "@/components/fourfold/mosaic-layout";
import {
  MosaicPanelData,
  DynoCategory,
  type Language,
  Dyno
} from "@/lib/content-types";
import { useEffect, useState } from "react";
import { fetchCategory, fetchDynos } from "../../lib/api";
import { useLanguage } from "../../lib/language-context";
import Loding from "../../components/fourfold/loading";

const goBackTranslations = {
  en: "Go Back Home",
  fa: "بازگشت به خانه",
  ar: "العودة إلى الرئيسية",
  he: "חזור לדף הבית",
};

export default function DynosPage({ slug }: { slug: string }) {
  const { language, selectedLang } = useLanguage();
  const [dynos, setDynos] = useState<MosaicPanelData[]>([]);
  const [category, setCategory] = useState<DynoCategory>();
  const [loading, setLoading] = useState(true);

  // حذف ref و استفاده مستقیم از slug
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // همزمان fetch کردن دو تا API
        const [dynosResult, categoryResult] = await Promise.all([
          fetchDynos({ categoryHref: slug }),
          fetchCategory(slug)
        ]);

        // Process dynos
        const dyns: any = await dynosResult.json();
        console.log(dyns.dynographs[0]);
        const panelData = dyns.dynographs.map((item: any, index: number) => ({
          id: item.id,
          title: item.title,
          description: item.description[language] || item.description['fa'],
          image: item.image_file || `/categories/c${item.categories[0].id}.jpg`,
          slug: item.slug.toLocaleLowerCase(),
          imageHint: item.image_hint,
          categories: item.categories.map((c: any) => c.id),
          categoryHref: item.categories.map((c: any) => c.href),
          createdAt: item.created_at
        }));

        setDynos(panelData);
        setCategory(categoryResult);
      } catch (error) {
        console.log('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadData();
    }
  }, [slug, language]); // فقط slug و language را dependency قرار دادیم

  if (loading || !category) {
    return <Loding />
  }

  return (
    <div className={`${selectedLang.font} flex flex-col h-full`}>
      {/* Header - now separate from layout header */}
      <header className={`${selectedLang.font} flex h-14 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0 sticky top-0 z-20`}>
        <Button asChild variant="outline">
          <Link href={language === "en" ? "/" : `/?lang=${language}`}>
            {(selectedLang.dir === 'ltr') && <ArrowLeft className={"mr-2"} />}
            {(selectedLang.dir === 'rtl') && <ArrowRight className={"ml-2"} />}
            {goBackTranslations[language]}
          </Link>
        </Button>
        <h1 className={`${selectedLang.font} text-xl md:text-2xl font-bold font-headline`}>
          {category.title[language]}
        </h1>
      </header>
      
      {/* Main content */}
      <div className="flex-grow h-full w-full overflow-y-auto">
        <MosaicLayout
          panels={dynos}
          baseHref={category.href}
          lang={language}
        />
      </div>
      
      {/* Footer */}
      <Footer lang={language} />
    </div>
  );
}