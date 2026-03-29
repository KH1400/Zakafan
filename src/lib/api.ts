import { json } from "stream/consumers";
import { DynoCategory, DynoDtoIn, News } from "./content-types";
import ky from 'ky';

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// export const api = ky.create({
//   prefixUrl: baseUrl,
//   timeout: false,
//   // credentials: 'include',
  
//   hooks: {
//     // beforeRequest: [
//     //   (req) => {
//     //     const original = new URL(req.url);
//     //     const searchParams = new URLSearchParams(original.searchParams.entries().filter((k, v) => Boolean(v)));
//     //     const url = new URL(`${original.pathname}${searchParams}`);

//     //     req.url = url;
//     //   },
//     // ]
//   }
// });

export const api = ky.create({
  prefixUrl: baseUrl,
  timeout: false,
  hooks: {
    beforeRequest: [
      async (request) => {
        // اگر نیاز به token دارید، از localStorage بگیرید
        const token = localStorage.getItem('auth_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const refreshResponse: any = await ky.post(`${baseUrl}/auth/token/refresh/`, {
                json: { refresh: refreshToken }
              });
              const { access } = await refreshResponse.json();
              
              localStorage.setItem('auth_token', access);
              request.headers.set('Authorization', `Bearer ${access}`);
              return ky(request);
            } catch (error) {
              // اگر رفرش توکن هم نامعتبر بود
              localStorage.removeItem('auth_token');
              localStorage.removeItem('refresh_token');
              // هدایت به صفحه لاگین یا صفحه اصلی ادمین
              window.location.href = '/auth/signin'; 
            }
          } else {
            // اگر رفرش توکن وجود نداشت
            window.location.href = '/auth/signin';
          }
        }
        return response;
      }
    ]
    // afterResponse: [
    //   async (request, options, response) => {
    //     // اگر 401 گرفتید، refresh token کنید
    //     if (response.status === 401) {
    //       const refreshToken = localStorage.getItem('refresh_token');
    //       if (refreshToken) {
    //         try {
    //           const refreshResponse:any = await ky.post(`${baseUrl}/auth/token/refresh`, {
    //             json: { refresh: refreshToken }
    //           });
    //           const { access } = await refreshResponse.json();
              
    //           // token جدید را ذخیره کنید
    //           localStorage.setItem('auth_token', access);
              
    //           // درخواست اصلی را دوباره بفرستید
    //           request.headers.set('Authorization', `Bearer ${access}`);
    //           return ky(request);
    //         } catch (error) {
    //           // refresh token هم expire شده، logout کنید
    //           localStorage.clear();
    //           window.location.href = '/auth/signin';
    //         }
    //       }
    //     }
    //     return response;
    //   }
    // ]
  }
});

export const withBearer = (token: string) => !!token ? ({ Authorization: `Bearer ${token}` }) : {};

export const apiPostSignin = ({ email, password, captcha_token, remember_me }:{ email?: string, password?: string, captcha_token?: string, remember_me?: boolean }) =>
  api.post("auth/login/", { json: { email, password, captcha_token, remember_me } });

export const apiPostRefreshToken = ({ refresh }: {refresh: string}) =>
  api.post("auth/token/refresh/", { json: { refresh } });

export const apiPostSignup = ({ email, password }:{ email?: string, password?: string } = {}) =>
  api.post("auth/register/", { json: { email, password } });

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

export const fetchDynos = ({categoryHref}:{categoryHref?:string}) => 
  api.get(`dynograph/dynographs${categoryHref?`?category_href=${categoryHref}`:''}`);

export const generateSummary = ({dynoId, language}) => 
  api.post('chatbot/prompts/stream', {json: {
    prompt_info: {
      prompt_template_id: 1,
      language: language
    },
    dynograph_id: dynoId,
    // processing_model_name: "openrouter:deepseek-chat"
    // processing_model_name: "Local:qwen3-vl-32b-instruct-FP8",
  }
});

export const generateComment = ({summaryId, language}) => 
  api.post('chatbot/comments/stream', {json: {
    prompt_info: {
      prompt_template_id: 3,
      language: language
    },
    dynograph_summary_id: summaryId,
    // processing_model_name: "Local:qwen3-vl-32b-instruct-FP8",
  }
});

export const fetchDynoBySlug = ({slug}) => 
  api.get(`dynograph/dynographs/slug/${slug}`);

export const deleteDyno = ({id}: {id: string}) => 
  api.delete(`dynograph/dynographs/${id}`);

export const fetchSummaries = ({dynoId}) => 
  api.get(`dynograph/dynographs/${dynoId}`);

export const deleteSummary = ({summaryId}) => 
  api.delete(`dynograph/dynograph-summaries/${summaryId}`);

export const updateSummary = ({summaryId, generatedSummary}) => 
  api.put(`dynograph/dynograph-summaries/${summaryId}`, { json: { generated_summary: generatedSummary }});

export const fetchComments = (summaryId) => 
  api.get(`dynograph/dynograph-comments?summary_id=${summaryId}`);

export const deleteComment = ({commentId}) => 
  api.delete(`dynograph/dynograph-comments/${commentId}`);

export const updateComment = ({commentId, generatedComment, language}) => 
  api.put(`dynograph/dynograph-comments/${commentId}`, { json: { generated_comment: generatedComment, language: language }});

export const apiPostStoreUploadUrl = () =>
  `${baseUrl}store/upload`;

export const apiGetDynoMastersByCategoryHref = ({categoryHref}:{categoryHref?:string}) => 
  api.get(`dynograph/dynograph-masters${categoryHref?`?category_href=${categoryHref}`:''}`);

export const apiGetDynoMasterBySlug = ({slug}) => 
  api.get(`dynograph/dynograph-masters/slug/${slug}`);

export const apiCreateDynographChild = (dynographData) => 
  api.post(`dynograph/dynographs`, {
    json: dynographData
  });

export const apiCreateDynographMaster = (dynographMaster) =>
  api.post(`dynograph/dynograph-masters`, {
    json: dynographMaster
  });

export const apiDeleteDynographMaster = (masterId) => 
  api.delete(`dynograph/dynograph-masters/${masterId}`);

export const apiUpdateDynographMaster = (dynographMaster) => 
  api.put(`dynograph/dynograph-masters/${dynographMaster.id}`, {
    json: dynographMaster
  });

export const apiUpdateDynographChild = (dynographData) => 
  api.put(`dynograph/dynographs/${dynographData.id}`, {
    json: dynographData
  });

export async function apiGetDynoCategory(categoryHref: string) {
  const cates: any = await apiGetDynoCategories().json();
  return cates.categories.find((s: DynoCategory) => s.href === categoryHref);
}

export const apiGetDynoCategories = () => 
  api.get(`dynograph/categories`, {
    retry: {
      limit: 4, // تلاش مجدد تا 4 بار
      methods: ['get'], // فقط روی GET اعمال شه
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
      backoffLimit: 500 // حداکثر تاخیر بین retry (ms)
    },
    cache: 'no-store'
  });

export const apiCreateDynoCategory = (dynoCategory) =>
  api.post(`dynograph/categories`, {
    json: dynoCategory
  });

export const apiUpdateDynoCategory = (dynoCategory) =>
  api.put(`dynograph/categories/${dynoCategory.id}`, {
    json: dynoCategory
  });

export const apiDeleteDynoCategory = (dynoCategory) =>
  api.delete(`dynograph/categories/${dynoCategory.id}`);


export async function apiGetPostCategory(categoryHref: string) {
  const cates: any = await apiGetPostCategories().json();
  return cates.categories.find((s: DynoCategory) => s.href === categoryHref);
}

export const apiGetPostCategories = () => 
  api.get(`dynograph/post-categories`, {
    retry: {
      limit: 4,
      methods: ['get'],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
      backoffLimit: 500
    },
    cache: 'no-store'
  });

export const apiCreatePostCategory = (dynoCategory) =>
  api.post(`dynograph/post-categories`, {
    json: dynoCategory
  });

export const apiUpdatePostCategory = (dynoCategory) =>
  api.put(`dynograph/post-categories/${dynoCategory.id}`, {
    json: dynoCategory
  });

export const apiDeletePostCategory = (dynoCategory) =>
  api.delete(`dynograph/post-categories/${dynoCategory.id}`);

export const apiSearch = (searchContent: string, limit = 10, offset = 0) =>
  api.get(`dynograph/dynograph-masters/search?q=${searchContent}&limit=${limit}&offset=${offset}`);

export const apiGetSocialPosts = ({dynographId, withoutDynoId = false}: {dynographId?: string, withoutDynoId: boolean}) => 
  api.get(`dynograph/filter-dynograph-news?without_dynograph=${withoutDynoId}${dynographId?`&dynograph_id=${dynographId}`:''}`);

export const apiPatchSocialPost = (newsId: number, body: News) => 
  api.patch(`dynograph/dynograph-news/${newsId}`, {json: body});

export const apiPostStorePublicUploadUrl = () => '/api/public-upload';