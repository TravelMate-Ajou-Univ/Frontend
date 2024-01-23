import {
  ArticleDetailType,
  ArticlePreviewType,
  ArticleRequestType,
  ArticleType,
  KeywordType,
  MyPageArticleType,
  SeasonType
} from "@/model/article";
import { article, user } from "./api";
import { ImageType } from "@/model/image";

export const articleCount = async (season: SeasonType) => {
  try {
    const { data } = await article.articleCount(season);
    if (!data) return false;
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const uploadImage = async (file: File, type: ImageType) => {
  try {
    const { data: s3data } = await article.getS3Url(type);
    const { url, id } = s3data;
    const res = await article.uploadImgToS3(url, file);
    if (res.status === 200) {
      const { data } = await article.confirmUpload(id, type);
      return data.id;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getKeywords = async (
  word: string
): Promise<KeywordType[] | false> => {
  try {
    const { data } = await article.getKeywords(word);
    return data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    return false;
  }
};

export const submitArticle = async (
  newArticle: ArticleType
): Promise<string | false> => {
  try {
    const { data } = await article.submitArticle(newArticle);
    if (!data) return false;
    return data.id;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getArticle = async (
  id: string,
  userId?: number
): Promise<ArticleDetailType | false> => {
  try {
    const { data } = await article.getArticle(id, userId);
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
      winter: data.winter,
      articleBookmarkMap: data.articleBookmarkMap,
      isFavorite: data.isFavorite
    };

    return articleData;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return false;
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const { data } = await article.deleteArticle(id);
    if (!data) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editArticleRequest = async (
  id: string,
  content: string,
  period: SeasonType,
  comment: string,
  bookmarksToRemove: number[],
  bookmarksToAdd: number[]
) => {
  try {
    const { data } = await article.editArticleRequest(
      id,
      content,
      period,
      comment,
      bookmarksToRemove,
      bookmarksToAdd
    );
    if (!data) return false;
    return data.id;
  } catch (error) {
    console.error(error);
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
        updatedAt,
        comment
      }: ArticleRequestType) => ({
        id,
        articleId,
        period,
        userId,
        content,
        updatedAt,
        comment
      })
    );
    return editRequest;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getArticleRequest = async (id: string, requestId: string) => {
  try {
    const { data } = await article.getArticleRequest(id, requestId);
    if (!data) return false;
    return data;
  } catch (error) {
    console.error(error);
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

export const getMyArticleByRequest = async (
  page: number,
  limit: number,
  request: "pending" | "accepted" | "declined"
): Promise<MyPageArticleType[]> => {
  try {
    const { data } = await user.getMyArticleByRequest(page, limit, request);
    const articles = data.map((poster: any) => {
      const season =
        poster.article.springVersionID !== null
          ? "spring"
          : poster.article.summerVersionID !== null
          ? "summer"
          : poster.article.fallVersionID !== null
          ? "fall"
          : "winter";
      const article: MyPageArticleType = {
        id: poster.article.id,
        title: poster.article.title,
        season,
        thumbnail: poster.article.thumbnail
      };
      return article;
    });
    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postFavorite = async (id: string) => {
  try {
    const { status } = await article.postFavorite(id);
    if (!status) return false;
    return status;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteFavorite = async (id: string) => {
  try {
    const { status } = await article.deleteFavorite(id);
    if (!status) return false;
    return status;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFavoriteArticleList = async (
  page: number,
  limit: number
): Promise<ArticleType[] | false> => {
  try {
    const { data } = await user.getFavoriteArticleList(page, limit);
    if (!data) return false;
    const articles = data.articles.map((article: any) => {
      const newArticle: ArticlePreviewType = {
        id: article.id,
        title: article.title,
        thumbnail: article.thumbnail,
        location: article.location,
        authorId: article.authorId,
        springVersionID: article.springVersionID,
        summerVersionID: article.summerVersionID,
        fallVersionID: article.fallVersionID,
        winterVersionID: article.winterVersionID,
        articleTagMap: article.articleTagMap
      };
      return newArticle;
    });
    return articles;
  } catch (error) {
    console.error(error);
    return false;
  }
};
