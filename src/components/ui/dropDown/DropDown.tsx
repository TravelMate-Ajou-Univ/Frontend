import { useState } from "react";
import DownIcon from "../icons/DownIcon";
import DropDownList from "./DropDownList";
import useOutsideRef from "@/hooks/useClickOutside";

type Props = {
  selected: string;
  list: string[];
  setSelected: (selected: string) => void;
  disabled?: boolean;
  border?: boolean;
  size?: "small" | "mid";
  className?: string;
};

export default function DropDown({
  selected,
  list,
  setSelected,
  disabled = false,
  border = true,
  size = "mid",
  className = ""
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useOutsideRef(() => setIsOpen(false));

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropDownRef}>
      <button
        className={
          className +
          " flex justify-between items-center md:w-40 w-28 md:h-9 h-8 px-2 rounded-full cursor-pointer relative bg-white" +
          (border ? " border" : "") +
          (size == "small" ? " text-sm " : " md:text-base text-sm")
        }
        onClick={handleOpen}
      >
        <span className="grow text-center">
          {selected === "" ? "선택" : selected}
        </span>
        <span>
          <DownIcon />
        </span>
        {isOpen && (
          <DropDownList list={list} setSelected={setSelected} size={size} />
        )}
      </button>
    </div>
  );
}
