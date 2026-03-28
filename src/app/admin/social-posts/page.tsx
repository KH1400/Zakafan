'use client'

import React, { useEffect, useState } from 'react';
import { apiGetDynoMastersByCategoryHref, apiGetSocialPosts, apiPatchSocialPost } from '@/lib/api';
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
import { Loader2, Save, Check, ChevronsUpDown, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';
import { Skeleton } from '@/components/ui/skeleton';
import ProtectedRoute from '@/components/protected-route';

const SocialPostsPage = () => {
  const [unassignedPosts, setUnassignedPosts] = useState<News[]>([]);
  const [assignedPosts, setAssignedPosts] = useState<News[]>([]);
  const [dynos, setDynos] = useState<DynoMasterDtoOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<string | number | null>(null);
  const { toast } = useToast();
  const { language, selectedLang } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // دریافت پست‌های بدون داینو
      const unassignedData = await apiGetSocialPosts({withoutDynoId: true}).json() as { news: News[] };
      // دریافت پست‌هایی که داینو دارند (ارسال رشته خالی یا پارامتر مناسب برای دریافت همه اختصاص داده شده‌ها)
      const assignedData = await apiGetSocialPosts({withoutDynoId: false}).json() as { news: News[] };
      
      const dynosData = await apiGetDynoMastersByCategoryHref({}).json() as { masters: DynoMasterDtoOut[] };
      
      setUnassignedPosts(unassignedData.news);
      setAssignedPosts(assignedData.news.filter(p => p.dynograph_id)); // فقط آن‌هایی که آیدی دارند
      setDynos(dynosData.masters);
    } catch (error) {
      toast({
        title: "خطا در دریافت داده‌ها",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (post: News, isRemoving = false) => {
    try {
      setIsSubmitting(post.id);
      const updatedPost = { ...post };
      if (isRemoving) updatedPost.dynograph_id = null as any;

      await apiPatchSocialPost(post.id as any, updatedPost);

      toast({ title: isRemoving ? "اتصال حذف شد" : "تغییرات ثبت شد" });
      
      // رفرش لیست‌ها
      await loadData();
    } catch (error) {
      toast({ title: "خطا در ثبت تغییرات", variant: "destructive" });
    } finally {
      setIsSubmitting(null);
    }
  };

  // کامپوننت رندر جدول (برای جلوگیری از تکرار کد)
  const PostsTable = ({ data, isAssignedList }: { data: News[], isAssignedList: boolean }) => (
    <Table dir="rtl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">منبع</TableHead>
          <TableHead className="text-right">محتوا</TableHead>
          <TableHead className="text-right">داینوگراف</TableHead>
          <TableHead className="text-left">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      {loading && <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center py-10">در حال بارگزاری...</TableCell>
          </TableRow>
        </TableBody>}
      {!loading && <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-10">خبری یافت نشد.</TableCell>
          </TableRow>
        ) : (
          data.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{(post.content as any).channel_title || 'بدون عنوان'}</TableCell>
              <TableCell className="max-w-md truncate">{(post.content as any).text}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-[200px] justify-between text-right">
                      {post.dynograph_id
                        ? dynos.find((d) => 
                            Object.values(d.dynographs).some(child => child.id === post.dynograph_id)
                          )?.dynographs[language]?.title || "انتخاب شده"
                        : "جستجوی داینو..."}
                      <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="جستجو..." />
                      <CommandList>
                        <CommandEmpty>یافت نشد.</CommandEmpty>
                        <CommandGroup>
                          {dynos.map((dyno) => (
                            <CommandItem
                              key={dyno.id}
                              onSelect={() => {
                                const targetId = dyno.dynographs[language].id;
                                if (isAssignedList) {
                                    setAssignedPosts(prev => prev.map(p => p.id === post.id ? {...p, dynograph_id: targetId} : p));
                                } else {
                                    setUnassignedPosts(prev => prev.map(p => p.id === post.id ? {...p, dynograph_id: targetId} : p));
                                }
                              }}
                            >
                              <Check className={cn("ml-2 h-4 w-4", post.dynograph_id === dyno.dynographs[language].id ? "opacity-100" : "opacity-0")} />
                              {dyno.dynographs[language].title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button 
                  size="sm" 
                  onClick={() => handleUpdatePost(post)}
                  disabled={isSubmitting === post.id}
                >
                  {isSubmitting === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                </Button>
                {isAssignedList && (
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleUpdatePost(post, true)}
                    disabled={isSubmitting === post.id}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>}
    </Table>
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">مدیریت پست‌های اجتماعی</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="unassigned" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="unassigned">بدون داینوگراف ({unassignedPosts.length})</TabsTrigger>
              <TabsTrigger value="assigned">اختصاص داده شده ({assignedPosts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="unassigned">
              <PostsTable data={unassignedPosts} isAssignedList={false} />
            </TabsContent>
            
            <TabsContent value="assigned">
              <PostsTable data={assignedPosts} isAssignedList={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialPostsPage;