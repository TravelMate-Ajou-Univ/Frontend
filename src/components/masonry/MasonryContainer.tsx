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
    if (msnry.on) {
      msnry.on("layoutComplete", function (items: any) {
        console.log(items.length);
      });
    }
    if (msnry.layout) msnry.layout();
  }, [children]);

  return <ul className="grid-masonry grid w-full">{children}</ul>;
}
