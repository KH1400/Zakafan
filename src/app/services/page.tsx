import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";

type Language = 'fa' | 'en' | 'ar' | 'he';

const translations = {
    title: {
        en: "Our Services",
        fa: "خدمات ما",
        ar: "خدماتنا",
        he: "השירותים שלנו",
    },
    description: {
        en: "This is the services page.",
        fa: "این صفحه خدمات است.",
        ar: "هذه صفحة الخدمات.",
        he: "זהו דף השירותים.",
    },
    goBack: {
        en: "Go Back Home",
        fa: "بازگشت به خانه",
        ar: "العودة إلى الرئيسية",
        he: "חזור לדף הבית",
    },
};

export default function ServicesPage({ searchParams }: { searchParams?: { lang?: string } }) {
    const lang = (searchParams?.lang || 'en') as Language;
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold font-headline mb-4">{translations.title[lang]}</h1>
            <p className="text-xl text-muted-foreground mb-8">
                {translations.description[lang]}
            </p>
            <Button asChild>
              <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> {translations.goBack[lang]}
              </Link>
            </Button>
          </div>
        </main>
        <Footer lang={lang} />
    </div>
  );
}
