"use client";

import MasonryContainer from "@/components/masonry/MasonryContainer";
import ArticlePreview from "./ArticlePreview";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { MyArticleListType } from "@/model/article";
import {
  getFavoriteArticleList,
  getMyArticleList
} from "@/service/axios/article";
import Link from "next/link";
import OutlinedButton from "@/components/ui/button/OutlinedButton";

interface Props {
  isFavorite?: boolean;
}

export default function MyArticleList({ isFavorite = false }: Props) {
  const { id: userId } = useAppSelector(state => state.userSlice);
  const [list, setList] = useState<MyArticleListType>([]);

  useEffect(() => {
    const getArticles = async () => {
      const articles = isFavorite
        ? await getFavoriteArticleList(1, 1000)
        : await getMyArticleList(1000);
      if (!articles) return;
      setList(articles);
    };

    getArticles();
  }, [userId, isFavorite]);

  return list.length === 0 ? (
    <section className="w-full flex flex-col justify-center items-center h-96 text-gray-500 gap-4 lg:text-2xl md:text-xl sm:text-base text-sm">
      <p>아직 {isFavorite ? "즐겨찾기를 등록한" : "작성된"} 포스팅이 없어요!</p>
      <p>
        {isFavorite
          ? "관심있는 포스팅을 즐겨찾기에 등록해보세요"
          : "직접 포스팅을 작성해보세요"}
        😁
      </p>
      <Link href={isFavorite ? "/article/list" : "/article/new"}>
        <OutlinedButton className="lg:text-xl md:text-base text-sm">
          {isFavorite ? "포스팅 목록" : "포스팅 작성하러 가기"}
        </OutlinedButton>
      </Link>
    </section>
  ) : (
    <MasonryContainer>
      {list.map(article => (
        <li className="grid-item mb-8 h-fit" key={article.id}>
          <ArticlePreview article={article} count={article.requestCount} />
        </li>
      ))}
    </MasonryContainer>
  );
}
