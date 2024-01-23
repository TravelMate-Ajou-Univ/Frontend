import { queryKey } from "@/lib/queryKey";
import { useMutation, useQuery } from "react-query";
import { getKeywords, postKeyword } from "../axios/article";
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

export const useKeywordMutation = () => {
  const { mutate, data } = useMutation({
    mutationKey: [queryKey.keyword],
    mutationFn: (keyword: string) => postKeyword(keyword)
  });

  return { mutate, data };
};
