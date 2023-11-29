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
      <div className="absolute top-[25%] left-[15%]">
        <FadeReveal>
          <p className="text-secondary text-7xl font-semibold">TravelMate</p>
          <p className="text-sky text-3xl mt-3">
            모두가 만들어가는 <b>여행 플랫폼</b>
          </p>
          <div className="absolute top-20 -right-52">
            <Image src={tooltip} alt="툴팁" width={150} height={150} />
            <p className="w-full absolute top-[3.3rem] text-xs text-center">
              <span className="text-blue-700">수정요청</span>을 해보세요.
              <br />
              <span className="text-blue-700">다같이</span> 여행기록을
              <br />
              꾸며보세요!
            </p>
          </div>
        </FadeReveal>
      </div>
    </div>
  );
}
