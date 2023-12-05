export type KeywordType = {
  id: number;
  name: string;
};

export type KoreanSeasonType = "봄" | "여름" | "가을" | "겨울";
export type SeasonType = "SPRING" | "SUMMER" | "FALL" | "WINTER";
export type SeasonLowerCaseType = "spring" | "summer" | "fall" | "winter";

export type SeasonContentType = {
  content: string;
};

export type MyPageArticleType = {
  id: number;
  title: string;
  season: string;
  thumbnail: string;
};

export type ArticleType = {
  title: string;
  period: SeasonType;
  content: string;
  tagIds: number[];
  location: string;
  thumbnail: string;
  bookmarkIds?: number[];
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

export type MyArticleListType = (ArticlePreviewType & {
  requestCount: number;
})[];

export type ArticleDetailType = ArticlePreviewType & {
  spring: SeasonContentType;
  summer: SeasonContentType;
  fall: SeasonContentType;
  winter: SeasonContentType;
  articleBookmarkMap: any[];
  isFavorite: boolean;
};

export type ArticleRequestType = {
  id: number;
  articleId: number;
  period: SeasonType;
  userId: number;
  content: string;
  updatedAt: string;
  comment?: string;
};

export type ArticleCountType = {
  location:
    | "서울"
    | "경기/인천"
    | "강원"
    | "충청/대전"
    | "전라/광주"
    | "경북/대구"
    | "경남/울산/부산"
    | "제주";
  count: number;
};
