import { ArticleType } from "@/model/article";
import { posting } from "./api";

export const uploadImage = async (file: File) => {
  try {
    const { data: s3data } = await posting.getS3Url();
    const { url, id } = s3data;
    const res = await posting.uploadImgToS3(url, file);
    if (res.status === 200) {
      const { data } = await posting.confirmUpload(id);
      return data.id;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getKeywords = async (word: string) => {
  try {
    const { data } = await posting.getKeywords(word);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const postKeyword = async (name: string) => {
  try {
    const { data } = await posting.postKeyword(name);
    return {
      id: data.id,
      name: data.name
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const submitArticle = async (article: ArticleType) => {
  try {
    const { data } = await posting.submitPosting(article);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
