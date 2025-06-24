"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { allContentItems, sections, type Language, type ContentItem, type SectionInfo } from "@/lib/content-data";
import { Command as CommandPrimitive } from "cmdk";


const translations = {
  searchPlaceholder: {
    en: 'Search content...',
    fa: 'جستجوی محتوا...',
    ar: 'بحث في المحتوى...',
    he: 'חיפוש תוכן...',
  },
  noResults: {
    en: 'No results found.',
    fa: 'نتیجه‌ای یافت نشد.',
    ar: 'لم يتم العثور على نتائج.',
    he: 'לא נמצאו תוצאות.',
  },
  filterTitle: {
    en: 'Filter by Section',
    fa: 'فیلتر بر اساس بخش',
    ar: 'تصفية حسب القسم',
    he: 'סנן לפי קטגוריה',
  }
}

type SearchComponentProps = {
  lang: Language;
};

export function SearchComponent({ lang }: SearchComponentProps) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedSections, setSelectedSections] = React.useState<Set<SectionInfo['id']>>(new Set());

  const handleSectionToggle = (sectionId: SectionInfo['id']) => {
    const newSelection = new Set(selectedSections);
    if (newSelection.has(sectionId)) {
      newSelection.delete(sectionId);
    } else {
      newSelection.add(sectionId);
    }
    setSelectedSections(newSelection);
  };

  const filteredContent = React.useMemo(() => {
    if (!query.trim()) return [];
    
    return allContentItems.filter(item => {
      const inSelectedSection = selectedSections.size === 0 || selectedSections.has(item.sectionId);
      const titleMatches = item.title[lang].toLowerCase().includes(query.toLowerCase());
      return inSelectedSection && titleMatches;
    });
  }, [query, selectedSections, lang]);

  const createHref = (item: ContentItem) => {
    const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
    return `/${item.sectionId}/${item.slug}${langQuery}`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search" className="h-9 w-9">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] sm:w-[400px] p-0" align="end">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              value={query}
              onValueChange={setQuery}
              placeholder={translations.searchPlaceholder[lang]}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {query && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuery('')}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </div>
          
          <div className="p-4 border-b">
              <p className="text-sm font-medium mb-3">{translations.filterTitle[lang]}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {sections.map(section => (
                  <div key={section.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${section.id}`}
                      checked={selectedSections.has(section.id)}
                      onCheckedChange={() => handleSectionToggle(section.id)} 
                    />
                    <Label htmlFor={`filter-${section.id}`} className="text-sm font-normal cursor-pointer">
                      {section.title[lang]}
                    </Label>
                  </div>
                ))}
              </div>
          </div>

          <CommandList>
            {query.trim().length > 0 && filteredContent.length === 0 && (
              <CommandEmpty>{translations.noResults[lang]}</CommandEmpty>
            )}
            {filteredContent.length > 0 && (
              <CommandGroup>
                {filteredContent.map(item => (
                  <CommandItem
                    key={`${item.sectionId}-${item.slug}`}
                    value={item.title[lang]}
                    onSelect={() => setOpen(false)}
                    className="p-0"
                  >
                    <Link href={createHref(item)} className="block w-full p-2">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title[lang]}</span>
                        <span className="text-xs text-muted-foreground">
                          {sections.find(s => s.id === item.sectionId)?.title[lang]}
                        </span>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
