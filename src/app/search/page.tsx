"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Loader2, FileText, Video, Image as ImageIcon, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { type Language, type Dyno, type DynoCategory, SearchTotalFiles, DynoMasterDtoOut, DynoChildDtoOut, SearchResponse, mapResMasterToDynoMasterDtoOut } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../lib/language-context";
import { apiGetDynoCategories, apiSearch } from "../../lib/api";

// API Response Types

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
  showMoreResults: {
    en: 'Show more results',
    fa: 'مشاهده نتایج بیشتر',
    ar: 'عرض المزيد من النتائج',
    he: 'הצג תוצאות נוספות',
  },
};

type SearchComponentProps = {
  searchContent?: string;
  className?: string;
};

export default function SearchComponent({ searchContent, className }: SearchComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize query from URL parameters
  const initialQuery = searchParams.get('q') || searchContent || '';
  
  const [query, setQuery] = React.useState(initialQuery);
  const [searchResults, setSearchResults] = React.useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<Set<number>>(new Set());
  const [isInputFocused, setInputFocused] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<DynoCategory[]>([]);
  const [limit, setLimit] = React.useState<number>(10);
  const [offset, setOffset] = React.useState<number>(0);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const containerResultsRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout>();
  
  const { language, selectedLang } = useLanguage();

  // Function to update URL with search query
  const updateUrlQuery = React.useCallback((searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, searchParams, router]);

  // Debounced search function
  const performSearch = React.useCallback(async (searchQuery: string, li = limit, off = offset) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results: any = await apiSearch(searchQuery, li, off).json();
      setSearchResults({...results, masters: results.masters.map((m: any) => mapResMasterToDynoMasterDtoOut(m))});
    } catch (err) {
      setError('Search failed. Please try again.');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle query changes with debouncing and URL update
  React.useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      updateUrlQuery(query);
      performSearch(query);
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, performSearch, updateUrlQuery]);

  // Perform initial search if query exists in URL
  React.useEffect(() => {
    if (initialQuery && initialQuery.length >= 3) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  React.useEffect(() => {
    getCategories();
  }, []);

  // Listen for URL changes (back/forward navigation)
  React.useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

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

  // Get all unique categories from search results
  // const allCategories = React.useMemo(() => {
  //   if (!searchResults) return [];
  //   const categoryMap = new Map<number, Category>();
    
  //   searchResults.masters.forEach(master => {
  //     master.categories.forEach(category => {
  //       categoryMap.set(category.id, category);
  //     });
  //   });
    
  //   return Array.from(categoryMap.values()).sort((a, b) => a.order - b.order);
  // }, [searchResults]);

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
    const langQuery = language === 'en' ? '' : `?lang=${language}`;
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

  React.useEffect(() => {
    if (isLoading && containerResultsRef.current) {
      containerResultsRef.current.scrollTo({
        top: containerResultsRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [isLoading]);

  return (
    <div 
      dir={selectedLang.dir}
      ref={containerRef} 
      className={cn(
        "flex flex-col h-[calc(100vh-80px)] items-center transition-all duration-300 ease-in-out container max-w-7xl mx-auto pt-4",
        className
      )}
    >
      {/* Fixed Search Header */}
      <div className="w-full mb-4">
        <div className="relative flex h-12 items-center justify-end rounded-md border transition-all duration-300 ease-in-out w-full border-input bg-background">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={translations.searchPlaceholder[language]}
            className={cn(
              "h-full bg-transparent pe-12 text-base ring-offset-background transition-all duration-300 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm",
              "w-full opacity-100 pl-4"
            )}
            onFocus={() => {
              setInputFocused(true);
            }}
            onBlur={() => setInputFocused(false)}
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Toggle Search"
            className="absolute end-0 top-0 h-12 w-12 shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Category Filters - Fixed below search */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-2.5 rounded-md border bg-background p-3 shadow-sm mt-2">
            <div className="text-sm font-medium text-muted-foreground">
              {translations.categories[language]}
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
                    {category.title[language]}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Search Results */}
      <div className="flex-1 w-full rounded-md border bg-popover text-popover-foreground shadow-sm overflow-hidden flex flex-col">
        {error ? (
          <div className="p-4 text-center text-sm text-destructive">{error}</div>
        ) : filteredResults.length === 0 && !isLoading && query.length >= 3 ? (
          <p className="p-4 text-center text-sm">{translations.noResults[language]}</p>
        ) : query.length < 3 && !isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {translations.searchPlaceholder[language]}
          </div>
        ) : (
          <>
            {searchResults && (
              <div className="px-4 py-3 border-b bg-muted/50 text-xs text-muted-foreground sticky top-0 z-10">
                {searchResults.count} {translations.searchResults[language]}
              </div>
            )}
            <div ref={containerResultsRef} className="flex-1 overflow-y-auto">
              <ul>
                {filteredResults.map(master => {
                  const mainDynograph = master.dynographs[language];
                  const totalFiles: SearchTotalFiles = mainDynograph ? getTotalFiles(mainDynograph, master) : {htmlFile: 0, pdfFile: 0, imageFiles: 0, videoFiles: 0};
                  
                  return (
                    <li key={master.id} className="border-b last:border-b-0 group">
                      <Link
                        href={createHref(master)}
                        target="_blank"
                        className="block w-full p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setInputFocused(false);
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
                              <h3 className={cn("font-medium text-sm line-clamp-1", master.topScorer === "title" && "text-sky-500 font-bold")}>
                                {mainDynograph?.title || master.slug}
                                {/* {master.topScorer || 'title'} */}
                              </h3>
                              {mainDynograph?.description && (
                                <p className={cn("text-xs text-muted-foreground group-hover:text-gray-700 line-clamp-2", master.topScorer === "description" && "text-sky-500 font-bold")}>
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
                                    {category.title[language]}
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
                                  getFileTypeIcon(totalFiles, master.topScorer)
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {isLoading && (
                <ul><li className="w-full flex justify-center items-center border-b last:border-b-0 group"><Loader2 className="h-8 w-8 animate-spin" /></li></ul>
              )}
            </div>
          </>
        )}
        {(searchResults?.count > filteredResults.length) && (filteredResults.length > 0) && <div className="w-full p-1 text-xs flex justify-center items-center">
          <Button variant="link" className="text-accent" onClick={() => {
            setLimit(prev => prev + 10);
            performSearch(query, limit + 10)
            }}>
            {translations.showMoreResults[language]}
          </Button>
        </div>}
      </div>
    </div>
  );
}