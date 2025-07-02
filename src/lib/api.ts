import { DynoCategory } from "./content-types";
import ky from 'ky';

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(baseUrl)
export const api = ky.create({
  prefixUrl: baseUrl,
  timeout: false,
  // credentials: 'include',
  
  hooks: {
    // beforeRequest: [
    //   (req) => {
    //     const original = new URL(req.url);
    //     const searchParams = new URLSearchParams(original.searchParams.entries().filter((k, v) => Boolean(v)));
    //     const url = new URL(`${original.pathname}${searchParams}`);

    //     req.url = url;
    //   },
    // ]
  }
});

export const withBearer = (token: string) => !!token ? ({ Authorization: `Bearer ${token}` }) : {};

export const apiPostLogin = ({ email, password, captcha_token, remember_me }:{ email?: string, password?: string, captcha_token?: string, remember_me?: string } = {}) =>
  api.post("auth/login/", { json: { email, password, captcha_token, remember_me } });

// export const apiPostRefreshToken = ({ refresh } = {}) =>
//   api.post("auth/token/refresh/", { json: { refresh } });

export async function fetchCategories2() {
  const maxRetries = 4;
  const retryDelay = 5000; // ۵ ثانیه به میلی‌ثانیه

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${baseUrl}/dynograph/categories`, {
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
  const cates: any = await fetchCategories().json();
  return cates.categories.find((s: DynoCategory) => s.href === categoryHref);
}

const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNCwidXNlcm5hbWUiOiJtZXRpZjEyQGdtYWlsLmNvbSIsImVtYWlsIjoibWV0aWYxMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciIsImF1dGhvciJdLCJleHAiOjE3NTE4MDM5NTYsImlhdCI6MTc1MTE5OTE1NiwidHlwZSI6ImFjY2VzcyJ9.GNu7hQ2GiaDuqKeh7qsSzFhqK-SmpbJL4mzbKRE8fTo"

export const fetchCategories = () => 
  api.get(`dynograph/categories`, {
    retry: {
      limit: 4, // تلاش مجدد تا 4 بار
      methods: ['get'], // فقط روی GET اعمال شه
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
      backoffLimit: 500 // حداکثر تاخیر بین retry (ms)
    },
    cache: 'no-store'
  });

export const fetchDynos = ({categoryHref}) => 
  api.get(`dynograph/dynographs${categoryHref?`?category_href=${categoryHref}`:''}`);

export const generateSummary = ({dynoId}) => 
  api.post('chatbot/prompts/stream', {json: {
    prompt_template_id: 1,
    dynograph_id: dynoId,
    // processing_model_name: "openrouter:deepseek-chat"
    processing_model_name: "openrouter:gemini-2.5-flash-lite-preview-06-17"
  }
});

export const fetchDynoBySlug = ({slug}) => 
  api.get(`dynograph/dynographs/slug/${slug}`);

export const fetchSummaries = ({dynoId}) => 
  api.get(`dynograph/dynographs/${dynoId}`);

export const deleteSummary = ({summaryId}) => 
  api.delete(`dynograph/dynograph-summaries/${summaryId}`);

export const updateSummary = ({summaryId, generatedSummary}) => 
  api.put(`dynograph/dynograph-summaries/${summaryId}`, { json: { generated_summary: generatedSummary }});

export const apiPostStoreUploadUrl = () =>
  `${baseUrl}store/upload`;