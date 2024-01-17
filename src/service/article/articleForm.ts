import {
  ArticleDetailType,
  ArticleType,
  KeywordType,
  KoreanSeasonType,
  SeasonType
} from "@/model/article";
import {
  editArticle,
  editArticleRequest,
  submitArticle,
  uploadImage
} from "../axios/article";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { BookmarkType, LocationType } from "@/model/bookmark";
import { SetStateAction } from "react";

export const setBookmarks = (
  article: ArticleDetailType,
  season: SeasonType,
  setReceivedBookmarks: (
    value: SetStateAction<
      (LocationType & {
        content?: string | undefined;
        placeId: string;
        id: number;
        period: SeasonType;
      })[]
    >
  ) => void,
  setBookmarkIds: (value: SetStateAction<number[]>) => void,
  setReceivedBookmarkIds: (value: SetStateAction<number[]>) => void
) => {
  if (article.articleBookmarkMap.length > 0) {
    const bookmarkList: (BookmarkType & { period: SeasonType })[] =
      article.articleBookmarkMap
        .filter(bookmark => bookmark.period === season)
        .map(bookmark => ({
          id: bookmark.bookmark.id,
          period: bookmark.period as SeasonType,
          placeId: bookmark.bookmark.location.placeId,
          content: bookmark.bookmark.content,
          latitude: Number(bookmark.bookmark.location.latitude),
          longitude: Number(bookmark.bookmark.location.longitude)
        }));
    setReceivedBookmarks(bookmarkList);
    const bookmarkIdList = bookmarkList.map(bookmark => bookmark.id);
    setBookmarkIds(bookmarkIdList);
    setReceivedBookmarkIds(bookmarkIdList);
  }
};

export const setContents = (
  edittingSeason: SeasonType,
  article: ArticleDetailType,
  setSeason: (value: SetStateAction<KoreanSeasonType>) => void,
  setReceivedContent: (value: SetStateAction<string>) => void
): void => {
  switch (edittingSeason) {
    case "SPRING":
      setSeason("봄");
      setReceivedContent(article.spring?.content);
      break;
    case "SUMMER":
      setSeason("여름");
      setReceivedContent(article.summer?.content);
      break;
    case "FALL":
      setSeason("가을");
      setReceivedContent(article.fall?.content);
      break;
    case "WINTER":
      setSeason("겨울");
      setReceivedContent(article.winter?.content);
      break;
  }
};

export const validateArticleForm = (
  title: string,
  location: string,
  season: KoreanSeasonType,
  content: string,
  thumbnail: File | null
): boolean => {
  if (!title) {
    alert("제목을 입력해주세요.");
    return false;
  }
  if (!location) {
    alert("장소를 입력해주세요.");
    return false;
  }
  if (!season) {
    alert("계절을 선택해주세요.");
    return false;
  }
  if (!content) {
    alert("내용을 입력해주세요.");
    return false;
  }
  if (!thumbnail) {
    alert("썸네일을 선택해주세요.");
    return false;
  }

  return true;
};

export const handleImgInContent = async (
  content: string
): Promise<string | null> => {
  const regex = /<img.*?src="(.*?)"/g;
  let match;
  let newContent = content;

  while ((match = regex.exec(content)) !== null) {
    const base64Image = match[1];
    if (!base64Image) return null;

    const response = await fetch(base64Image);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: "image" });

    try {
      const imgId = await uploadImage(file, "article");
      if (!imgId) throw new Error();
      const imgURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=article`;
      const replacedContent = newContent.replace(base64Image, imgURL);
      newContent = replacedContent;
    } catch (error) {
      alert("업로드에 실패했습니다.");
      return null;
    }
  }

  return newContent;
};

export const submitAndRedirect = async (
  title: string,
  season: SeasonType,
  location: string,
  content: string,
  keywords: KeywordType[],
  thumbnail: string,
  bookmarkIds: number[] | undefined,
  router: AppRouterInstance,
  edditingId?: string
) => {
  const article: ArticleType = {
    title,
    period: season,
    location,
    content,
    tagIds: keywords.map(keyword => keyword.id),
    thumbnail,
    bookmarkIds
  };

  let articleId: string | false = false;
  let message: string | undefined;

  if (edditingId) {
    const result = await editArticle(edditingId, article);
    if (result) {
      message = "게시글이 수정되었습니다.";
      articleId = edditingId;
    }
  } else {
    articleId = await submitArticle(article);
    if (articleId) {
      message = "게시글이 등록되었습니다.";
    }
  }

  if (article && message) {
    alert(message);
    router.push(`/article/detail/${articleId}?season=${season.toLowerCase()}`);
  }
};

export const editRequestAndRedirect = async (
  edittingId: string,
  content: string,
  edittingSeason: SeasonType,
  comment: string,
  curBookmarkIds: number[],
  receivedBookmarkIds: number[],
  router: AppRouterInstance
) => {
  const bookmarksToRemove = receivedBookmarkIds.filter(
    bookmarkId => !curBookmarkIds.includes(bookmarkId)
  );
  const bookmarksToAdd = curBookmarkIds.filter(
    bookmarkId => !receivedBookmarkIds.includes(bookmarkId)
  );
  const result = await editArticleRequest(
    edittingId as string,
    content,
    edittingSeason,
    comment,
    bookmarksToRemove,
    bookmarksToAdd
  );
  if (result) {
    alert("수정 요청이 완료되었습니다.");
    router.push(
      `/article/detail/${edittingId}?season=${edittingSeason.toLowerCase()}`
    );
  }
};
