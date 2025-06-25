import { allContentItems, SectionInfo, sections } from "./content-data";

export async function fetchCategory(categoryHref: string) {
  // const res = await fetch("http://wwwwww/api/v1/category", {
  //   cache: "no-store", // برای SSR که همیشه دیتا جدید بگیره
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch categories");
  // }

  // return res.json();

  return sections.find((s: SectionInfo) => s.href === categoryHref);
}

export async function fetchDynos(categoryHref: string, lang: string) {
  // const res = await fetch("http://wwwwww/api/v1/category", {
  //   cache: "no-store", // برای SSR که همیشه دیتا جدید بگیره
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch categories");
  // }

  // return res.json();

  const sectionInfo = sections.find((s: SectionInfo) => s.href === categoryHref)
  const sectionContent = allContentItems.filter((item) =>
    item.categories.includes(sectionInfo?.id || 0)
  );

  return sectionContent;
}