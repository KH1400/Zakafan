
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
        en: "War Dynograph is a premier reference for modern conflict analysis, providing data-driven insights on military and geopolitical topics. Our mission is to deliver accurate, objective, and deeply-researched information to our audience, fostering a clear understanding of the complexities of warfare.",
        fa: "«داینوگراف جنگ» یک مرجع تخصصی برای تحلیل نبردهای مدرن است که بینش‌های داده‌محور در موضوعات نظامی و ژئوپلیتیکی ارائه می‌دهد. مأموریت ما ارائه اطلاعات دقیق، عینی و کاملاً تحقیق‌شده به مخاطبانمان است تا درک روشنی از پیچیدگی‌های جنگ فراهم آوریم.",
        ar: "«داينوغراف الحرب» هو مرجع رائد لتحليل الصراعات الحديثة، حيث يقدم رؤى قائمة على البيانات حول الموضوعات العسكرية والجيوسياسية. مهمتنا هي تقديم معلومات دقيقة وموضوعية ومدروسة بعمق لجمهورنا، مما يعزز فهمًا واضحًا لتعقيدات الحرب.",
        he: "«דיינוגרף מלחמה» הוא מקור עיון מוביל לניתוח סכסוכים מודרניים, המספק תובנות מבוססות-נתונים בנושאים צבאיים וגיאופוליטיים. משימתנו היא לספק מידע מדויק, אובייקטיבי ומבוסס-מחקר לקהל שלנו, במטרה לטפח הבנה ברורה של מורכבויות המלחמה.",
    },
};

const logoBrandNames = {
    en: "War Dynograph",
    fa: "داینوگراف جنگ",
    ar: "داينوغراف الحرب",
    he: "דיינוגרף מלחמה"
};

const logoTaglines = {
    en: "The Dynographic Reference for the Iran-Israel War",
    fa: "داینوگرافی جنگ ایران - اسرائیل",
    ar: "المرجع الداينوغرافي للحرب الإيرانية الإسرائيلية",
    he: "המרجع הדינוגרפי למלחמת איראן-ישראל"
};

const fontFamilies: Record<Language, string> = {
    en: "Inter, sans-serif",
    fa: "Noto Sans Arabic, sans-serif",
    ar: "Noto Sans Arabic, sans-serif",
    he: "Noto Sans Hebrew, sans-serif"
};

export default function AboutPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = (searchParams?.lang || 'en') as Language;
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';
  const langConfig = {
    fa: { dir: 'rtl' as const, font: 'font-persian' },
    en: { dir: 'ltr' as const, font: 'font-body' },
    ar: { dir: 'rtl' as const, font: 'font-arabic' },
    he: { dir: 'rtl' as const, font: 'font-hebrew' },
  }[lang];
  
  const brandName = logoBrandNames[lang];
  const tagline = logoTaglines[lang];
  const fontFamily = fontFamilies[lang];

  const forcedTextLength = "370";
  const iconX = isRtl ? 470 : 30;
  const textX = isRtl ? 440 : 60;
  const textAnchor = isRtl ? "end" : "start";

  return (
    <div dir={langConfig.dir} className={`${langConfig.font} relative flex flex-col h-screen w-full items-center justify-center text-white p-4`}>
      <Image
        src="https://i.postimg.cc/GtCzCYkX/Gemini-Generated-Image-o1se3zo1se3zo1se.png"
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
                fontFamily={fontFamily} 
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
                fontFamily={fontFamily}
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
