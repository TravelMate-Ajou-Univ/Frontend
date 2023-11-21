"use client";

import MasonryContainer from "@/components/masonry/MasonryContainer";
import ArticlePreview from "./ArticlePreview";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { ArticlePreviewType } from "@/model/article";
import { getMyArticleList } from "@/service/axios/article";
import Link from "next/link";
import OutlinedButton from "@/components/ui/button/OutlinedButton";

export default function MyArticleList() {
  const { id: userId } = useAppSelector(state => state.userSlice);
  const [list, setList] = useState<ArticlePreviewType[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      const articles = await getMyArticleList(1000, userId);
      if (!articles) return;
      setList(articles);
    };

    getArticles();
  }, [userId]);

  return list.length === 0 ? (
    <section className="w-full flex flex-col justify-center items-center h-96 text-gray-500 text-2xl gap-4">
      <p>아직 작성된 포스팅이 없어요!</p>
      <p>직접 포스팅을 작성해보세요😁</p>
      <Link href="/article/new">
        <OutlinedButton className="text-xl">
          포스팅 작성하러 가기
        </OutlinedButton>
      </Link>
    </section>
  ) : (
    <MasonryContainer>
      {list.map(article => (
        <li className="grid-item mb-8 h-fit" key={article.id}>
          <ArticlePreview article={article} />
        </li>
      ))}
    </MasonryContainer>
  );
}
