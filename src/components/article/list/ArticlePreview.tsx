"use client";

import Image from "next/image";
import Link from "next/link";
import ArticleSummary from "./ArticleSummary";
import { ArticlePreviewType } from "@/model/article";
import React, { forwardRef, useEffect, useState } from "react";
import travelIcon from "/public/image/travelIcon.png";
import { useSearchParams } from "next/navigation";

type Props = {
  article: ArticlePreviewType;
} & React.ComponentProps<"div">;

const ArticlePreview = forwardRef<HTMLDivElement, Props>(
  (
    {
      article: {
        id,
        title,
        thumbnail,
        articleTagMap,
        springVersionID,
        summerVersionID,
        fallVersionID,
        winterVersionID
      }
    },
    ref
  ) => {
    const [keywords, setKeywords] = useState<{ id: number; name: string }[]>(
      []
    );
    const [season, setSeason] = useState<string>("");
    const searchParams = useSearchParams();

    useEffect(() => {
      const keywords = articleTagMap?.map(tag => {
        return {
          id: tag.tag.id,
          name: tag.tag.name
        };
      });
      setKeywords(keywords);
      if (searchParams.get("seasons")) setSeason(searchParams.get("seasons")!);
      else {
        if (springVersionID) setSeason("spring");
        else if (summerVersionID) setSeason("summer");
        else if (fallVersionID) setSeason("fall");
        else if (winterVersionID) setSeason("winter");
        else setSeason("srping");
      }
    }, [
      articleTagMap,
      season,
      searchParams,
      springVersionID,
      summerVersionID,
      fallVersionID,
      winterVersionID
    ]);

    return (
      <div className="rounded-2xl border overflow-hidden w-[25.8rem]" ref={ref}>
        <Link href={`/article/detail/${id}?season=${season}`}>
          <Image
            className="w-full"
            src={thumbnail ? thumbnail : travelIcon}
            alt="썸네일"
            width={100}
            height={100}
          />
          <ArticleSummary title={title} keywords={keywords} />
        </Link>
      </div>
    );
  }
);

ArticlePreview.displayName = "ArticlePreview";

export default ArticlePreview;
