"use client";

import DropDown from "@/components/ui/dropDown/DropDown";
import { useEffect, useState } from "react";
import { locationList } from "@/lib/locationList";
import { seasonList, seasonMapper } from "@/lib/seasonList";
import KeywordInput from "./KeywordInput";
import dynamic from "next/dynamic";
import {
  editArticle,
  editArticleRequest,
  getArticle,
  postKeyword,
  submitArticle,
  uploadImage
} from "@/service/axios/article";
import Keyword from "@/components/ui/Keyword";
import {
  ArticleType,
  KeywordType,
  KoreanSeasonType,
  SeasonType
} from "@/model/article";
import { useRouter } from "next/navigation";
import ImageSection from "@/components/ui/ImageSection";
import FilledButton from "@/components/ui/button/FilledButton";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import { useAppSelector } from "@/hooks/redux";
import CommentForm from "./CommentForm";

const INPUT_CLASSNAME = "flex items-center gap-4";

const TextEditor = dynamic(() => import("@/components/reactQuill/TextEditor"), {
  ssr: false
});

interface Props {
  id?: string;
  edittngSeason?: SeasonType;
}

export default function ArticleForm({ id, edittngSeason }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [season, setSeason] = useState<KoreanSeasonType>("봄");
  const [keywords, setKeywords] = useState<KeywordType[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [receivedContent, setReceivedContent] = useState<string>("");
  const [receivedThumbnail, setReceivedThumbnail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { id: userId } = useAppSelector(state => state.userSlice);
  const [authorId, setAuthorId] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    const getOrigin = async () => {
      if (!id || !edittngSeason) return;
      const article = await getArticle(id);
      if (!article) return;
      setAuthorId(article.authorId);
      setTitle(article.title);
      setLocation(article.location);
      setKeywords(
        article.articleTagMap.map(tag => {
          return { id: tag.tag.id, name: tag.tag.name };
        })
      );
      setReceivedThumbnail(article.thumbnail);
      switch (edittngSeason) {
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

    getOrigin();
  }, [id, edittngSeason]);

  const handleLocation = (location: string) => {
    if (id) return;
    setLocation(location);
  };

  const handleSeason = (season: string) => {
    setSeason(season as KoreanSeasonType);
  };

  const addKeyword = async (keyword: string) => {
    if (id) return;
    const returnedKeyword = await postKeyword(keyword);
    if (!returnedKeyword) return;
    if (returnedKeyword.name.charAt(0) === "#") {
      returnedKeyword.name = returnedKeyword.name.substring(1);
    }
    setKeywords([...keywords, returnedKeyword]);
  };

  const removeKeyword = (index: number) => {
    if (id) return;
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
    if (!title) return alert("제목을 입력해주세요");
    if (!location) return alert("지역을 선택해주세요");
    if (!season) return alert("계절을 선택해주세요");
    if (!content) return alert("내용을 입력해주세요");
    if (!thumbnailFile) return alert("썸네일을 등록해주세요");

    const imgId = await uploadImage(thumbnailFile);
    const thumbnail = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=article`;
    const article: ArticleType = {
      title,
      period: seasonMapper[season] as SeasonType,
      location,
      content,
      tagIds: keywords.map(keyword => keyword.id),
      thumbnail
    };

    const articleId = await submitArticle(article);

    if (articleId) {
      alert("게시글이 등록되었습니다.");
      router.push(
        `/article/detail/${articleId}?season=${seasonMapper[
          season
        ].toLowerCase()}`
      );
    }
  };

  const edit = async () => {
    const editingSeason = seasonMapper[season] as SeasonType;
    if (authorId === userId) {
      const article: ArticleType = {
        title,
        period: editingSeason,
        location,
        content,
        tagIds: keywords.map(keyword => keyword.id),
        thumbnail: receivedThumbnail
      };
      const result = await editArticle(id as string, article);
      if (result) {
        alert("게시글이 수정되었습니다.");
        router.push(
          `/article/detail/${id}?season=${editingSeason.toLowerCase()}`
        );
      }
    } else {
      const result = await editArticleRequest(
        id as string,
        content,
        editingSeason,
        comment
      );
      if (result) {
        alert("수정 요청이 완료되었습니다.");
        router.push(
          `/article/detail/${id}?season=${editingSeason.toLowerCase()}`
        );
      }
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-white w-full mx-auto px-16 py-12 mb-12 border">
      <input
        className="focus:outline-none border-b px-2 py-1 text-lg disabled:bg-white"
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={!!id}
      />
      <div className="flex flex-row gap-28">
        <div className={INPUT_CLASSNAME}>
          <label>지역 </label>
          <DropDown
            selected={location}
            list={locationList}
            setSelected={handleLocation}
            disabled={!!id}
          />
        </div>
        <div className={INPUT_CLASSNAME}>
          <label>계절 </label>
          <DropDown
            selected={season}
            list={seasonList}
            setSelected={handleSeason}
            disabled={!!id}
          />
        </div>
      </div>
      <TextEditor
        setContents={value => setContent(value)}
        receivedContent={receivedContent}
      />
      {!id && (
        <ImageSection
          handleImage={handleThumbnail}
          thumbnailPreview={thumbnailPreview}
        />
      )}
      <div className={INPUT_CLASSNAME}>
        <label>키워드 </label>
        <KeywordInput addKeyword={addKeyword} disabled={!!id} />
      </div>
      <ul className="text-sm">
        {keywords.map((keyword, index) => (
          <li
            className="inline-block mr-4 cursor-pointer"
            key={keyword.id}
            onClick={() => removeKeyword(index)}
          >
            <Keyword keyword={keyword.name} />
          </li>
        ))}
      </ul>
      {id && authorId !== userId && (
        <CommentForm
          comment={comment}
          setComment={value => setComment(value)}
        />
      )}
      <section className="self-end flex gap-2">
        <OutlinedButton onClick={cancel}>취소</OutlinedButton>
        <FilledButton onClick={id ? edit : submit}>
          {id ? (authorId === userId ? "수정" : "수정 요청") : "작성"}
        </FilledButton>
      </section>
    </section>
  );
}
