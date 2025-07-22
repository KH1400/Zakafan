export type Language = 'fa' | 'en' | 'ar' | 'he';
export type DataType = 'pdf' | 'html' | 'image' | 'textimage' | 'cover' | 'info' | 'video';

export const languages: {lang: Language, name: string}[] = [{lang: 'fa', name: "فارسی"}, {lang: 'en', name: "انگلیسی"}, {lang: 'ar', name: "عربی"}, {lang: 'he', name: "عبری"}];

export type MosaicPanel = {
    title: string;
    image: string;
    imageHint: string;
    gridArea: string;
};

export type DynoDtoIn = {
    slug: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    image: number;
    imageHint: string;
    htmlFile: number,
    pdfFile: number,
    infoFile: number,
    images: number[],
    textimages: number[],
    videos: number[],
    categories: number[],
}

export type Dyno = {
    id: string;
    slug: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    image: string;
    imageHint: string;
    htmlFile: string,
    pdfFile: string,
    infoFile: string,
    images: string[],
    textimages: string[],
    videos: string[],
    summaries: Summary[],
    html: string,
    size: number,
    categories: DynoCategory[],
    createdAt: string,
}

// Dynograph

export type MediaFile = {
    id: number;
    file_url: string;
}

export type Summary = {
    id: number;
    content: string;
    language: string;
    createdAt: string;
}

export type DynoMaster = {
    id: string;
    slug: string;
    image: MediaFile;
    imageHint: string;
    images: MediaFile[];
    categories: DynoCategory[];
    dynoChildId: string;
    title: string;
    description: string;
    htmlFile: MediaFile;
    htmlText: string;
    pdfFile: MediaFile;
    infoFile: MediaFile;
    textimages: MediaFile[];
    videos: MediaFile[];
    summaries: Summary[];
    createdAt: string;
}

export type DynoMasterDtoIn = {
    slug: string;
    dynographs: Record<Language, DynoChildDtoIn>;
    image: number;
    imageHint: string;
    images: number[];
    videos: number[];
    categories: number[];
}

export type DynoChildDtoIn = {
    title: string;
    description: string;
    htmlFile: number;
    pdfFile: number;
    infoFile: number;
    textimages: number[];
    videos: number[];
}

export type DynoMasterDtoOut = {
    id?: string;
    slug: string;
    dynographs: Record<Language, DynoChildDtoOut>;
    image: MediaFile;
    imageHint: string;
    images: MediaFile[];
    videos: MediaFile[];
    categories: DynoCategory[];
}

export type DynoChildDtoOut = {
    id?: string;
    title: string;
    description: string;
    htmlFile: MediaFile;
    pdfFile: MediaFile;
    infoFile: MediaFile;
    textimages: MediaFile[];
    summaries?: Summary[];
    videos: MediaFile[];
    topScorer?: 'title' | 'description' | 'pdf' | 'html'
}

// Category

export type DynoCategory = {
    id?: number;
    title: Record<Language, string>;
    description: Record<Language, string>;
    href: string;
    icon: string,
    image: MediaFile,
    imageHint: string,
    order: number
}

export type MosaicPanelData = {
    id: string;
    title: string;
    slug: string;
    image: MediaFile;
    imageHint: string;
    size: number;
    categories: number[];
    categoryHref: string[];
};

export type SearchTotalFiles = {
    htmlFile: number;
    pdfFile: number;
    imageFiles: number;
    videoFiles: number;
}

export type SearchResponse = {
    count: number;
    page_size: number;
    current_page: number;
    total_pages: number;
    masters: DynoMasterDtoOut[];
}

export function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, '-')        // Replace spaces and underscores with -
        .replace(/[^\w\-]+/g, '')        // Remove all non-word chars (except dash)
        .replace(/\-\-+/g, '-')          // Replace multiple dashes with one
        .replace(/^-+/, '')              // Trim dash from start
        .replace(/-+$/, '');             // Trim dash from end
}

export function mapResDynographToDynoChildDtoOut(item: any): DynoChildDtoOut {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        htmlFile: item.html_file!,
        pdfFile: item.pdf_file!,
        infoFile: item.info_file!,
        textimages: item.input_image_files,
        summaries: item.summaries,
        videos: item.video_files,
        topScorer: item.top_scorer
    };
}

export function mapResMasterToDynoMasterDtoOut(master: any): DynoMasterDtoOut {
  const dynographs = {} as Record<Language, DynoChildDtoOut>;

  for (const lang of languages) {
    const item = master.dynographs[lang.lang];
    if (item) {
      dynographs[lang.lang] = mapResDynographToDynoChildDtoOut(item);
    } else {
      dynographs[lang.lang] = {
        id: '',
        title: '',
        description: '',
        htmlFile: null!,
        pdfFile: null!,
        infoFile: null!,
        textimages: [],
        videos: [],
        summaries: [],
      };
    }
  }

  const categories: DynoCategory[] = master.categories.map(cat => ({
    id: cat.id as number,
    title: cat.title,
    description: cat.description,
    href: cat.href,
    icon: cat.icon,
    image: cat.image,
    imageHint: cat.imageHint,
    order: cat.order,
  }));

  return {
    id: master.id,
    slug: master.slug,
    dynographs,
    image: master.image_file!,
    imageHint: master.image_hint,
    images: master.image_files,
    videos: master.public_video_files,
    categories
  };
}  