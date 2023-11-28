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
  "flex justify-center items-center gap-2 py-2.5 w-40 cursor-pointer rounded-full border text-gray-900";

export default function SeasonNav({ season, onClick }: Props) {
  return (
    <ul className="flex justify-around items-center gap-4 bg-white">
      <li
        className={
          LIST_CLASS + (season === "SPRING" ? " border-spring bg-spring" : "")
        }
        onClick={() => onClick("SPRING")}
      >
        <Image src={springIcon} alt="봄 아이콘" width={25} height={25} />
        <span>봄</span>
      </li>
      <li
        className={
          LIST_CLASS + (season === "SUMMER" ? " border-summer bg-summer" : "")
        }
        onClick={() => onClick("SUMMER")}
      >
        <Image src={summerIcon} alt="여름 아이콘" width={25} height={25} />
        <span>여름</span>
      </li>
      <li
        className={
          LIST_CLASS + (season === "FALL" ? " border-fall bg-fall" : "")
        }
        onClick={() => onClick("FALL")}
      >
        <Image src={fallIcon} alt="가을 아이콘" width={25} height={25} />
        <span>가을</span>
      </li>
      <li
        className={
          LIST_CLASS + (season === "WINTER" ? " border-winter bg-winter" : "")
        }
        onClick={() => onClick("WINTER")}
      >
        <Image src={winterIcon} alt="겨울 아이콘" width={25} height={25} />
        <span>겨울</span>
      </li>
    </ul>
  );
}
