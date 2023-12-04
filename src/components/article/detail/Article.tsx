"use client";

import { ArticleDetailType, SeasonType } from "@/model/article";
import {
  deleteArticle,
  deleteFavorite,
  getArticle,
  getArticleRequestList,
  postFavorite
} from "@/service/axios/article";
import { useEffect, useState } from "react";
import ArticleContent from "./ArticleContent";
import Keyword from "@/components/ui/Keyword";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import { useRouter, useSearchParams } from "next/navigation";
import SeasonNav from "@/components/ui/SeasonNav";
import Author from "./Author";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import FilledButton from "@/components/ui/button/FilledButton";
import ArticleGoogleMap from "@/components/googleMap/ArticleGoogleMap";
import { BookmarkType } from "@/model/bookmark";
import FilledFavoriteIcon from "@/components/ui/icons/favorite/FilledFavoriteIcon";
import OutlinedFavoriteIcon from "@/components/ui/icons/favorite/OutlinedFavoriteIcon";

interface Props {
  articleId: string;
}

export default function Article({ articleId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [article, setArticle] = useState<ArticleDetailType | null>(null);
  const [bookmarks, setBookmarks] = useState<
    (BookmarkType & { period: SeasonType })[]
  >([]);
  const [requestCount, setRequestCount] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: userId } = useAppSelector(state => state.userSlice);
  const season = searchParams.get("season")?.toUpperCase() as SeasonType;

  useEffect(() => {
    const getArticleApi = async () => {
      const data = await getArticle(articleId, userId);
      if (!data) return;
      setArticle(data);
      setIsFavorite(data.isFavorite);
      const bookmarkList: (BookmarkType & { period: SeasonType })[] =
        data.articleBookmarkMap
          .filter(bookmark => bookmark.period === season)
          .map(bookmark => ({
            id: bookmark.bookmark.id,
            period: bookmark.period as SeasonType,
            placeId: bookmark.bookmark.location.placeId,
            content: bookmark.bookmark.content,
            latitude: Number(bookmark.bookmark.location.latitude),
            longitude: Number(bookmark.bookmark.location.longitude)
          }));

      setBookmarks(bookmarkList);

      if (userId === data.authorId) {
        const requests = await getArticleRequestList(
          articleId,
          season ?? "ALL"
        );
        if (!requests) return;
        setRequestCount(requests.length);
      }
    };

    getArticleApi();
  }, [articleId, searchParams, userId, season]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      const res = await deleteFavorite(articleId);
      if (!res) return;
    } else {
      const res = await postFavorite(articleId);
      if (!res) return;
    }
    setIsFavorite(!isFavorite);
  };

  const moveToEdit = () => {
    router.push(`/article/edit/${articleId}?season=${season.toLowerCase()}`);
  };

  const deleteThisArticle = async () => {
    const check = confirm("정말로 삭제하시겠습니까?");
    if (!check) return;

    const res = await deleteArticle(articleId);
    if (!res) alert("삭제에 실패했습니다.");
    else {
      alert("삭제되었습니다.");
      router.push("/article/list/me");
    }
  };

  return (
    <article className="relative flex flex-col items-center w-full bg-white shadow-lg rounded-xl pb-10 mb-16">
      {bookmarks.length > 0 && (
        <div className="w-full h-[30rem] rounded-t-xl overflow-hidden">
          <ArticleGoogleMap modifyState={false} bookmarks={bookmarks} />
        </div>
      )}
      <section className="w-full lg:px-12 md:px-10 sm:px-8 px-4 md:py-8 py-6">
        <nav className="mb-4 mx-auto">
          <SeasonNav
            season={season}
            onClick={value =>
              router.push(
                `/article/detail/${articleId}?season=${value.toLowerCase()}`
              )
            }
          />
        </nav>
        {article && (
          <div className="w-full flex flex-col md:gap-4 gap-2">
            <section className="flex items-start gap-2">
              <div className="flex-grow">
                <button
                  className={`self-center divide-x border border-secondary rounded-md flex items-center px-1 mb-1 ${
                    isFavorite ? "bg-summer" : "bg-white"
                  }`}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <FilledFavoriteIcon className="px-1 py-0.5" />
                  ) : (
                    <OutlinedFavoriteIcon className="px-1 py-0.5" />
                  )}
                  <span className="px-1 py-0.5 text-sm text-secondary font-medium">
                    즐겨찾기
                  </span>
                </button>
                <h1 className="md:text-2xl text-xl font-bold ">
                  {article.title}
                </h1>
              </div>
              <section className="flex flex-col items-end gap-1">
                {article && <Author authorId={article.authorId} />}
                {article && userId === article.authorId && (
                  <Link
                    className="rounded-full border w-fit px-3 py-0.5 md:text-base text-sm"
                    href={`/article/request/${articleId}?season=${season.toLowerCase()}`}
                  >
                    수정요청{" "}
                    <span className="text-red-500 font-semibold">
                      {requestCount}
                    </span>
                  </Link>
                )}
              </section>
            </section>
            <ul className="mb-4">
              {article.articleTagMap.map(keyword => (
                <li
                  className="inline-block md:mr-2 mr-1 md:mb-1.5 mb-1"
                  key={keyword.tagId}
                >
                  <Keyword keyword={keyword.tag.name} />
                </li>
              ))}
            </ul>
            <ArticleContent article={article} season={season} userId={userId} />
          </div>
        )}
      </section>
      <section className="flex flex-row gap-2 mt-8">
        {userId === article?.authorId && (
          <FilledButton onClick={deleteThisArticle}>게시글 삭제</FilledButton>
        )}
        <OutlinedButton className="self-center" onClick={moveToEdit}>
          {article?.authorId === userId
            ? "작성/수정하기"
            : "수정/추가 제안하기"}
        </OutlinedButton>
      </section>
    </article>
  );
}
