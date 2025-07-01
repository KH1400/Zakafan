"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Dyno } from '../../../lib/content-types';
import { useLanguage } from '../../../lib/language-context';
import HtmlRenderer from '../../../components/htmlviewer';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, ArrowLeftRight, ArrowRight } from 'lucide-react';
import Loding from '../../../components/fourfold/loading';
import { fetchDynoBySlug, fetchSummarys, generateSummary, updateSummary } from '../../../lib/api';
import { useNavigation } from 'react-day-picker';
import Link from 'next/link';
import Image from 'next/image';

// ترجمه‌های متن‌ها
const translations = {
  fa: {
    mainContent: "محتوای اصلی",
    mainContentDesc: "نمایش محتوای HTML",
    infoImage: "اینفوگرافیک",
    messages: "پیام‌ها",
    messagesDesc: "مجموعه پیام‌های مرتبط",
    textImages: "تصاویر متنی",
    textImagesDesc: "گالری تصاویر با متن",
    imageGallery: "گالری تصاویر",
    imageGalleryDesc: "مجموعه تصاویر اصلی",
    edit: "ویرایش",
    copy: "کپی",
    generateNew: "تولید محتوای جدید",
    generating: "در حال تولید...",
    copied: "کپی شد!",
    download: "دانلود تصویر"
  },
  ar: {
    mainContent: "المحتوى الرئيسي",
    mainContentDesc: "عرض محتوى HTML",
    infoImage: "رسم بياني",
    messages: "الرسائل",
    messagesDesc: "مجموعة الرسائل ذات الصلة",
    textImages: "صور النص",
    textImagesDesc: "معرض الصور مع النص",
    imageGallery: "معرض الصور",
    imageGalleryDesc: "مجموعة الصور الرئيسية",
    edit: "تحرير",
    copy: "نسخ",
    generateNew: "إنتاج محتوى جديد",
    generating: "إنتاج...",
    copied: "تم النسخ!",
    download: "تحميل الصورة"
  },
  en: {
    mainContent: "Main Content",
    mainContentDesc: "Display HTML content",
    infoImage: "Infographic",
    messages: "Messages",
    messagesDesc: "Collection of related messages",
    textImages: "Text Images",
    textImagesDesc: "Image gallery with text",
    imageGallery: "Image Gallery",
    imageGalleryDesc: "Main image collection",
    edit: "Edit",
    copy: "Copy",
    generateNew: "Generate New Content",
    generating: "Generating...",
    copied: "Copied!",
    download: "Download Image"
  },
  he: {
    mainContent: "תוכן ראשי",
    mainContentDesc: "הצגת תוכן HTML",
    infoImage: "אינפוגרפיקה",
    messages: "הודעות",
    messagesDesc: "אוסף הודעות קשורות",
    textImages: "תמונות טקסט",
    textImagesDesc: "גלריית תמונות עם טקסט",
    imageGallery: "גלריית תמונות",
    imageGalleryDesc: "אוסף תמונות ראשי",
    edit: "עריכה",
    copy: "העתק",
    generateNew: "יצירת תוכן חדש",
    generating: "יצירת תוכן חדש...",
    copied: "הועתק!",
    download: "הורד תמונה"
  }
};

export default function DynoDetailsPage({ slug }: { slug: string }) {
  const { language, selectedLang } = useLanguage();
  const [dyno, setDyno] = useState<Dyno>();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  
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
        console.log(data)
        message += data.content;
        console.log(message)
        // چک کردن اتمام پردازش
        if (data.is_complete === true) {
          console.log('Message generation completed');
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
      const newMessages: Dyno = await fetchSummarys({dynoId: dyno.id}).json();
      // به‌روزرسانی state
      setDyno(prevDyno => {
        if (!prevDyno) return prevDyno;
        return {
          ...prevDyno,
          summaries: newMessages.summaries.map((s: any) => ({id: s.id, content: s.generated_summary, createdAt: s.updated_at}))
        };
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // تابع اصلی برای تولید پیام جدید
  const handleGenerateNew = async () => {
    if (!dyno || isGeneratingSummary) return;
    
    try {
      setIsGeneratingSummary(true);
      const response: any = await generateSummary({dynoId: dyno.id}).json();
      
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
    }, 100);
  
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

  // Handle copy functionality
  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle edit functionality
  const handleEdit = (summary: any) => {
    setEditingId(summary.id);
    setEditText(summary.content);
  };

  const handleSaveEdit = async () => {
    if (dyno && editingId) {
      try {
        const res: {id: number,generated_summary: string, created_at: string } = await updateSummary({summaryId: editingId, generatedSummary: editText}).json();
        setDyno({ ...dyno, summaries: dyno.summaries.map(s => {if(s.id === editingId){return {id: res.id, content: res.generated_summary, createdAt: res.created_at}}else{return s}}) });
        setEditingId(null);
        setEditText('');
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const dynoSlugRef = useRef<string>("");
  useEffect(() => {
    dynoSlugRef.current = slug;
    getDyno();
  }, [slug])

  const getDyno = async () => {
    try {
      const dyns: any = await fetchDynoBySlug({slug}).json();
      console.log('dyno: 11 ', dyns)
      const mappedDyno: Dyno = {
        id: dyns.id,
        title: dyns.title,
        description: dyns.description,
        slug: dyns.slug.toLocaleLowerCase(),
        image: dyns.image_file,
        imageHint: dyns.image_hint,
        size: dyns.size,
        categories: dyns.categories,
        createdAt: dyns.created_at,
        pdfFile: dyns.pdf_file,
        infoFile: dyns.info_file,
        htmlFile: dyns.html_file,
        html: dyns.html_text,
        summaries: dyns.summaries?.map((s: any) => ({id: s.id, content: s.generated_summary, createdAt: s.updated_at})) || [],
        images: dyns.image_files,
        textimages: dyns.input_image_files,
      };
      setDyno(mappedDyno);
    } catch (error) {
      
      console.log(error)
    }
  }

  if(!dyno){
    return <Loding/>
  }
  
  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-full overflow-y-auto bg-background"
    >
      <div className="grid grid-cols-12 gap-6 px-12 mx-auto">
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
              <Link href={`/${dyno.categories[0].href}/${language === "en" ? "/" : `/?lang=${language}`}`}>
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
                  {dyno.title[language]}
                </h3>
                <p className={`
                  text-muted-foreground transition-all duration-500 ease-out
                  ${isScrolled 
                    ? 'text-xs opacity-70 max-h-0 overflow-hidden' 
                    : 'text-sm opacity-100 max-h-10'
                  }
                `}>
                  {dyno.description[language]}
                  {isScrolled.toString()}
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
        {dyno.html && <Card 
          className='col-span-12 p-6' 
          title={t.mainContent}
          description={t.mainContentDesc}
        >
          <HtmlRenderer className='w-full' htmlContent={dyno.html} />
        </Card>}        

        {/* Info File Card */}
        {dyno?.infoFile && (
          <Card 
            className='col-span-12 md:col-span-6 p-6 max-h-[50rem]' 
            title={t.infoImage}
          >
            <div className="relative w-full h-[43rem] flex-grow rounded-lg overflow-hidden">
              <img 
                src={dyno?.infoFile} 
                alt="info image"
                className='w-full h-full object-contain transition-transform duration-300'
              />
              {/* Download Button Overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleDownload(dyno.infoFile, 'info-image')}
                  className="p-2 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary 
                            transition-colors shadow-lg backdrop-blur-sm"
                  title={t.download}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Messages Card */}
        <Card 
          className={`col-span-12 ${dyno?.infoFile ? 'md:col-span-6' : ''} flex flex-col min-h-[400px] py-6 px-6 max-h-[50rem]`}
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
                  {/* {currentSessionId && (
                    <span className="text-xs text-blue-500">({currentSessionId.slice(0, 8)}...)</span>
                  )} */}
                </div>
              </div>
            )}

            {/* Messages Container with Scroll */}
            <div className="flex-1 pr-2 space-y-3 flex-grow">
              {dyno?.summaries.map((summary) => (
                <div
                  key={summary.id}
                  className="group relative p-3 bg-muted/50 border border-border rounded-lg 
                            hover:bg-muted/70 transition-all duration-200 hover:shadow-sm"
                >
                  {editingId === summary.id ? (
                    /* Edit Mode */
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 text-sm border border-input rounded-md bg-background 
                                  text-foreground focus:ring-2 focus:ring-ring focus:border-ring 
                                  resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-sm 
                                    hover:bg-primary/90 transition-colors"
                        >
                          ✓ Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-sm 
                                    hover:bg-secondary/90 transition-colors"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <>
                      <p className="text-sm text-card-foreground pr-16 leading-relaxed">
                        {summary.content}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-200 flex gap-1">
                        <button
                          onClick={() => handleEdit(summary)}
                          className="p-1.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 
                                    transition-colors text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                          title={t.edit}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleCopy(summary.content, summary.id)}
                          className={`p-1.5 rounded-sm transition-all text-xs focus:outline-none focus:ring-1 focus:ring-ring ${
                            copiedId === summary.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                          }`}
                          title={copiedId === summary.id ? t.copied : t.copy}
                        >
                          {copiedId === summary.id ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Text Images Card */}
        {dyno?.textimages && dyno?.textimages.length > 0 && (
          <Card 
            className='col-span-12 p-6' 
            title={t.textImages}
            description={t.textImagesDesc}
          >
            <div className="flex justify-start gap-4 overflow-x-auto pb-2">
              {dyno?.textimages.map((image, index) => (
                <div key={index} className="group relative flex-shrink-0 rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={image} 
                    alt={`text-image-${index}`}
                    className="h-96 w-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Download Button Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleDownload(image, `text-image-${index}`)}
                      className="p-2 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary 
                                transition-colors shadow-lg backdrop-blur-sm"
                      title={t.download}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Images Gallery Card */}
        {dyno?.images && dyno?.images.length > 0 && (
          <Card 
            className='col-span-12 p-6' 
            title={t.imageGallery}
            description={t.imageGalleryDesc}
          >
            <div className="flex justify-start gap-4 overflow-x-auto pb-2">
              {dyno?.images.map((image, index) => (
                <div key={index} className="group relative flex-shrink-0 rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={image} 
                    alt={`gallery-image-${index}`}
                    className="h-40 w-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Download Button Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleDownload(image.toLowerCase(), `gallery-image-${index}`)}
                      className="p-2 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary 
                                transition-colors shadow-lg backdrop-blur-sm"
                      title={t.download}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
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
                    bg-card/60 backdrop-blur-sm text-card-foreground shadow-md 
                    hover:shadow-xl hover:bg-card/90 hover:border-border
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
      <div className="absolute inset-0 bg-accent/10 rounded-lg opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glass effect border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/20 via-transparent to-primary/10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}