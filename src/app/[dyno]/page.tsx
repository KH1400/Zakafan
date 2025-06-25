"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout } from "@/components/fourfold/mosaic-layout";
import {
  MosaicPanelData,
  SectionInfo,
  type Language,
} from "@/lib/content-data";
import { useEffect, useState } from "react";
import { fetchCategory, fetchDynos } from "../../lib/api";
import { useLanguage } from "../../lib/language-context";

const goBackTranslations = {
  en: "Go Back Home",
  fa: "بازگشت به خانه",
  ar: "العودة إلى الرئيسية",
  he: "חזור לדף הבית",
};

export default function ProjectsPage({
  params,
  searchParams,
}: {
  params: { dyno: string };
  searchParams?: { lang?: string };
}) {
  const { language, setLanguage, selectedLang } = useLanguage();
  const categoryHref = params.dyno;
  const [dynos, setDynos] = useState<MosaicPanelData[]>([]);
  const [category, setCategory] = useState<SectionInfo>();

  // Set language from URL params if provided
  useEffect(() => {
    if (searchParams?.lang && searchParams.lang !== language) {
      setLanguage(searchParams.lang as Language);
    }
  }, [searchParams?.lang, language, setLanguage]);

  useEffect(() => {
    getDynos();
    getCategoryDetails();
  }, [categoryHref, language]);

  const getCategoryDetails = async() => {
    try {
      const data = await fetchCategory(params.dyno);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDynos = async() => {
    try {
      const data = await fetchDynos(categoryHref, language);
      const panelData = data.map((item) => ({
        title: item.title[language],
        image: item.image,
        imageHint: item.imageHint,
        size: item.size,
      }));
      setDynos(panelData);
    } catch (error) {
      console.log(error);
    }
  };
  
  if(!category){
    return <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header - now separate from layout header */}
      <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0 sticky top-0 z-20">
        <h1 className="text-xl md:text-2xl font-bold font-headline">
          {category.title[language]}
        </h1>
        <Button asChild variant="outline">
          <Link href={language === "en" ? "/" : `/?lang=${language}`}>
            <ArrowLeft className={selectedLang.dir === 'rtl' ? "ml-2" : "mr-2"} />
            {goBackTranslations[language]}
          </Link>
        </Button>
      </header>
      
      {/* Main content */}
      <div className="flex-grow p-2">
        <div className="w-full h-full">
          <MosaicLayout
            panels={dynos}
            baseHref={category.href}
            lang={language}
          />
        </div>
      </div>
      
      {/* Footer */}
      <Footer lang={language} />
    </div>
  );
}