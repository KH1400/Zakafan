'use client'
import React, { useEffect, useState } from 'react';
import { Edit, Trash2, FileText, Image, Globe, CheckCircle, XCircle, Plus } from 'lucide-react';
import { deleteDyno, fetchCategories, createDynograph, fetchDynos } from '../../../lib/api';
import { Dyno, DynoCategory, DynoDtoIn } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { NewDynographModal } from './new-dynograph-modal';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')        // Replace spaces and underscores with -
    .replace(/[^\w\-]+/g, '')        // Remove all non-word chars (except dash)
    .replace(/\-\-+/g, '-')          // Replace multiple dashes with one
    .replace(/^-+/, '')              // Trim dash from start
    .replace(/-+$/, '');             // Trim dash from end
}


const DynographListPage = () => {
  const [dynos, setDynos] = useState<Dyno[]>([]);
  const [categories, setCategories] = useState<DynoCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNewDynoModal, setShowNewDynoModal] = useState(false);

  useEffect(() => {
    getDynos();
    getCategories();
  }, []);

  const getDynos = async () => {
    setLoading(true);
    try {
      // همزمان fetch کردن دو تا API
      const dynosResult = await fetchDynos({});

      // Process dynos
      const dynosResponse: any = await dynosResult.json();

      const dynosData = dynosResponse.dynographs.map((dyns: any) => ({
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
        summaries: dyns.summaries?.map((s: any) => ({id: s.id, content: s.generated_summary, language: s.language, createdAt: s.updated_at})) || [],
        images: dyns.image_files,
        textimages: dyns.input_image_files,
      }));
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

  const handleEdit = (id) => {
    console.log('Edit dyno:', id);
    // Add your edit logic here
  };

  const handleDelete = async(id: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این داینو را حذف کنید؟')) {
      try {
        const response: any  = await deleteDyno({id});
        if(response.ok){
          setDynos(dynos.filter(dyno => dyno.id !== id));
        }
      } catch (error) {
        
      }
    }
  };

  const handleInsertDyno = async(dyno: DynoDtoIn) => {
    const ddd = {
      slug: slugify(dyno?.title['en']),
      title: dyno?.title,
      description: dyno?.description,
      image_file_id: dyno?.image,
      image_hint: slugify(dyno?.title['en']),
      html_file_id: dyno?.htmlFile,
      pdf_file_id: dyno?.pdfFile,
      info_file_id: dyno?.infoFile,
      image_file_ids: dyno?.images,
      input_image_file_ids: dyno?.textimages,
      video_file_ids: dyno?.videos,
      size: 1,
      category_ids: dyno?.categories
    }

    try {
      const response = await createDynograph(ddd).json();
      console.log(response) 
    } catch (error) {
      
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
      <div className="h-full">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full max-h-[60rem] px-6 py-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">لیست داینوگراف‌ها</h1>
          <Button onClick={() => setShowNewDynoModal(true)} variant='default'>
            <Plus className="w-4 h-4" />
            اضافه کردن داینو جدید
          </Button>
        </div>
        {showNewDynoModal && <NewDynographModal categories={categories} onSubmit={(d: DynoDtoIn) => handleInsertDyno(d)} onClose={() => {setShowNewDynoModal(false)}} className="fixed top-1/2 end-1/2 -translate-x-1/2 -translate-y-1/2 max-w-5xl w-full space-y-4 bg-muted rounded-2xl p-6 max-h-[45rem] overflow-y-auto" />}
        {/* Desktop Table */}
        <div className="hidden flex-grow lg:flex flex-col w-full bg-gray-800 rounded-xl shadow-2xl">
          {/* Fixed Header */}
          <div className="bg-gray-750">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    عنوان
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    شناسه
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    فایل‌ها
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    تصاویر
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    دسته‌بندی
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    توئیت‌ها
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          
          {/* Scrollable Body */}
          <div className="flex-grow h-full overflow-y-auto">
            <table className="min-w-full h-full divide-y divide-gray-700">
              <tbody className="bg-gray-800 h-full">
                {dynos.map((dyno) => (
                  <tr key={dyno.id} className="hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-white">
                          {dyno.title?.fa || dyno.title?.en || 'بدون عنوان'}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                          {dyno.description?.fa || dyno.description?.en || 'بدون توضیحات'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-300 font-mono bg-gray-700 px-2 py-1 rounded">
                        {dyno.slug}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <div className="flex flex-col items-center">
                          <StatusIcon condition={!!dyno.pdfFile} />
                          <span className="text-xs text-gray-400 mt-1">PDF</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <StatusIcon condition={!!dyno.htmlFile} />
                          <span className="text-xs text-gray-400 mt-1">HTML</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <StatusIcon condition={!!dyno.image} />
                          <span className="text-xs text-gray-400 mt-1">کاور</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <Image className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-white">
                              {dyno.images?.length || 0}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">تصاویر</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-white">
                              {dyno.textimages?.length || 0}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">تصویرنوشته</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {dyno.categories?.map((category) => (
                          <span
                            key={category.id}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100"
                          >
                            {category.title?.fa || category.title?.en}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-lg font-bold text-blue-400">
                          {dyno.summaries?.length || 0}
                        </div>
                        <span className="text-xs text-gray-400">توئیت</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(dyno.id)}
                          className="p-2 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-150"
                          title="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(dyno.id)}
                          className="p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-150"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {dynos.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">هیچ داینویی یافت نشد</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {dynos.map((dyno) => (
            <div key={dyno.id} className="bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {dyno.title?.fa || dyno.title?.en || 'بدون عنوان'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {dyno.description?.fa || dyno.description?.en || 'بدون توضیحات'}
                  </p>
                </div>
                <div className="flex gap-2 ml-2">
                  <button
                    onClick={() => handleEdit(dyno.id)}
                    className="p-2 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(dyno.id)}
                    className="p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-300 font-mono bg-gray-700 px-2 py-1 rounded mb-3 inline-block">
                {dyno.slug}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-2">فایل‌ها</div>
                  <div className="flex justify-around">
                    <div className="flex flex-col items-center">
                      <StatusIcon condition={!!dyno.pdfFile} />
                      <span className="text-xs text-gray-400 mt-1">PDF</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <StatusIcon condition={!!dyno.htmlFile} />
                      <span className="text-xs text-gray-400 mt-1">HTML</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <StatusIcon condition={!!dyno.image} />
                      <span className="text-xs text-gray-400 mt-1">کاور</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-2">تصاویر</div>
                  <div className="flex justify-around">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <Image className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-white">
                          {dyno.images?.length || 0}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">تصاویر</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-white">
                          {dyno.textimages?.length || 0}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">تصویرنوشته</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {dyno.categories?.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100"
                    >
                      {category.title?.fa || category.title?.en}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-400">
                    {dyno.summaries?.length || 0} توئیت
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden">
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Fixed Header */}
            <div className="bg-gray-700">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      عنوان
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      وضعیت
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      دسته‌بندی
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      عملیات
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            
            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-700">
                <tbody className="bg-gray-800">
                  {dynos.map((dyno) => (
                    <tr key={dyno.id} className="hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-white mb-1">
                            {dyno.title?.fa || dyno.title?.en || 'بدون عنوان'}
                          </div>
                          <div className="text-xs text-gray-400 mb-1">
                            {dyno.description?.fa || dyno.description?.en || 'بدون توضیحات'}
                          </div>
                          <div className="text-xs text-gray-300 font-mono bg-gray-700 px-2 py-1 rounded inline-block">
                            {dyno.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-2 mb-2">
                          <StatusIcon condition={!!dyno.pdfFile} />
                          <StatusIcon condition={!!dyno.htmlFile} />
                          <StatusIcon condition={!!dyno.image} />
                        </div>
                        <div className="text-xs text-gray-400">
                          {dyno.images?.length || 0} تصاویر | {dyno.summaries?.length || 0} توئیت
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {dyno.categories?.map((category) => (
                            <span
                              key={category.id}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100"
                            >
                              {category.title?.fa || category.title?.en}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(dyno.id)}
                            className="p-2 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dyno.id)}
                            className="p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
};

export default DynographListPage;