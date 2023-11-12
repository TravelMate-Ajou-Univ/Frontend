"use client";

import Masonry from "masonry-layout";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function MasonryContainer({ children }: Props) {
  useEffect(() => {
    const msnry = new Masonry(".grid-masonry", {
      itemSelector: ".grid-item",
      fitWidth: true,
      gutter: 20,
      initLayout: false
    });
    const intervalId = setInterval(() => {
      if (msnry && msnry.layout) msnry.layout();
    }, 10);

    const timdoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timdoutId);
    };
  }, [children]);

  return <ul className="grid-masonry w-full">{children}</ul>;
}
