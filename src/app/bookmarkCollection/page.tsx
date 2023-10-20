"use client";

import AddBookmarkCollection from "@/components/AddBookmarkCollection";
import BookmarkCollection from "@/components/BookmarkCollection";
import { bookmarkCollectionListData } from "@/data/bookmarkData";
import { useState } from "react";

export default function BookmarkPage() {
  const [modalBtn, setModalBtn] = useState(false);
  const test_data = bookmarkCollectionListData;

  const addBookmark = () => {
    setModalBtn(!modalBtn);
  };

  return (
    <section className="w-full p-4">
      <div className="flex flex-col w-[60%] mx-auto">
        <div className="self-end">
          <button
            className="w-fit border-2 rounded-md p-2"
            onClick={addBookmark}
          >
            <p>북마크 추가</p>
          </button>
          {modalBtn ? <AddBookmarkCollection /> : <></>}
        </div>
        <div className="my-4 border-4 rounded-md p-7 ">
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {test_data.map((bookmarkCollection, index) => (
              <li key={index}>
                <BookmarkCollection bookmarkCollection={bookmarkCollection} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
