import Image from "next/image";
import leftIcon from "/public/image/hometravelIcon.png";
import rightIcon from "/public/image/travelIcon.png";

export default function HomeTitle() {
  return (
    <div className="flex items-end lg:gap-6 md:gap-4 gap-2">
      <Image
        className="lg:w-16 w-12"
        src={leftIcon}
        alt="트래블메이트 아이콘"
        width={70}
        height={70}
      />
      <div className="flex flex-col items-center">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">
          <span className="text-secondary">트래블메이트</span>와 함께 떠나요!
        </h1>
        <h2 className="lg:text-xl md:text-lg text-base">
          트래블메이트와 함께한 분들의 추천 코스!
        </h2>
      </div>
      <Image
        className="lg:w-16 w-12"
        src={rightIcon}
        alt="트래블메이트 아이콘2"
        width={70}
        height={70}
      />
    </div>
  );
}
