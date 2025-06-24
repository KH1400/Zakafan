
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
        en: "Zakafan is a reference for Dynography, providing insights and analysis on various topics. Our mission is to deliver accurate and well-researched information to our audience. We believe in clarity, objectivity, and a deep understanding of the subjects we cover.",
        fa: "زکافن یک مرجع برای داینوگرافی است که بینش و تحلیل در موضوعات مختلف ارائه می‌دهد. مأموریت ما ارائه اطلاعات دقیق و تحقیق شده به مخاطبانمان است. ما به شفافیت، عینیت و درک عمیق از موضوعاتی که پوشش می‌دهیم، اعتقاد داریم.",
        ar: "زكافن هو مرجع للدينوغرافيا، يقدم رؤى وتحليلات حول مواضيع مختلفة. مهمتنا هي تقديم معلومات دقيقة ومدروسة جيدًا لجمهورنا. نحن نؤمن بالوضوح والموضوعية والفهم العميق للمواضيع التي نغطيها.",
        he: "זקפן הוא אתר עיון לדיינוגרפיה, המספק תובנות וניתוחים בנושאים שונים. המשימה שלנו היא לספק מידע מדויק ונחקר היטב לקהל שלנו. אנו מאמינים בבהירות, אובייקטיביות והבנה עמוקה של הנושאים שאנו מסקרים.",
    },
};

const logoBrandNames = {
    en: "Zakafan",
    fa: "زکافن",
    ar: "زكافن",
    he: "זקפן"
};

const logoTaglines = {
    en: "The Dynography Reference",
    fa: "مرجع داینوگرافی",
    ar: "مرجع للدينوغرافيا",
    he: "אתר עיון לדיינוגרפיה"
};

const fontFamilies = {
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
        {isRtl ? (
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <g transform="translate(5, 5)">
              <rect width="50" height="50" rx="8" fill="#FFDA63"/>
              <g transform="translate(10,8)" stroke="hsl(var(--chart-1))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35.6 38.2c-1.3-0.5-2.7-0.8-4.2-0.8 -5.8 0-10.5-4.7-10.5-10.5V22.5c0-5.8 4.7-10.5 10.5-10.5 3.9 0 7.3 2.1 9.1 5.2" />
                <path d="M28.3 35.5L32.6 35.5" />
                <path d="M26.4 20.2L30.2 20.2" />
                <circle cx="25" cy="20.2" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L30.2 16" />
                <circle cx="30.2" cy="14.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L34.5 24.5" />
                <circle cx="35.5" cy="25.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L30.2 26" />
                <circle cx="30.2" cy="27.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 26L26.5 29" />
                <circle cx="25.5" cy="29.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
              </g>
            </g>
            <text x="245" y="28" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" fill="hsl(var(--chart-1))">{logoBrandNames[lang]}</text>
            <text x="245" y="48" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines[lang]}</text>
          </svg>
        ) : (
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <text x="5" y="28" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" fill="hsl(var(--chart-1))">{logoBrandNames.en}</text>
            <text x="5" y="48" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines.en}</text>
            <g transform="translate(190, 5)">
              <rect width="50" height="50" rx="8" fill="#FFDA63"/>
              <g transform="translate(10,8)" stroke="hsl(var(--chart-1))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M35.6 38.2c-1.3-0.5-2.7-0.8-4.2-0.8 -5.8 0-10.5-4.7-10.5-10.5V22.5c0-5.8 4.7-10.5 10.5-10.5 3.9 0 7.3 2.1 9.1 5.2" />
                <path d="M28.3 35.5L32.6 35.5" />
                <path d="M26.4 20.2L30.2 20.2" />
                <circle cx="25" cy="20.2" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L30.2 16" />
                <circle cx="30.2" cy="14.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L34.5 24.5" />
                <circle cx="35.5" cy="25.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 20.2L30.2 26" />
                <circle cx="30.2" cy="27.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
                <path d="M30.2 26L26.5 29" />
                <circle cx="25.5" cy="29.5" r="1.5" strokeWidth="0" fill="hsl(var(--chart-1))"/>
              </g>
            </g>
          </svg>
        )}


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
