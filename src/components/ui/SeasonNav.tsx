import Image from "next/image";
import { SeasonType } from "@/model/article";
import springIcon from "/public/image/season/springIcon.png";
import summerIcon from "/public/image/season/summerIcon.png";
import fallIcon from "/public/image/season/fallIcon.png";
import winterIcon from "/public/image/season/winterIcon.png";

interface Props {
  season: SeasonType;
  onClick: (season: SeasonType) => void;
}

const LIST_CLASS =
  "flex justify-center items-center md:gap-2 gap-1 md:py-2.5 sm:py-2 py-1.5 md:w-40 sm:w-28 w-20 cursor-pointer rounded-full border text-gray-900 md:text-base text-sm";
const ICON_CLASS = "md:w-7 md:h-7 w-5 h-5";

export default function SeasonNav({ season, onClick }: Props) {
  return (
    <ul className="flex justify-around items-center lg:gap-4 md:gap-3 gap-2">
      <li
        className={
          LIST_CLASS +
          (season === "SPRING" ? " border-spring bg-spring" : " bg-white")
        }
        onClick={() => onClick("SPRING")}
      >
        <Image
          className={ICON_CLASS}
          src={springIcon}
          alt="봄 아이콘"
          width={25}
          height={25}
        />
        <span>봄</span>
      </li>
      <li
        className={
          LIST_CLASS +
          (season === "SUMMER" ? " border-summer bg-summer" : " bg-white")
        }
        onClick={() => onClick("SUMMER")}
      >
        <Image
          className={ICON_CLASS}
          src={summerIcon}
          alt="여름 아이콘"
          width={25}
          height={25}
        />
        <span>여름</span>
      </li>
      <li
        className={
          LIST_CLASS +
          (season === "FALL" ? " border-fall bg-fall" : " bg-white")
        }
        onClick={() => onClick("FALL")}
      >
        <Image
          className={ICON_CLASS}
          src={fallIcon}
          alt="가을 아이콘"
          width={25}
          height={25}
        />
        <span>가을</span>
      </li>
      <li
        className={
          LIST_CLASS +
          (season === "WINTER" ? " border-winter bg-winter" : " bg-white")
        }
        onClick={() => onClick("WINTER")}
      >
        <Image
          className={ICON_CLASS}
          src={winterIcon}
          alt="겨울 아이콘"
          width={25}
          height={25}
        />
        <span>겨울</span>
      </li>
    </ul>
  );
}
