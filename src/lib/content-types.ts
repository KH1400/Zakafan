export type Language = 'fa' | 'en' | 'ar' | 'he';
export type DataType = 'pdf' | 'html' | 'image' | 'textimage' | 'cover' | 'info' | 'video';

export const languages: Language[] = ['fa', 'en', 'ar', 'he'];

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

// Category

export type DynoCategory = {
    id: number;
    title: Record<Language, string>;
    description: Record<Language, string>;
    href: string;
    icon: string,
    image: MediaFile,
    imageHint: string
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