"use client";

import Map from "@/components/Map";
import { useSearchParams } from "next/navigation";

export default function BookmarkPage() {
  const params = useSearchParams();
  const test = params.get("bookmarks") === null ? "" : params.get("bookmarks");
  const bookmarks = JSON.parse(test!);

  return (
    <section className="flex flex-col items-center">
      <p className="self-start text-3xl font-bold ml-[7rem]">
        {params.get("title")}
      </p>
      <div className="w-[60vw] h-[70vh] border-2 m-4">
        <Map bookmarks={bookmarks} />
      </div>
      <div className="self-end flex font-bold gap-3 mr-[8rem]">
        <button className="border-2 px-3 py-2 rounded-lg hover:text-red-400">
          삭제
        </button>
        <button className="border-2 px-3 py-2 rounded-lg hover:text-red-400">
          수정
        </button>
      </div>
    </section>
  );
}
