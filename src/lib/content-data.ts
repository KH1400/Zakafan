
export type Language = 'fa' | 'en' | 'ar' | 'he';

export type MosaicPanel = {
    title: string;
    image: string;
    imageHint: string;
    gridArea: string;
};

export type ContentItem = {
    sectionId: 'services' | 'projects' | 'achievements' | 'contact';
    slug: string;
    title: Record<Language, string>;
    image: string;
    imageHint: string;
    gridArea: string;
}

export type SectionInfo = {
    id: 'services' | 'projects' | 'achievements' | 'contact';
    title: Record<Language, string>;
    href: string;
}

export const sections: SectionInfo[] = [
    { id: 'services', href: '/services', title: { en: "Military Power", fa: "قدرت نظامی", ar: "القوة العسكرية", he: "הכוח הצבאי" } },
    { id: 'projects', href: '/projects', title: { en: "War Statistics", fa: "امار و ارقام جنگ", ar: "إحصائيات الحرب", he: "סטטיסטיקות מלחמה" } },
    { id: 'achievements', href: '/achievements', title: { en: "Achievements & Victories", fa: "دستاوردها و افتخارات", ar: "الإنجازات والانتصارات", he: "הישגים וניצחונות" } },
    { id: 'contact', href: '/contact', title: { en: "Answering Questions", fa: "پاسخ به شبهات", ar: "الرد على الشبهات", he: "מענה לשאלות" } },
];

const createSlug = (text: string) => text.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

const processPanels = (sectionId: ContentItem['sectionId'], panels: Record<Language, MosaicPanel[]>): ContentItem[] => {
    const enPanels = panels.en;
    return enPanels.map((enPanel, index) => ({
        sectionId: sectionId,
        slug: createSlug(enPanel.title),
        title: {
            en: enPanel.title,
            fa: panels.fa[index].title,
            ar: panels.ar[index].title,
            he: panels.he[index].title,
        },
        image: enPanel.image,
        imageHint: enPanel.imageHint,
        gridArea: enPanel.gridArea,
    }));
};

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

const servicesPanels = {
    en: [
        { title: "Missile Program", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "Drone Fleet", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "Naval Forces", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "Cyber Warfare", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "Ground Troops", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "Air Defense", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "برنامه موشکی", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "ناوگان پهپادی", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "نیروی دریایی", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "جنگ سایبری", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "نیروهای زمینی", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پدافند هوایی", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "برنامج الصواريخ", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "أسطول الطائرات بدون طيار", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "القوات البحرية", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "الحرب السيبرانية", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "القوات البرية", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "الدفاع الجوي", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "תוכנית טילים", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "צי כטב\"מים", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "כוחות ימיים", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "לוחמת סייבר", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "כוחות קרקע", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "הגנה אווירית", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const projectsPanels = {
    en: [
        { title: "Timeline", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "Economic Impact", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "Casualties", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "Key Battles", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "Equipment Losses", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "Refugees", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "گاه‌شمار", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "تاثیر اقتصادی", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "تلفات", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "نبردهای کلیدی", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسارات تجهیزات", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پناهندگان", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "الجدول الزمني", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "التأثير الاقتصادي", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "الخسائر", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "المعارك الرئيسية", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسائر المعدات", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "اللاجئين", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "ציר זמן", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "השפעה כלכלית", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "נפגעים", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "קרבות מרכזיים", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "אבדות בציוד", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "פליטים", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const achievementsPanels = {
    en: [
        { title: "Liberation of Khorramshahr", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "Operation Fath-ol-Mobin", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "Breaking Abadan Siege", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "Operation Valfajr 8", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "Naval Victories", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "Air Superiority", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "آزادسازی خرمشهر", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملیات فتح‌المبین", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "شکست حصر آبادان", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملیات والفجر ۸", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "پیروزی‌های دریایی", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "برتری هوایی", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "تحرير المحمرة", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملية الفتح المبين", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "كسر حصار عبادان", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملية والفجر 8", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "انتصارات بحرية", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "التفوق الجوي", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "שחרור ח'וראמשהר", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "מבצע פתח אל-מובין", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "שבירת המצור על אבאדאן", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "מבצע ואלפג'ר 8", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "ניצחונות ימיים", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "עליונות אווירית", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const contactPanels = {
    en: [
        { title: "Misconceptions", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "Expert Analysis", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "Fact vs. Fiction", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "Historical Archives", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "FAQs", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "Media Analysis", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "تصورات غلط", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحلیل کارشناسان", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "واقعیت در برابر داستان", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "آرشیوهای تاریخی", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "سوالات متداول", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحلیل رسانه‌ها", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "مفاهيم خاطئة", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحليل الخبراء", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "حقيقة أم خيال", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "الأرشيف التاريخي", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "أسئلة شائعة", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحليل الإعلام", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "תפיסות שגויות", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "ניתוח מומחים", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "עובדה מול בדיה", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "ארכיונים היסטוריים", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "שאלות נפוצות", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "ניתוח מדיה", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
};


export const allContentItems: ContentItem[] = [
    ...processPanels('services', servicesPanels),
    ...processPanels('projects', projectsPanels),
    ...processPanels('achievements', achievementsPanels),
    ...processPanels('contact', contactPanels),
];
