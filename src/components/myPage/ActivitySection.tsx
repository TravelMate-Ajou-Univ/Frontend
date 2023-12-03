"use client";

import { getMyArticleByRequest } from "@/service/axios/article";
import { useEffect, useState } from "react";
import ContentList from "./ContentList";
import { MyPageArticleType } from "@/model/article";

export default function ActivitySection() {
  const [acceptedArticle, setAcceptedArticle] = useState<MyPageArticleType[]>(
    []
  );
  const [penddingArticle, setPenddingArticle] = useState<MyPageArticleType[]>(
    []
  );
  const [declinedArticle, setDeclinedArticle] = useState<MyPageArticleType[]>(
    []
  );

  useEffect(() => {
    const getData = async () => {
      const acceptedData = await getMyArticleByRequest(1, 25, "accepted");
      const penddingData = await getMyArticleByRequest(1, 25, "pending");
      const declinedData = await getMyArticleByRequest(1, 25, "declined");

      setAcceptedArticle(acceptedData);
      setPenddingArticle(penddingData);
      setDeclinedArticle(declinedData);
    };

    getData();
  }, []);

  return (
    <div>
      <p className="font-bold text-3xl my-[2rem] border-b-2 w-fit p-2">
        내가 기여한 게시글
      </p>
      <ContentList articles={acceptedArticle} />
      <p className="font-bold text-3xl my-[2rem] border-b-2 w-fit p-2">
        수정요청한 게시글
      </p>
      <ContentList articles={penddingArticle} />
      <p className="font-bold text-3xl my-[2rem] border-b-2 w-fit p-2">
        반려된 게시글
      </p>
      <ContentList articles={declinedArticle} />
    </div>
  );
}
