"use client";

import { SeasonType } from "@/model/article";
import { useState } from "react";
import SeasonNav from "../ui/SeasonNav";
import Image from "next/image";
import map from "/public/image/map.png";

const ARTICLE_NUM_CLASS =
  "rounded-full px-5 py-1 border absolute bg-white hover:bg-gray-100 cursor-pointer";

export default function HomeMap() {
  const [season, setSeason] = useState<SeasonType>("SPRING");

  const selectSeason = (season: SeasonType) => {
    setSeason(season);
  };

  return (
    <section className="flex flex-col items-center">
      <SeasonNav season={season} onClick={selectSeason} />
      <div className="relative mt-2">
        <Image className="w-full" src={map} alt="지도" />
        <span className={ARTICLE_NUM_CLASS + " top-[20%] left-[25%]"}>21</span>
        <span className={ARTICLE_NUM_CLASS + " top-[26%] left-[32%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[16%] left-[55%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[40%] left-[30%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[45%] left-[65%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[64%] left-[23%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[65%] left-[53%]"}>26</span>
        <span className={ARTICLE_NUM_CLASS + " top-[92.5%] left-[21%]"}>
          26
        </span>
      </div>
    </section>
  );
}
