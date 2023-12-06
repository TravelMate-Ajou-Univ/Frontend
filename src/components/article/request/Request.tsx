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
import { SyntheticEvent, useEffect, useState } from "react";
import { parseDiff } from "react-diff-view";
import Dompurify from "dompurify";
import Diff from "./Diff";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import FilledButton from "@/components/ui/button/FilledButton";
import { useRouter } from "next/navigation";
import Comment from "./Comment";
import { BookmarkType } from "@/model/bookmark";
import ArticleGoogleMap from "@/components/googleMap/ArticleGoogleMap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AlertIcon from "@/components/ui/icons/AlertIcon";
import ReportModal from "@/components/ui/report/ReportModal";
import { cancelReport, report } from "@/service/report";
const { formatLines, diffLines } = require("unidiff");

interface Props {
  articleId: string;
  requestId: string;
}

export default function Request({ articleId, requestId }: Props) {
  const [preview, setPreview] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [originArticle, setOriginArticle] = useState<string>("");
  const [originBookmarks, setOriginBookmarks] = useState<
    (BookmarkType & { period: SeasonType })[]
  >([]);
  const [requestArticle, setRequestArticle] = useState<string>("");
  const [requestBookmarks, setRequestBookmarks] = useState<
    (BookmarkType & { period: SeasonType })[]
  >([]);
  const [requestUser, setRequestUser] = useState<User>();
  const [requestComment, setRequestComment] = useState<string>("");
  const [requestPeriod, setRequestPeriod] = useState<SeasonType>("SPRING");
  const [diff, setDiff] = useState<any>();
  const [value, setValue] = useState<number>(1);
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

      setLocation(origin.location);
      const bookmarkList: (BookmarkType & { period: SeasonType })[] =
        origin.articleBookmarkMap
          .filter(bookmark => bookmark.period === request.period)
          .map(bookmark => ({
            id: bookmark.bookmark.id,
            period: bookmark.period as SeasonType,
            placeId: bookmark.bookmark.location.placeId,
            content: bookmark.bookmark.content,
            latitude: Number(bookmark.bookmark.location.latitude),
            longitude: Number(bookmark.bookmark.location.longitude)
          }));

      setOriginBookmarks(bookmarkList);
      setRequestBookmarks(bookmarkList);
      request.PendingArticleRequestBookmarkMap.map((bookmark: any) => {
        if (bookmark.type === "REMOVE") {
          setRequestBookmarks(prev =>
            prev.filter(
              requestBookmark => requestBookmark.id !== bookmark.bookmark.id
            )
          );
        } else {
          setRequestBookmarks(prev => [
            ...prev,
            {
              id: bookmark.bookmark.id,
              period: request.period as SeasonType,
              placeId: bookmark.bookmark.location.placeId,
              content: bookmark.bookmark.content,
              latitude: Number(bookmark.bookmark.location.latitude),
              longitude: Number(bookmark.bookmark.location.longitude)
            }
          ]);
        }
      });

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

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

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
    <>
      <article className="flex flex-col gap-3 w-full bg-white shadow-lg rounded-xl px-11 py-8 mb-16">
        <section className="px-2 flex justify-between items-start">
          <div className="flex flex-col grow">
            <p className="text-xl font-bold">수정 요청</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                {requestUser?.userName}님의 요청
              </p>
              <button
                className={`self-center divide-x border rounded-md flex items-center px-1 mb-1`}
                onClick={() => setReportModal(true)}
              >
                <AlertIcon className="px-1 py-0.5" />
                <span className="px-1 py-0.5 text-sm text-red-400">
                  수정 요청자 신고
                </span>
              </button>
            </div>
          </div>
          <button
            className="font-semibold text-secondary border border-secondary px-2 rounded-md"
            onClick={() => setPreview(prev => !prev)}
          >
            {preview ? "미리보기 해제" : "미리보기"}
          </button>
        </section>
        <hr />
        {!preview && (
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="disabled tabs example"
          >
            <Tab label="Origin" />
            <Tab label="Request" />
          </Tabs>
        )}
        <div className={`w-full h-[30rem] rounded-xl overflow-hidden`}>
          {value === 0 && !preview ? (
            <ArticleGoogleMap
              modifyState={false}
              bookmarks={originBookmarks}
              location={originBookmarks.length === 0 ? location : undefined}
            />
          ) : (
            <ArticleGoogleMap
              modifyState={false}
              bookmarks={requestBookmarks}
              location={requestBookmarks.length === 0 ? location : undefined}
            />
          )}
        </div>
        {preview ? (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(requestArticle)
            }}
          />
        ) : (
          <>
            <hr />
            <Diff diff={diff} originArticle={originArticle} />
          </>
        )}
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
      {reportModal && requestUser && (
        <ReportModal
          name={requestUser?.userName || ""}
          setReportContent={setReportContent}
          cancel={() => cancelReport(() => setReportModal(false))}
          submit={() =>
            report("user", requestUser.id, reportContent, () =>
              setReportModal(false)
            )
          }
        />
      )}
    </>
  );
}
