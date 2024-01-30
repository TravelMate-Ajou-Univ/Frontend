import { queryKey } from "@/lib/queryKey";
import { useQuery } from "react-query";
import { articleCount, getArticle } from "../axios/article";
import {
  ArticleCountType,
  ArticleDetailType,
  SeasonType
} from "@/model/article";

export const useEditArticleQuery = (
  edittingId: string | undefined,
  edittingSeason: string | undefined
): ArticleDetailType | false | undefined => {
  const { data } = useQuery({
    queryKey: [queryKey.article, edittingId],
    queryFn: () => {
      if (!edittingId || !edittingSeason) return;
      return getArticle(edittingId);
    }
  });
  return data;
};

export const useGetArticleCountQuery = (
  season: SeasonType
): ArticleCountType[] | undefined => {
  const { data } = useQuery({
    queryKey: [queryKey.articleCount, season],
    queryFn: () => articleCount(season)
  });
  return data;
};
