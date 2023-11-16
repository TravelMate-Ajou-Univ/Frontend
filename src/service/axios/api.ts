import { ArticleType, SeasonType } from "@/model/article";
import axios from "axios";

export const apiWithoutAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL
});

export const mapApi = axios.create({
  baseURL: "https://maps.googleapis.com"
});

export const userAuth = {
  getKakaoToken: (code: string) =>
    axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        code
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }
    ),
  signinUsingKakao: (accessToken: string) =>
    apiWithoutAuth.post("auth/kakao", {
      accessToken
    }),
  signinUsingGoogle: (accessToken: string) =>
    apiWithoutAuth.post("auth/google", {
      accessToken
    }),
  refresh: (refreshToken: string) =>
    apiWithoutAuth.post("auth/refresh", {
      refreshToken
    })
};

export const user = {
  getUserInfo: () => api.get("users/me"),
  getUserInfoById: (id: number) => api.get(`users/${id}`),
  getBookmarkCollectionsById: (id: number) =>
    api.get(`users/${id}/bookmark-collections`)
};

export const article = {
  getS3Url: () => api.get("s3/presigned-post?type=article"),
  uploadImgToS3: (s3url: string, data: File) => axios.put(s3url, data),
  confirmUpload: (id: string) =>
    api.get(`s3/upload-success/?type=article&id=${id}`),
  getKeywords: (word: string) => api.get(`tags/search/${word}`),
  postKeyword: (name: string) => api.post("tags", { name }),
  getArticleList: (
    page: number,
    limit: number,
    period: string,
    location: string,
    keyword: string
  ) =>
    api.get(
      `articles?page=${page}&limit=${limit}${
        period === "" ? "" : `&period=${period}`
      }${location === "" ? "" : `&location=${location}`}${
        keyword === "" ? "" : `&keyword=${keyword}`
      }`
    ),
  submitArticle: (article: ArticleType) => api.post("articles", article),
  getArticle: (id: string) => api.get(`articles/${id}`),
  editArticle: (id: string, article: ArticleType) =>
    api.patch(`articles/${id}`, article),
  editArticleRequest: (id: string, content: string, period: SeasonType) =>
    api.post(`articles/${id}/reqeusts`, {
      content,
      period
    })
};
