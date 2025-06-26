import { allContentItems, SectionInfo, sections } from "./content-data";

export async function fetchCategories() {
  const res = await fetch("http://2.189.254.109:8000/api/v1/dynograph/categories", {
    cache: "no-store", // برای SSR که همیشه دیتا جدید بگیره
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data.categories;
}

export async function fetchCategory(categoryHref: string) {
  // const res = await fetch(`http://2.189.254.109:8000/api/v1/dynograph/categories/${categoryId}`, {
  //   cache: "no-store", // برای SSR که همیشه دیتا جدید بگیره
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch categories");
  // }
  // const category = await res.json();
  // return category;

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