
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
    { id: 'services', href: '/services', title: { en: "Iran's Military Power", fa: "قدرت نظامی ایران", ar: "القوة العسكرية الإيرانية", he: "הכוח הצבאי של איראן" } },
    { id: 'projects', href: '/projects', title: { en: "War Statistics", fa: "آمار و ارقام مرتبط با جنگ", ar: "إحصائيات الحرب", he: "סטטיסטיקות מלחמה" } },
    { id: 'achievements', href: '/achievements', title: { en: "Achievements & Victories", fa: "دستاوردها و پیروزی ها", ar: "الإنجازات والانتصارات", he: "הישגים וניצחונות" } },
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

const servicesPanels = {
    en: [
        { title: "Missile Program", image: "https://placehold.co/800x800.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "Drone Fleet", image: "https://placehold.co/400x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "Naval Forces", image: "https://placehold.co/400x400.png", imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "Cyber Warfare", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "Ground Troops", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "Air Defense", image: "https://placehold.co/400x400.png", imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "برنامه موشکی", image: "https://placehold.co/800x800.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "ناوگان پهپادی", image: "https://placehold.co/400x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "نیروی دریایی", image: "https://placehold.co/400x400.png", imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "جنگ سایبری", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "نیروهای زمینی", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پدافند هوایی", image: "https://placehold.co/400x400.png", imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "برنامج الصواريخ", image: "https://placehold.co/800x800.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "أسطول الطائرات بدون طيار", image: "https://placehold.co/400x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "القوات البحرية", image: "https://placehold.co/400x400.png", imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "الحرب السيبرانية", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "القوات البرية", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "الدفاع الجوي", image: "https://placehold.co/400x400.png", imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "תוכנית טילים", image: "https://placehold.co/800x800.png", imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "צי כטב\"מים", image: "https://placehold.co/400x400.png", imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "כוחות ימיים", image: "https://placehold.co/400x400.png", imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "לוחמת סייבר", image: "https://placehold.co/400x400.png", imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "כוחות קרקע", image: "https://placehold.co/400x400.png", imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "הגנה אווירית", image: "https://placehold.co/400x400.png", imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const projectsPanels = {
    en: [
        { title: "Timeline", image: "https://placehold.co/800x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "Economic Impact", image: "https://placehold.co/400x400.png", imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "Casualties", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "Key Battles", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "Equipment Losses", image: "https://placehold.co/400x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "Refugees", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "گاه‌شمار", image: "https://placehold.co/800x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "تاثیر اقتصادی", image: "https://placehold.co/400x400.png", imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "تلفات", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "نبردهای کلیدی", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسارات تجهیزات", image: "https://placehold.co/400x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پناهندگان", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "الجدول الزمني", image: "https://placehold.co/800x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "التأثير الاقتصادي", image: "https://placehold.co/400x400.png", imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "الخسائر", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "المعارك الرئيسية", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسائر المعدات", image: "https://placehold.co/400x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "اللاجئين", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "ציר זמן", image: "https://placehold.co/800x800.png", imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "השפעה כלכלית", image: "https://placehold.co/400x400.png", imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "נפגעים", image: "https://placehold.co/400x400.png", imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "קרבות מרכזיים", image: "https://placehold.co/400x400.png", imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "אבדות בציוד", image: "https://placehold.co/400x400.png", imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "פליטים", image: "https://placehold.co/400x400.png", imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const achievementsPanels = {
    en: [
        { title: "Liberation of Khorramshahr", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "Operation Fath-ol-Mobin", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "Breaking Abadan Siege", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "Operation Valfajr 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "Naval Victories", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "Air Superiority", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "آزادسازی خرمشهر", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملیات فتح‌المبین", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "شکست حصر آبادان", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملیات والفجر ۸", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "پیروزی‌های دریایی", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "برتری هوایی", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "تحرير المحمرة", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملية الفتح المبين", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "كسر حصار عبادان", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملية والفجر 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "انتصارات بحرية", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "التفوق الجوي", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "שחרור ח'וראמשהר", image: "https://placehold.co/800x800.png", imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "מבצע פתח אל-מובין", image: "https://placehold.co/400x400.png", imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "שבירת המצור על אבאדאן", image: "https://placehold.co/400x400.png", imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "מבצע ואלפג'ר 8", image: "https://placehold.co/400x400.png", imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "ניצחונות ימיים", image: "https://placehold.co/400x400.png", imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "עליונות אווירית", image: "https://placehold.co/400x400.png", imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
    ],
};

const contactPanels = {
    en: [
        { title: "Misconceptions", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "Expert Analysis", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "Fact vs. Fiction", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "Historical Archives", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "FAQs", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "Media Analysis", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    fa: [
        { title: "تصورات غلط", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحلیل کارشناسان", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "واقعیت در برابر داستان", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "آرشیوهای تاریخی", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "سوالات متداول", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحلیل رسانه‌ها", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    ar: [
        { title: "مفاهيم خاطئة", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحليل الخبراء", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "حقيقة أم خيال", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "الأرشيف التاريخي", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "أسئلة شائعة", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحليل الإعلام", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
    he: [
        { title: "תפיסות שגויות", image: "https://placehold.co/800x800.png", imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "ניתוח מומחים", image: "https://placehold.co/400x400.png", imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "עובדה מול בדיה", image: "https://placehold.co/400x400.png", imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "ארכיונים היסטוריים", image: "https://placehold.co/400x400.png", imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "שאלות נפוצות", image: "https://placehold.co/400x400.png", imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "ניתוח מדיה", image: "https://placehold.co/400x400.png", imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
    ],
};


export const allContentItems: ContentItem[] = [
    ...processPanels('services', servicesPanels),
    ...processPanels('projects', projectsPanels),
    ...processPanels('achievements', achievementsPanels),
    ...processPanels('contact', contactPanels),
];
