'use client';
import React, { useState } from 'react'
import FileUploadComponent from '../../../components/fourfold/uploader'
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Dyno, DynoCategory, DynoDtoIn, Language } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import Image from "next/image";
import { useLanguage } from '../../../lib/language-context';
import { Loader2 } from 'lucide-react';

export const NewDynographModal = ({onChange, dyno, loading, onClose, onSubmit, categories}:{className?: string, dyno: DynoDtoIn, loading: boolean; onChange: (d: DynoDtoIn) => void, onClose: () => void, onSubmit: (d: DynoDtoIn) => void, categories: DynoCategory[]}) => {
  const {selectedLang} = useLanguage();
  return (
    <div className={`fixed w-screen h-screen top-0 start-0 z-50`}>
      <div className={`relative w-full h-full flex flex-col bg-gray-900/60 p-6`}>
        <div className="absolute inset-0 start-1/2 translate-x-1/2 md:m-6 w-full p-6 md:p-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl overflow-hidden flex items-center justify-center">
          <div className={`h-full w-full space-y-4 p-6 bg-muted rounded-2xl overflow-hidden overflow-y-auto shadow-lg shadow-black`}>
            <Label htmlFor='title'>عنوان</Label>
            <MultiLangInput id='title' text={dyno?.title} onChange={(e) => {onChange({...dyno, title: e})}} className="border rounded-md border-muted p-1" />
            <Label htmlFor='description'>توضیحات</Label>
            <MultiLangInput id='description' text={dyno?.description} onChange={(e) => {onChange({...dyno, description: e})}} className="border rounded-md border-muted p-1" />
            <div className="flex justify-start items-center gap-4 py-4">
              <Label>دسته موضوعی:</Label>
              <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>
                  <Button>انتخاب دسته</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.length > 0 && categories.map((category, index) => (
                    <DropdownMenuItem dir='rtl' onClick={() => onChange({...dyno, categories: [category.id]})} key={index} className={`flex justify-start items-center gap-2 ${selectedLang.font}`}>
                      <Image src={category.image} alt={category.href} width={20} height={20} />
                      {category.title['fa']}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {categories.length > 0 && dyno?.categories && <p>{categories.filter(c => c.id === dyno?.categories[0])[0]?.title['fa']}</p>}
            </div>
            <FileUploadComponent
              dataType="pdf"
              multiple={false}
              processDocument={true}
              maxSize={10}
              accept=".pdf"
              title="آپلود پی دی اف"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, pdfFile: meta.uploadedData?.id})}
            />
            <FileUploadComponent
              dataType="html"
              multiple={false}
              processDocument={true}
              maxSize={10}
              accept=".html"
              title="آپلود HTML اینفو"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, htmlFile: meta.uploadedData?.id})}
            />
            <FileUploadComponent
              dataType="info"
              multiple={false}
              processDocument={true}
              maxSize={10}
              accept="image/*"
              title="آپلود تصویر اینفو"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, infoFile: meta.uploadedData?.id})}
            />
            <FileUploadComponent
              dataType="cover"
              multiple={false}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود کاور"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, image: meta.uploadedData?.id})}
            />
            <FileUploadComponent
              dataType="image"
              multiple={true}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود تصاویر"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, images: [...dyno.images, meta.uploadedData?.id]})}
            />
            <FileUploadComponent
              dataType="textimage"
              multiple={true}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود تصویر نوشته‌ها"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, textimages: [...dyno.textimages, meta.uploadedData?.id]})}
            />
            <FileUploadComponent
              dataType="video"
              multiple={true}
              processDocument={false}
              maxSize={50}
              accept="video/*"
              title="آپلود ویدئو"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => onChange({...dyno, videos: [...dyno.videos, meta.uploadedData?.id]})}
            />
            <div className="w-full flex justify-end items-center gap-6">
              <Button variant='destructive' size='lg' disabled={loading} onClick={onClose}>بستن</Button>
              <Button variant='default' size='lg' disabled={loading} onClick={() => {onSubmit(dyno)}}><Loader2 className={`animate-spin repeat-infinite ${!loading && "hidden"}`}/><span>ذخیره</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MultiLangInputprops {
  text: Record<Language, string>;
  id?: string;
  className?: string;
  onChange: (e: Record<Language, string>) => void;
}

export const MultiLangInput = ({id, text, onChange, className}: MultiLangInputprops) => {
  return (
    <div id={id} className={`w-full flex justify-start items-center flex-wrap gap-4 ${className}`}>
      <div className="w-56">
        <Label htmlFor='fa'>فارسی:</Label>
        <Input id='fa' value={text['fa']} onChange={(e) => onChange({...text, fa: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='en'>انگلیسی:</Label>
        <Input id='en' value={text['en']} onChange={(e) => onChange({...text, en: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='ar'>عربی:</Label>
        <Input id='ar' value={text['ar']} onChange={(e) => onChange({...text, ar: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='he'>عبری:</Label>
        <Input id='he' value={text['he']} onChange={(e) => onChange({...text, he: e.target.value})}/>
      </div>
    </div>
  )
}

