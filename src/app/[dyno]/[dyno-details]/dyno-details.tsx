"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Dyno, DynoMaster, Language, MediaFile } from '../../../lib/content-types';
import { useLanguage } from '../../../lib/language-context';
import HtmlRenderer from '../../../components/htmlviewer';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, ArrowRight, DownloadIcon } from 'lucide-react';
import { apiGetDynoMasterBySlug, deleteSummary, fetchSummaries, generateSummary, updateSummary } from '../../../lib/api';
import { useNavigation } from 'react-day-picker';
import Link from 'next/link';
import Image from 'next/image';
import VideoPlayer from '../../../components/video-player';
import Loading from '../../../components/fourfold/loading';
import { Skeleton } from '../../../components/ui/skeleton';
import TextCard from './text-card';

// ترجمه‌های متن‌ها
const translations = {
  fa: {
    mainContent: "محتوای اصلی",
    mainContentDesc: "",
    infoImage: "اینفوگرافیک",
    messages: "پیام‌ها",
    messagesDesc: "با کلیک بر روی «تولید توئیت جدید»، به‌صورت هوشمند از محتوای بالای صفحه استفاده شده و پیام‌های کوتاه و مؤثر برای انتشار در شبکه‌های اجتماعی تولید می‌شود.",
    textImages: "تصاویر متنی",
    textImagesDesc: "گالری تصاویر با متن",
    imageGallery: "گالری تصاویر",
    imageGalleryDesc: "مجموعه تصاویر اصلی",
    videoGallery: "گالری فیلم",
    videoGalleryDesc: "مجموعه ویدئوهای تولیدی",
    edit: "ویرایش",
    copy: "کپی",
    generateNew: "تولید توئیت جدید",
    generating: "در حال تولید...",
    copied: "کپی شد!",
    download: "دانلود تصویر",
    pdfDownload: "دانلود خلاصه فایل پژوهشی",
  },
  ar: {
    mainContent: "المحتوى الرئيسي",
    mainContentDesc: "",
    infoImage: "رسم بياني",
    messages: "الرسائل",
    messagesDesc: "عند النقر على 'توليد تغريدة جديدة'، يتم استخدام المحتوى أعلاه بذكاء لإنتاج رسائل قصيرة مناسبة للنشر على وسائل التواصل الاجتماعي.",
    textImages: "صور النص",
    textImagesDesc: "معرض الصور مع النص",
    imageGallery: "معرض الصور",
    imageGalleryDesc: "مجموعة الصور الرئيسية",
    videoGallery: "معرض الفيديو",
    videoGalleryDesc: "سلسلة الفيديوهات المنتجة",
    edit: "تحرير",
    copy: "نسخ",
    generateNew: "توليد تغريدة جديدة",
    generating: "إنتاج...",
    copied: "تم النسخ!",
    download: "تحميل الصورة",
    pdfDownload: "تحميل ملخص الملف البحثي"
  },
  en: {
    mainContent: "Main Content",
    mainContentDesc: "",
    infoImage: "Infographic",
    messages: "Messages",
    messagesDesc: "By clicking on 'Generate New Tweet', smart short messages are automatically created using the above content, ready for social media sharing.",
    textImages: "Text Images",
    textImagesDesc: "Image gallery with text",
    imageGallery: "Image Gallery",
    imageGalleryDesc: "Main image collection",
    videoGallery: "Video Gallery",
    videoGalleryDesc: "Produced Video Series",
    edit: "Edit",
    copy: "Copy",
    generateNew: "Generate New Tweet",
    generating: "Generating...",
    copied: "Copied!",
    download: "Download Image",
    pdfDownload: "Download research summary file"
  },
  he: {
    mainContent: "תוכן ראשי",
    mainContentDesc: "",
    infoImage: "אינפוגרפיקה",
    messages: "הודעות",
    messagesDesc: "בלחיצה על 'יצירת ציוץ חדש', נוצרים אוטומטית מסרים קצרים וחכמים מהתוכן שמעל לצורך פרסום ברשתות החברתיות.",
    textImages: "תמונות טקסט",
    textImagesDesc: "גלריית תמונות עם טקסט",
    imageGallery: "גלריית תמונות",
    imageGalleryDesc: "אוסף תמונות ראשי",
    videoGallery: "גלריית וידאו",
    videoGalleryDesc: "סדרת סרטונים מופקים",
    edit: "עריכה",
    copy: "העתק",
    generateNew: "יצירת ציוץ חדש",
    generating: "יצירת תוכן חדש...",
    copied: "הועתק!",
    download: "הורד תמונה",
    pdfDownload: "הורדת קובץ סיכום המחקר"
  }
};

type DynoMasterRes = {
    id: string;
    slug: string;
    image_file: MediaFile;
    image_hint: string;
    image_files: MediaFile[];
    categories: any;
    createdAt: string;
    public_video_files: MediaFile[];
    dynographs: Record<Language, DynoChildRes>;
    created_at: string;
}

type DynoChildRes = {
  id: string;
  title: string;
  description: string;
  html_file: MediaFile;
  pdf_file: MediaFile;
  info_file: MediaFile;
  input_image_files: MediaFile[];
  video_files: MediaFile[];
  summaries: {id: number, generated_summary: string, language: Language}[];
  created_at: string;
}

export default function DynoDetailsPage({ slug }: { slug: string }) {
  const { language, selectedLang } = useLanguage();
  const [dyno, setDyno] = useState<DynoMasterRes>();
  const [mappedDyno, setMappedDyno] = useState<DynoMaster>();
  
  // State for scroll animation
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  // انتخاب ترجمه بر اساس زبان فعلی
  const t = translations[language as keyof typeof translations] || translations.en;

  // تابع برای بستن WebSocket قبلی
  const closeWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // تابع برای اتصال به WebSocket
  const connectWebSocket = (websocketUrl: string, sessionId: string) => {
    // بستن اتصال قبلی اگر وجود دارد
    closeWebSocket();

    const ws = new WebSocket(websocketUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setTimeout(() => {
        closeWebSocket();
        // خواندن پیام‌های جدید
        fetchMessages();

        // تغییر وضعیت loading
        setIsGeneratingSummary(false);
        setCurrentSessionId(null);
      }, 10000);
    };
    let message = "";

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        message += data.content;
        console.log(message)
        // چک کردن اتمام پردازش
        if (data.is_complete === true) {
          message = "";
          // بستن WebSocket
          closeWebSocket();
          
          // خواندن پیام‌های جدید
          fetchMessages();
          
          // تغییر وضعیت loading
          setIsGeneratingSummary(false);
          setCurrentSessionId(null);
        } else if (data.content) {
          // اگر محتوا در حال به‌روزرسانی است (اختیاری - برای نمایش real-time)
          console.log('Content update:', data.content);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsGeneratingSummary(false);
      setCurrentSessionId(null);
    };

    ws.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      
      // اگر اتصال غیرمنتظره بسته شده و هنوز در حال پردازش هستیم
      if (isGeneratingSummary && event.code !== 1000) {
        console.log('Unexpected WebSocket close, retrying...');
        // می‌توانید retry logic اضافه کنید
        setTimeout(() => {
          if (currentSessionId) {
            // تلاش مجدد برای اتصال
            connectWebSocket(websocketUrl, sessionId);
          }
        }, 2000);
      }
    };
  };

  // تابع برای خواندن پیام‌های جدید
  const fetchMessages = async () => {
    if (!dyno) return;
    
    try {
      // فرض می‌کنیم تابع fetchMessages وجود دارد
      const newMessages: Dyno = await fetchSummaries({dynoId: dyno.id}).json();
      // به‌روزرسانی state
      setDyno(prevDyno => {
        if (!prevDyno) return prevDyno;
        return {
          ...prevDyno,
          summaries: newMessages.summaries.map((s: any) => ({id: s.id, content: s.generated_summary, language: s.language, createdAt: s.updated_at}))
        };
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    
    try {
      // فرض می‌کنیم تابع fetchMessages وجود دارد
      const dd = await deleteSummary({summaryId: id}).json();
      console.log(dd)
      // به‌روزرسانی state
      fetchMessages();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // تابع اصلی برای تولید پیام جدید
  const handleGenerateNew = async () => {
    if (!dyno || isGeneratingSummary) return;
    
    try {
      setIsGeneratingSummary(true);
      const response: any = await generateSummary({dynoId: dyno.id, language}).json();

      if (response.websocket_url && response.session_id) {
        setCurrentSessionId(response.session_id);
        
        // اتصال به WebSocket
        connectWebSocket(response.websocket_url, response.session_id);
      } else {
        // اگر WebSocket URL دریافت نشد، loading را متوقف کنید
        setIsGeneratingSummary(false);
        console.error('WebSocket URL not received');
      }
      
    } catch (error) {
      console.error('Error generating message:', error);
      setIsGeneratingSummary(false);
      setCurrentSessionId(null);
    }
  };

  // cleanup در useEffect
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);


  // Scroll handler for header animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
  
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      // تغییر threshold برای تست آسان‌تر
      const shouldBeScrolled = scrollTop > 20;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
  
    // اضافه کردن تاخیر کوچک برای اطمینان از رندر کامل
    const timeoutId = setTimeout(() => {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      // چک کردن موقعیت اولیه
      handleScroll();
    }, 500);
  
    return () => {
      clearTimeout(timeoutId);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }); // اضافه کردن isScrolled به dependency array

  // Handle download functionality
  const handleDownload = async (imageUrl: string, fileName?: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName || `image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleSaveEdit = async (summ, editId) => {
    if (dyno && editId) {
      try {
        const res: {id: number, generated_summary: string, language: string, created_at: string } = await updateSummary({summaryId: editId, generatedSummary: summ}).json();
        setMappedDyno({ ...mappedDyno, summaries: mappedDyno.summaries.map(s => {if(s.id === editId){return {...s, id: res.id, content: res.generated_summary}}else{return s}}) });
      } catch (error) {
        console.log(error)
      }
    }
  };

  const dynoSlugRef = useRef<string>("");

  useEffect(() => {
    dynoSlugRef.current = slug;
    getDyno();
  }, [slug, language])

  useEffect(() => {
    getDynoWithLang();
  }, [language])

  const getDyno = async () => {
    try {
      const dyns: any = await apiGetDynoMasterBySlug({slug}).json();
      setMappedDyno(await mapData(language, dyns))
      setDyno(dyns);
    } catch (error) {
      console.log(error)
    }
  }

  const getDynoWithLang = async () => {
    dynoSlugRef.current = slug;
    setMappedDyno(await mapData(language, dyno))
  }

  const mapData = async(lang: Language, d: DynoMasterRes) => {
    if(!d) return
    let htmlText: string;
    await fetch(d.dynographs[lang]?.html_file?.file_url || d.dynographs['fa']?.html_file?.file_url)
      .then(response => response.text())
      .then(data => {
        htmlText = data
      })
      .catch(error => console.error('Error:', error));
    return {
      id: d.id,
      dynoChildId: d.dynographs[lang]?.id,
      slug: d.slug.toLocaleLowerCase(),
      title: d.dynographs[lang].title || d.dynographs['fa'].title,
      description: d.dynographs[lang].description || d.dynographs['fa'].description,
      textimages: d.dynographs[lang]?.input_image_files,
      pdfFile: d.dynographs[lang]?.pdf_file || d.dynographs['fa']?.pdf_file,
      infoFile: d.dynographs[lang]?.info_file || d.dynographs['fa']?.info_file,
      htmlFile: d.dynographs[lang]?.html_file || d.dynographs['fa']?.html_file,
      htmlText: htmlText,
      summaries: d.dynographs[lang]?.summaries?.map((s: any) => ({
        id: s.id,
        content: s.generated_summary,
        language: s.language,
        createdAt: s.updated_at
      })) || [],
      image: d.image_file,
      imageHint: d.image_hint,
      categories: d.categories,
      images: d.image_files,
      videos: [...d.public_video_files, ...d.dynographs[language].video_files],
      createdAt: d.created_at,
    };
  }

  if(!dyno){
    return <LoadSkeleton/>
  }
  
  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-full overflow-y-auto bg-background outline-none"
    >
      <div className="grid grid-cols-12 gap-6 px-1 md:px-12 mx-auto">
        {/* Enhanced Header Content Card with Scroll Animation */}
        <div className={`
          col-span-12 sticky top-0 z-50 
          transition-all duration-500 ease-out
          ${isScrolled ? '-mt-6' : 'mt-0'}
        `}>
          <Card 
            className={`
              p-0 bg-card/95 backdrop-blur-md border-border/80
              transition-all duration-500 ease-out transform
              ${isScrolled 
                ? 'shadow-lg scale-[0.98] border-border/60' 
                : 'shadow-md scale-100'
              }
            `}
          >
            <div 
              dir={selectedLang.dir} 
              className={`
                relative w-full flex justify-between items-center
                transition-all duration-500 ease-out
                ${isScrolled ? 'px-1 py-1' : 'px-4 py-3'}
              `}
            >
              {/* Back Button with Animation */}
              <Link href={`/${mappedDyno.categories[0]?.href}/${language === "en" ? "/" : `/?lang=${language}`}`}>
                <Button 
                  className={`
                    transition-all duration-300 ease-out
                    ${isScrolled 
                      ? 'scale-90 hover:scale-95' 
                      : 'scale-100 hover:scale-105'
                    }
                  `} 
                  variant='ghost'
                >
                  {(selectedLang.dir==="ltr")?<ArrowLeft />:<ArrowRight />}
                </Button>
              </Link>
              
              {/* Title and Description with Animation */}
              <div className={`
                text-center transition-all duration-500 ease-out
                ${isScrolled ? 'transform scale-95' : 'transform scale-100'}
              `}>
                <h3 className={`
                  font-semibold text-card-foreground mb-1
                  transition-all duration-500 ease-out
                  ${isScrolled ? 'text-base' : 'text-lg'}
                `}>
                  {mappedDyno.title}
                </h3>
                <p className={`
                  text-muted-foreground transition-all duration-500 ease-out
                  ${isScrolled 
                    ? 'text-xs opacity-70 max-h-0 overflow-hidden' 
                    : 'text-sm opacity-100 max-h-10'
                  }
                `}>
                  {mappedDyno.description}
                </p>
              </div>
              
              {/* Spacer to balance the layout */}
              <div className="w-10" />
            </div>
            
            {/* Animated Progress Bar */}
            <div className={`
              absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent
              transition-all duration-300 ease-out
              ${isScrolled ? 'w-full opacity-100' : 'w-0 opacity-0'}
            `} />
          </Card>
        </div>
        
        {/* Main Content Card */}
        {mappedDyno.htmlFile.id && <Card 
          className='col-span-12 p-6 relative' 
          title={t.mainContent}
          description={t.mainContentDesc}
        >
          {mappedDyno.pdfFile && <Link className={`absolute ${t.mainContentDesc.length === 0?"top-0":"top-2"} end-2`} href={mappedDyno.pdfFile.file_url}><Button variant='default' className='bg-slate-800 hover:bg-amber-500'>{t.pdfDownload}</Button></Link>}
          <HtmlRenderer className='w-full' htmlContent={mappedDyno.htmlText} />
          {/* <HtmlRenderer className='w-full' htmlFileUrl={mappedDyno.htmlFile} /> */}
        </Card>}

        {/* Info File Card */}
        {mappedDyno?.infoFile && (
          <Card 
            className='col-span-12 md:col-span-6 p-1 md:p-6 max-h-[100vh] md:max-h-[50rem]' 
            title={t.infoImage}
          >
            <div className="relative w-full md:h-[43rem] flex-grow rounded-lg overflow-hidden">
              <img 
                src={mappedDyno?.infoFile.file_url} 
                alt="info image"
                className='w-full h-full object-contain transition-transform duration-300'
              />
              {/* Download Button Overlay */}
              <div className="absolute top-2 start-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <a
                href={mappedDyno.infoFile.file_url}
                download
                className='h-6 w-6'>
                <DownloadIcon className='text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full h-8 w-8' />
              </a>
              </div>
            </div>
          </Card>
        )}

        {/* Messages Card */}
        <Card 
          className={`col-span-12 ${mappedDyno?.infoFile ? 'md:col-span-6' : ''} flex flex-col md:min-h-[400px] p-1 md:p-6 max-h-[100vh] md:max-h-[50rem]`}
          title={t.messages}
          description={t.messagesDesc}
        >
            {/* Generate New Button */}
            <div className="mb-4">
              <button
                onClick={handleGenerateNew}
                disabled={isGeneratingSummary}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md 
                          transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring
                          ${isGeneratingSummary 
                            ? 'bg-secondary text-secondary-foreground cursor-not-allowed opacity-70' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
              >
                {isGeneratingSummary ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    {t.generating}
                  </div>
                ) : (
                  t.generateNew
                )}
              </button>
            </div>
          <div className="h-[40rem] flex flex-col overflow-y-auto px-1">

            {isGeneratingSummary && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">{t.generating}</span>
                </div>
              </div>
            )}

            {/* Messages Container with Scroll */}
            <div className="flex-1 pr-2 space-y-3 flex-grow">
              {mappedDyno?.summaries.map((summary) => (
                <TextCard key={summary.id} content={summary.content} onEdit={(ee) => handleSaveEdit(ee, summary.id)} onDelete={() => handleDelete(summary.id)} />
              ))}
            </div>
          </div>
        </Card>

        {/* Text Images Card */}
        {mappedDyno?.textimages && mappedDyno?.textimages.length > 0 && (
          <Card 
            className='col-span-12 p-1 md:p-6' 
            title={t.textImages}
            description={t.textImagesDesc}
          >
            <div className="flex justify-start gap-4 overflow-x-auto pb-2">
              {mappedDyno?.textimages.map((image, index) => (
                <div key={index} className="group relative flex-shrink-0 rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={image.file_url} 
                    alt={`text-image-${index}`}
                    className="h-96 w-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Download Button Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                      href={image.file_url}
                      download
                      className='h-6 w-6'>
                      <DownloadIcon className='text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full h-8 w-8' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Images Gallery Card */}
        {mappedDyno?.images && mappedDyno?.images.length > 0 && (
          <Card 
            className='col-span-12 p-1 md:p-6' 
            title={t.imageGallery}
            description={t.imageGalleryDesc}
          >
            <div className="flex justify-start gap-4 overflow-x-auto pb-2">
              {mappedDyno?.images.map((image, index) => (
                <div key={index} className="group relative flex-shrink-0 rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={image.file_url} 
                    alt={`gallery-image-${index}`}
                    className="h-40 w-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Download Button Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                      href={image.file_url}
                      download
                      className='h-6 w-6'>
                      <DownloadIcon className='text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full h-8 w-8' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Video Gallery Card */}
        {mappedDyno?.videos && mappedDyno?.videos.length > 0 && (
          <Card 
            className='col-span-12 p-1 md:p-6' 
            title={t.videoGallery}
            description={t.videoGalleryDesc}
          >
            <div className="flex justify-start gap-4 overflow-x-auto pb-2 h-full">
              {mappedDyno?.videos.map((video, index) => (
                <div key={index} className="group relative flex-shrink-0 rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                  <VideoPlayer src={video.file_url} className="w-[90vw] md:w-[40vw]" title=''/>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

const Card = ({children, className, title, description}:{
  children?: React.ReactNode; 
  className?: string;
  title?: string;
  description?: string;
}) => {
  return (
    <div className={`group relative w-full rounded-lg border border-border/60 
                    bg-background/60 dark:bg-[#161b22]/60 backdrop-blur-sm text-card-foreground shadow-md 
                    hover:shadow-xl hover:bg-background/90 hover:dark:bg-[#161b22]/90 hover:border-border
                    transition-all duration-300 ease-out ${className}`}>
      
      {/* Base subtle overlay for visibility */}
      <div className="absolute inset-0 bg-accent/5 rounded-lg" />
      
      {/* Content */}
      <div className="relative z-10">
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
      
      {/* Hover accent overlay */}
      <div className="absolute inset-0 bg-slate-700/10 rounded-lg opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glass effect border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-600/20 via-transparent to-slate/10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}

const LoadSkeleton = () => {
  return <div className="w-full h-full overflow-y-auto bg-background animate-pulse">
  <div className="grid grid-cols-12 gap-6 px-1 md:px-12 mx-auto">
    {/* Sticky Header Skeleton */}
    <div className="col-span-12 sticky top-0 z-50 -mt-6">
      <Skeleton className="p-4 bg-muted-foreground/10 backdrop-blur-md border rounded-lg shadow-md"/>
    </div>

    {/* Main Content Skeleton */}
      <Skeleton className="col-span-12 h-96 p-6 border rounded-lg bg-muted-foreground/10"/>


    {/* Info Image Skeleton */}
    <div className="col-span-12 md:col-span-6">
      <Skeleton className="p-6 border rounded-lg h-[50rem] bg-muted-foreground/10 "/>
    </div>

    {/* Messages Skeleton */}
    <div className="col-span-12 md:col-span-6">
      <div className="p-6 border rounded-lg bg-card h-[50rem] flex flex-col">
        <div className="h-8 w-32 bg-muted rounded mb-4" />
        <div className="space-y-4 flex-1 overflow-y-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 bg-muted/40 rounded-lg space-y-2">
              <Skeleton className="bg-muted-foreground/10 h-3 w-full rounded" />
              <Skeleton className="bg-muted-foreground/10 h-3 w-3/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Text Images Skeleton */}
    <div className="col-span-12">
      <div className="p-6 border rounded-lg bg-card">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="bg-muted-foreground/10 w-60 h-96 rounded-md" />
          ))}
        </div>
      </div>
    </div>

    {/* Images Gallery Skeleton */}
    <div className="col-span-12">
      <div className="p-6 border rounded-lg bg-card">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i } className="bg-muted-foreground/10 w-40 h-40 rounded-md" />
          ))}
        </div>
      </div>
    </div>

    {/* Videos Gallery Skeleton */}
    <div className="col-span-12">
      <div className="p-6 border rounded-lg bg-card">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="bg-muted-foreground/10 w-[90vw] md:w-[40vw] h-60 rounded-md" />
          ))}
        </div>
      </div>
    </div>

  </div>
</div>
}