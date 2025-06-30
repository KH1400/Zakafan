import { DynoCategory } from "./content-data";

export async function fetchCategories() {
  const maxRetries = 4;
  const retryDelay = 5000; // ۵ ثانیه به میلی‌ثانیه

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch("http://2.189.254.109:8000/api/v1/dynograph/categories", {
        cache: "no-store", // برای SSR که همیشه دیتا جدید بگیره
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      return data.categories;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error("Failed to fetch categories after multiple attempts");
      }

      // صبر قبل از تلاش بعدی
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}

export async function fetchCategory(categoryHref: string) {
  const cates = await fetchCategories();
  return cates.find((s: DynoCategory) => s.href === categoryHref);
}

export async function fetchDynos(categoryHref?: string) {
  const res = await fetch(`http://2.189.254.109:8000/api/v1/dynograph/dynographs${categoryHref?`?category_href=${categoryHref}`:''}`);

  if (!res.ok) {
    throw new Error("Failed to fetch dynographs");
  }

  const data = await res.json();
  return data.dynographs;
}

export async function fetchDynosBySlug(slug?: string) {
  const res = await fetch(`http://2.189.254.109:8000/api/v1/dynograph/dynographs/slug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch dynographs");
  }

  const data = await res.json();
  return data;
}

const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNCwidXNlcm5hbWUiOiJtZXRpZjEyQGdtYWlsLmNvbSIsImVtYWlsIjoibWV0aWYxMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsImF1dGhvciJdLCJleHAiOjE3NTE4MDM5NTYsImlhdCI6MTc1MTE5OTE1NiwidHlwZSI6ImFjY2VzcyJ9.GNu7hQ2GiaDuqKeh7qsSzFhqK-SmpbJL4mzbKRE8fTo"

export async function generateSummary(dynoId: string) {
  const res = await fetch(`http://2.189.254.109:8000/api/v1/chatbot/prompts/stream`, {
    method: "POST",
    body: JSON.stringify({
      prompt_template_id: 1,
      dynograph_id: dynoId,
      processing_model_name: "openrouter:gemini-2.5-flash-lite-preview-06-17"
    })
  });

  if (!res.ok) {
    throw new Error("Failed to generate summary");
  }

  const data = await res.json();
  return data;
}

export async function fetchSummarysFromAPI(dynoId: string) {
  const res = await fetch(`http://2.189.254.109:8000/api/v1/dynograph/dynographs/${dynoId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch dynographs");
  }
  const data = await res.json();
  console.log('dyno:', data)
  return data.summaries;
}

export async function updateSummary(summaryId: number, generatedSummry: string) {
  console.log(JSON.stringify({generatedSummry}))
  const res = await fetch(`http://2.189.254.109:8000/api/v1/dynograph/dynograph-summaries/${summaryId}`,
    {
      method: 'PUT',
      body: JSON.stringify({generated_summary: generatedSummry})
    }
  );


  if (!res.ok) {
    throw new Error("Failed to fetch dynographs");
  }
  const data = await res.json();
  return data;
}