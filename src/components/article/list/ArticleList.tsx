"use client";

import ArticlePreview from "./ArticlePreview";
import { useCallback, useEffect, useRef, useState } from "react";
import MasonryContainer from "@/components/masonry/MasonryContainer";
import { ArticlePreviewType } from "@/model/article";
import { getArticleList } from "@/service/axios/article";
import { useSearchParams } from "next/navigation";

export default function ArticleList() {
  const [list, setList] = useState<ArticlePreviewType[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const location = searchParams.get("location") ?? "";
  const word = searchParams.get("word") ?? "";

  const getArticles = useCallback(
    async (command: "new" | "add") => {
      const data = await getArticleList(page, 10, "", location, word);

      if (!data) return;
      const { count, newArticles } = data;
      setCount(count);
      if (command === "new") {
        setList(newArticles);
        return;
      }

      setPage(prev => prev + 1);

      setList(prev => {
        if (prev.length === 0) return newArticles;
        return [...prev, newArticles];
      });
    },
    [location, word, page]
  );

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        if (list.length >= count) {
          return;
        }
        getArticles("add");
      }
    },
    [list, count, getArticles]
  );

  useEffect(() => {
    setCount(0);
    setList([]);
  }, [location, word]);

  useEffect(() => {
    getArticles("new");
  }, [getArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null
    });

    targetRef.current && observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  return (
    <MasonryContainer>
      {list.map((article, index) => (
        <li className="grid-item mb-8 h-fit" key={article.id}>
          <ArticlePreview
            article={article}
            ref={index === list.length - 1 ? targetRef : null}
          />
        </li>
      ))}
    </MasonryContainer>
  );
}
