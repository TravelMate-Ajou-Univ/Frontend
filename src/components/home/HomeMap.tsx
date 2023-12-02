"use client";

import { ArticleCountType, SeasonType } from "@/model/article";
import { useEffect, useState } from "react";
import SeasonNav from "../ui/SeasonNav";
import Image from "next/image";
import map from "/public/image/map.png";
import { articleCount } from "@/service/axios/article";
import _ from "lodash";
import Link from "next/link";

const ARTICLE_NUM_CLASS =
  "rounded-full md:px-5 sm:px-4 px-3 py-1 md:py-0.5 border absolute bg-white hover:bg-gray-100 md:text-base sm:text-sm text-xs cursor-pointer";

export default function HomeMap() {
  const [season, setSeason] = useState<SeasonType>("SPRING");
  const [articleCounts, setArticleCounts] = useState<ArticleCountType[]>([]);

  useEffect(() => {
    const getArticleCounts = async () => {
      const data = await articleCount(season);
      if (!data)
        return alert("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
      setArticleCounts(data);
    };

    getArticleCounts();
  }, [season]);

  const selectSeason = (season: SeasonType) => {
    setSeason(season);
  };

  const getArticleCount = (location: string) => {
    return _.find(articleCounts, item => item.location === location)?.count;
  };

  return (
    <section className="flex flex-col items-center">
      <SeasonNav season={season} onClick={selectSeason} />
      <div className="relative mt-2 w-2/3">
        <Image
          className="w-full"
          src={map}
          alt="지도"
          width={10000}
          height={10000}
        />
        <Link
          href={`/article/list/?location=서울&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[20%] left-[25%]"}>
            {getArticleCount("서울")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=경기/인천&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[26%] left-[32%]"}>
            {getArticleCount("경기/인천")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=강원&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[16%] left-[55%]"}>
            {getArticleCount("강원")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=충청/대전&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[40%] left-[30%]"}>
            {getArticleCount("충청/대전")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=경북/대구&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[45%] left-[65%]"}>
            {getArticleCount("경북/대구")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=전라/광주&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[64%] left-[23%]"}>
            {getArticleCount("전라/광주")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=경남/울산/부산&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[65%] left-[53%]"}>
            {getArticleCount("경남/울산/부산")}
          </span>
        </Link>
        <Link
          href={`/article/list/?location=제주&seasons=${season.toLowerCase()}`}
        >
          <span className={ARTICLE_NUM_CLASS + " top-[92.5%] left-[21%]"}>
            {getArticleCount("제주")}
          </span>
        </Link>
      </div>
    </section>
  );
}
