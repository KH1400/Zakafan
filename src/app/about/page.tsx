import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { generateImage } from "@/ai/flows/generate-image-flow";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/fourfold/footer";

type Language = 'fa' | 'en' | 'ar' | 'he';

const languageOptions: Record<Language, { dir: 'rtl' | 'ltr'; font: string }> = {
  fa: { dir: 'rtl', font: 'font-persian' },
  en: { dir: 'ltr', font: 'font-body' },
  ar: { dir: 'rtl', font: 'font-arabic' },
  he: { dir: 'rtl', font: 'font-hebrew' },
};

const translations = {
  tagline: {
    en: 'Dynography Reference',
    fa: 'مرجع داینوگرافی',
    ar: 'مرجع داينوغرافي',
    he: 'התייחסות לדיינוגרפיה',
  },
  description: {
    en: "Dynographic is a creative and intelligent content format that helps you on the path to obtaining reliable and comprehensive information in an integrated and coherent way. This content is produced entirely by smart algorithms, using reliable international sources, and under the supervision of experts and specialists, and is constantly updated.",
    fa: "داینوگرافیک، یک قالب محتوایی خلاقانه و هوشمند است که شما را در مسیر کسب اطلاعات معتبر و جامع به شکلی یکپارچه و منسجم یاری می‌کند. این محتوا تماما توسط الگوریتم‌های هوشمند و با استفاده از منابع معتبر  بین المللی و با نظارت کارشناسان و متخصصان تولید می‌گردد و به شکل مداوم بروزرسانی می‌گردد.",
    ar: "داينوغرافيك هو شكل محتوى إبداعي وذكي يساعدك في الحصول على معلومات موثوقة وشاملة بطريقة متكاملة ومتماسكة. يتم إنتاج هذا المحتوى بالكامل بواسطة خوارزميات ذكية، باستخدام مصادر دولية موثوقة، وتحت إشراف الخبراء والمتخصصين، ويتم تحديثه باستمرار.",
    he: "דיינוגרפיק הוא פורמט תוכן יצירתי וחכם המסייע לך בדרך לקבלת מידע אמין ומקיף באופן משולב וקוהרנטי. תוכן זה מופק כולו על ידי אלגוריתמים חכמים, תוך שימוש במקורות בינלאומיים אמינים, ובפיקוח של מומחים, ומתעדכן באופן רציף.",
  },
  goBack: {
    en: "Go Back Home",
    fa: "بازگشت به خانه",
    ar: "العودة إلى الرئيسية",
    he: "חזור לדף הבית",
  },
  aboutTitle: {
      en: "About Us",
      fa: "درباره ما",
      ar: "معلومات عنا",
      he: "עלינו",
  }
};

const imagePrompt = "A visually stunning, abstract representation of digital information warfare. Use dark, sophisticated tones with highlights of electric blue and glowing orange, symbolizing data streams and conflict points. The image should be clean, minimalist, and suitable for a high-tech website background. 4K, ultra-high resolution.";

const Logo = ({ className, tagline, taglineFont }: { className?: string; tagline: string; taglineFont: string; }) => (
    <svg
      viewBox="0 0 250 60"
      className={cn("h-10 w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <text
          x="0"
          y="35"
          fontSize="32"
          fontWeight="bold"
          fill="hsl(var(--primary))"
          className="font-headline"
        >
          Zakafan
        </text>
        <text
          x="0"
          y="55"
          fontSize="14"
          fontWeight="bold"
          fill="white"
          opacity="0.9"
          className={taglineFont}
        >
          {tagline}
        </text>
      </g>
      <g transform="translate(190, 0)">
        <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
        <g
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M42,21 C42,26.5228475 37.5228475,31 32,31 L28,31 C22.4771525,31 18,26.5228475 18,21 C18,15.4771525 22.4771525,11 28,11 C33.5228475,11 37.8,15.4771525 37.8,21" />
          <path d="M28,31 L28,38 C28,39.1045695 27.1045695,40 26,40 L22,40" />
          <path d="M32,17 L38,17" />
          <circle cx="40" cy="17" r="2.5" />
          <path d="M35,24 L42,24" />
          <circle cx="44" cy="24" r="2.5" />
          <path d="M32,31 L36,31" />
          <circle cx="38" cy="31" r="2.5" />
          <path d="M28,11 L28,15" />
          <circle cx="28" cy="17" r="2.5" />
        </g>
      </g>
    </svg>
);


export default async function AboutPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = (searchParams?.lang || 'en') as Language;
  const langConfig = languageOptions[lang] || languageOptions.en;

  const bgImage = await generateImage(imagePrompt).catch(e => {
    console.error("Background image generation failed:", e);
    return "https://placehold.co/1920x1080.png";
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow relative">
        <div dir={langConfig.dir} className={cn("absolute inset-0 bg-background overflow-hidden", langConfig.font)}>
            <Image
              src={bgImage}
              alt="Abstract background"
              fill
              className="object-cover z-0"
              data-ai-hint="digital warfare abstract"
              priority
            />
            <div className="absolute inset-0 bg-black/70 z-10" />
            
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-4xl">
                    <Logo 
                      className="h-20 w-auto mx-auto mb-8"
                      tagline={translations.tagline[lang]}
                      taglineFont={langConfig.font}
                    />
                    
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-neutral-300">
                      {translations.aboutTitle[lang]}
                    </h2>

                    <p className="max-w-3xl mx-auto text-base md:text-lg text-neutral-200 mb-12 text-justify">
                      {translations.description[lang]}
                    </p>

                    <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                      <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
                        <ArrowLeft />
                        <span>{translations.goBack[lang]}</span>
                      </Link>
                    </Button>
                </div>
            </div>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
