'use client';
import React, { useState } from 'react'
import FileUploadComponent from '../../../components/fourfold/uploader'
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { DynoCategory, DynoDtoIn, Language } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import Image from "next/image";
import { useLanguage } from '../../../lib/language-context';

export const NewDynographModal = ({className, onClose, onSubmit, categories}:{className?: string, onClose: () => void, onSubmit: (d: DynoDtoIn) => void, categories: DynoCategory[]}) => {
  const [dyno, setDyno] = useState<DynoDtoIn>({slug: "", title: {fa: null, ar: null, en: null, he: null}, description: {fa: null, ar: null, en: null, he: null}, image: null, imageHint: null, pdfFile: null, htmlFile: null, infoFile: null, images:[], textimages: [], videos: [], categories: [] })
  const {selectedLang} = useLanguage();
  return (
    <div className={className}>
      <Label htmlFor='title'>عنوان</Label>
      <MultiLangInput id='title' text={dyno?.title} onChange={(e) => {setDyno({...dyno, title: e})}} className="border rounded-md border-muted p-1" />
      <Label htmlFor='description'>توضیحات</Label>
      <MultiLangInput id='description' text={dyno?.description} onChange={(e) => {setDyno({...dyno, description: e})}} className="border rounded-md border-muted p-1" />
      <div className="flex justify-start items-center gap-4 py-4">
        <Label>دسته موضوعی:</Label>
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <Button>انتخاب دسته</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.length > 0 && categories.map((category, index) => (
              <DropdownMenuItem dir='rtl' onClick={() => setDyno({...dyno, categories: [category.id]})} key={index} className={`flex justify-start items-center gap-2 ${selectedLang.font}`}>
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
        uploadedId={dyno?.pdfFile}
        accept="*.pdf"
        title="آپلود پی دی اف"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, pdfFile: meta.uploadedData?.id})}
      />
      <p>{dyno?.pdfFile}</p>
      <FileUploadComponent
        dataType="html"
        multiple={false}
        processDocument={true}
        maxSize={10}
        accept="*.html"
        title="آپلود HTML اینفو"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, htmlFile: meta.uploadedData?.id})}
      />
      <p>{dyno?.htmlFile}</p>
      <FileUploadComponent
        dataType="info"
        multiple={false}
        processDocument={true}
        maxSize={10}
        accept="image/*"
        title="آپلود تصویر اینفو"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, infoFile: meta.uploadedData?.id})}
      />
      <p>{dyno?.infoFile}</p>
      <FileUploadComponent
        dataType="cover"
        multiple={false}
        processDocument={false}
        maxSize={10}
        accept="image/*"
        title="آپلود کاور"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, image: meta.uploadedData?.id})}
      />
      <p>{dyno?.image}</p>
      <FileUploadComponent
        dataType="image"
        multiple={true}
        processDocument={false}
        maxSize={10}
        accept="image/*"
        title="آپلود تصاویر"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, images: [...dyno.images, meta.uploadedData?.id]})}
      />
      <FileUploadComponent
        dataType="textimage"
        multiple={true}
        processDocument={false}
        maxSize={10}
        accept="image/*"
        title="آپلود تصویر نوشته‌ها"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, textimages: [...dyno.textimages, meta.uploadedData?.id]})}
      />
      <FileUploadComponent
        dataType="video"
        multiple={true}
        processDocument={false}
        maxSize={50}
        accept="video/*"
        title="آپلود ویدئو"
        onError={(error) => console.log('Error:', error)}
        onUploadComplete={(meta) => setDyno({...dyno, videos: [...dyno.videos, meta.uploadedData?.id]})}
      />
      <div className="w-full flex justify-end items-center gap-6">
        <Button variant='destructive' size='lg' onClick={onClose}>بستن</Button>
        <Button variant='default' size='lg' onClick={() => onSubmit(dyno)}>ذخیره</Button>
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
        <Input id='fa' onChange={(e) => onChange({...text, fa: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='en'>انگلیسی:</Label>
        <Input id='en' onChange={(e) => onChange({...text, en: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='ar'>عربی:</Label>
        <Input id='ar' onChange={(e) => onChange({...text, ar: e.target.value})}/>
      </div>
      <div className="w-56">
        <Label htmlFor='he'>عبری:</Label>
        <Input id='he' onChange={(e) => onChange({...text, he: e.target.value})}/>
      </div>
    </div>
  )
}

