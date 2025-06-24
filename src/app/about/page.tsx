
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
              <linearGradient id="logo-gradient-rtl-about" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g>
              <g transform="translate(180,0)">
                <path d="M14.4118 10.5882C11.9327 10.5882 9.55691 11.5647 7.7641 13.3575C5.97129 15.1503 5 17.5261 5 20V40C5 42.4739 5.97129 44.8497 7.7641 46.6425C9.55691 48.4353 11.9327 49.4118 14.4118 49.4118H25.5882C34.652 49.4118 41.7647 42.299 41.7647 33.2353V26.7647C41.7647 17.701 34.652 10.5882 25.5882 10.5882H14.4118Z" fill="#FFDA63" />
                <path d="M49.4118 20C49.4118 17.5261 48.4405 15.1503 46.6477 13.3575C44.8549 11.5647 42.479 10.5882 40 10.5882H28.8235C19.7598 10.5882 12.6471 17.701 12.6471 26.7647V33.2353C12.6471 42.299 19.7598 49.4118 28.8235 49.4118H40C42.479 49.4118 44.8549 48.4353 46.6477 46.6425C48.4405 44.8497 49.4118 42.4739 49.4118 40V20Z" fill="url(#logo-gradient-rtl-about)" transform="translate(5.5882, 0)" />
              </g>
              <text x="175" y="28" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" className="fill-white">{logoBrandNames[lang]}</text>
              <text x="175" y="48" direction="rtl" textAnchor="end" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines[lang]}</text>
            </g>
          </svg>
        ) : (
          <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto">
            <defs>
              <linearGradient id="logo-gradient-ltr-about" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
              </linearGradient>
            </defs>
            <g>
              <path d="M14.4118 10.5882C11.9327 10.5882 9.55691 11.5647 7.7641 13.3575C5.97129 15.1503 5 17.5261 5 20V40C5 42.4739 5.97129 44.8497 7.7641 46.6425C9.55691 48.4353 11.9327 49.4118 14.4118 49.4118H25.5882C34.652 49.4118 41.7647 42.299 41.7647 33.2353V26.7647C41.7647 17.701 34.652 10.5882 25.5882 10.5882H14.4118Z" fill="url(#logo-gradient-ltr-about)" />
              <path d="M49.4118 20C49.4118 17.5261 48.4405 15.1503 46.6477 13.3575C44.8549 11.5647 42.479 10.5882 40 10.5882H28.8235C19.7598 10.5882 12.6471 17.701 12.6471 26.7647V33.2353C12.6471 42.299 19.7598 49.4118 28.8235 49.4118H40C42.479 49.4118 44.8549 48.4353 46.6477 46.6425C48.4405 44.8497 49.4118 42.4739 49.4118 40V20Z" fill="#FFDA63" transform="translate(5.5882, 0)" />
              <text x="70" y="28" fontFamily={fontFamilies[lang]} fontSize="22" fontWeight="bold" className="fill-white">Zakafan</text>
              <text x="70" y="48" fontFamily={fontFamilies[lang]} fontSize="12" className="fill-white/80">{logoTaglines.en}</text>
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
