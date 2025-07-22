"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2, FileText, Video, Image as ImageIcon, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { type Language, type Dyno, type DynoCategory, SearchTotalFiles, SearchResponse, DynoMasterDtoOut, DynoChildDtoOut, mapResMasterToDynoMasterDtoOut } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../lib/language-context";
import { apiGetDynoCategories, apiSearch } from "../../lib/api";

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
    he: 'לא נמצאו تוצאות.',
  },
  searchResults: {
    en: 'results found',
    fa: 'نتیجه یافت شد',
    ar: 'نتيجة وجدت',
    he: 'תוצאות נמצאו',
  },
  categories: {
    en: 'Categories',
    fa: 'دسته‌بندی‌ها',
    ar: 'الفئات',
    he: 'קטגוריות',
  },
  files: {
    en: 'files',
    fa: 'فایل',
    ar: 'ملفات',
    he: 'קבצים',
  },
  viewAll: {
    en: 'View all results for',
    fa: 'نمایش همه نتایج برای',
    ar: 'عرض كل النتائج لـ',
    he: 'הצג את כל התוצאות עבור',
  },
  showMoreResults: {
    en: 'Show more results',
    fa: 'مشاهده نتایج بیشتر',
    ar: 'عرض المزيد من النتائج',
    he: 'הצג תוצאות נוספות',
  },
};

type SearchComponentProps = {
  lang: Language;
  isExpanded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
  className?: string;
};

export function SearchComponent({ lang, isExpanded, onExpandedChange, className }: SearchComponentProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<Set<number>>(new Set());
  const [isInputFocused, setInputFocused] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<DynoCategory[]>([]);
    
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  
  const { language, selectedLang } = useLanguage();

  // Navigate to search page
  const navigateToSearchPage = React.useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const params = new URLSearchParams();
    params.set('q', searchQuery.trim());
    
    if (lang !== 'en') {
      params.set('lang', lang);
    }
    
    const searchUrl = `/search?${params.toString()}`;
    router.push(searchUrl);
    
    // Close the search dropdown
    onExpandedChange(false);
    setInputFocused(false);
  }, [router, lang, onExpandedChange]);

  // Handle Enter key press
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigateToSearchPage(query);
    }
  }, [query, navigateToSearchPage]);

  // Debounced search function
  const performSearch = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results: any = await apiSearch(searchQuery).json();
      setSearchResults({...results, masters: results.masters.map((m: any) => mapResMasterToDynoMasterDtoOut(m))});
    } catch (err) {
      setError('Search failed. Please try again.');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle query changes with debouncing
  React.useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, performSearch]);

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

  const getCategories = async () => {
    try {
      const categoryResult = await apiGetDynoCategories()
      const categoriesResponse: any = await categoryResult.json();
      const categoriesData = categoriesResponse.categories.map((c: any) => ({...c, image: c.image_file, imageHint: c.image_hint}));
      setCategories(categoriesData);
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
    }
  };

  React.useEffect(() => {
    getCategories();
  }, [])

  // Filter results by selected categories
  const filteredResults = React.useMemo(() => {
    if (!searchResults) return [];
    
    if (selectedCategories.size === 0) {
      return searchResults.masters;
    }
    
    return searchResults.masters.filter(master => 
      master.categories.some(category => selectedCategories.has(category.id))
    );
  }, [searchResults, selectedCategories]);

  const handleCategoryToggle = (categoryId: number) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedCategories(newSelection);
  };

  const createHref = (master: DynoMasterDtoOut) => {
    const langQuery = lang === 'en' ? '' : `?lang=${lang}`;
    return `/${master.categories[0].href}/${master.slug}${langQuery}`;
  };

  const getFileTypeIcon = (total: SearchTotalFiles, topScorer) => {
    return <div className="flex items-center gap-3 text-xs text-muted-foreground group-hover:text-teal-900 ml-auto">
      <div className={cn("flex justify-center items-center gap-1", topScorer === "html" && "text-sky-500 font-bold")}>
        <FileCode className="h-4 w-4" /><p>{total.htmlFile}</p>
      </div>
      <div className={cn("flex justify-center items-center gap-1", topScorer === "pdf" && "text-sky-500 font-bold")}>
        <FileText className="h-4 w-4" /><p>{total.pdfFile}</p>
      </div>
      {total.imageFiles > 0 && <div className="flex justify-center items-center gap-1">
        <ImageIcon className="h-4 w-4" /><p>{total.imageFiles}</p>
      </div>}
      {total.videoFiles > 0 && <div className="flex justify-center items-center gap-1">
        <Video className="h-4 w-4" /><p>{total.videoFiles}</p>
      </div>}
    </div>;
  };

  const getTotalFiles = (dynograph: DynoChildDtoOut, master: DynoMasterDtoOut) => {
    return {
      htmlFile: dynograph.htmlFile ? 1 : 0,
      pdfFile: dynograph.pdfFile ? 1 : 0,
      imageFiles: dynograph.textimages.length + master.images.length,
      videoFiles: dynograph.videos.length + master.videos.length
    };
  };
  
  const showResults = isExpanded && (query.trim().length > 0 || searchResults);
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
          onKeyDown={handleKeyDown}
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
          className="absolute end-0 top-0 h-10 w-10 shrink-0"
          onClick={() => {
            if (isExpanded && query.trim()) {
              navigateToSearchPage(query);
            } else {
              onExpandedChange(!isExpanded);
            }
          }}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 w-full origin-top-right z-20 min-w-[400px]",
          "transition-all duration-300 ease-in-out",
          showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-2.5 rounded-md border bg-background p-3 shadow-lg mb-2">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              {translations.categories[lang]}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center gap-1.5">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.has(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`} 
                    className="text-xs font-normal cursor-pointer whitespace-nowrap"
                  >
                    {category.title[lang]}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="rounded-md border bg-popover text-popover-foreground shadow-lg">
            {/* "View All Results" button */}
            {query.trim().length >= 3 && (
              <div className="px-4 py-2 border-b bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs h-8 px-2"
                  onClick={() => navigateToSearchPage(query)}
                >
                  <Search className="h-3 w-3 mr-2" />
                  {translations.viewAll[language]} "{query}"
                </Button>
              </div>
            )}
            
            {error ? (
              <div className="p-4 text-center text-sm text-destructive">{error}</div>
            ) : filteredResults.length === 0 && !isLoading ? (
              <p className="p-4 text-center text-sm">{translations.noResults[lang]}</p>
            ) : (
              <>
                {searchResults && (
                  <div className="px-4 py-2 border-b bg-muted/50 text-xs text-muted-foreground">
                    {searchResults.count} {translations.searchResults[lang]}
                  </div>
                )}
                <ul className="max-h-[50vh] overflow-y-auto">
                  {filteredResults.slice(0, 5).map(master => {
                    const mainDynograph = master.dynographs[language];
                    const totalFiles: SearchTotalFiles = mainDynograph ? getTotalFiles(mainDynograph, master) : {htmlFile: 0, pdfFile: 0, imageFiles: 0, videoFiles: 0};
                    
                    return (
                      <li key={master.id} className="border-b last:border-b-0 group">
                        <Link
                          href={createHref(master)}
                          target="_blank"
                          className="block w-full p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                          onClick={() => {
                            setQuery("");
                            setInputFocused(false);
                            onExpandedChange(false);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Thumbnail */}
                            {master.image && (
                              <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-muted">
                                <img
                                  src={master.image.file_url}
                                  alt={master.imageHint}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              {/* Title and Description */}
                              <div className="flex flex-col gap-1">
                                <h3 className={cn("font-medium text-sm line-clamp-1", mainDynograph.topScorer === "title" && "text-sky-500 font-bold")}>
                                  {mainDynograph?.title || master.slug}
                                  {/* {master.topScorer || 'title'} */}
                                </h3>
                                {mainDynograph?.description && (
                                  <p className={cn("text-xs text-muted-foreground group-hover:text-gray-700 line-clamp-2", mainDynograph.topScorer === "description" && "text-sky-500 font-bold")}>
                                    {mainDynograph.description}
                                  </p>
                                )}
                              </div>
                              
                              {/* Meta Information */}
                              <div className="flex items-center gap-2 mt-2">
                                {/* Categories */}
                                <div className="flex gap-1">
                                  {master.categories.slice(0, 2).map(category => (
                                    <Badge 
                                      key={category.id} 
                                      variant="secondary" 
                                      className="text-xs px-1.5 py-0.5"
                                    >
                                      {category.title[lang]}
                                    </Badge>
                                  ))}
                                  {master.categories.length > 2 && (
                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                      +{master.categories.length - 2}
                                    </Badge>
                                  )}
                                </div>
                                
                                {/* File Info */}
                                {mainDynograph && (
                                  getFileTypeIcon(totalFiles, mainDynograph.topScorer)
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {(searchResults?.count > filteredResults.length) && (filteredResults.length > 0) && <div className="w-full p-1 text-xs flex justify-center items-center">
              <Button variant="link" className="text-accent" onClick={() => navigateToSearchPage(query)}>
                {translations.showMoreResults[language]}
              </Button>
            </div>}
          </div>
        )}
      </div>
    </div>
  );
}