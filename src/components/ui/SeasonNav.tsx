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

export default function SeasonNav({ season, onClick }: Props) {
  const IMAGECLASS = "w-11 h-11 p-1.5 cursor-pointer object-cover";
  return (
    <ul className="border rounded-lg flex flex-col items-center divide-y bg-white">
      <li onClick={() => onClick("SPRING")}>
        <Image
          className={IMAGECLASS + (season === "SPRING" ? " bg-gray-200" : "")}
          src={springIcon}
          alt="봄 아이콘"
          width={100}
          height={100}
        />
      </li>
      <li onClick={() => onClick("SUMMER")}>
        <Image
          className={IMAGECLASS + (season === "SUMMER" ? " bg-gray-200" : "")}
          src={summerIcon}
          alt="여름 아이콘"
          width={100}
          height={100}
        />
      </li>
      <li onClick={() => onClick("FALL")}>
        <Image
          className={IMAGECLASS + (season === "FALL" ? " bg-gray-200" : "")}
          src={fallIcon}
          alt="가을 아이콘"
          width={100}
          height={100}
        />
      </li>
      <li onClick={() => onClick("WINTER")}>
        <Image
          className={IMAGECLASS + (season === "WINTER" ? " bg-gray-200" : "")}
          src={winterIcon}
          alt="겨울 아이콘"
          width={100}
          height={100}
        />
      </li>
    </ul>
  );
}
