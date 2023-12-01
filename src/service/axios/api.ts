import { ArticleType, SeasonType } from "@/model/article";
import { ImageType } from "@/model/image";
import { PinType } from "@/model/bookmark";
import axios from "axios";

export const apiWithoutAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL
});

export const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_SERVER_BASE_URL
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
  getUserInfoById: (id: number) => api.get(`users?userIds=${id}`),
  getBookmarkCollectionsById: (id: number) =>
    api.get(`users/${id}/bookmark-collections`),
  getMyArticleList: (limit: number) =>
    api.get(`users/me/articles?limit=${limit}`)
};

export const article = {
  articleCount: (season: SeasonType) =>
    api.get(`articles/count?period=${season}`),
  getS3Url: (type: ImageType) => api.get(`s3/presigned-post?type=${type}`),
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
  createBookmark: (bookmark: PinType) => api.post("bookmark", bookmark),
  submitArticle: (article: ArticleType) => api.post("articles", article),
  getArticle: (id: string) => api.get(`articles/${id}`),
  editArticle: (id: string, article: ArticleType) =>
    api.patch(`articles/${id}`, article),
  deleteArticle: (id: string) => api.delete(`articles/${id}`),
  editArticleRequest: (
    id: string,
    content: string,
    period: SeasonType,
    comment: string
  ) =>
    api.post(`articles/${id}/reqeusts`, {
      content,
      period,
      comment
    }),
  getArticleRequestList: (id: string, season: SeasonType | "ALL") =>
    api.get(`articles/${id}/reqeusts?period=${season}`),
  getArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/reqeusts/${requestId}`),
  acceptArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/reqeusts/accept/${requestId}`),
  declineArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/reqeusts/decline/${requestId}`)
};
