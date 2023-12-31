"use client";

import { useState } from "react";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import DropDownList from "@/components/ui/dropDown/DropDownList";
import useOutSideRef from "@/hooks/useClickOutside";
import { getKeywords } from "@/service/axios/article";

interface Props {
  addKeyword: (keyword: string) => void;
  disabled?: boolean;
}

export default function KeywordInput({ addKeyword, disabled = false }: Props) {
  const [keyword, setKeyword] = useState<string>("");
  const [searchedKeyword, setSearchedKeyword] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const ref = useOutSideRef(() => setDropdown(false));

  const addKeywordList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addKeyword(keyword);
    setKeyword("");
  };

  const handleKeyword = async (keyword: string) => {
    setKeyword(keyword);
    if (keyword === "") {
      setDropdown(false);
      return;
    }
    const keywords = await getKeywords(keyword);
    if (keywords) {
      setSearchedKeyword(keywords.slice(0, 5).map((item: any) => item.name));
      setDropdown(true);
    }
  };

  const handleDropdownKeyword = (keyword: string) => {
    setKeyword(keyword);
    setDropdown(false);
  };

  return (
    <div className="flex flex-col">
      <form className="flex" onSubmit={e => addKeywordList(e)}>
        <input
          className="focus:outline-none border-b px-2 py-1 text-sm md:w-80 sm:w-72 w-64 rounded-none"
          type="text"
          placeholder="#맛집, #카페, #숙소 등의 키워드를 입력해주세요 :)"
          value={keyword}
          onChange={e => handleKeyword(e.target.value)}
          disabled={disabled}
        />
        <button className="border-b text-sm text-primary w-8 h-8" type="submit">
          <PlusIcon noBorder />
        </button>
      </form>
      {dropdown && searchedKeyword.length !== 0 && (
        <div className="md:w-80 sm:w-72 w-64 relative" ref={ref}>
          <DropDownList
            list={searchedKeyword}
            setSelected={handleDropdownKeyword}
            isSearchWord
            isKeyword
          />
        </div>
      )}
    </div>
  );
}
