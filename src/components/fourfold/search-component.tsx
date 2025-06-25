"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { allContentItems, sections, type Language, type ContentItem, type SectionInfo } from "@/lib/content-data";
import { cn } from "@/lib/utils";


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
};

type SearchComponentProps = {
  lang: Language;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
};

export function SearchComponent({ lang, isExpanded, onExpandedChange }: SearchComponentProps) {
  const [query, setQuery] = React.useState("");
  const [selectedSections, setSelectedSections] = React.useState<Set<SectionInfo['id']>>(new Set());
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onExpandedChange(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [isExpanded, onExpandedChange]);
  
  const showResults = isExpanded && query.trim().length > 0;
  const showFilters = isExpanded;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
    >
      <Button variant="ghost" size="icon" aria-label="Search" className="h-9 w-9" onClick={() => onExpandedChange(!isExpanded)}>
        <Search className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 flex flex-col gap-2.5 rounded-md border bg-background p-3 shadow-lg origin-top-right transition-all duration-300 ease-in-out",
          isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
          showResults ? "rounded-b-none" : ""
        )}
        style={{ width: '550px' }}
      >
        <div className="relative w-full">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={translations.searchPlaceholder[lang]}
            className="h-9 pr-8"
          />
          {query && (
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={() => setQuery('')}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {showFilters && (
           <div className="flex items-center justify-between shrink-0">
             {sections.map(section => (
               <div key={section.id} className="flex items-center space-x-2">
                 <Checkbox
                   id={`filter-inline-${section.id}`}
                   checked={selectedSections.has(section.id)}
                   onCheckedChange={() => handleSectionToggle(section.id)}
                 />
                 <Label htmlFor={`filter-inline-${section.id}`} className="text-[10px] font-normal cursor-pointer">
                   {section.title[lang]}
                 </Label>
               </div>
             ))}
           </div>
        )}
      </div>

      {showResults && (
        <div className="absolute top-[calc(100%+5.5rem)] w-[550px] right-0 z-20">
          <div className="rounded-md rounded-t-none border-t-0 border bg-popover text-popover-foreground shadow-lg">
            {filteredContent.length === 0 ? (
              <p className="p-4 text-center text-sm">{translations.noResults[lang]}</p>
            ) : (
              <ul className="max-h-[40vh] overflow-y-auto p-1">
                {filteredContent.map(item => (
                  <li key={`${item.sectionId}-${item.slug}`}>
                    <Link
                      href={createHref(item)}
                      className="block w-full p-2 rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setQuery("");
                        onExpandedChange(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title[lang]}</span>
                        <span className="text-xs text-muted-foreground">
                          {sections.find(s => s.id === item.sectionId)?.title[lang]}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
