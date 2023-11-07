export type KeywordType = {
  id: string;
  name: string;
};

export type KoreanSeasonType = "봄" | "여름" | "가을" | "겨울";
export type SeasonType = "SPRING" | "SUMMER" | "FALL" | "WINTER";

export type ArticleType = {
  title: string;
  period: SeasonType;
  content: string;
  tagIds: string[];
  location: string;
  thumbnail: string;
};
