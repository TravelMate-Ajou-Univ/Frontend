import Map from "@/components/Map";
import { BookmarkData1 } from "@/data/bookmarkData";
import React from "react";

export default function page() {
  const bookmarks = BookmarkData1;
  return (
    <div className="h-[100vh] w-[100%]">
      <Map bookmarks={bookmarks} />
    </div>
  );
}
