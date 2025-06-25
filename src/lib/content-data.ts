
export type Language = 'fa' | 'en' | 'ar' | 'he';

export type MosaicPanel = {
    title: string;
    image: string;
    imageHint: string;
    gridArea: string;
};

export type ContentItem = {
    id: string;
    slug: string;
    title: Record<Language, string>;
    image: string;
    imageHint: string;
    htmlFile: string,
    pdfFile: string,
    infoFile: string,
    images: string[],
    textimages: string[],
    html: string,
    categories: number[],
    size: number,
}

export type SectionInfo = {
    id: number;
    title: Record<Language, string>;
    description: Record<Language, string>;
    href: string;
    icon: string,
    image: string,
    imageHint: string
}

export type MosaicPanelData = {
    title: string;
    image: string;
    imageHint: string;
    size: number;
};

export const sections: SectionInfo[] = [
    {
      id: 0,
      icon: "Shield",
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
      href: "services",
      image: "/categories/c1.png",
      imageHint:
        "Symbolic holographic military shield, glowing with dominant blue neon light. Intricate cyberpunk circuitry patterns. Background of faint, glowing outlines of futuristic tanks and jets in a dark, high-tech command center. Minimalist, bold, powerful, serious military feel.",
    },
    {
      id: 1,
      icon: "BarChart3",
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
      href: "projects",
      image: "/categories/c2.png",
      imageHint: "holographic chart",
    },
    {
      id: 2,
      icon: "Trophy",
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
      href: "achievements",
      image: "/categories/c3.png",
      imageHint: "missile silo",
    },
    {
      id: 3,
      icon: "MessageSquareQuote",
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
      href: "contact",
      image: "/categories/c4.png",
      imageHint: "question mark neon",
    },
  ];

const createSlug = (text: string) => text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

// const processPanels = (sectionId: ContentItem['id'], panels: Record<Language, MosaicPanel[]>): ContentItem[] => {
//     const enPanels = panels.en;
//     return enPanels.map((enPanel, index) => ({
//         sectionId: sectionId,
//         slug: createSlug(enPanel.title),
//         title: {
//             en: enPanel.title,
//             fa: panels.fa[index].title,
//             ar: panels.ar[index].title,
//             he: panels.he[index].title,
//         },
//         image: enPanel.image,
//         imageHint: enPanel.imageHint,
//         gridArea: enPanel.gridArea,
//     }));
// };

const images = {
    missile: "https://i.postimg.cc/GhLxGFhP/Gemini-Generated-Image-6ui82b6ui82b6ui8.png",
    drone: "https://i.postimg.cc/FRxJH6SM/Gemini-Generated-Image-iumdqliumdqliumd.png",
    warship: "https://i.postimg.cc/0NDwLjy2/Gemini-Generated-Image-iumdqiiumdqiiumd.png",
    cyber: "https://i.postimg.cc/xTpMmBZY/Gemini-Generated-Image-iumdqjiumdqjiumd.png",
    tank: "https://i.postimg.cc/qMv2zpjj/Gemini-Generated-Image-iumdqhiumdqhiumd.png",
    radar: "https://i.postimg.cc/gcqKxSdk/Gemini-Generated-Image-6ui8276ui8276ui8.png",
    timeline: "https://i.postimg.cc/4xnvFXcm/Gemini-Generated-Image-iumdqmiumdqmiumd.png",
    abstractData: "https://i.postimg.cc/8PYfcMFz/Gemini-Generated-Image-6ui82e6ui82e6ui8.png",
    soldierSilhouette: "https://i.postimg.cc/PJ4b0xK8/Gemini-Generated-Image-6ui82c6ui82c6ui8.png",
    soldierMap: "https://i.postimg.cc/rmTrcTDG/Gemini-Generated-Image-iumdqkiumdqkiumd-1.png",
    soldierTech: "https://i.postimg.cc/d34d4ft2/Gemini-Generated-Image-iumdqgiumdqgiumd.png",
    jet: "https://i.postimg.cc/GtcGPRr3/Gemini-Generated-Image-iumdqfiumdqfiumd.png",
    questionMark: "https://i.postimg.cc/QMTQhS0D/Gemini-Generated-Image-iumdqniumdqniumd.png",
    satellite: "https://i.postimg.cc/SNRzmDxP/Gemini-Generated-Image-6ui8266ui8266ui8.png",
};

const dynos = [
    {
      id:'1',
      slug: 'Missile-Program',
      title: {
        en: "Missile Program",
        fa: "برنامه موشکی",
        ar: "برنامج الصواريخ",
        he: "תוכנית טילים",
      },
      image: images.missile,
      imageHint: "missile launch silo",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'2',
      slug: 'Drone-Fleet',
      title: {
        en: "Drone Fleet",
        fa: "ناوگان پهپادی",
        ar: "أسطول الطائرات بدون طيار",
        he: 'צי כטב"מים',
      },
      image: images.drone,
      imageHint: "military drone sky",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'3',
      slug: 'Naval-Forces',
      title: {
        en: "Naval Forces",
        fa: "نیروی دریایی",
        ar: "القوات البحرية",
        he: "כוחות ימיים",
      },
      image: images.warship,
      imageHint: "warship at sea",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'4',
      slug: 'Cyber-Warfare',
      title: {
        en: "Cyber Warfare",
        fa: "جنگ سایبری",
        ar: "الحرب السيبرانية",
        he: "לוחמת סייבר",
      },
      image: images.cyber,
      imageHint: "digital code matrix",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'5',
      slug: 'Ground-Troops',
      title: {
        en: "Ground Troops",
        fa: "نیروهای زمینی",
        ar: "القوات البرية",
        he: "כוחות קרקע",
      },
      image: images.tank,
      imageHint: "soldiers marching desert",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'6',
      slug: 'Air-Defense',
      title: {
        en: "Air Defense",
        fa: "پدافند هوایی",
        ar: "الدفاع الجوي",
        he: "הגנה אווירית",
      },
      image: images.radar,
      imageHint: "radar system night",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'7',
      slug: 'Artillery-Units',
      title: {
        en: "Artillery Units",
        fa: "یگان‌های توپخانه",
        ar: "وحدات المدفعية",
        he: "יחידות ארטילריה",
      },
      image: images.tank,
      imageHint: "artillery firing",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'8',
      slug: 'Special-Forces',
      title: {
        en: "Special Forces",
        fa: "نیروهای ویژه",
        ar: "القوات الخاصة",
        he: "כוחות מיוחדים",
      },
      image: images.soldierSilhouette,
      imageHint: "special forces night",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'9',
      slug: 'Logistics-Corps',
      title: {
        en: "Logistics Corps",
        fa: "سپاه لجستیک",
        ar: "فيلق اللوجستيات",
        he: "חיל הלוגיסטיקה",
      },
      image: images.cyber,
      imageHint: "military supply truck",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'10',
      slug: 'Air-Force',
      title: {
        en: "Air Force",
        fa: "نیروی هوایی",
        ar: "القوات الجوية",
        he: "חיל האוויר",
      },
      image: images.jet,
      imageHint: "fighter jet takeoff",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'11',
      slug: 'Intelligence-Ops',
      title: {
        en: "Intelligence Ops",
        fa: "عملیات اطلاعاتی",
        ar: "عمليات استخباراتية",
        he: "מבצעי מודיעין",
      },
      image: images.satellite,
      imageHint: "satellite data",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'12',
      slug: 'Military-Engineering',
      title: {
        en: "Military Engineering",
        fa: "مهندسی نظامی",
        ar: "الهندسة العسكرية",
        he: "הנדסה צבאית",
      },
      image: images.radar,
      imageHint: "bridge construction",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'13',
      slug: 'Sample-Service 1',
      title: {
        en: "Sample Service 1",
        fa: "سرویس نمونه ۱",
        ar: "خدمة العينة 1",
        he: "שירות לדוגמה 1",
      },
      image: images.missile,
      imageHint: "missile launch silo",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 1,
    },
    {
      id:'14',
      slug: 'Sample-Service 2',
      title: {
        en: "Sample Service 2",
        fa: "سرویس نمونه ۲",
        ar: "خدمة العينة 2",
        he: "שירות לדוגמה 2",
      },
      image: images.drone,
      imageHint: "military drone sky",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'15',
      slug: 'Sample-Service 3',
      title: {
        en: "Sample Service 3",
        fa: "سرویس نمونه ۳",
        ar: "خدمة العينة 3",
        he: "שירות לדוגמה 3",
      },
      image: images.warship,
      imageHint: "warship at sea",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [0],
      size: 2,
    },
    {
      id:'16',
      slug: 'Timeline',
      title: {
        en: "Timeline",
        fa: "گاه‌شمار",
        ar: "الجدول الزمني",
        he: "ציר זמן"
      },
      image: images.timeline,
      imageHint: "abstract timeline spiral",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 2
    },
    {
      id:'17',
      slug: 'Economic-Impact',
      title: {
        en: "Economic Impact",
        fa: "تاثیر اقتصادی",
        ar: "التأثير الاقتصادي",
        he: "השפעה כלכלית"
      },
      image: images.abstractData,
      imageHint: "financial charts graphs",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'18',
      slug: 'Casualties',
      title: {
        en: "Casualties",
        fa: "تلفات",
        ar: "الخسائر",
        he: "נפגעים"
      },
      image: images.soldierSilhouette,
      imageHint: "memorial solemn",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'19',
      slug: 'Key-Battles',
      title: {
        en: "Key Battles",
        fa: "نبردهای کلیدی",
        ar: "المعارك الرئيسية",
        he: "קרבות מרכזיים"
      },
      image: images.soldierMap,
      imageHint: "strategy map battlefield",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'20',
      slug: 'Equipment-Losses',
      title: {
        en: "Equipment Losses",
        fa: "خسارات تجهیزات",
        ar: "خسائر المعدات",
        he: "אבדות בציוד"
      },
      image: images.tank,
      imageHint: "wrecked tank desert",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'21',
      slug: 'Refugees',
      title: {
        en: "Refugees",
        fa: "پناهندگان",
        ar: "اللاجئين",
        he: "פליטים"
      },
      image: images.soldierSilhouette,
      imageHint: "people walking road",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'22',
      slug: 'Phase-One',
      title: {
        en: "Phase One",
        fa: "مرحله اول",
        ar: "المرحلة الأولى",
        he: "שלב ראשון"
      },
      image: images.timeline,
      imageHint: "calendar dates",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'23',
      slug: 'Phase-Two',
      title: {
        en: "Phase Two",
        fa: "مرحله دوم",
        ar: "المرحلة الثانية",
        he: "שלב שני"
      },
      image: images.timeline,
      imageHint: "map with arrows",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'24',
      slug: 'Aftermath',
      title: {
        en: "Aftermath",
        fa: "پیامدها",
        ar: "ما بعد الحرب",
        he: "תוצאות"
      },
      image: images.soldierSilhouette,
      imageHint: "rebuilding city",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 2
    },
    {
      id:'25',
      slug: 'International-Reaction',
      title: {
        en: "International Reaction",
        fa: "واکنش بین‌المللی",
        ar: "رد الفعل الدولي",
        he: "תגובה בינלאומית"
      },
      image: images.cyber,
      imageHint: "world leaders table",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'26',
      slug: 'Veteran-Stories',
      title: {
        en: "Veteran Stories",
        fa: "روایت کهنه‌سربازان",
        ar: "قصص المحاربين القدامى",
        he: "סיפורי ותיקים"
      },
      image: images.soldierTech,
      imageHint: "old soldier portrait",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'27',
      slug: 'Memorials',
      title: {
        en: "Memorials",
        fa: "یادبودها",
        ar: "النصب التذكارية",
        he: "אנדרטאות"
      },
      image: images.soldierSilhouette,
      imageHint: "war memorial",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'28',
      slug: 'Sample-Project-1',
      title: {
        en: "Sample Project 1",
        fa: "پروژه نمونه ۱",
        ar: "مشروع العينة 1",
        he: "פרויקט לדוגמה 1"
      },
      image: images.timeline,
      imageHint: "abstract timeline spiral",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'29',
      slug: 'Sample-Project-2',
      title: {
        en: "Sample Project 2",
        fa: "پروژه نمونه ۲",
        ar: "مشروع العينة 2",
        he: "פרויקט לדוגמה 2"
      },
      image: images.abstractData,
      imageHint: "financial charts graphs",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'30',
      slug: 'Sample-Project-3',
      title: {
        en: "Sample Project 3",
        fa: "پروژه نمونه ۳",
        ar: "مشروع العينة 3",
        he: "פרויקט לדוגמה 3"
      },
      image: images.soldierSilhouette,
      imageHint: "memorial solemn",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [1],
      size: 1
    },
    {
      id:'31',
      slug: 'n: "Liberation-of-Khorramshahr',
        title: {
            en: "Liberation of Khorramshahr",
            fa: "آزادسازی خرمشهر",
            ar: "تحرير المحمرة",
            he: "שחרור ח'וראמשהר"
        },
        image: images.soldierTech,
        imageHint: "victory flag city",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 2
    },
    {
      id:'32',
      slug: 'n: "Operation-Fath-ol-Mobin',
        title: {
            en: "Operation Fath-ol-Mobin",
            fa: "عملیات فتح‌المبین",
            ar: "عملية الفتح المبين",
            he: "מבצע פתח אל-מובין"
        },
        image: images.soldierMap,
        imageHint: "military strategy map",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'33',
      slug: 'n: "Breaking-Abadan-Siege',
        title: {
            en: "Breaking Abadan Siege",
            fa: "شکست حصر آبادان",
            ar: "كسر حصار عبادان",
            he: "שבירת המצור על אבאדאן"
        },
        image: images.tank,
        imageHint: "tank battle river",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'34',
      slug: 'n: "Operation-Valfajr-8',
        title: {
            en: "Operation Valfajr 8",
            fa: "عملیات والفجر ۸",
            ar: "عملية والفجر 8",
            he: "מבצע ואלפג'ר 8"
        },
        image: images.warship,
        imageHint: "soldiers crossing water",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'35',
      slug: 'n: "Naval-Victories',
        title: {
            en: "Naval Victories",
            fa: "پیروزی‌های دریایی",
            ar: "انتصارات بحرية",
            he: "ניצחונות ימיים"
        },
        image: images.warship,
        imageHint: "battleship sunset",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'36',
      slug: 'n: "Air-Superiority',
        title: {
            en: "Air Superiority",
            fa: "برتری هوایی",
            ar: "التفوق الجوي",
            he: "עליונות אווירית"
        },
        image: images.jet,
        imageHint: "sky clouds jets",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'37',
      slug: 'n: "Missile-Strikes',
        title: {
            en: "Missile Strikes",
            fa: "حملات موشکی",
            ar: "ضربات صاروخية",
            he: "תקיפות טילים"
        },
        image: images.missile,
        imageHint: "missile in flight",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'38',
      slug: 'n: "Capturing-Enemy-Equipment',
        title: {
            en: "Capturing Enemy Equipment",
            fa: "غنائم جنگی",
            ar: "الاستيلاء على معدات العدو",
            he: "תפיסת ציוד אויב"
        },
        image: images.tank,
        imageHint: "captured tank",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 2
    },
    {
      id:'39',
      slug: 'n: "Guerilla-Warfare-Success',
        title: {
            en: "Guerilla Warfare Success",
            fa: "موفقیت جنگ‌های چریکی",
            ar: "نجاح حرب العصابات",
            he: "הצלחת לוחמת גרילה"
        },
        image: images.soldierSilhouette,
        imageHint: "soldiers in ambush",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 2
    },
    {
      id:'40',
      slug: 'n: "Defense-of-Ahvaz',
        title: {
            en: "Defense of Ahvaz",
            fa: "دفاع از اهواز",
            ar: "الدفاع عن الأهواز",
            he: "ההגנה על אהוואז"
        },
        image: images.radar,
        imageHint: "city under attack",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 2
    },
    {
      id:'41',
      slug: 'n: "Psychological-Operations',
        title: {
            en: "Psychological Operations",
            fa: "عملیات روانی",
            ar: "عمليات نفسية",
            he: "מבצעים פסיכולוגיים"
        },
        image: images.cyber,
        imageHint: "radio tower",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'42',
      slug: 'n: "Civilian-Resistance',
        title: {
            en: "Civilian Resistance",
            fa: "مقاومت مردمی",
            ar: "المقاومة المدنية",
            he: "התנגדות אזרחית"
        },
        image: images.soldierTech,
        imageHint: "people protesting",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'43',
      slug: 'n: "Sample-Achievement-1',
        title: {
            en: "Sample Achievement 1",
            fa: "دستاورد نمونه ۱",
            ar: "إنجاز العينة 1",
            he: "הישג לדוגמה 1"
        },
        image: images.soldierTech,
        imageHint: "victory flag city",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 2
    },
    {
      id:'44',
      slug: 'n: "Sample-Achievement-2',
        title: {
            en: "Sample Achievement 2",
            fa: "دستاورد نمونه ۲",
            ar: "إنجاز العينة 2",
            he: "הישג לדוגמה 2"
        },
        image: images.soldierMap,
        imageHint: "military strategy map",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'45',
      slug: 'n: "Sample-Achievement-3',
        title: {
            en: "Sample Achievement 3",
            fa: "دستاورد نمونه ۳",
            ar: "إنجاز العينة 3",
            he: "הישג לדוגמה 3"
        },
        image: images.tank,
        imageHint: "tank battle river",
        htmlFile: '',
        pdfFile: '',
        infoFile: '',
        images: [],
        textimages: [],
        html: '',
        categories: [2],
        size: 1
    },
    {
      id:'45',
      slug: 'Misconceptions',
      title: {
        en: "Misconceptions",
        fa: "تصورات غلط",
        ar: "مفاهيم خاطئة",
        he: "תפיסות שגויות"
      },
      image: images.questionMark,
      imageHint: "shattered glass illusion",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 2
    },
    {
      id:'47',
      slug: 'Expert Analysis',
      title: {
        en: "Expert Analysis",
        fa: "تحلیل کارشناسان",
        ar: "تحليل الخبراء",
        he: "ניתוח מומחים"
      },
      image: images.cyber,
      imageHint: "scholar writing book",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'48',
      slug: 'Fact-vs-Fiction',
      title: {
        en: "Fact vs. Fiction",
        fa: "واقعیت در برابر داستان",
        ar: "حقيقة أم خيال",
        he: "עובדה מול בדיה"
      },
      image: images.abstractData,
      imageHint: "light dark balance",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'49',
      slug: 'Historical-Archives',
      title: {
        en: "Historical Archives",
        fa: "آرشیوهای تاریخی",
        ar: "الأرشيف التاريخي",
        he: "ארכיונים היסטוריים"
      },
      image: images.soldierMap,
      imageHint: "old documents library",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'50',
      slug: 'FAQs',
      title: {
        en: "FAQs",
        fa: "سوالات متداول",
        ar: "أسئلة شائعة",
        he: "שאלות נפוצות"
      },
      image: images.questionMark,
      imageHint: "question mark illuminated",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'51',
      slug: 'Media-Analysis',
      title: {
        en: "Media Analysis",
        fa: "تحلیل رسانه‌ها",
        ar: "تحليل الإعلام",
        he: "ניתוח מדיה"
      },
      image: images.satellite,
      imageHint: "newspapers television screens",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'52',
      slug: 'Propaganda-Debunked',
      title: {
        en: "Propaganda Debunked",
        fa: "پروپاگاندای رد شده",
        ar: "دحض الدعاية",
        he: "תעמולה מופרכת"
      },
      image: images.questionMark,
      imageHint: "loudspeaker muted",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'53',
      slug: 'Common-Myths',
      title: {
        en: "Common Myths",
        fa: "افسانه‌های رایج",
        ar: "خرافات شائعة",
        he: "מיתוסים נפוצים"
      },
      image: images.questionMark,
      imageHint: "question mark graffiti",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 2
    },
    {
      id:'54',
      slug: 'Unseen-Angles',
      title: {
        en: "Unseen Angles",
        fa: "زوایای نادیده",
        ar: "زوايا غير مرئية",
        he: "זוויות נסתרות"
      },
      image: images.abstractData,
      imageHint: "camera lens reflection",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 2
    },
    {
      id:'55',
      slug: 'Censored-Information',
      title: {
        en: "Censored Information",
        fa: "اطلاعات سانسور شده",
        ar: "معلومات خاضعة للرقابة",
        he: "מידע מצונזר"
      },
      image: images.cyber,
      imageHint: "redacted document",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 2
    },
    {
      id:'56',
      slug: 'Official-Statements',
      title: {
        en: "Official Statements",
        fa: "بیانیه‌های رسمی",
        ar: "البيانات الرسمية",
        he: "הצהרות רשמיות"
      },
      image: images.soldierTech,
      imageHint: "government building",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'57',
      slug: 'Submit-a-Question',
      title: {
        en: "Submit a Question",
        fa: "ارسال سوال",
        ar: "إرسال سؤال",
        he: "שלח שאלה"
      },
      image: images.questionMark,
      imageHint: "person thinking",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'58',
      slug: 'Sample-Question-1',
      title: {
        en: "Sample Question 1",
        fa: "سوال نمونه ۱",
        ar: "سؤال العينة 1",
        he: "שאלה לדוגמה 1"
      },
      image: images.questionMark,
      imageHint: "shattered glass illusion",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'59',
      slug: 'Sample-Question-2',
      title: {
        en: "Sample Question 2",
        fa: "سوال نمونه ۲",
        ar: "سؤال العينة 2",
        he: "שאלה לדוגמה 2"
      },
      image: images.cyber,
      imageHint: "scholar writing book",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    },
    {
      id:'60',
      slug: 'Sample-Question-3',
      title: {
        en: "Sample Question 3",
        fa: "سوال نمونه ۳",
        ar: "سؤال العينة 3",
        he: "שאלה לדוגמה 3"
      },
      image: images.abstractData,
      imageHint: "light dark balance",
      htmlFile: '',
      pdfFile: '',
      infoFile: '',
      images: [],
      textimages: [],
      html: '',
      categories: [3],
      size: 1
    }
  ];


export const allContentItems: ContentItem[] = dynos;
