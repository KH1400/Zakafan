
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
        { title: "Artillery Units", image: images.tank, imageHint: "artillery firing", gridArea: "4 / 1 / 5 / 2" },
        { title: "Special Forces", image: images.soldierSilhouette, imageHint: "special forces night", gridArea: "4 / 2 / 5 / 4" },
        { title: "Logistics Corps", image: images.cyber, imageHint: "military supply truck", gridArea: "5 / 1 / 6 / 3" },
        { title: "Air Force", image: images.jet, imageHint: "fighter jet takeoff", gridArea: "5 / 3 / 7 / 4" },
        { title: "Intelligence Ops", image: images.satellite, imageHint: "satellite data", gridArea: "6 / 1 / 7 / 2" },
        { title: "Military Engineering", image: images.radar, imageHint: "bridge construction", gridArea: "6 / 2 / 7 / 3" },
        { title: "Sample Service 1", image: images.missile, imageHint: "missile launch silo", gridArea: "7 / 1 / 8 / 2" },
        { title: "Sample Service 2", image: images.drone, imageHint: "military drone sky", gridArea: "7 / 2 / 8 / 4" },
        { title: "Sample Service 3", image: images.warship, imageHint: "warship at sea", gridArea: "8 / 1 / 9 / 3" },
    ],
    fa: [
        { title: "برنامه موشکی", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "ناوگان پهپادی", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "نیروی دریایی", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "جنگ سایبری", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "نیروهای زمینی", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پدافند هوایی", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
        { title: "یگان‌های توپخانه", image: images.tank, imageHint: "artillery firing", gridArea: "4 / 1 / 5 / 2" },
        { title: "نیروهای ویژه", image: images.soldierSilhouette, imageHint: "special forces night", gridArea: "4 / 2 / 5 / 4" },
        { title: "سپاه لجستیک", image: images.cyber, imageHint: "military supply truck", gridArea: "5 / 1 / 6 / 3" },
        { title: "نیروی هوایی", image: images.jet, imageHint: "fighter jet takeoff", gridArea: "5 / 3 / 7 / 4" },
        { title: "عملیات اطلاعاتی", image: images.satellite, imageHint: "satellite data", gridArea: "6 / 1 / 7 / 2" },
        { title: "مهندسی نظامی", image: images.radar, imageHint: "bridge construction", gridArea: "6 / 2 / 7 / 3" },
        { title: "سرویس نمونه ۱", image: images.missile, imageHint: "missile launch silo", gridArea: "7 / 1 / 8 / 2" },
        { title: "سرویس نمونه ۲", image: images.drone, imageHint: "military drone sky", gridArea: "7 / 2 / 8 / 4" },
        { title: "سرویس نمونه ۳", image: images.warship, imageHint: "warship at sea", gridArea: "8 / 1 / 9 / 3" },
    ],
    ar: [
        { title: "برنامج الصواريخ", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "أسطول الطائرات بدون طيار", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "القوات البحرية", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "الحرب السيبرانية", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "القوات البرية", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "الدفاع الجوي", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
        { title: "وحدات المدفعية", image: images.tank, imageHint: "artillery firing", gridArea: "4 / 1 / 5 / 2" },
        { title: "القوات الخاصة", image: images.soldierSilhouette, imageHint: "special forces night", gridArea: "4 / 2 / 5 / 4" },
        { title: "فيلق اللوجستيات", image: images.cyber, imageHint: "military supply truck", gridArea: "5 / 1 / 6 / 3" },
        { title: "القوات الجوية", image: images.jet, imageHint: "fighter jet takeoff", gridArea: "5 / 3 / 7 / 4" },
        { title: "عمليات استخباراتية", image: images.satellite, imageHint: "satellite data", gridArea: "6 / 1 / 7 / 2" },
        { title: "الهندسة العسكرية", image: images.radar, imageHint: "bridge construction", gridArea: "6 / 2 / 7 / 3" },
        { title: "خدمة العينة 1", image: images.missile, imageHint: "missile launch silo", gridArea: "7 / 1 / 8 / 2" },
        { title: "خدمة العينة 2", image: images.drone, imageHint: "military drone sky", gridArea: "7 / 2 / 8 / 4" },
        { title: "خدمة العينة 3", image: images.warship, imageHint: "warship at sea", gridArea: "8 / 1 / 9 / 3" },
    ],
    he: [
        { title: "תוכנית טילים", image: images.missile, imageHint: "missile launch silo", gridArea: "1 / 1 / 3 / 3" },
        { title: "צי כטב\"מים", image: images.drone, imageHint: "military drone sky", gridArea: "1 / 3 / 2 / 4" },
        { title: "כוחות ימיים", image: images.warship, imageHint: "warship at sea", gridArea: "2 / 3 / 3 / 4" },
        { title: "לוחמת סייבר", image: images.cyber, imageHint: "digital code matrix", gridArea: "3 / 1 / 4 / 2" },
        { title: "כוחות קרקע", image: images.tank, imageHint: "soldiers marching desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "הגנה אווירית", image: images.radar, imageHint: "radar system night", gridArea: "3 / 3 / 4 / 4" },
        { title: "יחידות ארטילריה", image: images.tank, imageHint: "artillery firing", gridArea: "4 / 1 / 5 / 2" },
        { title: "כוחות מיוחדים", image: images.soldierSilhouette, imageHint: "special forces night", gridArea: "4 / 2 / 5 / 4" },
        { title: "חיל הלוגיסטיקה", image: images.cyber, imageHint: "military supply truck", gridArea: "5 / 1 / 6 / 3" },
        { title: "חיל האוויר", image: images.jet, imageHint: "fighter jet takeoff", gridArea: "5 / 3 / 7 / 4" },
        { title: "מבצעי מודיעין", image: images.satellite, imageHint: "satellite data", gridArea: "6 / 1 / 7 / 2" },
        { title: "הנדסה צבאית", image: images.radar, imageHint: "bridge construction", gridArea: "6 / 2 / 7 / 3" },
        { title: "שירות לדוגמה 1", image: images.missile, imageHint: "missile launch silo", gridArea: "7 / 1 / 8 / 2" },
        { title: "שירות לדוגמה 2", image: images.drone, imageHint: "military drone sky", gridArea: "7 / 2 / 8 / 4" },
        { title: "שירות לדוגמה 3", image: images.warship, imageHint: "warship at sea", gridArea: "8 / 1 / 9 / 3" },
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
        { title: "Phase One", image: images.timeline, imageHint: "calendar dates", gridArea: "4 / 1 / 5 / 3" },
        { title: "Phase Two", image: images.timeline, imageHint: "map with arrows", gridArea: "4 / 3 / 5 / 4" },
        { title: "Aftermath", image: images.soldierSilhouette, imageHint: "rebuilding city", gridArea: "5 / 1 / 7 / 2" },
        { title: "International Reaction", image: images.cyber, imageHint: "world leaders table", gridArea: "5 / 2 / 6 / 4" },
        { title: "Veteran Stories", image: images.soldierTech, imageHint: "old soldier portrait", gridArea: "6 / 2 / 7 / 3" },
        { title: "Memorials", image: images.soldierSilhouette, imageHint: "war memorial", gridArea: "6 / 3 / 7 / 4" },
        { title: "Sample Project 1", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "7 / 1 / 8 / 2" },
        { title: "Sample Project 2", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "7 / 2 / 8 / 4" },
        { title: "Sample Project 3", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "8 / 1 / 9 / 3" },
    ],
    fa: [
        { title: "گاه‌شمار", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "تاثیر اقتصادی", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "تلفات", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "نبردهای کلیدی", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسارات تجهیزات", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "پناهندگان", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
        { title: "مرحله اول", image: images.timeline, imageHint: "calendar dates", gridArea: "4 / 1 / 5 / 3" },
        { title: "مرحله دوم", image: images.timeline, imageHint: "map with arrows", gridArea: "4 / 3 / 5 / 4" },
        { title: "پیامدها", image: images.soldierSilhouette, imageHint: "rebuilding city", gridArea: "5 / 1 / 7 / 2" },
        { title: "واکنش بین‌المللی", image: images.cyber, imageHint: "world leaders table", gridArea: "5 / 2 / 6 / 4" },
        { title: "روایت کهنه‌سربازان", image: images.soldierTech, imageHint: "old soldier portrait", gridArea: "6 / 2 / 7 / 3" },
        { title: "یادبودها", image: images.soldierSilhouette, imageHint: "war memorial", gridArea: "6 / 3 / 7 / 4" },
        { title: "پروژه نمونه ۱", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "7 / 1 / 8 / 2" },
        { title: "پروژه نمونه ۲", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "7 / 2 / 8 / 4" },
        { title: "پروژه نمونه ۳", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "8 / 1 / 9 / 3" },
    ],
    ar: [
        { title: "الجدول الزمني", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "التأثير الاقتصادي", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "الخسائر", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "المعارك الرئيسية", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "خسائر المعدات", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "اللاجئين", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
        { title: "المرحلة الأولى", image: images.timeline, imageHint: "calendar dates", gridArea: "4 / 1 / 5 / 3" },
        { title: "المرحلة الثانية", image: images.timeline, imageHint: "map with arrows", gridArea: "4 / 3 / 5 / 4" },
        { title: "ما بعد الحرب", image: images.soldierSilhouette, imageHint: "rebuilding city", gridArea: "5 / 1 / 7 / 2" },
        { title: "رد الفعل الدولي", image: images.cyber, imageHint: "world leaders table", gridArea: "5 / 2 / 6 / 4" },
        { title: "قصص المحاربين القدامى", image: images.soldierTech, imageHint: "old soldier portrait", gridArea: "6 / 2 / 7 / 3" },
        { title: "النصب التذكارية", image: images.soldierSilhouette, imageHint: "war memorial", gridArea: "6 / 3 / 7 / 4" },
        { title: "مشروع العينة 1", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "7 / 1 / 8 / 2" },
        { title: "مشروع العينة 2", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "7 / 2 / 8 / 4" },
        { title: "مشروع العينة 3", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "8 / 1 / 9 / 3" },
    ],
    he: [
        { title: "ציר זמן", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "1 / 1 / 3 / 3" },
        { title: "השפעה כלכלית", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "1 / 3 / 2 / 4" },
        { title: "נפגעים", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "2 / 3 / 3 / 4" },
        { title: "קרבות מרכזיים", image: images.soldierMap, imageHint: "strategy map battlefield", gridArea: "3 / 1 / 4 / 2" },
        { title: "אבדות בציוד", image: images.tank, imageHint: "wrecked tank desert", gridArea: "3 / 2 / 4 / 3" },
        { title: "פליטים", image: images.soldierSilhouette, imageHint: "people walking road", gridArea: "3 / 3 / 4 / 4" },
        { title: "שלב ראשון", image: images.timeline, imageHint: "calendar dates", gridArea: "4 / 1 / 5 / 3" },
        { title: "שלב שני", image: images.timeline, imageHint: "map with arrows", gridArea: "4 / 3 / 5 / 4" },
        { title: "תוצאות", image: images.soldierSilhouette, imageHint: "rebuilding city", gridArea: "5 / 1 / 7 / 2" },
        { title: "תגובה בינלאומית", image: images.cyber, imageHint: "world leaders table", gridArea: "5 / 2 / 6 / 4" },
        { title: "סיפורי ותיקים", image: images.soldierTech, imageHint: "old soldier portrait", gridArea: "6 / 2 / 7 / 3" },
        { title: "אנדרטאות", image: images.soldierSilhouette, imageHint: "war memorial", gridArea: "6 / 3 / 7 / 4" },
        { title: "פרויקט לדוגמה 1", image: images.timeline, imageHint: "abstract timeline spiral", gridArea: "7 / 1 / 8 / 2" },
        { title: "פרויקט לדוגמה 2", image: images.abstractData, imageHint: "financial charts graphs", gridArea: "7 / 2 / 8 / 4" },
        { title: "פרויקט לדוגמה 3", image: images.soldierSilhouette, imageHint: "memorial solemn", gridArea: "8 / 1 / 9 / 3" },
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
        { title: "Missile Strikes", image: images.missile, imageHint: "missile in flight", gridArea: "4 / 1 / 5 / 2" },
        { title: "Capturing Enemy Equipment", image: images.tank, imageHint: "captured tank", gridArea: "4 / 2 / 5 / 4" },
        { title: "Guerilla Warfare Success", image: images.soldierSilhouette, imageHint: "soldiers in ambush", gridArea: "5 / 1 / 6 / 3" },
        { title: "Defense of Ahvaz", image: images.radar, imageHint: "city under attack", gridArea: "5 / 3 / 7 / 4" },
        { title: "Psychological Operations", image: images.cyber, imageHint: "radio tower", gridArea: "6 / 1 / 7 / 2" },
        { title: "Civilian Resistance", image: images.soldierTech, imageHint: "people protesting", gridArea: "6 / 2 / 7 / 3" },
        { title: "Sample Achievement 1", image: images.soldierTech, imageHint: "victory flag city", gridArea: "7 / 1 / 8 / 3" },
        { title: "Sample Achievement 2", image: images.soldierMap, imageHint: "military strategy map", gridArea: "7 / 3 / 8 / 4" },
        { title: "Sample Achievement 3", image: images.tank, imageHint: "tank battle river", gridArea: "8 / 1 / 9 / 2" },
    ],
    fa: [
        { title: "آزادسازی خرمشهر", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملیات فتح‌المبین", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "شکست حصر آبادان", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملیات والفجر ۸", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "پیروزی‌های دریایی", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "برتری هوایی", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        { title: "حملات موشکی", image: images.missile, imageHint: "missile in flight", gridArea: "4 / 1 / 5 / 2" },
        { title: "غنائم جنگی", image: images.tank, imageHint: "captured tank", gridArea: "4 / 2 / 5 / 4" },
        { title: "موفقیت جنگ‌های چریکی", image: images.soldierSilhouette, imageHint: "soldiers in ambush", gridArea: "5 / 1 / 6 / 3" },
        { title: "دفاع از اهواز", image: images.radar, imageHint: "city under attack", gridArea: "5 / 3 / 7 / 4" },
        { title: "عملیات روانی", image: images.cyber, imageHint: "radio tower", gridArea: "6 / 1 / 7 / 2" },
        { title: "مقاومت مردمی", image: images.soldierTech, imageHint: "people protesting", gridArea: "6 / 2 / 7 / 3" },
        { title: "دستاورد نمونه ۱", image: images.soldierTech, imageHint: "victory flag city", gridArea: "7 / 1 / 8 / 3" },
        { title: "دستاورد نمونه ۲", image: images.soldierMap, imageHint: "military strategy map", gridArea: "7 / 3 / 8 / 4" },
        { title: "دستاورد نمونه ۳", image: images.tank, imageHint: "tank battle river", gridArea: "8 / 1 / 9 / 2" },
    ],
    ar: [
        { title: "تحرير المحمرة", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "عملية الفتح المبين", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "كسر حصار عبادان", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "عملية والفجر 8", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "انتصارات بحرية", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "التفوق الجوي", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        { title: "ضربات صاروخية", image: images.missile, imageHint: "missile in flight", gridArea: "4 / 1 / 5 / 2" },
        { title: "الاستيلاء على معدات العدو", image: images.tank, imageHint: "captured tank", gridArea: "4 / 2 / 5 / 4" },
        { title: "نجاح حرب العصابات", image: images.soldierSilhouette, imageHint: "soldiers in ambush", gridArea: "5 / 1 / 6 / 3" },
        { title: "الدفاع عن الأهواز", image: images.radar, imageHint: "city under attack", gridArea: "5 / 3 / 7 / 4" },
        { title: "عمليات نفسية", image: images.cyber, imageHint: "radio tower", gridArea: "6 / 1 / 7 / 2" },
        { title: "المقاومة المدنية", image: images.soldierTech, imageHint: "people protesting", gridArea: "6 / 2 / 7 / 3" },
        { title: "إنجاز العينة 1", image: images.soldierTech, imageHint: "victory flag city", gridArea: "7 / 1 / 8 / 3" },
        { title: "إنجاز العينة 2", image: images.soldierMap, imageHint: "military strategy map", gridArea: "7 / 3 / 8 / 4" },
        { title: "إنجاز العينة 3", image: images.tank, imageHint: "tank battle river", gridArea: "8 / 1 / 9 / 2" },
    ],
    he: [
        { title: "שחרור ח'וראמשהר", image: images.soldierTech, imageHint: "victory flag city", gridArea: "1 / 1 / 3 / 3" },
        { title: "מבצע פתח אל-מובין", image: images.soldierMap, imageHint: "military strategy map", gridArea: "1 / 3 / 2 / 4" },
        { title: "שבירת המצור על אבאדאן", image: images.tank, imageHint: "tank battle river", gridArea: "2 / 3 / 3 / 4" },
        { title: "מבצע ואלפג'ר 8", image: images.warship, imageHint: "soldiers crossing water", gridArea: "3 / 1 / 4 / 2" },
        { title: "ניצחונות ימיים", image: images.warship, imageHint: "battleship sunset", gridArea: "3 / 2 / 4 / 3" },
        { title: "עליונות אווירית", image: images.jet, imageHint: "sky clouds jets", gridArea: "3 / 3 / 4 / 4" },
        { title: "תקיפות טילים", image: images.missile, imageHint: "missile in flight", gridArea: "4 / 1 / 5 / 2" },
        { title: "תפיסת ציוד אויב", image: images.tank, imageHint: "captured tank", gridArea: "4 / 2 / 5 / 4" },
        { title: "הצלחת לוחמת גרילה", image: images.soldierSilhouette, imageHint: "soldiers in ambush", gridArea: "5 / 1 / 6 / 3" },
        { title: "ההגנה על אהוואז", image: images.radar, imageHint: "city under attack", gridArea: "5 / 3 / 7 / 4" },
        { title: "מבצעים פסיכולוגיים", image: images.cyber, imageHint: "radio tower", gridArea: "6 / 1 / 7 / 2" },
        { title: "התנגדות אזרחית", image: images.soldierTech, imageHint: "people protesting", gridArea: "6 / 2 / 7 / 3" },
        { title: "הישג לדוגמה 1", image: images.soldierTech, imageHint: "victory flag city", gridArea: "7 / 1 / 8 / 3" },
        { title: "הישג לדוגמה 2", image: images.soldierMap, imageHint: "military strategy map", gridArea: "7 / 3 / 8 / 4" },
        { title: "הישג לדוגמה 3", image: images.tank, imageHint: "tank battle river", gridArea: "8 / 1 / 9 / 2" },
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
        { title: "Propaganda Debunked", image: images.questionMark, imageHint: "loudspeaker muted", gridArea: "4 / 1 / 5 / 2" },
        { title: "Common Myths", image: images.questionMark, imageHint: "question mark graffiti", gridArea: "4 / 2 / 5 / 4" },
        { title: "Unseen Angles", image: images.abstractData, imageHint: "camera lens reflection", gridArea: "5 / 1 / 6 / 3" },
        { title: "Censored Information", image: images.cyber, imageHint: "redacted document", gridArea: "5 / 3 / 7 / 4" },
        { title: "Official Statements", image: images.soldierTech, imageHint: "government building", gridArea: "6 / 1 / 7 / 2" },
        { title: "Submit a Question", image: images.questionMark, imageHint: "person thinking", gridArea: "6 / 2 / 7 / 3" },
        { title: "Sample Question 1", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "7 / 1 / 8 / 2" },
        { title: "Sample Question 2", image: images.cyber, imageHint: "scholar writing book", gridArea: "7 / 2 / 8 / 3" },
        { title: "Sample Question 3", image: images.abstractData, imageHint: "light dark balance", gridArea: "7 / 3 / 8 / 4" },
    ],
    fa: [
        { title: "تصورات غلط", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحلیل کارشناسان", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "واقعیت در برابر داستان", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "آرشیوهای تاریخی", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "سوالات متداول", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحلیل رسانه‌ها", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        { title: "پروپاگاندای رد شده", image: images.questionMark, imageHint: "loudspeaker muted", gridArea: "4 / 1 / 5 / 2" },
        { title: "افسانه‌های رایج", image: images.questionMark, imageHint: "question mark graffiti", gridArea: "4 / 2 / 5 / 4" },
        { title: "زوایای نادیده", image: images.abstractData, imageHint: "camera lens reflection", gridArea: "5 / 1 / 6 / 3" },
        { title: "اطلاعات سانسور شده", image: images.cyber, imageHint: "redacted document", gridArea: "5 / 3 / 7 / 4" },
        { title: "بیانیه‌های رسمی", image: images.soldierTech, imageHint: "government building", gridArea: "6 / 1 / 7 / 2" },
        { title: "ارسال سوال", image: images.questionMark, imageHint: "person thinking", gridArea: "6 / 2 / 7 / 3" },
        { title: "سوال نمونه ۱", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "7 / 1 / 8 / 2" },
        { title: "سوال نمونه ۲", image: images.cyber, imageHint: "scholar writing book", gridArea: "7 / 2 / 8 / 3" },
        { title: "سوال نمونه ۳", image: images.abstractData, imageHint: "light dark balance", gridArea: "7 / 3 / 8 / 4" },
    ],
    ar: [
        { title: "مفاهيم خاطئة", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "تحليل الخبراء", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "حقيقة أم خيال", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "الأرشيف التاريخي", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "أسئلة شائعة", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "تحليل الإعلام", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        { title: "دحض الدعاية", image: images.questionMark, imageHint: "loudspeaker muted", gridArea: "4 / 1 / 5 / 2" },
        { title: "خرافات شائعة", image: images.questionMark, imageHint: "question mark graffiti", gridArea: "4 / 2 / 5 / 4" },
        { title: "زوايا غير مرئية", image: images.abstractData, imageHint: "camera lens reflection", gridArea: "5 / 1 / 6 / 3" },
        { title: "معلومات خاضعة للرقابة", image: images.cyber, imageHint: "redacted document", gridArea: "5 / 3 / 7 / 4" },
        { title: "البيانات الرسمية", image: images.soldierTech, imageHint: "government building", gridArea: "6 / 1 / 7 / 2" },
        { title: "إرسال سؤال", image: images.questionMark, imageHint: "person thinking", gridArea: "6 / 2 / 7 / 3" },
        { title: "سؤال العينة 1", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "7 / 1 / 8 / 2" },
        { title: "سؤال العينة 2", image: images.cyber, imageHint: "scholar writing book", gridArea: "7 / 2 / 8 / 3" },
        { title: "سؤال العينة 3", image: images.abstractData, imageHint: "light dark balance", gridArea: "7 / 3 / 8 / 4" },
    ],
    he: [
        { title: "תפיסות שגויות", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "1 / 1 / 3 / 3" },
        { title: "ניתוח מומחים", image: images.cyber, imageHint: "scholar writing book", gridArea: "1 / 3 / 2 / 4" },
        { title: "עובדה מול בדיה", image: images.abstractData, imageHint: "light dark balance", gridArea: "2 / 3 / 3 / 4" },
        { title: "ארכיונים היסטוריים", image: images.soldierMap, imageHint: "old documents library", gridArea: "3 / 1 / 4 / 2" },
        { title: "שאלות נפוצות", image: images.questionMark, imageHint: "question mark illuminated", gridArea: "3 / 2 / 4 / 3" },
        { title: "ניתוח מדיה", image: images.satellite, imageHint: "newspapers television screens", gridArea: "3 / 3 / 4 / 4" },
        { title: "תעמולה מופרכת", image: images.questionMark, imageHint: "loudspeaker muted", gridArea: "4 / 1 / 5 / 2" },
        { title: "מיתוסים נפוצים", image: images.questionMark, imageHint: "question mark graffiti", gridArea: "4 / 2 / 5 / 4" },
        { title: "זוויות נסתרות", image: images.abstractData, imageHint: "camera lens reflection", gridArea: "5 / 1 / 6 / 3" },
        { title: "מידע מצונזר", image: images.cyber, imageHint: "redacted document", gridArea: "5 / 3 / 7 / 4" },
        { title: "הצהרות רשמיות", image: images.soldierTech, imageHint: "government building", gridArea: "6 / 1 / 7 / 2" },
        { title: "שלח שאלה", image: images.questionMark, imageHint: "person thinking", gridArea: "6 / 2 / 7 / 3" },
        { title: "שאלה לדוגמה 1", image: images.questionMark, imageHint: "shattered glass illusion", gridArea: "7 / 1 / 8 / 2" },
        { title: "שאלה לדוגמה 2", image: images.cyber, imageHint: "scholar writing book", gridArea: "7 / 2 / 8 / 3" },
        { title: "שאלה לדוגמה 3", image: images.abstractData, imageHint: "light dark balance", gridArea: "7 / 3 / 8 / 4" },
    ],
};


export const allContentItems: ContentItem[] = [
    ...processPanels('services', servicesPanels),
    ...processPanels('projects', projectsPanels),
    ...processPanels('achievements', achievementsPanels),
    ...processPanels('contact', contactPanels),
];
