
"use client";

import { useState, useEffect } from "react";
import { Shield, BarChart3, Trophy, MessageSquareQuote } from "lucide-react";
import { BannerPanel } from "@/components/fourfold/banner-panel";
import { cn } from "@/lib/utils";
import { generateImage } from "@/ai/flows/generate-image-flow";
import { Skeleton } from "@/components/ui/skeleton";

const translations = {
  en: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Iran's Military Power",
      description: "Information about Iran's military capabilities and equipment.",
      href: "/services",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military parade",
      prompt: "A photorealistic image of a powerful military parade. Focus on sleek, modern tanks and fighter jets in a precise formation under a clear sky, conveying a sense of strength and discipline."
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "War Statistics",
      description: "A look at key statistics and figures throughout the war.",
      href: "/projects",
      image: "https://placehold.co/1200x800.png",
      imageHint: "data charts",
      prompt: "An abstract digital artwork representing data analysis. Glowing charts, graphs, and complex data visualizations on a dark, technological background, symbolizing information and strategy."
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Achievements & Victories",
      description: "An overview of Iran's significant achievements and victories during the war.",
      href: "/about",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military medal",
      prompt: "A photorealistic image of a decorated military medal for valor, resting on a dark, textured surface. The lighting should be dramatic, highlighting the intricate details of the medal and ribbon, evoking a sense of honor, sacrifice, and significant achievement in a military context."
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "Answering Questions",
      description: "Addressing common questions and dispelling misinformation.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "question mark",
      prompt: "Conceptual art representing inquiry and clarification. A large, luminous question mark composed of intricate digital patterns, surrounded by swirling streams of light, against a deep blue background."
    },
  ],
  fa: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "قدرت نظامی ایران",
      description: "اطلاعاتی درباره توانایی‌ها و تجهیزات نظامی ایران.",
      href: "/services",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military parade",
      prompt: "A photorealistic image of a powerful military parade. Focus on sleek, modern tanks and fighter jets in a precise formation under a clear sky, conveying a sense of strength and discipline."
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "آمار و ارقام مرتبط با جنگ",
      description: "نگاهی به آمار و ارقام کلیدی در طول جنگ.",
      href: "/projects",
      image: "https://placehold.co/1200x800.png",
      imageHint: "data charts",
      prompt: "An abstract digital artwork representing data analysis. Glowing charts, graphs, and complex data visualizations on a dark, technological background, symbolizing information and strategy."
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "دستاوردها و پیروزی های ایران درحین جنگ",
      description: "مروری بر دستاوردها و پیروزی‌های مهم ایران در طول جنگ.",
      href: "/about",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military medal",
      prompt: "A photorealistic image of a decorated military medal for valor, resting on a dark, textured surface. The lighting should be dramatic, highlighting the intricate details of the medal and ribbon, evoking a sense of honor, sacrifice, and significant achievement in a military context."
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "پاسخ به شبهات",
      description: "پاسخ به سوالات و شبهات رایج در مورد جنگ.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "question mark",
      prompt: "Conceptual art representing inquiry and clarification. A large, luminous question mark composed of intricate digital patterns, surrounded by swirling streams of light, against a deep blue background."
    },
  ],
  ar: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "القوة العسكرية الإيرانية",
      description: "معلومات حول القدرات والمعدات العسكرية الإيرانية.",
      href: "/services",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military parade",
      prompt: "A photorealistic image of a powerful military parade. Focus on sleek, modern tanks and fighter jets in a precise formation under a clear sky, conveying a sense of strength and discipline."
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "إحصائيات الحرب",
      description: "نظرة على الإحصائيات والأرقام الرئيسية خلال الحرب.",
      href: "/projects",
      image: "https://placehold.co/1200x800.png",
      imageHint: "data charts",
      prompt: "An abstract digital artwork representing data analysis. Glowing charts, graphs, and complex data visualizations on a dark, technological background, symbolizing information and strategy."
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "إنجازات وانتصارات إيران خلال الحرب",
      description: "نظرة عامة على إنجازات وانتصارات إيران الهامة خلال الحرب.",
      href: "/about",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military medal",
      prompt: "A photorealistic image of a decorated military medal for valor, resting on a dark, textured surface. The lighting should be dramatic, highlighting the intricate details of the medal and ribbon, evoking a sense of honor, sacrifice, and significant achievement in a military context."
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "الرد على الشبهات",
      description: "الرد على الأسئلة الشائعة وتوضيح المعلومات الخاطئة.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "question mark",
      prompt: "Conceptual art representing inquiry and clarification. A large, luminous question mark composed of intricate digital patterns, surrounded by swirling streams of light, against a deep blue background."
    },
  ],
  he: [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "הכוח הצבאי של איראן",
      description: "מידע על היכולות והציוד הצבאי של איראן.",
      href: "/services",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military parade",
      prompt: "A photorealistic image of a powerful military parade. Focus on sleek, modern tanks and fighter jets in a precise formation under a clear sky, conveying a sense of strength and discipline."
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "סטטיסטיקות מלחמה",
      description: "מבט על נתונים וסטטיסטיקות מרכזיים לאורך המלחמה.",
      href: "/projects",
      image: "https://placehold.co/1200x800.png",
      imageHint: "data charts",
      prompt: "An abstract digital artwork representing data analysis. Glowing charts, graphs, and complex data visualizations on a dark, technological background, symbolizing information and strategy."
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "הישגיה וניצחונותיה של איראן במלחמה",
      description: "סקירה כללית של ההישגים והניצחונות המשמעותיים של איראן במהלך המלחמה.",
      href: "/about",
      image: "https://placehold.co/1200x800.png",
      imageHint: "military medal",
      prompt: "A photorealistic image of a decorated military medal for valor, resting on a dark, textured surface. The lighting should be dramatic, highlighting the intricate details of the medal and ribbon, evoking a sense of honor, sacrifice, and significant achievement in a military context."
    },
    {
      icon: <MessageSquareQuote className="h-12 w-12" />,
      title: "מענה לשאלות",
      description: "מענה לשאלות נפוצות והפרכת מידע מוטעה.",
      href: "/contact",
      image: "https://placehold.co/1200x800.png",
      imageHint: "question mark",
      prompt: "Conceptual art representing inquiry and clarification. A large, luminous question mark composed of intricate digital patterns, surrounded by swirling streams of light, against a deep blue background."
    },
  ],
};

type Language = keyof typeof translations;
type BannerTranslation = (typeof translations.en)[0];

const imageCache: Record<string, string> = {};

export function InteractiveBanners({ lang = 'en' }: { lang: Language }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bannerData, setBannerData] = useState<(BannerTranslation & { isGenerating?: boolean })[]>(
    () => (translations[lang] || translations.en).map(b => ({ 
        ...b, 
        isGenerating: !imageCache[b.prompt],
        image: imageCache[b.prompt] || b.image
    }))
  );
  const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

  useEffect(() => {
    const initialData = translations[lang] || translations.en;
    
    setBannerData(initialData.map(b => ({ 
        ...b, 
        isGenerating: !imageCache[b.prompt],
        image: imageCache[b.prompt] || b.image
    })));

    const generateBannerImages = async () => {
      const bannersToGenerate = initialData.filter(banner => !imageCache[banner.prompt]);
      
      if (bannersToGenerate.length === 0) {
        return;
      }

      await Promise.all(
        bannersToGenerate.map(async (banner) => {
          try {
            const imageUrl = await generateImage(banner.prompt);
            imageCache[banner.prompt] = imageUrl;
          } catch (e) {
            console.warn(`Image generation failed for "${banner.title}". Falling back to placeholder.`, e);
          }
        })
      );

      setBannerData(initialData.map(b => ({
        ...b,
        image: imageCache[b.prompt] || b.image,
        isGenerating: false
      })));
    };

    generateBannerImages();
  }, [lang]);

  return (
    <div
      className={cn("flex h-full w-full", isRtl && "flex-row-reverse")}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {bannerData.map((banner, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        const finalHref = `${banner.href}${lang === 'en' ? '' : `?lang=${lang}`}`;

        if (banner.isGenerating) {
          return (
            <div
              key={`${banner.href}-loading`}
              className={cn(
                "group relative h-full overflow-hidden transition-all duration-700 ease-in-out",
                {
                  "basis-1/4": !isAnyHovered,
                  "basis-[64%]": isHovered,
                  "basis-[12%]": isAnyHovered && !isHovered,
                }
              )}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <Skeleton className="h-full w-full" />
            </div>
          )
        }
        
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
