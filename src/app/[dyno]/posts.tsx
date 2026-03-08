'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Heart, MessageCircle, Share2, Play, Verified } from 'lucide-react';
import { useAutoRefreshToken } from '../../contexts/AuthContext';

// انواع دسته‌بندی‌ها
type CategoryType = 'political' | 'celebrities' | 'news' | 'thinktanks';

// ساختار داده‌ای پست‌ها
interface Post {
  id: string;
  author: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
  category: CategoryType;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    poster?: string; // برای کاور ویدئو
  };
  likes: string;
  comments: string;
  timeAgo: string;
}

// داده‌های آزمایشی (Mock Data)
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'خبرگزاری رویترز',
    username: '@ReutersIran',
    avatar: 'https://ui-avatars.com/api/?name=Reuters&background=0D8ABC&color=fff',
    isVerified: true,
    category: 'news',
    content: 'گزارش‌های جدید حاکی از تحولات بی‌سابقه در منطقه است. تحلیلگران معتقدند این روند می‌تواند معادلات خاورمیانه را به طور کامل تغییر دهد.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1600&auto=format&fit=crop',
    },
    likes: '۲.۴ هزار',
    comments: '۳۴۲',
    timeAgo: '۲ ساعت پیش'
  },
  {
    id: '2',
    author: 'موسسه مطالعات خاورمیانه',
    username: '@MEI_Institute',
    avatar: 'https://ui-avatars.com/api/?name=MEI&background=1E293B&color=fff',
    category: 'thinktanks',
    content: 'بررسی استراتژی‌های جدید دفاعی و تاثیر آن بر ثبات منطقه. در گزارش جدید به بررسی دقیق بودجه‌های نظامی و توانمندی‌های سایبری پرداخته‌ایم.',
    likes: '۸۵۶',
    comments: '۴۵',
    timeAgo: '۵ ساعت پیش'
  },
  {
    id: '3',
    author: 'شخصیت سیاسی برجسته',
    username: '@PoliticFigure',
    avatar: 'https://ui-avatars.com/api/?name=Politic&background=8B5CF6&color=fff',
    isVerified: true,
    category: 'political',
    content: 'امروز در نشست بین‌المللی بر لزوم حفظ صلح و امنیت تاکید کردیم. دیپلماسی تنها راه حل خروج از بحران‌های فعلی است.',
    media: {
      type: 'video',
      url: '#',
      poster: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=1600&auto=format&fit=crop'
    },
    likes: '۱۲.۱ هزار',
    comments: '۱.۲ هزار',
    timeAgo: '۱ روز پیش'
  },
  {
    id: '4',
    author: 'بازیگر و فعال اجتماعی',
    username: '@CelebArtist',
    avatar: 'https://ui-avatars.com/api/?name=Celeb&background=F59E0B&color=fff',
    isVerified: true,
    category: 'celebrities',
    content: 'تلاش برای صلح وظیفه همه ماست. بیایید صدای کسانی باشیم که در این شرایط سخت نیاز به یاری دارند. 🙏🕊️',
    likes: '۴۵.۸ هزار',
    comments: '۳.۴ هزار',
    timeAgo: '۲ روز پیش'
  }
];

const CATEGORIES = [
  { id: 'political', label: 'شخصیت‌های سیاسی' },
  { id: 'celebrities', label: 'سلبریتی‌ها' },
  { id: 'news', label: 'خبرگزاری‌ها' },
  { id: 'thinktanks', label: 'اندیشکده‌ها' },
];

export default function Posts({ slug }: { slug: string }) {
  const { language } = useLanguage();
  useAutoRefreshToken();
  const [activeTab, setActiveTab] = useState<CategoryType>('news');

  const filteredPosts = MOCK_POSTS.filter(post => post.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-slate-200 outline-none font-yekanBakh pb-20">
      
      {/* Header & Title */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-4 py-6 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          جریان تحولات (Feed)
        </h1>
        <p className="text-sm text-slate-400 mt-2">آخرین بروزرسانی‌ها و تحلیل‌ها از منابع معتبر</p>
      </header>

      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 pt-6">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-reverse space-x-2 mb-8 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as CategoryType)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors duration-300">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border border-white/20 object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-white">{post.author}</h3>
                        {post.isVerified && <Verified className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400" dir="ltr">
                        <span>{post.username}</span>
                        <span>•</span>
                        <span dir="rtl">{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-slate-200 text-sm leading-relaxed mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Post Media */}
                {post.media && (
                  <div className="mb-4 rounded-xl overflow-hidden relative border border-white/10 max-h-96 bg-black">
                    {post.media.type === 'image' ? (
                      <img src={post.media.url} alt="Post media" className="w-full h-full object-cover" />
                    ) : (
                      <div className="relative w-full h-full cursor-pointer group">
                        <img src={post.media.poster} alt="Video Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                            <Play className="w-6 h-6 ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 text-slate-400 border-t border-white/5 pt-4 mt-2">
                  <button className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-red-400/10">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-400/10">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-400/10">
                      <Share2 className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500">در حال حاضر پستی در این دسته‌بندی وجود ندارد.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}