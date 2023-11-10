import { ArticleType } from "@/model/article";
import { article } from "./api";

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
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
