"use client";

import { useEffect, useState } from "react";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import DropDownList from "@/components/ui/dropDown/DropDownList";
import useOutSideRef from "@/hooks/useClickOutside";
import { useGetKeywordsQuery } from "@/service/react-query/keyword";
import { KeywordType } from "@/model/article";
import { placeholder } from "@/lib/placeholder";

export interface Props {
  inputId: string;
  addKeyword: (keyword: string) => void;
  disabled?: boolean;
}

export default function KeywordInput({
  inputId,
  addKeyword,
  disabled = false
}: Props) {
  const [keyword, setKeyword] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const ref = useOutSideRef(() => setDropdown(false));

  const { data: keywords, refetch } = useGetKeywordsQuery(keyword, setDropdown);

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  const addKeywordList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addKeyword(keyword);
    setKeyword("");
  };

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    if (keyword === "") setDropdown(false);
  };

  const handleDropdownKeyword = (keyword: string) => {
    addKeyword(keyword);
    setKeyword("");
    setDropdown(false);
  };

  return (
    <div className="flex flex-col">
      <form className="flex" onSubmit={addKeywordList}>
        <input
          id={inputId}
          className="focus:outline-none border-b px-2 py-1 text-sm md:w-80 sm:w-72 w-64 rounded-none"
          type="text"
          placeholder={placeholder.keywordInput}
          value={keyword}
          onChange={handleKeyword}
          disabled={disabled}
        />
        <button className="border-b text-sm text-primary w-8 h-8" type="submit">
          <PlusIcon noBorder />
        </button>
      </form>
      {dropdown && keywords && keywords.length !== 0 && (
        <div className="md:w-80 sm:w-72 w-64 relative" ref={ref}>
          <DropDownList
            list={keywords.slice(0, 5).map((item: KeywordType) => item.name)}
            setSelected={handleDropdownKeyword}
            isSearchWord
            isKeyword
          />
        </div>
      )}
    </div>
  );
}
