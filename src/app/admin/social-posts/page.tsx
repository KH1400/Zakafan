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
import ProtectedRoute from '@/components/protected-route';

const SocialPostsPage = () => {
  const [unassignedPosts, setUnassignedPosts] = useState<News[]>([]);
  const [assignedPosts, setAssignedPosts] = useState<News[]>([]);
  const [dynos, setDynos] = useState<DynoMasterDtoOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<string | number | null>(null);
  const [filterDynoId, setFilterDynoId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { language, selectedLang } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const unassignedData = await apiGetSocialPosts({withoutDynoId: true}).json() as { news: News[] };
      const assignedData = await apiGetSocialPosts({withoutDynoId: false}).json() as { news: News[] };
      const dynosData = await apiGetDynoMastersByCategoryHref({}).json() as { masters: DynoMasterDtoOut[] };
      
      setUnassignedPosts(unassignedData.news);
      setAssignedPosts(assignedData.news.filter(p => p.dynograph_id));
      setDynos(dynosData.masters);
    } catch (error) {
      toast({ title: "خطا در دریافت داده‌ها", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (post: News, isRemoving = false) => {
    const originalUnassigned = [...unassignedPosts];
    const originalAssigned = [...assignedPosts];

    try {
      setIsSubmitting(post.id);
      const updatedPost = { ...post };
      if (isRemoving) updatedPost.dynograph_id = null as any;

      // به‌روزرسانی خوش‌بینانه (Optimistic UI)
      if (isRemoving) {
        setAssignedPosts(prev => prev.filter(p => p.id !== post.id));
        setUnassignedPosts(prev => [updatedPost, ...prev]);
      } else {
        setUnassignedPosts(prev => prev.filter(p => p.id !== post.id));
        setAssignedPosts(prev => {
          const exists = prev.find(p => p.id === post.id);
          if (exists) return prev.map(p => p.id === post.id ? updatedPost : p);
          return [updatedPost, ...prev];
        });
      }

      await apiPatchSocialPost(post.id as any, updatedPost);
      toast({ title: isRemoving ? "اتصال حذف شد" : "تغییرات ثبت شد" });
    } catch (error) {
      setUnassignedPosts(originalUnassigned);
      setAssignedPosts(originalAssigned);
      toast({ title: "خطا در ارتباط با سرور", variant: "destructive" });
    } finally {
      setIsSubmitting(null);
    }
  };

  const PostsTable = ({ 
    data, 
    isAssignedList, 
    filterId, 
    setFilterId 
  }: { 
    data: News[], 
    isAssignedList: boolean,
    filterId?: string | null,
    setFilterId?: (id: string | null) => void
  }) => {
    const displayData = filterId ? data.filter(p => p.dynograph_id === filterId) : data;

    return (
      <div dir="rtl" className="space-y-4">
        {isAssignedList && setFilterId && (
          <div className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border border-border/50 font-yekan-bakh" dir="rtl">
            <span className="text-xs font-medium text-muted-foreground">فیلتر داینوگراف:</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-56 justify-between text-start font-yekan-bakh">
                  {filterId 
                    ? dynos.find(d => Object.values(d.dynographs).some(child => child.id === filterId))?.dynographs[language].title 
                    : "همه موارد"}
                  <ChevronsUpDown className="mr-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent dir='rtl' className="w-[250px] p-0 font-yekan-bakh" align="start">
                <Command>
                  <CommandInput placeholder="جستجوی داینو..." />
                  <CommandList>
                    <CommandEmpty className="text-start text-xs p-2">موردی یافت نشد.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem className="text-start" onSelect={() => setFilterId(null)}>
                        <Check className={cn("ml-2 h-4 w-4", !filterId ? "opacity-100" : "opacity-0")} />
                        نمایش همه
                      </CommandItem>
                      {dynos.map((dyno) => (
                        <CommandItem
                          key={dyno.id}
                          className="text-start"
                          onSelect={() => setFilterId(dyno.dynographs[language].id)}
                        >
                          <Check className={cn(
                            "ml-2 h-4 w-4", 
                            filterId === dyno.dynographs[language].id ? "opacity-100" : "opacity-0"
                          )} />
                          {dyno.dynographs[language].title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {filterId && (
              <Button variant="ghost" size="sm" onClick={() => setFilterId(null)} className="h-8 font-yekan text-xs text-destructive">
                <X className="ml-1 h-3 w-3" /> حذف فیلتر
              </Button>
            )}
          </div>
        )}

        <Table dir="rtl" className="font-yekan">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">منبع</TableHead>
              <TableHead className="text-right">محتوا</TableHead>
              <TableHead className="text-right">داینوگراف</TableHead>
              {isAssignedList && <TableHead className="text-left">عملیات</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAssignedList ? 4 : 3} className="text-center py-10 text-muted-foreground">
                  خبری جهت نمایش یافت نشد.
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{(post.content as any).channel_title || 'بدون منبع'}</TableCell>
                  <TableCell className="max-w-md truncate">{(post.content as any).text}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" role="combobox" className="w-full justify-between text-right font-yekan">
                          {post.dynograph_id
                            ? dynos.find((d) => 
                                Object.values(d.dynographs).some(child => child.id === post.dynograph_id)
                              )?.dynographs[language]?.title || "انتخاب شده"
                            : "جستجوی داینو..."}
                          <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent dir='rtl' className="w-[250px] p-0 font-yekan-bakh" align="start">
                        <Command>
                          <CommandInput placeholder="انتخاب داینو..." />
                          <CommandList>
                            <CommandGroup>
                              {dynos.map((dyno) => (
                                <CommandItem
                                  key={dyno.id}
                                  onSelect={() => {
                                    const targetId = dyno.dynographs[language].id;
                                    handleUpdatePost({ ...post, dynograph_id: targetId }, false);
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
                  {isAssignedList && (
                    <TableCell className="text-left">
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleUpdatePost(post, true)}
                        disabled={isSubmitting === post.id}
                      >
                        {isSubmitting === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <ProtectedRoute accessRoles={['admin']} isLoading={loading && dynos.length === 0}>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-yekan">مدیریت پست‌های اجتماعی</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="unassigned" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 font-yekan">
                <TabsTrigger value="unassigned">بدون داینوگراف ({unassignedPosts.length})</TabsTrigger>
                <TabsTrigger value="assigned">اختصاص داده شده ({assignedPosts.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="unassigned">
                <PostsTable data={unassignedPosts} isAssignedList={false} />
              </TabsContent>
              
              <TabsContent value="assigned">
                <PostsTable 
                  data={assignedPosts} 
                  isAssignedList={true} 
                  filterId={filterDynoId} 
                  setFilterId={setFilterDynoId} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default SocialPostsPage;