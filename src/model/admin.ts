import { User } from "./user";

export type AdminListType = "USER" | "USER_REPORT" | "ARTICLE_REPORT";

export type UserReportType = {
  id: number;
  reason: string;
  reportedUser: User;
  reporter: User;
};

export type ArticleReportType = {
  id: number;
  reason: string;
  reporter: User;
  article: {
    id: string;
    title: string;
  };
};
