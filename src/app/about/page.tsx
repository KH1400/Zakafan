
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
    en: "The Modern Warfare Reference",
    fa: "مرجع جنگ مدرن",
    ar: "مرجع الحرب الحديثة",
    he: "העיון למלחמה מודרנית"
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

  return (
    <div dir={langConfig.dir} className={`${langConfig.font} relative flex flex-col h-screen w-screen items-center justify-center text-white p-4`}>
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
        <svg width="280" height="80" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
          <text 
            x={isRtl ? "275" : "5"}
            y="40" 
            fontFamily={fontFamilies[lang]} 
            fontSize="28" 
            fontWeight="bold" 
            className="fill-accent drop-shadow-glow-accent"
            textAnchor={isRtl ? "end" : "start"}
          >
            {logoBrandNames[lang]}
          </text>
          <text 
            x={isRtl ? "275" : "5"}
            y="65" 
            fontFamily={fontFamilies[lang]} 
            fontSize="14" 
            className="fill-white/80"
            textAnchor={isRtl ? "end" : "start"}
          >
            {logoTaglines[lang]}
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
