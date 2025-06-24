
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
    tagline: {
      en: 'Dynography Reference',
      fa: 'مرجع تخصصی هوش مصنوعی و فناوری شناختی',
      ar: 'المرجع المتخصص للذكاء الاصطناعي والتكنولوجيا المعرفية',
      he: 'התייחסות לדיינוגרפיה',
    },
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
      />
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <div className="flex flex-col items-center text-center max-w-3xl">
        {isRtl ? (
          <svg
            viewBox="0 0 450 100"
            className="h-24 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            dir="rtl"
          >
            <g transform="translate(10, 20)">
              <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
              <g
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M48,45 C48,35, 40,30, 35,22 C28,12, 30,8, 40,8" />
                <path d="M35,22 L28,32" />
                <path d="M28,32 L38,42" />
                <path d="M28,32 L20,38" />
                <path d="M40,8 L45,15" />

                <circle cx="28" cy="32" r="3" />
                <circle cx="38" cy="42" r="2.5" />
                <circle cx="20" cy="38" r="2.5" />
                <circle cx="45" cy="15" r="2.5" />
              </g>
            </g>
            <g>
              <text
                x="440"
                y="60"
                fontSize="48"
                fontWeight="bold"
                fill="hsl(var(--accent))"
                className="font-persian drop-shadow-glow-accent"
                textAnchor="end"
              >
                زکافن
              </text>
              <text
                x="440"
                y="85"
                fontSize="14"
                fontWeight="bold"
                fill="white"
                opacity="0.9"
                className={langConfig.font}
                textAnchor="end"
              >
                {aboutTranslations.tagline[lang]}
              </text>
            </g>
          </svg>
        ) : (
          <svg
            viewBox="0 0 250 60"
            className="h-24 w-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <text
                x="0"
                y="35"
                fontSize="32"
                fontWeight="bold"
                fill="hsl(var(--accent))"
                className="font-headline drop-shadow-glow-accent"
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
                className={langConfig.font}
              >
                {aboutTranslations.tagline[lang]}
              </text>
            </g>
            <g transform="translate(190, 0)">
              <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
              <g
                stroke="white"
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
