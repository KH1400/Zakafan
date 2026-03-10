"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout } from "@/components/fourfold/mosaic-layout";
import {
  MosaicPanelData,
  DynoCategory
} from "@/lib/content-types";
import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/language-context";
import Loding from "../../components/fourfold/loading";
import { Skeleton } from "../../components/ui/skeleton";
import { apiGetDynoCategory, apiGetDynoMastersByCategoryHref } from "../../lib/api";

const goBackTranslations = {
  en: "Go Back Home",
  fa: "بازگشت به خانه",
  ar: "العودة إلى الرئيسية",
  he: "חזור לדף הבית",
};

export default function DynosPage({ slug }: { slug: string }) {
  const { language, selectedLang } = useLanguage();
  const [dynos, setDynos] = useState<{version: string; dynos: MosaicPanelData[]}[]>([]);
  const [category, setCategory] = useState<DynoCategory>();
  const [loading, setLoading] = useState(true);

  // حذف ref و استفاده مستقیم از slug
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // همزمان fetch کردن دو تا API
        const [dynosResult, categoryResult] = await Promise.all([
          apiGetDynoMastersByCategoryHref({ categoryHref: slug }),
          apiGetDynoCategory(slug)
        ]);

        // Process dynos
        const dyns: any = await dynosResult.json();
        // const panelData = dyns.masters.map((master: any, index: number) => ({
        //   id: master.id,
        //   title: master.dynographs[language].title,
        //   description: master.dynographs[language].description[language] || master.dynographs['fa']?.description || master.dynographs[language].title,
        //   image: master.image_file,
        //   slug: master.slug.toLocaleLowerCase(),
        //   imageHint: master.image_hint,
        //   version: master.version,
        //   categories: master.categories.map((c: any) => c.id),
        //   categoryHref: master.categories.map((c: any) => c.href),
        //   createdAt: master.created_at
        // }));

        const grouped = dyns.masters.reduce((acc: any, master: any) => {
          const version = master.version;

          const dyno = {
            id: master.id,
            title: master.dynographs[language].title,
            description:
              master.dynographs[language].description[language] ||
              master.dynographs["fa"]?.description ||
              master.dynographs[language].title,
            image: master.image_file,
            slug: master.slug.toLocaleLowerCase(),
            imageHint: master.image_hint,
            version: master.version,
            categories: master.categories.map((c: any) => c.id),
            categoryHref: master.categories.map((c: any) => c.href),
            createdAt: master.created_at,
          };

          if (!acc[version]) {
            acc[version] = {
              version: String(version),
              dynos: [],
            };
          }

          acc[version].dynos.push(dyno);

          return acc;
        }, {});

        const panelData = Object.values(grouped) as any;

        console.log(panelData);
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
  }, [slug, language]);

  if (loading || !category) {
    return <LoadSkeleton />
  }

  return (
    <div className={`${selectedLang.font} flex flex-col h-full overflow-y-auto outline-none`}>
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
      <div className="flex-grow w-full overflow-y-auto flex flex-col flex-shrink-0">
        {dynos.map(d =>
        <div className="">
          <p className="w-full py-1 my-1 mt-8 text-gray-400 text-sm text-center bg-white/5">{d.version}</p>
          <MosaicLayout
            panels={d.dynos}
            baseHref={category.href}
            lang={language}
          />
        </div>
        )}
      </div>
      
      {/* Footer */}
      {/* <Footer lang={language} /> */}
    </div>
  );
}

const LoadSkeleton = () => {
  return <div className={`flex flex-col h-full overflow-y-auto`}>
  {/* Header - now separate from layout header */}
  <Skeleton className={`flex h-14 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0 sticky top-0 z-20`}/>
  
  {/* Main content */}
  <div className="flex-grow w-full overflow-y-auto flex flex-col flex-shrink-0">
  <div className="w-full h-full">
      <div className="w-full h-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[20vw] gap-2 md:overflow-y-auto overflow-x-hidden" style={{gridAutoFlow: 'row dense'}}>
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full h-full bg-muted-foreground/10"/>
        ))}
      </div>
    </div>
  </div>
</div>
}