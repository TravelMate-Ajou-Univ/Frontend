"use client";

import PageTitle from "@/components/PageTitle";
import {
  ArticleRequestType,
  KoreanSeasonType,
  SeasonType
} from "@/model/article";
import { getArticle, getArticleRequestList } from "@/service/axios/article";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RequestPreview from "./RequestPreview";
import DropDown from "@/components/ui/dropDown/DropDown";
import {
  seasonList,
  seasonMapper,
  seasonMapperToKorean
} from "@/lib/seasonList";

interface Props {
  articleId: string;
}

export default function RequestList({ articleId }: Props) {
  const [requestList, setRequestList] = useState<ArticleRequestType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [season, setSeason] = useState<KoreanSeasonType>("봄");

  const searchParams = useSearchParams();
  const seasonParam = searchParams.get("season")?.toUpperCase() as SeasonType;

  useEffect(() => {
    const getArticleApi = async () => {
      const data = await getArticleRequestList(
        articleId,
        (seasonMapper[season] as SeasonType) ?? "ALL"
      );
      if (!data) return;
      setRequestList(data);
      const origin = await getArticle(articleId);
      if (!origin) return;
      setTitle(origin.title);
    };

    getArticleApi();
  }, [articleId, season]);

  useEffect(() => {
    setSeason(
      (seasonMapperToKorean[seasonParam as SeasonType] as KoreanSeasonType) ||
        "봄"
    );
  }, [seasonParam]);

  return (
    <section>
      <hr />
      <div className="flex justify-between items-start">
        <div>
          <PageTitle>
            수정 요청
            <span className="ml-2 mb-0.5 md:text-xl text-lg text-red-500">
              {requestList.length}
            </span>
          </PageTitle>
          <p className="text-gray-600 md:text-base text-sm">
            {'"'}
            {title}
            {'"'}에 대한 수정 요청 목록입니다.
          </p>
        </div>
        <DropDown
          className="my-4"
          selected={season}
          setSelected={season => setSeason(season as KoreanSeasonType)}
          list={seasonList}
        />
      </div>
      <ul className="xl:mt-6 md:mt-4 mt-2 flex flex-col xl:gap-10 md:gap-7 gap-3">
        {requestList.map(request => (
          <li key={request.id}>
            <RequestPreview request={request} />
          </li>
        ))}
      </ul>
    </section>
  );
}
