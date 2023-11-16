"use client";

import { ArticleDetailType, SeasonType } from "@/model/article";
import { getArticle } from "@/service/axios/article";
import { useEffect, useState } from "react";
import ArticleContent from "./ArticleContent";
import Keyword from "@/components/ui/Keyword";
import OutlinedButton from "@/components/ui/button/OutlinedButton";
import { useRouter, useSearchParams } from "next/navigation";
import SeasonNav from "@/components/ui/SeasonNav";
import Author from "./Author";

interface Props {
  articleId: string;
}

export default function Article({ articleId }: Props) {
  const [article, setArticle] = useState<ArticleDetailType | null>(null);
  const [season, setSeason] = useState<SeasonType>("SPRING");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getArticleApi = async () => {
      const data = await getArticle(articleId);
      if (!data) return;
      setArticle(data);
    };
    setSeason(searchParams.get("season")?.toUpperCase() as SeasonType);
    getArticleApi();
  }, [articleId, searchParams]);

  const moveToEdit = () => {
    router.push(`/article/edit/${articleId}?season=${season.toLowerCase()}`);
  };

  return (
    <article className="relative flex flex-col items-center gap-8 w-full bg-white shadow-lg rounded-xl pb-10 mb-16">
      <nav className="absolute -left-12 top-5">
        <SeasonNav season={season} onClick={value => setSeason(value)} />
      </nav>
      {article && <Author authorId={article.authorId} />}
      <section className="w-full px-12 py-8">
        {article && (
          <div className="w-full flex flex-col gap-4">
            <ul>
              {article.articleTagMap.map(keyword => (
                <li className="inline-block mr-2" key={keyword.tagId}>
                  <Keyword keyword={keyword.tag.name} />
                </li>
              ))}
            </ul>
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <ArticleContent article={article} season={season} />
          </div>
        )}
      </section>
      <OutlinedButton className="self-center" onClick={moveToEdit}>
        수정/추가 제안하기
      </OutlinedButton>
    </article>
  );
}
