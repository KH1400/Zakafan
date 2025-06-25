
"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = React.useState("288px");

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

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      // p-3 is 0.75rem. 2 * 0.75rem = 1.5rem. Assuming 1rem = 16px, padding is 24px.
      const width = contentRef.current.scrollWidth + 24;
      // Set a max width to prevent it from becoming too large on desktop
      const maxWidth = 384; // w-96
      setDynamicWidth(`${Math.min(width, maxWidth)}px`);
    }
  }, [lang]);
  
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
  
  const showResults = isExpanded && query.trim().length > 0;
  const showDropdown = isExpanded;

  return (
    <div ref={containerRef} className="relative">
       <div
        className="relative flex h-10 items-center justify-end rounded-md border transition-all duration-300 ease-in-out"
        style={{
          width: isExpanded ? dynamicWidth : '40px',
          borderColor: isExpanded ? 'hsl(var(--input))' : 'transparent',
          backgroundColor: isExpanded ? 'hsl(var(--background))' : 'transparent',
        }}
      >
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={translations.searchPlaceholder[lang]}
          className={cn(
            "h-full bg-transparent pe-10 text-base ring-offset-background transition-all duration-300 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm",
            isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
          )}
          onFocus={() => onExpandedChange(true)}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Toggle Search"
          className="absolute right-0 top-0 h-10 w-10 shrink-0"
          onClick={() => onExpandedChange(!isExpanded)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 origin-top-right z-20",
          "transition-all duration-300 ease-in-out",
          showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ width: dynamicWidth }}
      >
        <div
          className={cn(
            "flex flex-col gap-2.5 rounded-md border bg-background p-3 shadow-lg",
            showResults ? "rounded-b-none" : ""
          )}
        >
          <div ref={contentRef} className="flex w-full items-center justify-between flex-nowrap">
            {sections.map(section => (
              <div key={section.id} className="flex items-center gap-1.5 whitespace-nowrap">
                <Checkbox
                  id={`filter-inline-${section.id}`}
                  checked={selectedSections.has(section.id)}
                  onCheckedChange={() => handleSectionToggle(section.id)}
                />
                <Label htmlFor={`filter-inline-${section.id}`} className="text-xs font-normal cursor-pointer">
                  {section.title[lang]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {showResults && (
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
        )}
      </div>
    </div>
  );
}
