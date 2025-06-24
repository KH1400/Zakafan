
"use client";

import { useState } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";

const translations = {
  en: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Iran's Military Power",
      description: "Information about Iran's military capabilities and equipment.",
      href: "/services",
      image: "/image.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "War Statistics",
      description: "A look at key statistics and figures throughout the war.",
      href: "/projects",
      image: "/image-1.png",
      imageHint: "Abstract 3D data visualization of war statistics. Glowing green neon bar charts and graphs floating in a dark, cyberpunk command room. Symbolic and minimalist, with a serious, analytical tone. Digital grid lines on floor and walls.",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Achievements & Victories",
      description: "An overview of Iran's significant achievements and victories during the war.",
      href: "/about",
      image: "/image-2.png",
      imageHint: "Minimalist, symbolic cyberpunk trophy, glowing with brilliant golden-yellow neon light. Trophy is surrounded by a holographic laurel wreath. Dark, serious background with subtle futuristic military patterns. Conveys achievement and honor. Bold and iconic.",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "Answering Questions",
      description: "Addressing common questions and dispelling misinformation.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "Bold, symbolic representation of dispelling misinformation. A glowing red neon question mark dissolving into light particles, with a bright white exclamation point materializing. Dark, serious cyberpunk background with digital noise, representing clarity emerging from confusion.",
    },
  ],
  fa: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "قدرت نظامی ایران",
      description: "اطلاعاتی درباره توانایی‌ها و تجهیزات نظامی ایران.",
      href: "/services",
      image: "/image.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "آمار و ارقام مرتبط با جنگ",
      description: "نگاهی به آمار و ارقام کلیدی در طول جنگ.",
      href: "/projects",
      image: "/image-1.png",
      imageHint: "Abstract 3D data visualization of war statistics. Glowing green neon bar charts and graphs floating in a dark, cyberpunk command room. Symbolic and minimalist, with a serious, analytical tone. Digital grid lines on floor and walls.",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "دستاوردها و پیروزی های ایران درحین جنگ",
      description: "مروری بر دستاوردها و پیروزی‌های مهم ایران در طول جنگ.",
      href: "/about",
      image: "/image-2.png",
      imageHint: "Minimalist, symbolic cyberpunk trophy, glowing with brilliant golden-yellow neon light. Trophy is surrounded by a holographic laurel wreath. Dark, serious background with subtle futuristic military patterns. Conveys achievement and honor. Bold and iconic.",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "پاسخ به شبهات",
      description: "پاسخ به سوالات و شبهات رایج در مورد جنگ.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "Bold, symbolic representation of dispelling misinformation. A glowing red neon question mark dissolving into light particles, with a bright white exclamation point materializing. Dark, serious cyberpunk background with digital noise, representing clarity emerging from confusion.",
    },
  ],
  ar: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "القوة العسكرية الإيرانية",
      description: "معلومات حول القدرات والمعدات العسكرية الإيرانية.",
      href: "/services",
      image: "/image.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "إحصائيات الحرب",
      description: "نظرة على الإحصائيات والأرقام الرئيسية خلال الحرب.",
      href: "/projects",
      image: "/image-1.png",
      imageHint: "Abstract 3D data visualization of war statistics. Glowing green neon bar charts and graphs floating in a dark, cyberpunk command room. Symbolic and minimalist, with a serious, analytical tone. Digital grid lines on floor and walls.",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "إنجازات وانتصارات إيران خلال الحرب",
      description: "نظرة عامة على إنجازات وانتصارات إيران الهامة خلال الحرب.",
      href: "/about",
      image: "/image-2.png",
      imageHint: "Minimalist, symbolic cyberpunk trophy, glowing with brilliant golden-yellow neon light. Trophy is surrounded by a holographic laurel wreath. Dark, serious background with subtle futuristic military patterns. Conveys achievement and honor. Bold and iconic.",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "الرد على الشبهات",
      description: "الرد على الأسئلة الشائعة وتوضيح المعلومات الخاطئة.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "Bold, symbolic representation of dispelling misinformation. A glowing red neon question mark dissolving into light particles, with a bright white exclamation point materializing. Dark, serious cyberpunk background with digital noise, representing clarity emerging from confusion.",
    },
  ],
  he: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "הכוח הצבאי של איראן",
      description: "מידע על היכולות והציוד הצבאי של איראן.",
      href: "/services",
      image: "/image.png",
      imageHint: "holographic missile",
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "סטטיסטיקות מלחמה",
      description: "מבט על נתונים וסטטיסטיקות מרכזיים לאורך המלחמה.",
      href: "/projects",
      image: "/image-1.png",
      imageHint: "Abstract 3D data visualization of war statistics. Glowing green neon bar charts and graphs floating in a dark, cyberpunk command room. Symbolic and minimalist, with a serious, analytical tone. Digital grid lines on floor and walls.",
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "הישגיה וניצחונותיה של איראן במלחמה",
      description: "סקירה כללית של ההישגים והניצחונות המשמעותיים של איראן במהלך המלחמה.",
      href: "/about",
      image: "/image-2.png",
      imageHint: "Minimalist, symbolic cyberpunk trophy, glowing with brilliant golden-yellow neon light. Trophy is surrounded by a holographic laurel wreath. Dark, serious background with subtle futuristic military patterns. Conveys achievement and honor. Bold and iconic.",
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "מענה לשאלות",
      description: "מענה לשאלות נפוצות והפרכת מידע מוטעה.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "Bold, symbolic representation of dispelling misinformation. A glowing red neon question mark dissolving into light particles, with a bright white exclamation point materializing. Dark, serious cyberpunk background with digital noise, representing clarity emerging from confusion.",
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
          />
        )
      })}
    </div>
  );
}
