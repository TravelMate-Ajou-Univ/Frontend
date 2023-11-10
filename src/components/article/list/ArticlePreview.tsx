"use client";

import Image from "next/image";
import Link from "next/link";
import ArticleSummary from "./ArticleSummary";
import { ArticlePreviewType } from "@/model/article";
import React, { forwardRef, useEffect, useState } from "react";
import travelIcon from "/public/image/travelIcon.png";

type Props = {
  article: ArticlePreviewType;
} & React.ComponentProps<"div">;

const ArticlePreview = forwardRef<HTMLDivElement, Props>(
  ({ article: { id, title, thumbnail, articleTagMap } }, ref) => {
    const [keywords, setKeywords] = useState<{ id: number; name: string }[]>(
      []
    );

    useEffect(() => {
      const keywords = articleTagMap?.map(tag => {
        return {
          id: tag.tag.id,
          name: tag.tag.name
        };
      });
      setKeywords(keywords);
    }, [articleTagMap]);

    return (
      <div className="rounded-2xl border overflow-hidden w-96" ref={ref}>
        <Link href={`/article/${id}`}>
          <Image
            className="w-full"
            src={thumbnail ? thumbnail : travelIcon}
            alt="썸네일"
            // fill
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
