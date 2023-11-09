import Image from "next/image";
import Link from "next/link";
import ArticleSummary from "./ArticleSummary";
import { ArticlePreviewType } from "@/model/article";
import React, { forwardRef } from "react";

type Props = {
  article: ArticlePreviewType;
} & React.ComponentProps<"div">;

const ArticlePreview = forwardRef<HTMLDivElement, Props>(
  ({ article: { id, thumbnailUrl, title, keywords } }, ref) => {
    return (
      <div className="rounded-2xl border overflow-hidden" ref={ref}>
        <Link href={`/article/${id}`}>
          <Image
            className="w-96"
            src={thumbnailUrl}
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

export default React.memo(ArticlePreview);
