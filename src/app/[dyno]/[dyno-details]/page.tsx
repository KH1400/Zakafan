"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import {
  MosaicPanelData,
  SectionInfo,
  type Language,
} from "@/lib/content-data";
import { useEffect, useState } from "react";

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
  params: { 'dyno-details': string };
  searchParams?: { lang?: string };
}) {
  const lang = (searchParams?.lang || "en") as Language;
  const isRtl = lang === "fa" || lang === "ar" || lang === "he";

  const categoryHref = params['dyno-details'];
  console.log(categoryHref)
  const [dyno, setDyno] = useState<MosaicPanelData[]>([])

  useEffect(() => {
    getDyno();
    getCategoryDetails();
  }, [categoryHref])

  const getCategoryDetails = async() => {

  }

  const getDyno = async() => {

  }
  
  
  if(!dyno){
    return <p>dddd</p>
  }

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex flex-col min-h-screen w-full h-screen bg-background text-foreground"
    >
      <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0 sticky top-0 z-20">
        <h1 className="text-xl md:text-2xl font-bold font-headline">
          {/* {dyno.title[lang]} */}
        </h1>
        <Button asChild variant="outline">
          <Link href={lang === "en" ? "/" : `/?lang=${lang}`}>
            <ArrowLeft className={isRtl ? "ml-2" : "mr-2"} />{" "}
            {goBackTranslations[lang]}
          </Link>
        </Button>
      </header>
      <main className="flex-grow p-2">
        <div className="w-full h-full">
          
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}