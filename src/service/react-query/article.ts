import { queryKey } from "@/lib/queryKey";
import { useQuery } from "react-query";
import { getArticle } from "../axios/article";
import { ArticleDetailType } from "@/model/article";

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
