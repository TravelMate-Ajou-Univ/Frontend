import Image from "next/image";
import homebg from "/public/image/home.png";
import FadeReveal from "../ui/reveal/FadeReveal";
import tooltip from "/public/image/tooltip.png";

export default function HomeBG() {
  return (
    <div className="relative w-full">
      <Image
        className="w-full"
        src={homebg}
        alt="홈 배경화면"
        width={1920}
        height={1080}
      />
      <div className="absolute md:top-[25%] top-[15%] md:left-[15%] left-[10%]">
        <FadeReveal>
          <p className="text-secondary 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-semibold">
            TravelMate
          </p>
          <p className="text-sky 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg text-base mt-3">
            모두가 만들어가는 <b>여행 플랫폼</b>
          </p>
          <div className="absolute top-20 md:-right-52 -right-36">
            <Image
              className="2xl:w-36 xl:w-32 lg:w-28 w-20"
              src={tooltip}
              alt="툴팁"
            />
          </div>
        </FadeReveal>
      </div>
    </div>
  );
}
