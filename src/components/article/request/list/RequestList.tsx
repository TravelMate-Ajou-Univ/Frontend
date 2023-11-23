"use client";

import PageTitle from "@/components/PageTitle";
import { ArticleRequestType, SeasonType } from "@/model/article";
import { getArticle, getArticleRequestList } from "@/service/axios/article";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RequestPreview from "./RequestPreview";

interface Props {
  articleId: string;
}

export default function RequestList({ articleId }: Props) {
  const [requestList, setRequestList] = useState<ArticleRequestType[]>([]);
  const [title, setTitle] = useState<string>("");
  const searchParams = useSearchParams();
  const season = searchParams.get("season")?.toUpperCase() as SeasonType;

  useEffect(() => {
    const getArticleApi = async () => {
      const data = await getArticleRequestList(articleId, season ?? "ALL");
      if (!data) return;
      setRequestList(data);
      const origin = await getArticle(articleId);
      if (!origin) return;
      setTitle(origin.title);
    };
    getArticleApi();
  }, [articleId, season]);

  return (
    <section>
      <hr />
      <PageTitle>
        수정 요청
        <span className="ml-2 mb-0.5 text-xl text-red-500">
          {requestList.length}
        </span>
      </PageTitle>
      <p className="text-gray-600">
        {'"'}
        {title}
        {'"'}에 대한 수정 요청 목록입니다.
      </p>
      <ul className="mt-6 flex flex-col gap-10">
        {requestList.map(request => (
          <li key={request.id}>
            <RequestPreview request={request} />
          </li>
        ))}
      </ul>
    </section>
  );
}
