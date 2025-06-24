
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
        <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
          <text x="5" y="28" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" fill="hsl(var(--chart-1))">{logoBrandNames[lang]}</text>
          <text x="5" y="48" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines[lang]}</text>
          <g transform="translate(190, 5)">
              <rect width="50" height="50" rx="8" fill="#FFDA63"/>
              <g transform="translate(10,8)" stroke="hsl(var(--chart-1))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M31.4,35.4C32,35.6,32.6,35.7,33.2,35.7c4.6,0,8.4-3.8,8.4-8.4v-4.2c0-4.6-3.8-8.4-8.4-8.4c-3.1,0-5.8,1.7-7.3,4.2"/>
                <path d="M25.8,12.5c0,1.4-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5S25.8,11.1,25.8,12.5z"/>
                <path d="M20.8,27.5c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S22.2,27.5,20.8,27.5z"/>
                <path d="M19.1,19.2c-0.8,0.8-0.8,2.1,0,2.8c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8C21.2,18.4,19.9,18.4,19.1,19.2z"/>
                <path d="M27.5,19.2c0,0.8-0.7,1.7-1.7,1.7c-0.8,0-1.7-0.7-1.7-1.7c0-1.7,0.8-2.5,1.7-2.5C26.7,16.7,27.5,17.5,27.5,19.2z"/>
                <path d="M30,23.3c-1.7,0-2.5-0.8-2.5-1.7c0-0.8,0.8-1.7,1.7-1.7c1.7,0,2.5,0.8,2.5,1.7C31.7,22.5,30.8,23.3,30,23.3z"/>
                <path d="M29.2,28.3c-0.8,0.8-0.8,2.1,0,2.8c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8C31.3,27.5,30,27.5,29.2,28.3z"/>
                <path d="M23.3,16.7L23.3,16.7c-1.7,0-2.5-1.7-2.5-2.5c0-0.8,0.8-1.7,1.7-1.7c0.8,0,1.7,0.8,1.7,1.7C24.2,15,24.2,16.7,23.3,16.7z"/>
                <path d="M21.7,25.8c-0.8,0-1.7-0.8-1.7-1.7c0-0.8,0.8-1.7,1.7-1.7c1.7,0,2.5,0.8,2.5,1.7C24.2,25,23.3,25.8,21.7,25.8z"/>
                <path d="M25.8,29.2c-0.8,0-1.7,0.7-1.7,1.7c0,0.8,0.8,1.7,1.7,1.7c0.8,0,1.7-0.8,1.7-1.7C27.5,29.9,26.7,29.2,25.8,29.2z"/>
              </g>
          </g>
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
