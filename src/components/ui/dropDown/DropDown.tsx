"use client";

import { useState } from "react";
import DownIcon from "../icons/DownIcon";
import DropDownList from "./DropDownList";
import useOutsideRef from "@/hooks/useClickOutside";

type Props = {
  selected: string;
  list: string[];
  setSelected: (selected: string) => void;
  border?: boolean;
};

export default function DropDown({
  selected,
  list,
  setSelected,
  border = true
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useOutsideRef(() => setIsOpen(false));

  return (
    <div
      className={`flex justify-between items-center w-40 h-9 px-2 rounded-full cursor-pointer relative ${
        border ? "border" : ""
      }}`}
      onClick={() => setIsOpen(!isOpen)}
      ref={dropDownRef}
    >
      <span className="grow text-center">
        {selected === "" ? "선택" : selected}
      </span>
      <span>
        <DownIcon />
      </span>
      {isOpen && <DropDownList list={list} setSelected={setSelected} />}
    </div>
  );
}
