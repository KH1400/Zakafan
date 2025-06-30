"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type Language, type Dyno, type DynoCategory } from "@/lib/content-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../lib/language-context";


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
  className?: string;
};

export function SearchComponent({ lang, isExpanded, onExpandedChange, className }: SearchComponentProps) {
  const [query, setQuery] = React.useState("");
  const [selectedSections, setSelectedSections] = React.useState<Set<DynoCategory['id']>>(new Set());
  const [isInputFocused, setInputFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {selectedLang} = useLanguage();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onExpandedChange(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onExpandedChange]);

  const filteredContent = React.useMemo(() => {
    if (!query.trim()) return [];
    // return allDynos.filter((item: Dyno) => {
    //   const inSelectedSection = selectedSections.size === 0 || selectedSections.has(item.categories[0].id);
    //   const titleMatches = item.title[lang].toLowerCase().includes(query.toLowerCase());
    //   return inSelectedSection && titleMatches;
    // });
  }, [query, selectedSections, lang]);

  const handleSectionToggle = (categoryId: DynoCategory['id']) => {
    const newSelection = new Set(selectedSections);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedSections(newSelection);
  };

  const createHref = (item: Dyno) => {
    const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
    return `/${item.id}/${item.slug}${langQuery}`;
  }
  
  const showResults = isExpanded && query.trim().length > 0;
  const showDropdown = isExpanded;

  return (
    <div 
        dir={selectedLang.dir}
        ref={containerRef} 
        className={cn(
            "relative flex items-center justify-end transition-all duration-300 ease-in-out",
            isExpanded ? "flex-1" : "flex-none",
            className
        )}
        onMouseEnter={() => onExpandedChange(true)}
        onMouseLeave={() => !query.trim() && !isInputFocused && onExpandedChange(false)}
    >
       <div
        className={cn(
            "relative flex h-10 items-center justify-end rounded-md border transition-all duration-300 ease-in-out",
            isExpanded ? "w-full border-input bg-background" : "w-10 border-transparent bg-transparent"
        )}
      >
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={translations.searchPlaceholder[lang]}
          className={cn(
            "h-full bg-transparent pe-10 text-base ring-offset-background transition-all duration-300 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm",
            isExpanded ? "w-full opacity-100 pl-3" : "w-0 opacity-0 p-0"
          )}
          onFocus={() => {
            setInputFocused(true);
            onExpandedChange(true);
          }}
          onBlur={() => setInputFocused(false)}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Toggle Search"
          className={`absolute end-0 top-0 h-10 w-10 shrink-0`}
          onClick={() => onExpandedChange(!isExpanded)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 w-full origin-top-right z-20",
          "transition-all duration-300 ease-in-out",
          showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div
            className={cn(
                "flex flex-col gap-2.5 rounded-md border bg-background p-3 shadow-lg",
                showResults ? "rounded-b-none" : ""
            )}
        >
          <div className="flex w-full items-center flex-wrap justify-start gap-x-4 gap-y-2 md:flex-nowrap md:justify-between">
            {/* {dynoCategories.map(dynoCategory => (
              <div key={dynoCategory.id} className="flex items-center gap-1.5 whitespace-nowrap">
                <Checkbox
                  id={`filter-inline-${dynoCategory.id}`}
                  checked={selectedSections.has(dynoCategory.id)}
                  onCheckedChange={() => handleSectionToggle(dynoCategory.id)}
                />
                <Label htmlFor={`filter-inline-${dynoCategory.id}`} className="text-xs font-normal cursor-pointer">
                  {dynoCategory.title[lang]}
                </Label>
              </div>
            ))} */}
          </div>
        </div>

        {showResults && (
          <div className="rounded-md rounded-t-none border-t-0 border bg-popover text-popover-foreground shadow-lg">
            {/* {filteredContent.length === 0 ? (
              <p className="p-4 text-center text-sm">{translations.noResults[lang]}</p>
            ) : (
              <ul className="max-h-[40vh] overflow-y-auto p-1">
                {filteredContent.map(item => (
                  <li key={`${item.id}-${item.slug}`}>
                    <Link
                      href={createHref(item)}
                      className="block w-full p-2 rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setQuery("");
                        setInputFocused(false);
                        onExpandedChange(false);
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title[lang]}</span>
                        <span className="text-xs text-muted-foreground">
                          {dynoCategories.find(s => s.id === item.categories[0].id)?.title[lang]}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
