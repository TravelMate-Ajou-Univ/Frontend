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
    api.get(`users/me/articles?limit=${limit}`),
  getMyArticleByRequest: (
    page: number,
    limit: number,
    request: "pending" | "accepted" | "declined"
  ) =>
    api({
      method: "get",
      url: "/users/me/article/requests",
      params: {
        page,
        limit,
        type: request
      }
    }),
  getFavoriteArticleList: (page: number, limit: number) =>
    api.get(`users/me/favorite-articles?page=${page}&limit=${limit}`)
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
  getArticle: (id: string, userId?: number) =>
    api.get(`articles/${id}?userId=${userId ? userId : 0}`),
  editArticle: (id: string, article: ArticleType) =>
    api.patch(`articles/${id}`, article),
  deleteArticle: (id: string) => api.delete(`articles/${id}`),
  editArticleRequest: (
    id: string,
    content: string,
    period: SeasonType,
    comment: string,
    bookmarksToRemove: number[],
    bookmarksToAdd: number[]
  ) =>
    api.post(`articles/${id}/requests`, {
      content,
      period,
      comment,
      bookmarksToRemove,
      bookmarksToAdd
    }),
  getArticleRequestList: (id: string, season: SeasonType | "ALL") =>
    api.get(`articles/${id}/requests?period=${season}`),
  getArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/requests/${requestId}`),
  acceptArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/requests/accept/${requestId}`),
  declineArticleRequest: (id: string, requestId: string) =>
    api.get(`articles/${id}/requests/decline/${requestId}`),
  postFavorite: (id: string) => api.post(`articles/${id}/favorite`),
  deleteFavorite: (id: string) => api.delete(`articles/${id}/favorite`)
};

export const report = {
  reportArticle: (articleId: number, reason: string) =>
    api.post(`articles/${articleId}/report`, { reason }),
  reportUser: (reportedUserId: number, reason: string) =>
    api.post("/user-report-log", {
      reason,
      reportedUserId
    })
};

export const admin = {
  isAdmin: () => api.get("admin"),
  getUsers: (page: number, limit: number) =>
    api.get(`admin/users?page=${page}&limit=${limit}`),
  getArticleReports: (page: number, limit: number) =>
    api.get(`admin/article-report-logs?page=${page}&limit=${limit}`),
  getUserReports: (page: number, limit: number) =>
    api.get(`admin/user-report-logs?page=${page}&limit=${limit}`),
  banUser: (userId: number, reason: string) =>
    api.post(`admin/ban/user/${userId}`, { reason })
};
