"use client";

import { useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";

const translations = {
  en: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Military Power",
      description: "Information about Iran's military capabilities and equipment.",
      href: "/services",
      image: "https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png",
      imageHint: "Symbolic holographic military shield, glowing with dominant blue neon light. Intricate cyberpunk circuitry patterns. Background of faint, glowing outlines of futuristic tanks and jets in a dark, high-tech command center. Minimalist, bold, powerful, serious military feel.",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "War Statistics",
      description: "A look at key statistics and figures throughout the war.",
      href: "/projects",
      image: "https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png",
      imageHint: "holographic chart",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Achievements & Victories",
      description: "An overview of Iran's significant achievements and victories during the war.",
      href: "/achievements",
      image: "https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png",
      imageHint: "missile silo",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "Answering Questions",
      description: "Addressing common questions and dispelling misinformation.",
      href: "/contact",
      image: "https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png",
      imageHint: "question mark neon",
    },
  ],
  fa: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "قدرت نظامی",
      description: "اطلاعاتی درباره توانایی‌ها و تجهیزات نظامی ایران.",
      href: "/services",
      image: "https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "امار و ارقام جنگ",
      description: "نگاهی به آمار و ارقام کلیدی در طول جنگ.",
      href: "/projects",
      image: "https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png",
      imageHint: "holographic chart",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "دستاوردها و افتخارات",
      description: "مروری بر دستاوردها و پیروزی‌های مهم ایران در طول جنگ.",
      href: "/achievements",
      image: "https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png",
      imageHint: "missile silo",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "پاسخ به شبهات",
      description: "پاسخ به سوالات و شبهات رایج در مورد جنگ.",
      href: "/contact",
      image: "https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png",
      imageHint: "question mark neon",
    },
  ],
  ar: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "القوة العسكرية",
      description: "معلومات حول القدرات والمعدات العسكرية الإيرانية.",
      href: "/services",
      image: "https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "إحصائيات الحرب",
      description: "نظرة على الإحصائيات والأرقام الرئيسية خلال الحرب.",
      href: "/projects",
      image: "https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png",
      imageHint: "holographic chart",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "الإنجازات والانتصارات",
      description: "نظرة عامة على إنجازات وانتصارات إيران الهامة خلال الحرب.",
      href: "/achievements",
      image: "https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png",
      imageHint: "missile silo",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "الرد على الشبهات",
      description: "الرد على الأسئلة الشائعة وتوضيح المعلومات الخاطئة.",
      href: "/contact",
      image: "https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png",
      imageHint: "question mark neon",
    },
  ],
  he: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "הכוח הצבאי",
      description: "מידע על היכולות והציוד הצבאי של איראן.",
      href: "/services",
      image: "https://i.postimg.cc/bw1xjb39/Gemini-Generated-Image-b3uzh6b3uzh6b3uz.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "סטטיסטיקות מלחמה",
      description: "מבט על נתונים וסטטיסטיקות מרכזיים לאורך המלחמה.",
      href: "/projects",
      image: "https://i.postimg.cc/sfBdTRXx/Gemini-Generated-Image-l1uliil1uliil1ul.png",
      imageHint: "holographic chart",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "הישגים וניצחונות",
      description: "סקירה כללית של ההישגים והניצחונות המשמעותיים של איראן במהלך המלחמה.",
      href: "/achievements",
      image: "https://i.postimg.cc/9f1bdv2B/Gemini-Generated-Image-a1tcj2a1tcj2a1tc.png",
      imageHint: "missile silo",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "מענה לשאלות",
      description: "מענה לשאלות נפוצות והפרכת מידע מוטעה.",
      href: "/contact",
      image: "https://i.postimg.cc/XqBg0qC2/Gemini-Generated-Image-qlk5zkqlk5zkqlk5.png",
      imageHint: "question mark neon",
    },
  ],
};

type Language = keyof typeof translations;

export function InteractiveBanners({ lang = 'en' }: { lang: Language }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';
  const bannerData = translations[lang] || translations.en;

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
            {...banner}
            href={finalHref}
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
