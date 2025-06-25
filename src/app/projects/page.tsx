
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/fourfold/footer";
import { MosaicLayout } from "@/components/fourfold/mosaic-layout";
import { allContentItems, sections, type Language } from "@/lib/content-data";

const sectionInfo = sections.find(s => s.id === 'projects')!;
const sectionContent = allContentItems.filter(item => item.sectionId === 'projects');

const goBackTranslations = {
    en: "Go Back Home",
    fa: "بازگشت به خانه",
    ar: "العودة إلى الرئيسية",
    he: "חזור לדף הבית",
};

const extraContent = {
    title: {
        en: "In-Depth Analysis",
        fa: "تحلیل عمیق",
        ar: "تحليل معمق",
        he: "ניתוח מעמיק",
    },
    paragraphs: [
        {
            en: "This section provides a deeper dive into the military capabilities. We explore the technological advancements, strategic deployments, and the overall impact of these assets on regional dynamics. Our analysis is based on verified data and expert opinions, ensuring a comprehensive and objective overview.",
            fa: "این بخش به بررسی عمیق‌تر توانمندی‌های نظامی می‌پردازد. ما پیشرفت‌های تکنولوژیکی، آرایش استراتژیک و تأثیر کلی این دارایی‌ها بر دینامیک منطقه‌ای را بررسی می‌کنیم. تحلیل ما بر اساس داده‌های تأیید شده و نظرات کارشناسان است و یک نمای کلی جامع و عینی را تضمین می‌کند.",
            ar: "يقدم هذا القسم نظرة أعمق في القدرات العسكرية. نستكشف التطورات التكنولوجية والانتشار الاستراتيجي والتأثير العام لهذه الأصول على الديناميكيات الإقليمية. يعتمد تحليلنا على بيانات تم التحقق منها وآراء الخبراء، مما يضمن نظرة شاملة وموضوعية.",
            he: "חלק זה מספק צלילה עמוקה יותר ליכולות הצבאיות. אנו בוחנים את ההתקדמות הטכנולוגית, הפריסות האסטרטגיות וההשפעה הכוללת של נכסים אלה על הדינמיקה האזורית. הניתוח שלנו מבוסס על נתונים מאומתים וחוות דעת מומחים, ומבטיח סקירה מקיפה ואובייקטיבית.",
        },
        {
            en: "From the development of long-range missiles to the operational effectiveness of the drone fleet, every aspect is scrutinized. We also cover the evolution of naval forces and their role in projecting power, alongside the unseen battles waged in the cyber domain. Understanding these components is key to grasping the full picture of modern warfare.",
            fa: "از توسعه موشک‌های دوربرد تا کارایی عملیاتی ناوگان پهپادی، هر جنبه‌ای به دقت بررسی می‌شود. ما همچنین تکامل نیروهای دریایی و نقش آنها در نمایش قدرت را به همراه نبردهای نادیده گرفته شده در حوزه سایبری پوشش می‌دهیم. درک این مؤلفه‌ها کلید درک تصویر کامل جنگ مدرن است.",
            ar: "من تطوير الصواريخ بعيدة المدى إلى الفعالية التشغيلية لأسطول الطائرات بدون طيار، يتم فحص كل جانب بدقة. نغطي أيضًا تطور القوات البحرية ودورها في إبراز القوة، إلى جانب المعارك غير المرئية التي تدور في المجال السيبراني. فهم هذه المكونات هو مفتاح فهم الصورة الكاملة للحرب الحديثة.",
            he: "מהפיתוח של טילים ארוכי טווח ועד ליעילות המבצעית של צי הכטב\"מים, כל היבט נבדק בקפידה. אנו מכסים גם את התפתחות הכוחות הימיים ותפקידם בהקרנת כוח, לצד הקרבות הבלתי נראים המתנהלים במרחב הסייבר. הבנת מרכיבים אלה היא המפתח לתפיסת התמונה המלאה של הלוחמה המודרנית.",
        },
        {
            en: "The content presented here is for informational purposes, aiming to foster a better understanding of complex geopolitical and military situations. It is curated from open-source intelligence and publicly available information, providing a neutral and data-driven perspective.",
            fa: "محتوای ارائه شده در اینجا برای اهداف اطلاعاتی است و هدف آن تقویت درک بهتر از موقعیت‌های پیچیده ژئوپلیتیکی و نظامی است. این محتوا از اطلاعات منبع باز و اطلاعات در دسترس عموم تهیه شده است و دیدگاهی بی‌طرف و داده‌محور را ارائه می‌دهد.",
            ar: "المحتوى المقدم هنا هو لأغراض إعلامية، ويهدف إلى تعزيز فهم أفضل للمواقف الجيوسياسية والعسكرية المعقدة. يتم تنسيقه من معلومات استخباراتية مفتوحة المصدر ومعلومات متاحة للجمهور، مما يوفر منظورًا محايدًا وقائمًا على البيانات.",
            he: "התוכן המוצג כאן הוא למטרות מידע, במטרה לטפח הבנה טובה יותר של מצבים גיאופוליטיים וצבאיים מורכבים. הוא נאסף ממודיעין גלוי ומידע זמין לציבור, ומספק פרספקטיבה ניטרלית ומבוססת נתונים.",
        }
    ]
};

export default function ProjectsPage({ searchParams }: { searchParams?: { lang?: string } }) {
    const lang = (searchParams?.lang || 'en') as Language;
    const isRtl = lang === 'fa' || lang === 'ar' || lang === 'he';

    const panelData = sectionContent.map(item => ({
      title: item.title[lang],
      image: item.image,
      imageHint: item.imageHint,
      gridArea: item.gridArea,
  }));

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen w-full bg-background text-foreground">
        <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0 sticky top-0 z-20">
          <h1 className="text-xl md:text-2xl font-bold font-headline">{sectionInfo.title[lang]}</h1>
          <Button asChild variant="outline">
            <Link href={lang === 'en' ? '/' : `/?lang=${lang}`}>
              <ArrowLeft className={isRtl ? "ml-2" : "mr-2"} /> {goBackTranslations[lang]}
            </Link>
          </Button>
        </header>
        <main className="flex-grow">
            <div className="h-[70vh] w-full">
                <MosaicLayout panels={panelData} baseHref="/projects" lang={lang} />
            </div>
            <div className="container mx-auto px-6 py-12 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-center">{extraContent.title[lang]}</h2>
                <div className="max-w-4xl mx-auto space-y-6 text-lg text-foreground/80 leading-relaxed text-justify">
                    {extraContent.paragraphs.map((p, i) => (
                        <p key={i}>{p[lang]}</p>
                    ))}
                </div>
            </div>
        </main>
        <Footer lang={lang} />
    </div>
  );
}
