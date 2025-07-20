'use client';
import React, { useEffect, useState } from 'react'
import FileUploadComponent from '../../../components/fourfold/uploader'
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { DynoCategory, DynoChildDtoOut, DynoMasterDtoOut, Language, languages } from '../../../lib/content-types';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import Image from "next/image";
import { useLanguage } from '../../../lib/language-context';
import { Loader2, X, Text } from 'lucide-react';
import { title } from 'process';

export const NewCategoryModal = ({defaultCategory, loading, onClose, onSubmit}:{className?: string, defaultCategory: DynoCategory, loading: boolean; onClose: () => void, onSubmit: (d: DynoCategory) => void}) => {
  const [dynoCategory, setDynoCategory] = useState<DynoCategory>()
  useEffect(() => {
    setDynoCategory(defaultCategory)
  }, [])

  return (
    <div className={`fixed w-screen h-screen top-0 start-0 z-50`}>
      <div className={`relative w-full h-full flex flex-col bg-gray-900/60 p-6`}>
        <div className="absolute inset-0 start-1/2 translate-x-1/2 md:m-6 w-full p-6 md:p-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl overflow-hidden flex items-center justify-center">
          <div className={`h-full w-full space-y-4 p-6 bg-muted rounded-2xl overflow-hidden overflow-y-auto shadow-lg shadow-black`}>
            <FileUploadComponent
              dataType="cover"
              multiple={false}
              processDocument={false}
              maxSize={10}
              accept="image/*"
              title="آپلود کاور"
              onError={(error) => console.log('Error:', error)}
              onUploadComplete={(meta) => {
                setDynoCategory(prevState => {
                  const newState = {
                    ...prevState,
                    image: {id: meta.uploadedData?.id, file_url: meta.uploadedData?.file_url}
                  };
                  return newState;
                });
              }}
              >
              {(dynoCategory?.image)?(<div className="w-full flex flex-wrap justify-center items-center gap-3 border h-16 overflow-y-auto bg-gray-900/50 relative p-1">
                <div className="h-full relative w-20 border">
                  <Image alt={dynoCategory.image.id.toString()} src={dynoCategory.image.file_url} fill style={{ objectFit: "cover" }}></Image>
                  <Button onClick={() => setDynoCategory(prev => ({...prev, image: null}))} variant='ghost' className='absolute top-2 end-2 w-4 h-4'><X/></Button>
                </div>
              </div>):null}
            </FileUploadComponent>
            <div className="flex justify-start items-center gap-4">
              <p>اولویت:</p>
              <Input onChange={(e) => setDynoCategory(prev => ({...prev, order: +e.target.value}))}
              value={dynoCategory?.order}
              type='number'
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                ];
                if (
                  !/[0-9]/.test(e.key) &&
                  !allowedKeys.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}/>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
              {languages.map((language, index) => 
                <div key={index} className="border border-gray-500 p-1 rounded-lg space-y-3">
                  <h3 className={`w-full border bg-opacity-40 p-1 rounded-lg text-center ${language.lang === 'fa' ? 'bg-green-500' : 
                                    language.lang === 'en' ? 'bg-blue-500' : 
                                    language.lang === 'ar' ? 'bg-orange-500' :
                                    language.lang === 'he' ? 'bg-purple-500' :
                                    'bg-gray-500'
                                  }`}>{language.name}</h3>
                  <MultiLangInput title="عنوان" text={dynoCategory?.title[language.lang]} onChange={(e) => {setDynoCategory({...dynoCategory, title: {...dynoCategory?.title, [language.lang]: e}})}} className="border rounded-md border-muted p-1" />
                  <MultiLangInput title="توضیحات" text={dynoCategory?.description[language.lang]} onChange={(e) => {setDynoCategory({...dynoCategory, description: {...dynoCategory?.description, [language.lang]: e}})}} className="border rounded-md border-muted p-1" />
                </div>
              )}
            </div>
            <div className="w-full flex justify-end items-center gap-6">
              <Button variant='destructive' size='lg' disabled={loading} onClick={onClose}>بستن</Button>
              <Button variant='default' size='lg' disabled={loading} onClick={() => {onSubmit(dynoCategory)}}><Loader2 className={`animate-spin repeat-infinite ${!loading && "hidden"}`}/><span>ذخیره</span></Button>
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

