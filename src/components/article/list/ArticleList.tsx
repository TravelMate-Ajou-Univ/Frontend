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

  const getArticles = useCallback(
    async (command: "new" | "add") => {
      // async () => {
      const location = searchParams.get("location") ?? "";
      const word = searchParams.get("word") ?? "";
      const seasons = searchParams.getAll("seasons");
      const period = seasons
        .map(season => season.toUpperCase())
        .join("&period=");

      if (command === "new" && page !== 1) return;
      if (command === "add" && page === 1) return;

      const data = await getArticleList(page, 10, period, location, word);

      if (!data) return;
      const { count, newArticles } = data;
      setCount(count);
      if (page === 1) {
        setList(newArticles);
        setPage(prev => prev + 1);
        return;
      }

      setPage(prev => prev + 1);

      setList(prev => {
        return [...prev, ...newArticles];
      });
    },
    [page, searchParams]
  );

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setTimeout(() => {
        if (entry.isIntersecting) {
          if (list.length >= count) {
            return;
          }
          getArticles("add");
        }
      }, 400);
    },
    [list, count, getArticles]
  );

  useEffect(() => {
    setCount(0);
    setPage(1);
    setList([]);
  }, [searchParams]);

  useEffect(() => {
    getArticles("new");
  }, [getArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
      root: null
    });

    const timeoutId = setTimeout(() => {
      targetRef.current && observer.observe(targetRef.current);
    }, 300);
    if (list.length >= count) {
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [handleIntersect, list, count]);

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
