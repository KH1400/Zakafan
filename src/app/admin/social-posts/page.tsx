'use client'

import React, { useEffect, useState } from 'react';
import { apiGetDynoMastersByCategoryHref, apiGetSocialPosts, apiPatchSocialPost, fetchDynos } from '@/lib/api';
import { DynoMasterDtoOut, News } from '@/lib/content-types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Link as LinkIcon, Save, Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { cn } from '../../../lib/utils';
import { useLanguage } from '../../../lib/language-context';
import { Skeleton } from '../../../components/ui/skeleton';
import ProtectedRoute from '../../../components/protected-route';

const SocialPostsPage = () => {
  const [posts, setPosts] = useState<News[]>([]);
  const [dynos, setDynos] = useState<DynoMasterDtoOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<number | null>(null);
  const { toast } = useToast();
  const {language} = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const postsData: {news: News[]} = await apiGetSocialPosts({ withoutDynoId: true }).json();
      const dynosData: {masters: DynoMasterDtoOut[]} = await apiGetDynoMastersByCategoryHref({}).json();
      
      setPosts(postsData.news);
      setDynos(dynosData.masters);
    } catch (error) {
      toast({
        title: "خطا در دریافت داده‌ها",
        description: "مشکلی در ارتباط با سرور پیش آمده است.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (post: News) => {
    if (!post.dynograph_id) {
      toast({ title: "لطفاً ابتدا یک داینو انتخاب کنید", variant: "destructive" });
      return;
    }

    try {
      setIsSubmitting(post.id);
      await apiPatchSocialPost(post.id, post);

      toast({ title: "با موفقیت ثبت شد" });
      
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch (error) {
      toast({ title: "خطا در ثبت تغییرات", variant: "destructive" });
    } finally {
      setIsSubmitting(null);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute accessRoles={['admin', 'user']} isLoading={true}>
        <div className="h-[90vh] flex flex-col">
          <div className="p-6 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Skeleton className="h-8 w-48 bg-muted-foreground/10 rounded animate-pulse" />
              <Skeleton className="h-10 w-40 bg-muted-foreground/10 rounded animate-pulse" />
            </div>
          </div>  
          <div className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-24 bg-muted-foreground/10 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">مدیریت پست‌های بدون دسته‌بندی</CardTitle>
          <p className="text-sm text-muted-foreground">
            در این بخش پست‌هایی که هنوز به هیچ داینوگرافی اختصاص داده نشده‌اند نمایش داده می‌شوند.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">منبع</TableHead>
                <TableHead className="text-right">محتوا</TableHead>
                <TableHead className="text-right">تاریخ انتشار</TableHead>
                <TableHead className="text-right">انتخاب داینوگراف</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    خبری جهت نمایش یافت نشد.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.content.channel_title || 'بدون عنوان'}</TableCell>
                      <TableCell>{post.content.text}</TableCell>
                      <TableCell>
                        {post.content?.date ? new Date(post.content?.date).toLocaleDateString('fa-IR') : '-'}
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-[200px] justify-between"
                            >
                              {/* اصلاح: پیدا کردن عنوان بر اساس فیلد صحیح */}
                              {post.dynograph_id
                                ? dynos.find((d) => d.dynographs[language].id === post.dynograph_id)?.dynographs[language].title
                                : "جستجوی داینو..."}
                              <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="نام داینو را جستجو کنید..." />
                              <CommandList>
                                <CommandEmpty>داینویی یافت نشد.</CommandEmpty>
                                <CommandGroup>
                                  {dynos.map((dyno) => (
                                    <CommandItem
                                      key={dyno.dynographs[language].id}
                                      value={dyno.dynographs[language].title} // برای جستجو بهتر است عنوان باشد
                                      onSelect={() => {
                                        setPosts(prev => prev.map(p => 
                                          p.id === post.id ? { ...p, dynograph_id: dyno.dynographs[language].id } : p
                                        ));
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "ml-2 h-4 w-4",
                                          post.dynograph_id === dyno.dynographs[language].id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {dyno.dynographs[language].title}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        disabled={isSubmitting === post.id}
                        onClick={() => handleFinalSubmit(post)}
                      >
                        {isSubmitting === post.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Save className="ml-2 h-4 w-4" />
                            ثبت نهایی
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialPostsPage;