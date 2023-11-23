"use client";

import { SeasonType } from "@/model/article";
import { User } from "@/model/user";
import {
  acceptArticleRequest,
  declineArticleRequest,
  getArticle,
  getArticleRequest
} from "@/service/axios/article";
import { getUserInfoById } from "@/service/axios/userSign";
import { useEffect, useState } from "react";
import { parseDiff } from "react-diff-view";
import Diff from "./Diff";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import FilledButton from "@/components/ui/button/FilledButton";
import { useRouter } from "next/navigation";
import Comment from "./Comment";
const { formatLines, diffLines } = require("unidiff");

interface Props {
  articleId: string;
  requestId: string;
}

export default function Request({ articleId, requestId }: Props) {
  const [originArticle, setOriginArticle] = useState<string>("");
  const [requestArticle, setRequestArticle] = useState<string>("");
  const [requestUser, setRequestUser] = useState<User>();
  const [requestComment, setRequestComment] = useState<string>("");
  const [requestPeriod, setRequestPeriod] = useState<SeasonType>("SPRING");
  const [diff, setDiff] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const getRequest = async () => {
      const request = await getArticleRequest(articleId, requestId);
      if (!request) return;
      const user = await getUserInfoById(request.userId);
      if (!user) return;
      setRequestUser(user);
      const origin = await getArticle(articleId);

      if (!origin) return;
      switch (request.period as SeasonType) {
        case "SPRING":
          if (!origin.spring) break;
          setOriginArticle(origin.spring.content.split("</p>").join("\n"));
          break;
        case "SUMMER":
          if (!origin.summer) break;
          setOriginArticle(origin.summer.content.split("</p>").join("\n"));
          break;
        case "FALL":
          if (!origin.fall) break;
          setOriginArticle(origin.fall.content.split("</p>").join("\n"));
          break;
        case "WINTER":
          if (!origin.winter) break;
          setOriginArticle(origin.winter.content.split("</p>").join("\n"));
          break;
        default:
          return;
      }
      setRequestArticle(request.content.split("</p>").join("\n"));
      setRequestComment(request.comment);
      setRequestPeriod(request.period);
    };
    getRequest();
  }, [articleId, requestId]);

  useEffect(() => {
    const diffText = formatLines(diffLines(originArticle, requestArticle), {
      context: 50000
    });
    const [textDiff] = parseDiff(diffText, { nearbySequences: "zip" });
    setDiff(textDiff);
  }, [originArticle, requestArticle]);

  const decline = async () => {
    const confirm = window.confirm("수정 요청을 정말 거절하시겠습니까?");
    if (!confirm) return;
    const response = await declineArticleRequest(articleId, requestId);
    if (!response) return;
    alert("수정 요청이 거절되었습니다.");
    router.push(`/article/request/${articleId}`);
  };

  const accept = async () => {
    const confirm = window.confirm("수정 요청을 정말 승인하시겠습니까?");
    if (!confirm) return;
    const response = await acceptArticleRequest(articleId, requestId);
    if (!response) return;
    alert("수정 요청이 승인되었습니다.");
    router.push(
      `/article/detail/${articleId}?season=${requestPeriod.toLowerCase()}`
    );
  };

  return (
    <article className="flex flex-col gap-3 w-full bg-white shadow-lg rounded-xl px-11 py-8 mb-16">
      <section className="px-2">
        <div className="flex flex-col">
          <p className="text-xl font-bold">수정 요청</p>
          <p className="text-sm text-gray-500">
            {requestUser?.userName}님의 요청
          </p>
        </div>
      </section>
      <hr />
      <Diff diff={diff} />
      <hr />
      {requestComment !== "" && requestUser && (
        <Comment requestUser={requestUser} requestComment={requestComment} />
      )}
      <hr />
      <section className="self-end flex gap-2">
        <OutlinedButton onClick={decline}>거절</OutlinedButton>
        <FilledButton onClick={accept}>승인</FilledButton>
      </section>
    </article>
  );
}
