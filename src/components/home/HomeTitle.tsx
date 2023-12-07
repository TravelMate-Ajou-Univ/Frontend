import Image from "next/image";
import leftIcon from "/public/image/hometravelIcon.png";
import rightIcon from "/public/image/travelIcon.png";
import Link from "next/link";

export default function HomeTitle() {
  return (
    <>
      <Link
        className="lg:text-4xl sm:text-3xl text-2xl font-bold text-secondary border-2 border-secondary bg-white rounded-xl px-6 lg:py-3 sm:py-2 py-1.5 my-4"
        href="/article/list"
      >
        포스팅 목록 보러가기
      </Link>
      <div className="flex items-end lg:gap-6 md:gap-4 gap-2">
        <Image
          className="lg:w-16 w-12"
          src={leftIcon}
          alt="트래블메이트 아이콘"
          width={70}
          height={70}
        />
        <div className="flex flex-col items-center">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold">
            <span className="text-secondary">트래블메이트</span>와 함께 떠나요!
          </h1>
          <h2 className="lg:text-xl md:text-lg sm:text-base text-sm">
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
    </>
  );
}
