export type KeywordType = {
  id: string;
  name: string;
};

export type KoreanSeasonType = "봄" | "여름" | "가을" | "겨울";
export type SeasonType = "SPRING" | "SUMMER" | "FALL" | "WINTER";

export type SeasonContentType = {
  content: string;
};

export type ArticleType = {
  title: string;
  period: SeasonType;
  content: string;
  tagIds: string[];
  location: string;
  thumbnail: string;
};

export type ArticlePreviewType = {
  id: number;
  title: string;
  thumbnail: string;
  location: string;
  authorId: number;
  springVersionID: number;
  summerVersionID: number;
  fallVersionID: number;
  winterVersionID: number;
  articleTagMap: {
    id: number;
    articleId: number;
    tagId: number;
    tag: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

export type ArticleDetailType = ArticlePreviewType & {
  spring: SeasonContentType;
  summer: SeasonContentType;
  fall: SeasonContentType;
  winter: SeasonContentType;
};
