
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
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <defs>
              <linearGradient id="logo-gradient-rtl-about" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g transform="translate(180, 5)">
                <path d="M 15,10 C 8,10 5,15 5,20 V 40 C 5,45 8,50 15,50 H 30 C 20,40 20,20 30,10 H 15 Z" fill="url(#logo-gradient-rtl-about)" />
                <path d="M 30,10 C 40,20 40,40 30,50 H 45 C 52,50 55,45 55,40 V 20 C 55,15 52,10 45,10 H 30 Z" fill="#FFDA63" />
            </g>
            <text x="170" y="28" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" className="fill-white">{logoBrandNames[lang]}</text>
            <text x="170" y="48" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines[lang]}</text>
          </svg>
        ) : (
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <defs>
              <linearGradient id="logo-gradient-ltr-about" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g transform="translate(0, 5)">
              <path d="M 15,10 C 8,10 5,15 5,20 V 40 C 5,45 8,50 15,50 H 30 C 20,40 20,20 30,10 H 15 Z" fill="url(#logo-gradient-ltr-about)" />
              <path d="M 30,10 C 40,20 40,40 30,50 H 45 C 52,50 55,45 55,40 V 20 C 55,15 52,10 45,10 H 30 Z" fill="#FFDA63" />
            </g>
            <text x="70" y="28" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" className="fill-white">Zakafan</text>
            <text x="70" y="48" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines.en}</text>
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
