import { queryKey } from "@/lib/queryKey";
import { useQuery } from "react-query";
import { getKeywords } from "../axios/article";
import { SetStateAction } from "react";

export const useGetKeywordsQuery = (
  keyword: string,
  setDropdown: (value: SetStateAction<boolean>) => void
) => {
  const { data, refetch } = useQuery({
    queryKey: [queryKey.keyword, keyword],
    queryFn: () => {
      if (!keyword) return;
      return getKeywords(keyword);
    },
    enabled: false,
    onSuccess: data => {
      if (data) setDropdown(true);
    }
  });
  return { data, refetch };
};
