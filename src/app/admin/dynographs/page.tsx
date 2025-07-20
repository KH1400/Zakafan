'use client'
import React, { useEffect, useState } from 'react';
import { Edit, Trash2, FileText, Image, Globe, CheckCircle, XCircle, Plus, Eye, Video, MessageSquareText, Edit2 } from 'lucide-react';
import { deleteDyno, fetchCategories, updateDynograph, apiGetDynoMastersByCategoryHref, apiCreateDynographMaster, apiCreateDynographChild, apiDeleteDynographMaster } from '../../../lib/api';
import { Dyno, DynoCategory, DynoChildDtoIn, DynoDtoIn, DynoMasterDtoIn, DynoMasterDtoOut, Language, languages, slugify } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { NewDynographModal } from './new-dynograph-modal';
import { useToast } from '../../../hooks/use-toast';
import ProtectedRoute from '../../../components/protected-route';
import Loading from '../../../components/fourfold/loading';
import { Skeleton } from '../../../components/ui/skeleton';
import { describe } from 'node:test';
import Link from 'next/link';
import { Input } from '../../../components/ui/input';
import to from "await-to-js";

const defaultDynoChild: DynoChildDtoIn = {
  title: "",
  description: "",
  htmlFile: null,
  pdfFile: null,
  infoFile: null,
  textimages: [],
  videos: [],
};

const createDefaultDynographs = (): Record<Language, DynoChildDtoIn> => {
  return languages.reduce((acc, lang) => {
    acc[lang.lang] = { ...defaultDynoChild };
    return acc;
  }, {} as Record<Language, DynoChildDtoIn>);
};

const DynographListPage = () => {
  const [dynos, setDynos] = useState<DynoMasterDtoOut[]>([]);
  const [edittingDynoMaster, setEdittingDynoMaster] = useState<DynoMasterDtoOut>();
  const [categories, setCategories] = useState<DynoCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showNewDynoModal, setShowNewDynoModal] = useState(false);
  const [filterText, setFilterText] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    getDynos();
    getCategories();
  }, []);

  const getDynos = async () => {
    setLoading(true);
    try {
      // همزمان fetch کردن دو تا API
      const dynosResponse: any = await apiGetDynoMastersByCategoryHref({}).json();
      console.log(dynosResponse);
      const dynosData = dynosResponse.masters.map((dynMaster: any) => ({
        id: dynMaster.id,
        title: dynMaster.title,
        description: dynMaster.description,
        slug: dynMaster.slug,
        image: dynMaster.image_file,
        imageHint: dynMaster.image_hint,
        categories: dynMaster.categories,
        createdAt: dynMaster.created_at,
        dynographs: Object.fromEntries(Object.keys(dynMaster.dynographs).map(key => {
          const dynograph = dynMaster.dynographs[key];
          return [key, {
              id: dynograph.id,
              title: dynograph.title,
              description: dynograph.description,
              htmlFile: dynograph.html_file,
              pdfFile: dynograph.pdf_file,
              infoFile: dynograph.info_file,
              textimages: dynograph.image_files,
              summaries: dynograph.summaries,
              videos: dynograph.video_files,
            }]
          })),
        pdfFile: dynMaster.pdf_file,
        infoFile: dynMaster.info_file,
        htmlFile: dynMaster.html_file,
        html: dynMaster.html_text,
        summaries: dynMaster.summaries?.map((s: any) => ({id: s.id, content: s.generated_summary, language: s.language, createdAt: s.updated_at})) || [],
        images: dynMaster.image_files,
        textimages: dynMaster.input_image_files,
        videos: dynMaster.video_files
      }));
      console.log(dynosData);
      setDynos(dynosData);
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getCategories = async () => {
    setLoading(true);
    try {
      const categoryResult = await fetchCategories()
      const categoriesResponse: any = await categoryResult.json();
      const categoriesData = categoriesResponse.categories.map((c: any) => ({...c, image: c.image_file, imageHint: c.image_hint}));
      setCategories(categoriesData);
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    const masterDyno = dynos.filter(d => d.id === id)[0];
    setEdittingDynoMaster(masterDyno)
    setShowNewDynoModal(true);
  }

  const handleEditDyno = async(dynoMaster: DynoMasterDtoIn) => {

    return
    setSubmitLoading(true);
    if(!edittingDynoMaster.id) return
    // if(dyno.title["fa"] === null){
    //   toast({
    //     variant: "error",
    //     title: "اطلاعات ناقص",
    //     description: `عنوان نباید خالی باشد.`,
    //   });
    //   setSubmitLoading(false);
    //   return
    // }
    if(dynoMaster.categories.length === 0){
      toast({
        variant: "error",
        title: "اطلاعات ناقص",
        description: `دسته موضوعی را انتخاب کنید.`,
      });
      setSubmitLoading(false);
      return
    }

    try {
      const response: any = await updateDynograph(edittingDynoMaster).json();
      console.log(response)
      if(response.id){
        toast({
          variant: "success",
          title: "موفق",
          description: `محتوا با موفقیت بروزرسانی شد.`,
        });
        setEdittingDynoMaster(null)
        setShowNewDynoModal(false)
        setSubmitLoading(false);
        getDynos();
      }
      console.log(response) 
    } catch (error) {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async(id: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این داینو را حذف کنید؟')) {
      try {
        const response: any  = await apiDeleteDynographMaster(id);
        if(response.ok){
          setDynos(dynos.filter(dyno => dyno.id !== id));
        }
      } catch (error) {
        
      }
    }
  };

  const handleInsertDyno = async(dynoMaster: DynoMasterDtoIn) => {
    setSubmitLoading(true);
    if(!dynoMaster.dynographs["fa"].title || !dynoMaster.dynographs["en"].title || !dynoMaster.dynographs["ar"].title || !dynoMaster.dynographs["he"].title){
      toast({
        variant: "error",
        title: "اطلاعات ناقص",
        description: `عنوان را به تمام زبان‌ها وارد کنید.`,
      });
      setSubmitLoading(false);
      return
    }
    if(dynoMaster.categories.length === 0){
      toast({
        variant: "error",
        title: "اطلاعات ناقص",
        description: `دسته موضوعی را انتخاب کنید.`,
      });
      setSubmitLoading(false);
      return
    }  
    if(dynoMaster.slug.trim().length === 0){
      dynoMaster.slug = slugify(dynoMaster.dynographs["en"].title)
    }

    const dinoIds = Object.fromEntries(languages.map(lang => ([lang.lang, ""])));
    for (const lang of languages) {
      const langData = dynoMaster.dynographs[lang.lang];

      const dynograph: Record<string, any> = {
        language: lang.lang,
        size: 1
      };
      
      if (langData.title) dynograph.title = langData.title;
      if (langData.description) dynograph.description = langData.description;
      if (langData.htmlFile) dynograph.html_file_id = langData.htmlFile;
      if (langData.pdfFile) dynograph.pdf_file_id = langData.pdfFile;
      if (langData.infoFile) dynograph.info_file_id = langData.infoFile;
      if (langData.textimages && langData.textimages.length > 0) dynograph.input_image_file_ids = langData.textimages;
      if (langData.videos && langData.videos.length > 0) dynograph.video_file_ids = langData.videos;
    
      try {
        const response: any = await apiCreateDynographChild(dynograph).json();
        dinoIds[lang.lang] = response.data.id;
      } catch (error) {
        console.log(`Error in ${lang.lang}`, error);
        setSubmitLoading(false);
        return;
      }
    }

    const dynographMaster = {
      slug: dynoMaster.slug,
      dynograph_ids: dinoIds,
      category_ids: dynoMaster.categories,
      image_file_ids: dynoMaster.images,
      image_file_id: dynoMaster.image,
      image_hint: dynoMaster.imageHint,
      public_video_file_ids: dynoMaster.videos
    }

    try {
      const response: any = await apiCreateDynographMaster(dynographMaster).json();
      if(response.data.id){
        toast({
          variant: "success",
          title: "موفق",
          description: `محتوا با موفقیت بارگذاری شد.`,
        });
        setShowNewDynoModal(false)
        setSubmitLoading(false);
        setEdittingDynoMaster(null)
        getDynos();
      }
    } catch (error) {
      console.log(error)
      setSubmitLoading(false);
    }
  };
  
  const StatusIcon = ({ condition }) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <XCircle className="w-4 h-4 text-red-400" />
    );
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
    <ProtectedRoute accessRoles={['admin', 'user']}>
      <div className="h-[90vh] flex flex-col">
        {showNewDynoModal && <NewDynographModal categories={categories} loading={submitLoading} defaultDynoMaster={edittingDynoMaster} onChange={(d: DynoMasterDtoIn) => {}} onSubmit={(d: DynoMasterDtoIn) => {edittingDynoMaster?.id?handleEditDyno(d):handleInsertDyno(d)}} onClose={() => {setShowNewDynoModal(false); setEdittingDynoMaster(null)}} />}
        
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-white">لیست داینوگراف‌ها</h1>
            <Button onClick={() => setShowNewDynoModal(true)} variant='default'>
              <Plus className="w-4 h-4" />
              اضافه کردن داینو جدید
            </Button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 px-6 pb-6 min-h-0">
          {/* Mobile/Tablet View - Card Layout */}
          <div className="xl:hidden h-full overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Search Filter */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-400">فیلتر</p>
                  <span className="text-xs text-gray-500">
                    {dynos.filter(d => d.dynographs["fa"].title?.indexOf(filterText) > -1).length}
                  </span>
                </div>
                <Input 
                  value={filterText} 
                  onChange={(e) => setFilterText(e.target.value)} 
                  className="bg-gray-700 border-gray-600 focus:border-blue-500 w-full" 
                  placeholder="جستجو..."
                />
              </div>

              {/* Cards */}
              {dynos.filter(d => {
                return Object.values(d.dynographs).some(dynograph => 
                  dynograph.title?.indexOf(filterText) > -1
                );
              }).map((dyno) => (
                <div key={dyno.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
                  {/* Title and Description */}
                  {Object.entries(dyno.dynographs).filter(([langCode]) => langCode === "fa").map(([langCode, dynograph]) => (
                    <div key={langCode} className="space-y-2">
                      <h3 className="text-white font-semibold text-base">
                        {dynograph.title || <span className="text-gray-400 italic">بدون عنوان</span>}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {dynograph.description || <span className="italic">بدون توضیحات</span>}
                      </p>
                    </div>
                  ))}

                  {/* Categories and View Link */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {dyno.categories?.slice(0, 2).map((category) => (
                        <span key={category.id} className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          {category.title?.fa || category.title?.en}
                        </span>
                      ))}
                      {dyno.categories?.length > 2 && (
                        <span className="text-xs text-gray-400">+{dyno.categories.length - 2}</span>
                      )}
                    </div>
                    <Link href={`/${dyno.categories[0].href}/${dyno.slug}`} target='_blank'
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors">
                      <Eye className="w-3 h-3" />
                      مشاهده
                    </Link>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-700 rounded-lg p-2 text-center">
                      <div className="text-blue-400 text-lg font-bold">{dyno.images?.length || 0}</div>
                      <div className="text-xs text-gray-400">تصاویر</div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-2 text-center">
                      <div className="text-green-400 text-lg font-bold">{dyno.videos?.length || 0}</div>
                      <div className="text-xs text-gray-400">ویدئو</div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => handleDelete(dyno.id)}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all text-xs">
                      <Trash2 className="w-3 h-3" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}

              {dynos.length === 0 && (
                <div className="flex justify-center items-center h-32">
                  <Loading/>
                </div>
              )}
            </div>
          </div>

          {/* Medium Desktop View - Compact Table */}
          <div className="hidden xl:block 2xl:hidden lg:hidden h-full">
            <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-2xl">
              {/* Header */}
              <div className="flex-shrink-0 bg-gray-700 rounded-t-xl p-4">
                <div className="flex items-center gap-2">
                  <p className="text-gray-400">فیلتر</p>
                  <Input 
                    value={filterText} 
                    onChange={(e) => setFilterText(e.target.value)} 
                    className="bg-transparent focus:outline-none max-w-xs" 
                  />
                  <p className="text-gray-400">{dynos.filter(d => d.dynographs["fa"].title?.indexOf(filterText) > -1).length}</p>
                </div>
              </div>

              {/* Compact Table */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <table className="min-w-full">
                  <thead className="bg-gray-750 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-right text-xs text-gray-400">عنوان</th>
                      <th className="px-4 py-2 text-center text-xs text-gray-400">دسته‌بندی</th>
                      <th className="px-4 py-2 text-center text-xs text-gray-400">فایل‌ها</th>
                      <th className="px-4 py-2 text-center text-xs text-gray-400">آمار</th>
                      <th className="px-4 py-2 text-center text-xs text-gray-400">اکشن</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {dynos.filter(d => {
                      return Object.values(d.dynographs).some(dynograph => 
                        dynograph.title?.indexOf(filterText) > -1
                      );
                    }).map((dyno) => (
                      <tr key={dyno.id} className="hover:bg-gray-750 transition-colors">
                        {/* Title */}
                        <td className="px-4 py-3">
                          {Object.entries(dyno.dynographs).filter(([langCode]) => langCode === "fa").map(([langCode, dynograph]) => (
                            <div key={langCode} className="space-y-1">
                              <div className="text-white text-sm font-medium">
                                {dynograph.title || <span className="text-gray-400 italic">بدون عنوان</span>}
                              </div>
                              <div className="text-xs text-gray-400 truncate max-w-xs">
                                {dynograph.description || <span className="italic">بدون توضیحات</span>}
                              </div>
                            </div>
                          ))}
                        </td>

                        {/* Categories */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {dyno.categories?.slice(0, 1).map((category) => (
                              <span key={category.id} className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                                {category.title?.fa || category.title?.en}
                              </span>
                            ))}
                            {dyno.categories?.length > 1 && (
                              <span className="text-xs text-gray-400">+{dyno.categories.length - 1}</span>
                            )}
                          </div>
                        </td>

                        {/* Files Status */}
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            {Object.entries(dyno.dynographs).map(([langCode, dynograph]) => (
                              <div key={langCode} className="flex gap-1">
                                <div className={`w-2 h-2 rounded-full ${dynograph.pdfFile ? 'bg-green-400' : 'bg-gray-600'}`} title="PDF"></div>
                                <div className={`w-2 h-2 rounded-full ${dynograph.htmlFile ? 'bg-blue-400' : 'bg-gray-600'}`} title="HTML"></div>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Stats */}
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-3 text-xs">
                            <span className="text-blue-400">{dyno.images?.length || 0}📷</span>
                            <span className="text-green-400">{dyno.videos?.length || 0}🎥</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <Link href={`/${dyno.categories[0].href}/${dyno.slug}`} target='_blank'
                              className="p-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors">
                              <Eye className="w-3 h-3" />
                            </Link>
                            <button
                              onClick={() => handleEdit(dyno.id)}
                              className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                              title="ویرایش"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(dyno.id)}
                              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {dynos.length === 0 && (
                <div className="flex justify-center items-center h-32">
                  <Loading/>
                </div>
              )}
            </div>
          </div>

          {/* Large Desktop Table */}
          <div className="hidden 2xl:block h-full">
            <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-2xl">
              {/* Fixed Header */}
              <div className="flex-shrink-0 bg-gray-700 rounded-t-xl">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider flex justify-center items-center gap-2">
                        <p>فیلتر</p>
                        <Input value={filterText} onChange={(e) => setFilterText(e.target.value)} className="bg-transparent focus:outline-none " />
                        <p>{dynos.filter(d => d.dynographs["fa"].title?.indexOf(filterText) > -1).length}</p>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              
              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto min-h-0">
              <table className="min-w-full">
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {dynos.filter(d => {
                    return Object.values(d.dynographs).some(dynograph => 
                      dynograph.title?.indexOf(filterText) > -1
                    );
                  }).map((dyno) => (
                    <tr key={dyno.id} className="hover:bg-gray-750 transition-all duration-200 border-b border-gray-700/50">
                      {/* عنوان و توضیحات - طراحی کارتی */}
                      <td className="px-6 py-6">
                        <div className="space-y-3">
                          {Object.entries(dyno.dynographs).filter(([langCode, dynograph], index) => langCode === "fa").map(([langCode, dynograph], index) => (
                            <div key={langCode} className="bg-gray-750 rounded-lg p-4 border-l-4 border-blue-500 hover:border-blue-400 transition-colors">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                    langCode === 'fa' ? 'bg-green-500' : 
                                    langCode === 'en' ? 'bg-blue-500' : 
                                    langCode === 'ar' ? 'bg-orange-500' :
                                    langCode === 'he' ? 'bg-purple-500' :
                                    'bg-gray-500'
                                  }`}>
                                    {langCode === 'fa' ? 'ف' : 
                                    langCode === 'en' ? 'E' : 
                                    langCode === 'ar' ? 'ع' :
                                    langCode === 'he' ? 'ע' :
                                    langCode.toUpperCase().charAt(0)}
                                  </div>
                                  <span className="text-xs font-medium text-gray-300 bg-gray-600 px-2 py-1 rounded-full">
                                    {langCode === 'fa' ? 'فارسی' : 
                                    langCode === 'en' ? 'English' : 
                                    langCode === 'ar' ? 'عربی' :
                                    langCode === 'he' ? 'עברית' :
                                    langCode.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-semibold text-white leading-relaxed">
                                  {dynograph.title || (
                                    <span className="text-gray-400 italic">بدون عنوان</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400 leading-relaxed max-w-md">
                                  {dynograph.description || (
                                    <span className="italic">بدون توضیحات</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* لینک مشاهده */}
                      <td className="px-6 py-6">
                        <Link 
                          href={`/${dyno.categories[0].href}/${dyno.slug}`} 
                          className="flex flex-col items-center justify-center p-3 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-200 group" 
                          target='_blank'
                        >
                          <Eye className='w-5 h-5 text-gray-300 group-hover:text-white transition-colors'/>
                          <span className="text-xs text-gray-400 group-hover:text-white mt-1">مشاهده</span>
                        </Link> 
                      </td>

                      {/* دسته‌بندی‌ها */}
                      <td className="px-6 py-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {dyno.categories?.map((category) => (
                            <span
                              key={category.id}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow"
                            >
                              {category.title?.fa || category.title?.en}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* اسلاگ */}
                      <td className="px-6 py-6 space-y-3">
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-xs text-gray-500">
                            شناسه یکتا
                          </div>
                          <div className="text-xs text-gray-300 font-mono bg-gray-700 px-3 py-2 rounded-lg border border-gray-600 max-w-xs truncate">
                            {dyno.slug}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 justify-center items-center gap-3">
                          {Object.entries(dyno.dynographs).map(([langCode, dynograph]) => (
                            <div key={langCode} className="bg-gray-750 rounded-lg p-3 border border-gray-600">
                              <div className="flex items-center justify-between mb-2">
                                <div className={`flex items-center gap-2 text-xs font-medium ${
                                  langCode === 'fa' ? 'text-green-400' : 
                                  langCode === 'en' ? 'text-blue-400' : 
                                  langCode === 'ar' ? 'text-orange-400' :
                                  langCode === 'he' ? 'text-purple-400' :
                                  'text-gray-400'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    langCode === 'fa' ? 'bg-green-400' : 
                                    langCode === 'en' ? 'bg-blue-400' : 
                                    langCode === 'ar' ? 'bg-orange-400' :
                                    langCode === 'he' ? 'bg-purple-400' :
                                    'bg-gray-400'
                                  }`}></div>
                                  {langCode === 'fa' ? 'فارسی' : 
                                  langCode === 'en' ? 'English' : 
                                  langCode === 'ar' ? 'عربی' :
                                  langCode === 'he' ? 'עברית' :
                                  langCode.toUpperCase()}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 p-1">
                                <div className="flex items-center justify-between w-full gap-1 bg-gray-800 rounded px-2 py-1">
                                  <p className="h-full text-xs text-gray-400">PDF</p>
                                  <div className="w-6 h-6"><StatusIcon condition={!!dynograph.pdfFile} /></div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 bg-gray-800 rounded px-2 py-1">
                                  <p className="h-full text-xs text-gray-400">HTML</p>
                                  <div className="w-6 h-6"><StatusIcon condition={!!dynograph.htmlFile} /></div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 bg-gray-800 rounded px-2 py-1">
                                  <p className="h-full text-xs text-gray-400">کاور</p>
                                  <div className="w-6 h-6"><StatusIcon condition={!!dyno.image} /></div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-1 bg-gray-800 rounded px-2 py-1">
                                  <p className="h-full text-xs text-gray-400">اینفو</p>
                                  <div className="w-6 h-6"><StatusIcon condition={!!dynograph.infoFile} /></div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                  <div className="flex flex-col items-center justify-between p-2 bg-gray-700 rounded">
                                    <div className="flex items-center gap-1">
                                      <FileText className="w-3 h-3 text-yellow-400" />
                                      <span className="text-xs text-gray-400">تصویرنوشته</span>
                                    </div>
                                    <p className="text-xs font-bold text-white">
                                      {dynograph.textimages?.length || 0}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-center justify-between p-2 bg-gray-700 rounded">
                                    <div className="flex items-center gap-1">
                                      <MessageSquareText className="w-3 h-3 text-cyan-400" />
                                      <span className="text-xs text-gray-400">توئیت</span>
                                    </div>
                                    <p className="text-xs font-bold text-white">
                                      {dynograph.summaries?.length || 0}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-center justify-between p-2 bg-gray-700 rounded">
                                    <div className="flex items-center gap-1">
                                      <MessageSquareText className="w-3 h-3 text-cyan-400" />
                                      <span className="text-xs text-gray-400">ویدئو</span>
                                    </div>
                                    <p className="text-xs font-bold text-white">
                                      {dynograph.videos?.length || 0}
                                    </p>
                                  </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* آمار محتوا */}
                      <td className="min-w-44 px-6 py-6">
                          {/* آمار کلی */}
                          <div className="w-full grid grid-cols-1 gap-3">
                            <div className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                              <div className="flex items-center gap-2 mb-1">
                                <Image className="w-4 h-4 text-blue-400" />
                                <span className="text-lg font-bold text-white">
                                  {dyno.images?.length || 0}
                                </span>
                              </div>
                              <span className="text-xs text-gray-300 font-medium">تصاویر عمومی</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                              <div className="flex items-center gap-2 mb-1">
                                <Video className="w-4 h-4 text-green-400" />
                                <span className="text-lg font-bold text-white">
                                  {dyno.videos?.length || 0}
                                </span>
                              </div>
                              <span className="text-xs text-gray-300 font-medium">ویدئوهای عمومی</span>
                            </div>
                          </div>
                      </td>

                      {/* اکشن‌ها */}
                      <td className="px-6 py-6">
                        <div className="flex flex-col justify-center gap-6">
                          <button
                            onClick={() => handleEdit(dyno.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-500 group"
                            title="حذف"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                              ویرایش
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(dyno.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500 group"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                              حذف
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            {dynos.length === 0 && (
              <div className="h-full flex justify-center items-center">
                {/* <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
                <Loading/>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DynographListPage;