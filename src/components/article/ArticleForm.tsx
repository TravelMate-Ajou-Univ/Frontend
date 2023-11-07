"use client";

import DropDown from "@/components/ui/DropDown/DropDown";
import { useState } from "react";
import { locationList } from "@/lib/locationList";
import { seasonList, seasonMapper } from "@/lib/seasonList";
import KeywordInput from "./KeywordInput";
import dynamic from "next/dynamic";
import {
  postKeyword,
  submitArticle,
  uploadImage
} from "@/service/axios/article";
import Keyword from "../ui/Keyword";
import {
  ArticleType,
  KeywordType,
  KoreanSeasonType,
  SeasonType
} from "@/model/article";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageSection from "../ui/ImageSection";
import FilledButton from "../ui/Button/FilledButton";

const INPUT_CLASSNAME = "flex items-center gap-4";

const TextEditor = dynamic(() => import("../ReactQuill/TextEditor"), {
  ssr: false
});

export default function ArticleForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [season, setSeason] = useState<KoreanSeasonType>("봄");
  const [keywords, setKeywords] = useState<KeywordType[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleLocation = (location: string) => {
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
    setKeywords(keywords.filter((item, i) => i !== index));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
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

    if (await submitArticle(article)) {
      alert("게시글이 등록되었습니다.");
      router.push("/");
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-white w-full mx-auto px-16 py-12 mb-12 border">
      <input
        className="focus:outline-none border-b px-2 py-1 text-lg"
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="flex flex-row gap-28">
        <div className={INPUT_CLASSNAME}>
          <label>지역 </label>
          <DropDown
            selected={location}
            list={locationList}
            setSelected={handleLocation}
          />
        </div>
        <div className={INPUT_CLASSNAME}>
          <label>계절 </label>
          <DropDown
            selected={season}
            list={seasonList}
            setSelected={handleSeason}
          />
        </div>
      </div>
      <TextEditor setContents={value => setContent(value)} />
      <ImageSection
        handleImage={handleThumbnail}
        thumbnailPreview={thumbnailPreview}
      />
      <div className={INPUT_CLASSNAME}>
        <label>키워드 </label>
        <KeywordInput addKeyword={addKeyword} />
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
      <FilledButton className="self-end" onClick={submit}>
        작성
      </FilledButton>
    </section>
  );
}
