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
};

export function SearchComponent({ lang }: SearchComponentProps) {
  const [isExpanded, setExpanded] = React.useState(false);
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
    if (isExpanded) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);
  
  const showResults = isExpanded && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Button variant="ghost" size="icon" aria-label="Search" className="h-9 w-9">
        <Search className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 flex h-12 items-center gap-3 rounded-md border bg-background p-2 shadow-lg origin-right transition-transform duration-300 ease-in-out",
          isExpanded ? "scale-x-100" : "scale-x-0",
          showResults ? "rounded-b-none" : ""
        )}
        style={{ width: '550px' }}
      >
        <div className="relative flex-grow">
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
        <div className="flex items-center gap-2 pr-2 shrink-0">
          {sections.map(section => (
            <div key={section.id} className="flex items-center space-x-1.5">
              <Checkbox
                id={`filter-inline-${section.id}`}
                checked={selectedSections.has(section.id)}
                onCheckedChange={() => handleSectionToggle(section.id)}
              />
              <Label htmlFor={`filter-inline-${section.id}`} className="text-xs font-normal cursor-pointer whitespace-nowrap">
                {section.title[lang]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {showResults && (
        <div className="absolute top-[calc(50%+1.5rem)] w-[550px] right-0 z-20">
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
                        setExpanded(false);
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
