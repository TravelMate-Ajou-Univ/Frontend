"use client";

import DropDown from "@/components/ui/DropDown/DropDown";
import { useState } from "react";
import { locationList } from "@/lib/locationList";
import { seasonList } from "@/lib/seasonList";
import KeywordInput from "./KeywordInput";
import dynamic from "next/dynamic";
import Keyword from "../ui/Keyword";
import { postKeyword } from "@/service/axios/posting";

const INPUT_CLASSNAME = "flex items-center gap-4";

const TextEditor = dynamic(() => import("../ReactQuill/TextEditor"), {
  ssr: false
});

export default function ArticleForm() {
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleLocation = (location: string) => {
    setLocation(location);
  };

  const handleSeason = (season: string) => {
    setSeason(season);
  };

  const addKeyword = async (keyword: string) => {
    postKeyword(keyword);
    if (keyword.charAt(0) === "#") {
      keyword = keyword.substring(1);
    }
    setKeywords([...keywords, keyword]);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((item, i) => i !== index));
  };

  return (
    <section className="flex flex-col gap-6 bg-white w-full mx-auto px-16 py-12 mb-12 border">
      <input
        className="focus:outline-none border-b px-2 py-1 text-lg"
        type="text"
        placeholder="제목"
      />
      <TextEditor />
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
      <div className={INPUT_CLASSNAME}>
        <label>키워드 </label>
        <KeywordInput addKeyword={addKeyword} />
      </div>
      <ul className="text-sm">
        {keywords.map((keyword, index) => (
          <li
            className="inline-block mr-4 cursor-pointer"
            key={index}
            onClick={() => removeKeyword(index)}
          >
            <Keyword keyword={keyword} />
          </li>
        ))}
      </ul>
    </section>
  );
}
