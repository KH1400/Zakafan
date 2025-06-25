"use client";

import { useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/content-data";

const bannerData = [
  {
    icon: <Shield className="h-12 w-12" />,
    title: {
      en: "Military Power",
      fa: "قدرت نظامی",
      ar: "القوة العسكرية",
      he: "הכוח הצבאי",
    },
    description: {
      en: "Information about Iran's military capabilities and equipment.",
      fa: "اطلاعاتی درباره توانایی‌ها و تجهیزات نظامی ایران.",
      ar: "معلومات حول القدرات والمعدات العسكرية الإيرانية.",
      he: "מידע על היכולות והציוד הצבאי של איראן.",
    },
    href: "/services",
    image: "https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png",
    imageHint:
      "Symbolic holographic military shield, glowing with dominant blue neon light. Intricate cyberpunk circuitry patterns. Background of faint, glowing outlines of futuristic tanks and jets in a dark, high-tech command center. Minimalist, bold, powerful, serious military feel.",
  },
  {
    icon: <BarChart3 className="h-12 w-12" />,
    title: {
      en: "War Statistics",
      fa: "امار و ارقام جنگ",
      ar: "إحصائيات الحرب",
      he: "סטטיסטיקות מלחמה",
    },
    description: {
      en: "A look at key statistics and figures throughout the war.",
      fa: "نگاهی به آمار و ارقام کلیدی در طول جنگ.",
      ar: "نظرة على الإحصائيات والأرقام الرئيسية خلال الحرب.",
      he: "מבט על נתונים וסטטיסטיקות מרכזיים לאורך המלחמה.",
    },
    href: "/projects",
    image: "https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png",
    imageHint: "holographic chart",
  },
  {
    icon: <Trophy className="h-12 w-12" />,
    title: {
      en: "Achievements & Victories",
      fa: "دستاوردها و افتخارات",
      ar: "الإنجازات والانتصارات",
      he: "הישגים וניצחונות",
    },
    description: {
      en: "An overview of Iran's significant achievements and victories during the war.",
      fa: "مروری بر دستاوردها و پیروزی‌های مهم ایران در طول جنگ.",
      ar: "نظرة عامة على إنجازات وانتصارات إيران الهامة خلال الحرب.",
      he: "סקירה כללית של ההישגים והניצחונות המשמעותיים של איראן במהלך המלחמה.",
    },
    href: "/achievements",
    image: "https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png",
    imageHint: "missile silo",
  },
  {
    icon: <MessageSquareQuote className="h-12 w-12" />,
    title: {
      en: "Answering Questions",
      fa: "پاسخ به شبهات",
      ar: "الرد على الشبهات",
      he: "מענה לשאלות",
    },
    description: {
      en: "Addressing common questions and dispelling misinformation.",
      fa: "پاسخ به سوالات و شبهات رایج در مورد جنگ.",
      ar: "الرد على الأسئلة الشائعة وتوضيح المعلومات الخاطئة.",
      he: "מענה לשאלות נפוצות והפרכת מידע מוטעה.",
    },
    href: "/contact",
    image: "https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png",
    imageHint: "question mark neon",
  },
];

export function InteractiveBanners({ lang = 'en' }: { lang: Language }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  return (
    <div
      className={cn("flex h-full w-full", isRtl && "flex-row-reverse")}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {bannerData.map((banner, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        const finalHref = `${banner.href}${lang === 'en' ? '' : `?lang=${lang}`}`;
        
        return (
          <BannerPanel
            key={banner.href}
            icon={banner.icon}
            title={banner.title[lang]}
            description={banner.description[lang]}
            href={finalHref}
            image={banner.image}
            imageHint={banner.imageHint}
            isHovered={isHovered}
            isAnyHovered={isAnyHovered}
            onMouseEnter={() => setHoveredIndex(index)}
            isLast={index === bannerData.length - 1}
          />
        )
      })}
    </div>
  );
}
