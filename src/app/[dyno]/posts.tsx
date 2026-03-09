'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Heart, MessageCircle, Share2, Play, Verified, Copy, Check, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAutoRefreshToken } from '../../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type CategoryType = 'political' | 'celebrities' | 'news' | 'thinktanks';

interface Post {
  id: string;
  author: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
  categoryId: number;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    poster?: string;
  };
  likes: string;
  comments: string;
  timeAgo: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'خبرگزاری رویترز',
    username: '@ReutersIran',
    avatar: 'https://ui-avatars.com/api/?name=Reuters&background=0D8ABC&color=fff',
    isVerified: true,
    categoryId: 3,
    content:
      'گزارش‌های جدید حاکی از تحولات بی‌سابقه در منطقه است. تحلیلگران معتقدند این روند می‌تواند معادلات خاورمیانه را به طور کامل تغییر دهد.',
    media: {
      type: 'image',
      url: 'categories/c8.jpg',
    },
    likes: '۲.۴ هزار',
    comments: '۳۴۲',
    timeAgo: '۲ ساعت پیش',
  },
  {
    id: '2',
    author: 'خبرگزاری رویترز',
    username: '@ReutersIran',
    avatar: 'https://ui-avatars.com/api/?name=Reuters&background=0D8ABC&color=fff',
    isVerified: true,
    categoryId: 3,
    content:
      'تحلیل جدید درباره وضعیت ژئوپلیتیک منطقه منتشر شد و واکنش‌های مختلفی در میان کارشناسان به همراه داشته است.',
    media: {
      type: 'image',
      url: 'categories/c9.jpg',
    },
    likes: '۱.۸ هزار',
    comments: '۲۱۰',
    timeAgo: '۴ ساعت پیش',
  },
  {
    id: '3',
    author: 'خبرگزاری رویترز',
    username: '@ReutersIran',
    avatar: 'https://ui-avatars.com/api/?name=Reuters&background=0D8ABC&color=fff',
    isVerified: true,
    categoryId: 3,
    content:
      'گزارش تصویری از تحولات جدید در منطقه و بررسی تاثیرات آن بر اقتصاد جهانی.',
    media: {
      type: 'image',
      url: 'categories/c10.jpg',
    },
    likes: '۳.۱ هزار',
    comments: '۴۱۰',
    timeAgo: '۶ ساعت پیش',
  },
  {
    id: '4',
    author: 'موسسه مطالعات خاورمیانه',
    username: '@MEI_Institute',
    avatar: 'https://ui-avatars.com/api/?name=MEI&background=1E293B&color=fff',
    categoryId: 2,
    content:
      'بررسی استراتژی‌های جدید دفاعی و تاثیر آن بر ثبات منطقه. در گزارش جدید به بررسی دقیق بودجه‌های نظامی پرداخته‌ایم.',
    likes: '۸۵۶',
    comments: '۴۵',
    timeAgo: '۵ ساعت پیش',
  },
  {
    id: '5',
    author: 'شخصیت سیاسی برجسته',
    username: '@PoliticFigure',
    avatar: 'https://ui-avatars.com/api/?name=Politic&background=8B5CF6&color=fff',
    isVerified: true,
    categoryId: 4,
    content:
      'امروز در نشست بین‌المللی بر لزوم حفظ صلح و امنیت تاکید کردیم.',
    media: {
      type: 'video',
      url: '#',
      poster:
        'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1600&auto=format&fit=crop',
    },
    likes: '۱۲.۱ هزار',
    comments: '۱.۲ هزار',
    timeAgo: '۱ روز پیش',
  },
  {
    id: '6',
    author: 'بازیگر و فعال اجتماعی',
    username: '@CelebArtist',
    avatar: 'https://ui-avatars.com/api/?name=Celeb&background=F59E0B&color=fff',
    isVerified: true,
    categoryId: 1,
    content:
      'تلاش برای صلح وظیفه همه ماست. بیایید صدای کسانی باشیم که نیاز به یاری دارند. 🙏🕊️',
    likes: '۴۵.۸ هزار',
    comments: '۳.۴ هزار',
    timeAgo: '۲ روز پیش',
  },
  {
    id: '1',
    author: 'خبرگزاری رویترز',
    username: '@ReutersIran',
    avatar: 'https://ui-avatars.com/api/?name=Reuters&background=0D8ABC&color=fff',
    isVerified: true,
    categoryId: 3,
    content:
      'گزارش‌های جدید حاکی از تحولات بی‌سابقه در منطقه است. تحلیلگران معتقدند این روند می‌تواند معادلات خاورمیانه را به طور کامل تغییر دهد. این تغییرات نه تنها در سطح سیاسی بلکه در ابعاد اقتصادی نیز تاثیرات شگرفی خواهد داشت که بازار نفت و انرژی را به شدت تحت تاثیر قرار می‌دهد. کشورهای منطقه در حال آماده‌سازی برای سناریوهای مختلف هستند.',
    media: { type: 'image', url: 'categories/c8.jpg' },
    likes: '۲.۴ هزار',
    comments: '۳۴۲',
    timeAgo: '۲ ساعت پیش',
  },
  {
    id: '4',
    author: 'موسسه مطالعات خاورمیانه',
    username: '@MEI_Institute',
    avatar: 'https://ui-avatars.com/api/?name=MEI&background=1E293B&color=fff',
    categoryId: 2,
    content:
      'بررسی استراتژی‌های جدید دفاعی و تاثیر آن بر ثبات منطقه. در گزارش جدید به بررسی دقیق بودجه‌های نظامی پرداخته‌ایم. بودجه‌های تخصیص یافته نشان‌دهنده تغییر رویکرد از جنگ‌های کلاسیک به سمت نبردهای سایبری و پهپادی است.',
    likes: '۸۵۶',
    comments: '۴۵',
    timeAgo: '۵ ساعت پیش',
  },
];

const CATEGORIES = [
  { id: 1, name: 'political', label: 'شخصیت‌های سیاسی' },
  { id: 2, name: 'celebrities', label: 'سلبریتی‌ها' },
  { id: 3, name: 'news', label: 'خبرگزاری‌ها' },
  { id: 4, name: 'thinktanks', label: 'اندیشکده‌ها' },
];

const goBackTranslations = {
  en: "Go Back Home",
  fa: "بازگشت به خانه",
  ar: "العودة إلى الرئيسية",
  he: "חזור לדף הבית",
};

export default function Posts({ slug }: { slug: string }) {
  const { language, selectedLang } = useLanguage();
  useAutoRefreshToken();
  const [activeTab, setActiveTab] = useState<number>(1); 
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPosts = MOCK_POSTS.filter(
    (post) => post.categoryId === activeTab
  );

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

  // تابع کپی کردن متن
  const handleCopyText = async (text: string, postId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2000); // بازگشت آیکون بعد از ۲ ثانیه
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // تابع دانلود تصویر یا ویدیو
  const handleDownloadMedia = async (url: string, type: 'image' | 'video', postId: string) => {
    if (url === '#') return; // جلوگیری از دانلود لینک‌های خالی دمو
    
    try {
      setDownloadingId(postId);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      const extension = type === 'image' ? 'jpg' : 'mp4';
      link.download = `media-${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed', error);
      window.open(url, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  // تابع اشتراک گذاری
  const handleShare = async (post: Post) => {
    const shareData = {
      title: post.author,
      text: post.content,
      url: window.location.href, // در پروژه واقعی می‌توانید لینک اختصاصی پست را بگذارید
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // اگر مرورگر پشتیبانی نکرد، حداقل لینکش رو کپی کن
      handleCopyText(`${post.content}\n\n${window.location.href}`, post.id);
      alert('لینک و متن پست در کلیپ‌بورد کپی شد.');
    }
  };

  return (
    <div ref={scrollContainerRef} className="relative flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#050505] text-slate-200 font-yekanBakh pb-24 custom-scrollbar">
      <div className={`
          col-span-12 sticky top-0 z-[18] 
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
              <Link href={`/${language === "en" ? "/" : `/?lang=${language}`}`}>
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
                  {goBackTranslations[language]}
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
            جریان تحولات
                </h3>
                <p className={`
                  text-muted-foreground transition-all duration-500 ease-out
                  ${isScrolled 
                    ? 'text-xs opacity-70 max-h-0 overflow-hidden' 
                    : 'text-sm opacity-100 max-h-10'
                  }
                `}>
            آخرین بروزرسانی‌ها و تحلیل‌ها از منابع معتبر
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
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="sticky top-10 z-[15] w-full bg-[#050505]/80 supports-[backdrop-filter]:bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 pt-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === cat.id
                    ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20'
                    : 'text-slate-400 bg-white/5 border border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md border border-white/5 rounded-3xl p-5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-500 shadow-lg h-fit"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-100 truncate">{post.author}</h3>
                      {post.isVerified && (
                        <Verified className="w-4 h-4 shrink-0 text-blue-500 fill-blue-500/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400/80 mt-0.5 truncate" dir="ltr">
                      <span className="truncate">{post.username}</span>
                      <span className="text-[10px] opacity-50 shrink-0">•</span>
                      <span className="shrink-0" dir="rtl">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-loose mb-5 whitespace-pre-line flex-grow line-clamp-4">
                  {post.content}
                </p>

                {post.media && (
                  <div className="mb-5 rounded-2xl overflow-hidden border border-white/5 relative bg-black/50 group-hover:border-white/10 transition-colors">
                    {post.media.type === 'image' ? (
                      <img
                        src={post.media.url}
                        alt="Post media"
                        className="w-full max-h-64 object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                      />
                    ) : (
                      <div className="relative w-full max-h-64 cursor-pointer">
                        <img
                          src={post.media.poster}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-blue-600/80 transition-all duration-300">
                            <Play className="w-6 h-6 ml-1 fill-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* نوار اکشن‌ها (ابزارها) */}
                <div className="flex items-center justify-between text-slate-400/80 pt-4 mt-auto border-t border-white/5">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors group/btn">
                      <div className="p-2 -m-2 rounded-full group-hover/btn:bg-red-500/10 transition-colors">
                        <Heart className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-xs font-medium">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group/btn">
                      <div className="p-2 -m-2 rounded-full group-hover/btn:bg-blue-500/10 transition-colors">
                        <MessageCircle className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-xs font-medium">{post.comments}</span>
                    </button>
                  </div>

                  {/* دکمه‌های سمت چپ (کپی، دانلود، اشتراک‌گذاری) */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* دکمه دانلود (فقط اگر مدیا داشت) */}
                    {post.media && (
                      <button 
                        onClick={() => handleDownloadMedia(post.media!.url, post.media!.type, post.id)}
                        disabled={downloadingId === post.id}
                        className="hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-cyan-500/10"
                        title="دانلود فایل"
                      >
                        <Download className={`w-[18px] h-[18px] ${downloadingId === post.id ? 'animate-bounce text-cyan-400' : ''}`} />
                      </button>
                    )}

                    {/* دکمه کپی */}
                    <button 
                      onClick={() => handleCopyText(post.content, post.id)}
                      className="hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-purple-500/10"
                      title="کپی متن"
                    >
                      {copiedId === post.id ? (
                        <Check className="w-[18px] h-[18px] text-green-400" />
                      ) : (
                        <Copy className="w-[18px] h-[18px]" />
                      )}
                    </button>

                    {/* دکمه اشتراک‌گذاری */}
                    <button 
                      onClick={() => handleShare(post)}
                      className="hover:text-green-400 transition-colors p-2 rounded-full hover:bg-green-500/10"
                      title="اشتراک‌گذاری"
                    >
                      <Share2 className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 opacity-60">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-lg">پستی در این دسته‌بندی وجود ندارد</p>
            </div>
          )}
        </div>
      </main>
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
      <div className="relative z-0">
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