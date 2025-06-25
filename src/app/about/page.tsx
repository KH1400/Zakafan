
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { type Language } from '@/lib/content-data';

const goBackTranslations = {
    en: "Go Back Home",
    fa: "بازگشت به خانه",
    ar: "العودة إلى الرئيسية",
    he: "חזור לדף הבית",
};

const aboutTranslations = {
    content: {
        en: "War Dynograph is a premier reference for modern conflict analysis. It's built upon 'Dynography,' an intelligent, modern format we designed. This dynamic framework combines AI algorithms with expert supervision to generate smart, dashboard-driven content and analytical tools from credible sources. Our mission is to deliver accurate, objective, and deeply-researched information to foster a clear understanding of the complexities of warfare.",
        fa: "«داینوگراف جنگ» یک مرجع تخصصی برای تحلیل نبردهای مدرن است. این پلتفرم بر پایه‌ی «داینوگرافی»، یک قالب محتوایی مدرن و هوشمند، ساخته شده است. داینوگرافی با ترکیب الگوریتم‌های هوش مصنوعی و نظارت کارشناسان خبره، محتوای پویا و داشبورد-محور را از منابع معتبر استخراج و ارائه می‌کند. مأموریت ما ارائه اطلاعات دقیق، عینی و عمیقاً تحقیق‌شده برای درک پیچیدگی‌های جنگ است.",
        ar: "«داينوغراف الحرب» هو مرجع رائد لتحليل الصراعات الحديثة. تم بناؤه على أساس «الداينوغرافيا»، وهو شكل حديث وذكي قمنا بتصميمه. يجمع هذا الإطار الديناميكي بين خوارزميات الذكاء الاصطناعي وإشراف الخبراء لإنشاء محتوى ذكي قائم على لوحات المعلومات وأدوات تحليلية من مصادر موثوقة. مهمتنا هي تقديم معلومات دقيقة وموضوعية ومدروسة بعمق لتعزيز فهم واضح لتعقيدات الحرب.",
        he: "«דיינוגרף מלחמה» הוא מקור עיון מוביל לניתוח סכסוכים מודרניים. הוא בנוי על «דיינוגרפיה», פורמט מודרני וחכם שעיצבנו. מסגרת דינמית זו משלבת אלגוריתמים של בינה מלאכותית עם פיקוח מומחים כדי ליצור תוכן חכם מבוסס-דשבורדים וכלים אנליטיים ממקורות אמינים. משימתנו היא לספק מידע מדויק, אובייקטיבי ומבוסס-מחקר במטרה לטפח הבנה ברורה של מורכבויות המלחמה.",
    },
};

// Static English branding for the logo
const brandName = "War Dynograph";
const tagline = "The Dynographic Reference for the Iran-Israel War";
const logoFontFamily = "Inter, sans-serif";

const pageFontFamilies: Record<Language, string> = {
    en: "font-body",
    fa: "font-persian",
    ar: "font-arabic",
    he: "font-hebrew"
};

export default function AboutPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = (searchParams?.lang || 'en') as Language;
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';
  const langConfig = {
    dir: isRtl ? 'rtl' as const : 'ltr' as const,
    font: pageFontFamilies[lang],
  };

  // Fixed LTR layout values for the logo
  const forcedTextLength = "370";
  const iconX = 30;
  const textX = 60;
  const textAnchor = "start";

  return (
    <div dir={langConfig.dir} className={`${langConfig.font} relative flex flex-col min-h-screen w-full items-center justify-center text-white p-4`}>
      <Image
        src="/about/c5.png"
        alt="Background"
        fill
        className="object-cover -z-10"
        data-ai-hint="holographic datasphere"
        priority
      />
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <div className="flex flex-col items-center text-center max-w-3xl">
        <svg width="500" height="100" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-auto">
            <g transform={`translate(${iconX}, 50)`} stroke="hsl(var(--accent))" strokeWidth="3" fill="none" className="drop-shadow-glow-accent">
                <path d="M-20 0 L0 -20 L20 0 L0 20 Z" />
                <path d="M-10 0 L0 -10 L10 0 L0 10 Z" fill="hsl(var(--accent))" />
            </g>
            <text 
                x={textX}
                y="50" 
                fontFamily={logoFontFamily} 
                fontSize="34" 
                fontWeight="bold" 
                className="fill-accent drop-shadow-glow-accent"
                textAnchor={textAnchor}
                dominantBaseline="middle"
                textLength={forcedTextLength}
                lengthAdjust="spacingAndGlyphs"
            >
                {brandName}
            </text>
            <text 
                x={textX}
                y="80" 
                fontFamily={logoFontFamily}
                fontSize="16" 
                className="fill-white/80"
                textAnchor={textAnchor}
                textLength={forcedTextLength}
                lengthAdjust="spacingAndGlyphs"
            >
                {tagline}
            </text>
        </svg>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/90">
          {aboutTranslations.content[lang]}
        </p>

        <Button asChild variant="outline" className="mt-10 bg-transparent hover:bg-white/10 border-white/50 text-white hover:text-white">
          <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
            <ArrowLeft className={isRtl ? "ml-2" : "mr-2"} />
            {goBackTranslations[lang]}
          </Link>
        </Button>
      </div>
    </div>
  );
}
