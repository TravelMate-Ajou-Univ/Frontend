"use client";

import ArticlePreview from "./ArticlePreview";
import { articles } from "@/data/articles";
import { useCallback, useEffect, useRef, useState } from "react";
import MasonryContainer from "@/components/masonry/MasonryContainer";

export default function ArticleList() {
  const targetRef = useRef<HTMLDivElement>(null);

  const [list, setList] = useState([...articles, ...articles, ...articles]);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setList(prev => {
          return [...prev, ...articles];
        });
      }
    },
    []
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null
    });

    targetRef.current && observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, list]);

  return (
    <MasonryContainer>
      {list.map((article, index) => (
        <li
          className="grid-item mb-8"
          key={index}
          // key={article.id}
        >
          <ArticlePreview
            article={article}
            ref={index === list.length - 1 ? targetRef : null}
          />
        </li>
      ))}
    </MasonryContainer>
  );
}
