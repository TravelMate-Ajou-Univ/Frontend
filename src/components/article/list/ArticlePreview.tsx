import Image from "next/image";
import Link from "next/link";
import ArticleSummary from "./ArticleSummary";
import { ArticlePreviewType } from "@/model/article";

interface Props {
  article: ArticlePreviewType;
}

export default function ArticlePreview({
  article: { id, thumbnailUrl, title, keywords }
}: Props) {
  return (
    <Link href={`/article/${id}`}>
      <div className="w-full rounded-2xl border overflow-hidden">
        <Image
          className="w-96"
          src={thumbnailUrl}
          alt="썸네일"
          width={100}
          height={100}
        />
        <ArticleSummary title={title} keywords={keywords} />
      </div>
    </Link>
  );
}
