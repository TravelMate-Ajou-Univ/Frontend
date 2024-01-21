"use client";

import DropDown from "@/components/ui/dropDown/DropDown";
import { useEffect, useState } from "react";
import { locationList } from "@/lib/locationList";
import { seasonList, seasonMapper } from "@/lib/seasonList";
import dynamic from "next/dynamic";
import { getArticle, postKeyword } from "@/service/axios/article";
import { KeywordType, KoreanSeasonType, SeasonType } from "@/model/article";
import { useRouter } from "next/navigation";
import ImageSection from "@/components/ui/ImageSection";
import FilledButton from "@/components/ui/button/FilledButton";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import { useAppSelector } from "@/hooks/redux";
import CommentForm from "./CommentForm";
import ArticleGoogleMap from "@/components/googleMap/ArticleGoogleMap";
import { BookmarkType } from "@/model/bookmark";
import {
  editRequestAndRedirect,
  handleImgInContent,
  setBookmarks,
  setContents,
  submitAndRedirect,
  validateArticleForm
} from "@/service/article/articleForm";
import { getImgUrl } from "@/service/handleImg";
import KeywordInputContainer from "./keyword/KeywordInputContainer";
import { useQuery } from "react-query";
import { queryKey } from "@/lib/queryKey";
import { useEditArticleQuery } from "@/service/react-query/article";

const INPUT_CLASSNAME = "flex items-center md:gap-4 gap-2 md:text-base text-sm";

const TextEditor = dynamic(() => import("@/components/reactQuill/TextEditor"), {
  ssr: false
});

interface Props {
  edittingId?: string;
  edittingSeason?: SeasonType;
}

export default function ArticleForm({ edittingId, edittingSeason }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [season, setSeason] = useState<KoreanSeasonType>("봄");
  const [keywords, setKeywords] = useState<KeywordType[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [bookmarkIds, setBookmarkIds] = useState<number[]>([]);

  const [receivedContent, setReceivedContent] = useState<string>("");
  const [receivedThumbnail, setReceivedThumbnail] = useState<string>("");
  const [receivedBookmarks, setReceivedBookmarks] = useState<
    (BookmarkType & { period: SeasonType })[]
  >([]);
  const [receivedBookmarkIds, setReceivedBookmarkIds] = useState<number[]>([]);
  const [comment, setComment] = useState<string>("");
  const [authorId, setAuthorId] = useState<number>(-1);

  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  const { id: userId } = useAppSelector(state => state.userSlice);
  const router = useRouter();

  const article = useEditArticleQuery(edittingId, edittingSeason);

  useEffect(() => {
    if (!article) return;
    setInputDisabled(article.authorId !== userId);
    setAuthorId(article.authorId);
    setTitle(article.title);
    setLocation(article.location);
    setKeywords(
      article.articleTagMap.map(tag => {
        return { id: tag.tag.id, name: tag.tag.name };
      })
    );
    setThumbnailPreview(article.thumbnail);
    setReceivedThumbnail(article.thumbnail);
    setBookmarks(
      article,
      seasonMapper[season] as SeasonType,
      setReceivedBookmarks,
      setBookmarkIds,
      setReceivedBookmarkIds
    );
    setContents(
      edittingSeason as SeasonType,
      article,
      setSeason,
      setReceivedContent
    );
  }, [article, edittingSeason, season, userId]);

  const handleLocation = (location: string) => {
    if (edittingId) return;
    setLocation(location);
  };

  const handleSeason = (season: string) => {
    setSeason(season as KoreanSeasonType);
  };

  const addKeyword = async (keyword: string) => {
    const returnedKeyword = await postKeyword(keyword);
    if (!returnedKeyword) return;
    if (returnedKeyword.name.charAt(0) === "#") {
      returnedKeyword.name = returnedKeyword.name.substring(1);
    }
    setKeywords([...keywords, returnedKeyword]);
  };

  const removeKeyword = (index: number) => {
    if (userId !== authorId) return;
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const cancel = () => {
    confirm("작성을 취소하시겠습니까?") && router.back();
  };

  const submit = async () => {
    if (!validateArticleForm(title, location, season, content, thumbnailFile))
      return;

    const newContent = await handleImgInContent(content);
    if (!newContent) return;
    const thumbnail = await getImgUrl(thumbnailFile as File, "thumbnail");
    if (!thumbnail) return;

    submitAndRedirect(
      title,
      seasonMapper[season] as SeasonType,
      location,
      newContent,
      keywords,
      thumbnail,
      bookmarkIds,
      router
    );
  };

  const edit = async () => {
    const edittingSeason = seasonMapper[season] as SeasonType;
    const newContent = await handleImgInContent(content);
    if (!newContent) return;

    if (authorId === userId) {
      let thumbnail: string | null = receivedThumbnail;
      if (thumbnailFile) {
        thumbnail = await getImgUrl(thumbnailFile as File, "thumbnail");
        if (!thumbnail) return;
      }
      submitAndRedirect(
        title,
        edittingSeason,
        location,
        newContent,
        keywords,
        thumbnail,
        bookmarkIds,
        router,
        edittingId as string
      );
    } else {
      editRequestAndRedirect(
        edittingId as string,
        newContent,
        edittingSeason,
        comment,
        bookmarkIds,
        receivedBookmarkIds,
        router
      );
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-white w-full mx-auto lg:px-16 md:px-12 sm:px-8 px-4 lg:py-12 md:py-9 sm:py-6 py-3 mb-12 border">
      <input
        className="focus:outline-none border-b px-2 py-1 md:text-lg disabled:bg-white"
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={inputDisabled}
      />
      <div className="flex flex-row lg:gap-28 md:gap-20 sm:gap-12 gap-4">
        <div className={INPUT_CLASSNAME}>
          <label>지역 </label>
          <DropDown
            selected={location}
            list={locationList}
            setSelected={handleLocation}
            disabled={!!edittingId}
          />
        </div>
        <div className={INPUT_CLASSNAME}>
          <label>계절 </label>
          <DropDown
            selected={season}
            list={seasonList}
            setSelected={handleSeason}
            disabled={!!edittingId}
          />
        </div>
      </div>
      <TextEditor
        setContents={value => setContent(value)}
        receivedContent={receivedContent}
      />
      <section className="w-full h-96">
        <ArticleGoogleMap
          modifyState={true}
          location={location}
          setBookmarkIds={setBookmarkIds}
          bookmarks={edittingId ? receivedBookmarks : undefined}
        />
      </section>
      {(!edittingId || authorId === userId) && (
        <ImageSection
          handleImage={handleThumbnail}
          thumbnailPreview={thumbnailPreview}
        />
      )}
      <KeywordInputContainer
        keywords={keywords}
        addKeyword={addKeyword}
        removeKeyword={removeKeyword}
        disabled={inputDisabled}
      />
      {edittingId && authorId !== userId && (
        <CommentForm
          comment={comment}
          setComment={value => setComment(value)}
        />
      )}
      <section className="self-end flex gap-2">
        <OutlinedButton onClick={cancel}>취소</OutlinedButton>
        <FilledButton onClick={edittingId ? edit : submit}>
          {edittingId ? (authorId === userId ? "수정" : "수정 요청") : "작성"}
        </FilledButton>
      </section>
    </section>
  );
}
