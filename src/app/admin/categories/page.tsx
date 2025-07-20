'use client'
import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { apiCreateDynoCategory, apiDeleteDynoCategory, apiUpdateDynoCategory, fetchCategories } from '../../../lib/api';
import { DynoCategory } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../hooks/use-toast';
import ProtectedRoute from '../../../components/protected-route';
import Loading from '../../../components/fourfold/loading';
import { Skeleton } from '../../../components/ui/skeleton';
import { Input } from '../../../components/ui/input';
import Image from 'next/image';
import { NewCategoryModal } from './new-category-modal';

const CategoryListPage = () => {
  const [categories, setCategories] = useState<DynoCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [edittingCategory, setEdittingCategory] = useState<DynoCategory>(null);
  const [filterText, setFilterText] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    getCategories();
  }, []);
  
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

  const handleInsert = async (category: DynoCategory) => {
    setSubmitLoading(true)
    if(!category.title["fa"] || !category.title["en"] || !category.title["ar"] || !category.title["he"]){
      toast({
        variant: "error",
        title: "اطلاعات ناقص",
        description: `عنوان را به تمام زبان‌ها وارد کنید.`,
      });
      setSubmitLoading(false);
      return
    }
    const cateTemp = {
      title: category.title,
      description: category.description,
      icon:category.icon,
      href: category.href,
      image_file_id: category.image.id,
      image_hint: category.imageHint || category.href,
      order: category.order
    }
    try {
      const response = await apiCreateDynoCategory(cateTemp)
      getCategories();
      setEdittingCategory(null)
      setShowNewModal(false)
      toast({
        variant: "success",
        title: "موفق",
        description: `دسته با موفقیت اضافه گردید`,
      });
    } catch (error) {
      console.log(error)
      toast({
        variant: "error",
        title: "خطا",
        description: `در هنگام اضافه کردن دسته خطایی رخ داده است.`,
      });
    }
    setSubmitLoading(false)
  }

  const handleEdit = async (category: DynoCategory) => {
    setEdittingCategory(category);
    setShowNewModal(true);
  }

  const handleDelete = async (category: DynoCategory) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این دسته را حذف کنید؟')) {
      try {
        const response = await apiDeleteDynoCategory(category)
        getCategories();
      } catch (error) {
        
      }
    }
  }

  const handleUpdate = async (category: DynoCategory) => {
    setSubmitLoading(true)
    if(!category.title["fa"] || !category.title["en"] || !category.title["ar"] || !category.title["he"]){
      toast({
        variant: "error",
        title: "اطلاعات ناقص",
        description: `عنوان را به تمام زبان‌ها وارد کنید.`,
      });
      setSubmitLoading(false);
      return
    }
    if(!category.id) return
    const cateTemp = {
      id: category.id,
      title: category.title,
      description: category.description,
      icon:category.icon,
      href: category.href,
      image_file_id: category.image.id,
      image_hint: category.imageHint || category.href,
      order: category.order
    }
    try {
      const response = await apiUpdateDynoCategory(cateTemp)
      getCategories();
      setEdittingCategory(null)
      setShowNewModal(false)
      toast({
        variant: "success",
        title: "موفق",
        description: `دسته با موفقیت بروزرسانی شد.`,
      });
    } catch (error) {
      console.log(error)
      toast({
        variant: "error",
        title: "خطا",
        description: `در هنگام بروزرسانی دسته خطایی رخ داده است.`,
      });
    }
    setSubmitLoading(false)
  }

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
        {showNewModal && <NewCategoryModal loading={false} defaultCategory={edittingCategory} onSubmit={(d: DynoCategory) => {edittingCategory?.id?handleUpdate(d):handleInsert(d)}} onClose={() => {setShowNewModal(false); setEdittingCategory(null)}} />}
        
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-white">لیست دسته‌ها</h1>
            <Button onClick={() => setShowNewModal(true)} variant='default'>
              <Plus className="w-4 h-4" />
              اضافه کردن دسته جدید
            </Button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 px-6 pb-6 min-h-0">
          <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-2xl">
            {/* Fixed Header */}
            <div className="w-full flex-shrink-0 bg-gray-700 rounded-t-xl px-6 py-4">
              <div className="w-full flex justify-center items-center gap-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">فیلتر</p>
                <Input 
                  value={filterText} 
                  onChange={(e) => setFilterText(e.target.value)} 
                  className="w-full bg-transparent focus:outline-none" 
                />
                <p className="text-xs font-medium text-gray-400">
                  {categories.filter(d => d.title["fa"]?.indexOf(filterText) > -1).length}
                </p>
              </div>
            </div>
            
            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="hidden md:block">
                {categories.sort((a,b) => a.order - b.order).filter(d => d.title["fa"]?.indexOf(filterText) > -1).map((category) => (
                  <div key={category.id} className="flex items-center gap-4 hover:bg-gray-750 transition-all duration-200 border-b border-gray-700/50 p-6">
                    {/* تصویر */}
                    <div className="flex-shrink-0 w-24">
                      <Image 
                        src={category.image?.file_url} 
                        alt={category.image?.id.toString()} 
                        className='rounded-lg shadow-lg' 
                        style={{ objectFit: "contain" }} 
                        width={100} 
                        height={100} 
                      />
                    </div>
                    
                    {/* محتوا */}
                    <div className="flex-1 px-6">
                      <p className='text-md text-white'>{category.title["fa"]}</p>
                      <p className='text-xs text-muted-foreground'>{category.description["fa"]}</p>
                    </div>
                    <div className="">
                      <span>اولویت:</span>
                      {category.order}
                    </div>
                    {/* دکمه ها */}
                    <div className="flex-shrink-0 w-48">
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-500 group"
                          title="ویرایش"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                            ویرایش
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500 group"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                            حذف
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile View */}
              <div className="md:hidden min-w-full">
              {categories.filter(d => d.title["fa"]?.indexOf(filterText) > -1).map((category) => (
                <div key={category.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold text-base">
                      {category.title["fa"] || <span className="text-gray-400 italic">بدون عنوان</span>}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {category.description["fa"] || <span className="italic">بدون توضیحات</span>}
                    </p>
                  </div>
                  <div className="">
                    <span>اولویت:</span>
                    {category.order}
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-center pt-2 gap-3">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all text-xs"
                      title="ویرایش"
                    >
                      <Edit2 className="w-3 h-3" />
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all text-xs">
                      <Trash2 className="w-3 h-3" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
            {categories.length === 0 && (
              <div className="h-full flex justify-center items-center">
                {/* <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
                <Loading/>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CategoryListPage;