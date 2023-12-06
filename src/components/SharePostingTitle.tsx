import Image from "next/image";
import travelIcon from "/public/image/travelIcon.png";

export default function SharePostingTitle() {
  return (
    <h1 className="flex flex-row gap-3 md:my-4 my-2 md:mx-0 mx-3">
      <Image
        className="md:w-12 w-10"
        src={travelIcon}
        alt="쉐어 포스팅 아이콘"
      />
      <section className="flex flex-col justify-end">
        <p className="md:text-2xl text-xl font-bold">쉐어 포스팅</p>
        <p className="text-sm text-gray-500">
          모두가 함께 만들어 나가는 여행 정보 게시판
        </p>
      </section>
    </h1>
  );
}
