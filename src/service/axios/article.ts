import {
  ArticleDetailType,
  ArticleRequestType,
  ArticleType,
  SeasonType
} from "@/model/article";
import { article, user } from "./api";

export const uploadImage = async (file: File) => {
  try {
    const { data: s3data } = await article.getS3Url();
    const { url, id } = s3data;
    const res = await article.uploadImgToS3(url, file);
    if (res.status === 200) {
      const { data } = await article.confirmUpload(id);
      return data.id;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getKeywords = async (word: string) => {
  try {
    const { data } = await article.getKeywords(word);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const postKeyword = async (name: string) => {
  try {
    const { data } = await article.postKeyword(name);
    return {
      id: data.id,
      name: data.name
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getArticleList = async (
  page: number,
  limit: number,
  period: string,
  location: string,
  word: string
) => {
  try {
    const { data } = await article.getArticleList(
      page,
      limit,
      period,
      location,
      word
    );

    const { count, articles } = data;

    const newArticles = articles.map((article: any) => {
      const {
        id,
        title,
        thumbnail,
        location,
        authorId,
        springVersionID,
        summerVersionID,
        fallVersionID,
        winterVersionID,
        articleTagMap
      } = article;

      return {
        id,
        title,
        thumbnail,
        location,
        authorId,
        springVersionID,
        summerVersionID,
        fallVersionID,
        winterVersionID,
        articleTagMap
      };
    });

    return { count, newArticles };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const submitArticle = async (newArticle: ArticleType) => {
  try {
    const { data } = await article.submitArticle(newArticle);
    if (!data) return false;
    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getArticle = async (
  id: string
): Promise<ArticleDetailType | false> => {
  try {
    const { data } = await article.getArticle(id);
    if (!data) return false;

    const articleData: ArticleDetailType = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      location: data.location,
      authorId: data.authorId,
      springVersionID: data.springVersionID,
      summerVersionID: data.summerVersionID,
      fallVersionID: data.fallVersionID,
      winterVersionID: data.winterVersionID,
      articleTagMap: data.articleTagMap,
      spring: data.spring,
      summer: data.summer,
      fall: data.fall,
      winter: data.winter
    };

    return articleData;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editArticle = async (
  id: string,
  editedArticle: ArticleType
): Promise<string | false> => {
  try {
    const { data } = await article.editArticle(id, editedArticle);
    if (!data) return false;
    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editArticleRequest = async (
  id: string,
  content: string,
  period: SeasonType
) => {
  try {
    const { data } = await article.editArticleRequest(id, content, period);
    if (!data) return false;
    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getArticleRequestList = async (
  id: string,
  season: SeasonType | "ALL"
) => {
  try {
    const { data } = await article.getArticleRequestList(id, season);
    if (!data) return false;
    const editRequest = data.map(
      ({
        id,
        articleId,
        period,
        userId,
        content,
        updatedAt
      }: ArticleRequestType) => ({
        id,
        articleId,
        period,
        userId,
        content,
        updatedAt
      })
    );
    return editRequest;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getArticleRequest = async (id: string, requestId: string) => {
  try {
    const { data } = await article.getArticleRequest(id, requestId);
    if (!data) return false;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const acceptArticleRequest = async (id: string, requestId: string) => {
  try {
    const { data } = await article.acceptArticleRequest(id, requestId);
    if (!data) return false;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const declineArticleRequest = async (id: string, requestId: string) => {
  try {
    const { data } = await article.declineArticleRequest(id, requestId);
    if (!data) return false;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMyArticleList = async (limit: number) => {
  try {
    const { data } = await user.getMyArticleList(limit);
    if (!data) return false;

    const newArticles = data.articles.map(
      ({
        id,
        title,
        thumbnail,
        location,
        authorId,
        springVersionID,
        summerVersionID,
        fallVersionID,
        winterVersionID,
        articleTagMap,
        pendingArticleRequests
      }: any) => {
        return {
          id,
          title,
          thumbnail,
          location,
          authorId,
          springVersionID,
          summerVersionID,
          fallVersionID,
          winterVersionID,
          articleTagMap,
          requestCount: pendingArticleRequests.length
        };
      }
    );

    return newArticles;
  } catch (error) {
    console.log(error);
    return false;
  }
};
