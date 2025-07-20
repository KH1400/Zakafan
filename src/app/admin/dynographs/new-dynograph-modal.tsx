'use client';
import React, { useEffect, useState } from 'react'
import FileUploadComponent from '../../../components/fourfold/uploader'
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Dyno, DynoCategory, DynoChildDtoIn, DynoDtoIn, DynoMasterDtoIn, DynoMasterDtoOut, Language, languages } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import Image from "next/image";
import { useLanguage } from '../../../lib/language-context';
import { Loader2, X } from 'lucide-react';

export const NewDynographModal = ({onChange, defaultDynoMaster, loading, onClose, onSubmit, categories}:{className?: string, defaultDynoMaster: DynoMasterDtoOut, loading: boolean; onChange: (d: DynoMasterDtoIn) => void, onClose: () => void, onSubmit: (d: DynoMasterDtoIn) => void, categories: DynoCategory[]}) => {
  const {selectedLang} = useLanguage();
  const [dynoMaster, setDynoMaster] = useState<DynoMasterDtoIn>()
  useEffect(() => {
    const dynoTemp: DynoMasterDtoIn = {
      slug: "",
      image: null,
      videos: [],
      imageHint: "",
      images: [],
      categories: [],
      dynographs: {
        "fa": {title: "", description: "", htmlFile: 0, pdfFile: 0, infoFile: 0, videos: [], textimages: []},
        "en": {title: "", description: "", htmlFile: 0, pdfFile: 0, infoFile: 0, videos: [], textimages: []},
        "ar": {title: "", description: "", htmlFile: 0, pdfFile: 0, infoFile: 0, videos: [], textimages: []},
        "he": {title: "", description: "", htmlFile: 0, pdfFile: 0, infoFile: 0, videos: [], textimages: []}
      }
    };

    if (defaultDynoMaster?.slug) dynoTemp.slug = defaultDynoMaster.slug;
    if (defaultDynoMaster?.image) dynoTemp.image = defaultDynoMaster.image.id;
    if (defaultDynoMaster?.videos) dynoTemp.videos = defaultDynoMaster.videos.map(v => v.id);
    if (defaultDynoMaster?.imageHint) dynoTemp.imageHint = defaultDynoMaster.imageHint;
    if (defaultDynoMaster?.images) dynoTemp.images = defaultDynoMaster.images.map(i => i.id);
    if (defaultDynoMaster?.categories) dynoTemp.categories = defaultDynoMaster.categories.map(c => c.id);
    if (defaultDynoMaster?.dynographs) dynoTemp.dynographs = Object.fromEntries(
      Object.entries(defaultDynoMaster.dynographs).map(([langCode, dynograph]) => {
        const dynoChildTemp: DynoChildDtoIn = {
          title: "",
          description: "",
          videos: [],
          htmlFile: null,
          pdfFile: null,
          infoFile: null,
          textimages: []
        };
        if (dynograph?.title) dynoChildTemp.title = dynograph.title;
        if (dynograph?.description) dynoChildTemp.description = dynograph.description;
        if (dynograph?.videos) dynoChildTemp.videos = dynograph.videos.map(v => v.id);
        if (dynograph?.htmlFile) dynoChildTemp.htmlFile = dynograph.htmlFile.id;
        if (dynograph?.pdfFile) dynoChildTemp.pdfFile = dynograph.pdfFile.id;
        if (dynograph?.infoFile) dynoChildTemp.infoFile = dynograph.infoFile.id;
        if (dynograph?.textimages) dynoChildTemp.textimages = dynograph.textimages.map(i => i.id);
        return [langCode, dynoChildTemp]
      })
    ) as Record<Language, DynoChildDtoIn>

    setDynoMaster(dynoTemp)
  }, [])

  const changeHandler = (d: DynoMasterDtoIn) => {
    setDynoMaster(d);
    onChange(d);
  }
  
  return (
    <div className={`fixed w-screen h-screen top-0 start-0 z-50`}>
      <div className={`relative w-full h-full flex flex-col bg-gray-900/60 p-6`}>
        <div className="absolute inset-0 start-1/2 translate-x-1/2 md:m-6 w-full p-6 md:p-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl overflow-hidden flex items-center justify-center">
          <div className={`h-full w-full space-y-4 p-6 bg-muted rounded-2xl overflow-hidden overflow-y-auto shadow-lg shadow-black`}>
            {/* <div className="w-full flex justify-start items-center gap-3">
              <MultiLangInput title="اسلاگ" text={dynoMaster?.slug} onChange={(e) => {changeHandler({...dynoMaster, slug: e})}} className="felx-grow border rounded-md border-muted p-1" />
              <p>در صورت خالی گذاشتن اسلاگ به صورت اتومات ساخته می شود</p>
            </div> */}
            <div className="flex justify-start items-center gap-4 py-4">
              <Label>دسته موضوعی:</Label>
              <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>
                  <Button>انتخاب دسته</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.length > 0 && categories.map((category, index) => (
                    <DropdownMenuItem dir='rtl' onClick={() => changeHandler({...dynoMaster, categories: [category.id]})} key={index} className={`flex justify-start items-center gap-2 ${selectedLang.font}`}>
                      <Image src={category.image.file_url} alt={category.href} width={20} height={20} />
                      {category.title['fa']}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {categories.length > 0 && dynoMaster?.categories && <p>{categories.filter(c => c.id === dynoMaster?.categories[0])[0]?.title['fa']}</p>}
            </div>
            <FileUploadComponent
              dataType="cover"
              multiple={false}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود کاور"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => {
                setDynoMaster(prevState => {
                  const newState = {
                    ...prevState,
                    image: meta.uploadedData?.id
                  };
                  onChange(newState);
                  return newState;
                });
              }}
            />
            {dynoMaster.image && <div className="w-full flex justify-center items-center gap-3 border h-16 bg-gray-900/50 relative p-1">
            <div className="h-full relative w-20 border">
              <Image alt={defaultDynoMaster.image.id.toString()} src={defaultDynoMaster.image.file_url} fill style={{ objectFit: "cover" }}></Image>
              <Button variant='ghost' className='absolute top-2 end-2 w-4 h-4'><X/></Button>
            </div>
            </div>}
            <FileUploadComponent
              dataType="video"
              multiple={true}
              processDocument={false}
              maxSize={10}
              accept="video/*"
              title="آپلود ویدئوهای عمومی"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => {
                setDynoMaster(prevState => {
                  const newState = {
                    ...prevState,
                    videos: [...(prevState?.videos || []), meta.uploadedData?.id]
                  };
                  onChange(newState);
                  return newState;
                });
              }}
            />
            <FileUploadComponent
              dataType="image"
              multiple={true}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود تصاویر عمومی"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => {
                setDynoMaster(prevState => {
                  const newState = {
                    ...prevState,
                    images: [...(prevState?.images || []), meta.uploadedData?.id]
                  };
                  onChange(newState);
                  return newState;
                });
              }}
            />
            <div className="grid md:grid-cols-4 gap-3">
              {languages.map(language => 
                <div className="border border-gray-500 p-1 rounded-lg space-y-3">
                  <h3 className={`w-full border bg-opacity-40 p-1 rounded-lg text-center ${language.lang === 'fa' ? 'bg-green-500' : 
                                    language.lang === 'en' ? 'bg-blue-500' : 
                                    language.lang === 'ar' ? 'bg-orange-500' :
                                    language.lang === 'he' ? 'bg-purple-500' :
                                    'bg-gray-500'
                                  }`}>{language.name}</h3>
                  <MultiLangInput title="عنوان" text={dynoMaster?.dynographs[language.lang].title} onChange={(e) => {changeHandler({...dynoMaster, dynographs: {...dynoMaster?.dynographs, [language.lang]: {...dynoMaster?.dynographs[language.lang], title: e}}})}} className="border rounded-md border-muted p-1" />
                  <MultiLangInput title="توضیحات" text={dynoMaster?.dynographs[language.lang].description} onChange={(e) => {changeHandler({...dynoMaster, dynographs: {...dynoMaster?.dynographs, [language.lang]: {...dynoMaster?.dynographs[language.lang], description: e}}})}} className="border rounded-md border-muted p-1" />
                  <FileUploadComponent
                    dataType="pdf"
                    multiple={false}
                    processDocument={true}
                    maxSize={10}
                    accept=".pdf"
                    title="آپلود پی دی اف"
                    onError={(error) => console.log('Error:', error)}
                    onUploadComplete={(meta) => {
                      setDynoMaster(prevState => {
                        const newState = {
                          ...prevState,
                          dynographs: {...prevState?.dynographs, [language.lang]: {...prevState?.dynographs[language.lang], pdfFile: meta.uploadedData?.id}}
                        };
                        onChange(newState);
                        return newState;
                      });
                    }}
                  />
                  <FileUploadComponent
                    dataType="html"
                    multiple={false}
                    processDocument={true}
                    maxSize={10}
                    accept=".html"
                    title="آپلود HTML"
                    onError={(error) => console.log('Error:', error)}
                    onUploadComplete={(meta) => {
                      setDynoMaster(prevState => {
                        const newState = {
                          ...prevState,
                          dynographs: {...prevState?.dynographs, [language.lang]: {...prevState?.dynographs[language.lang], htmlFile: meta.uploadedData?.id}}
                        };
                        onChange(newState);
                        return newState;
                      });
                    }}
                  />
                  <FileUploadComponent
                    dataType="info"
                    multiple={false}
                    processDocument={false}
                    maxSize={10}
                    accept="image/*"
                    title="آپلود اینفو"
                    onError={(error) => console.log('Error:', error)}
                    onUploadComplete={(meta) => {
                      setDynoMaster(prevState => {
                        const newState = {
                          ...prevState,
                          dynographs: {...prevState?.dynographs, [language.lang]: {...prevState?.dynographs[language.lang], infoFile: meta.uploadedData?.id}}
                        };
                        onChange(newState);
                        return newState;
                      });
                    }}
                  />
                  <FileUploadComponent
                    dataType="textimage"
                    multiple={true}
                    processDocument={false}
                    maxSize={10}
                    accept="image/*"
                    title="آپلود تصویرنوشته"
                    onError={(error) => console.log('Error:', error)}
                    onUploadComplete={(meta) => {
                      setDynoMaster(prevState => {
                        const newState = {
                          ...prevState,
                          dynographs: {...prevState?.dynographs, [language.lang]: {...prevState?.dynographs[language.lang], textimages: [...prevState?.dynographs[language.lang].textimages, meta.uploadedData?.id]}}
                        };
                        onChange(newState);
                        return newState;
                      });
                    }}
                  />
                  <FileUploadComponent
                    dataType="video"
                    multiple={true}
                    processDocument={false}
                    maxSize={10}
                    accept="video/*"
                    title="آپلود ویدئوها"
                    onError={(error) => console.log('Error:', error)}
                    onUploadComplete={(meta) => {
                      setDynoMaster(prevState => {
                        const newState = {
                          ...prevState,
                          dynographs: {...prevState?.dynographs, [language.lang]: {...prevState?.dynographs[language.lang], videos: [...prevState?.dynographs[language.lang].videos, meta.uploadedData?.id]}}
                        };
                        onChange(newState);
                        return newState;
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="w-full flex justify-end items-center gap-6">
              <Button variant='destructive' size='lg' disabled={loading} onClick={onClose}>بستن</Button>
              <Button variant='default' size='lg' disabled={loading} onClick={() => {onSubmit(dynoMaster)}}><Loader2 className={`animate-spin repeat-infinite ${!loading && "hidden"}`}/><span>ذخیره</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MultiLangInputprops {
  text: string;
  id?: string;
  title?: string;
  className?: string;
  onChange: (e: string) => void;
}

export const MultiLangInput = ({id, text, title, onChange, className}: MultiLangInputprops) => {
  return (
    <div id={id} className={`w-full flex justify-start items-center flex-wrap gap-4 ${className}`}>
      <div className="w-56">
        <Label htmlFor='fa'>{title}:</Label>
        <Input id='fa' value={text} onChange={(e) => onChange(e.target.value)}/>
      </div>
    </div>
  )
}

