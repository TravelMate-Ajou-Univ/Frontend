import React from "react";
import Keyword from "../Keyword";

type Props = {
  list: string[];
  setSelected: (selected: string) => void;
  isSearchWord?: boolean;
  isKeyword?: boolean;
  size?: "small" | "mid";
};

function DropDownList({
  list,
  setSelected,
  isSearchWord = false,
  isKeyword = false,
  size = "mid"
}: Props) {
  return (
    <ul
      className={
        `absolute left-0 w-full border rounded-md bg-white z-50 
      ${isSearchWord ? "top-0" : "top-10"}` +
        (size == "small" ? " max-h-[7rem] h-fit overflow-y-auto" : "")
      }
    >
      {list.map((item, index) => (
        <li
          key={index}
          className={`py-1 hover:bg-gray-200 ${
            isSearchWord ? "px-3 text-sm" : "text-center"
          }`}
          onClick={() => setSelected(item)}
        >
          {isKeyword ? <Keyword keyword={item} /> : item}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(DropDownList);
