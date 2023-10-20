import React from "react";

export default function AddBookmarkCollection() {
  return (
    <form className="absolute w-[10rem] ml-[-4rem] mt-[1rem] flex flex-col p-3 items-center border-2 border-neutral-300 z-10 bg-white">
      <input
        className="w-full m-1 outline-none p-3 border-2"
        type="text"
        placeholder="북마크 제목..."
      />
      <div className="flex self-end font-bold gap-3 mr-1">
        <button className="hover:text-red-400">취소</button>
        <button className="hover:text-red-400">추가</button>
      </div>
    </form>
  );
}
