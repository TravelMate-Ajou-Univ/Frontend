import Image from "next/image";
import bg_cloud from "/public/image/bg_cloud.png";
import bg_left from "/public/image/bg_left.png";
import bg_right from "/public/image/bg_right.png";

export default function Background() {
  return (
    <div className="-z-50">
      <Image
        className="absolute top-0"
        src={bg_cloud}
        alt="배경_구름"
        priority
      />
      <Image
        className="absolute top-0 left-0"
        src={bg_left}
        alt="배경_좌측"
        priority
      />
      <Image
        className="absolute top-0 right-0"
        src={bg_right}
        alt="배경_우측"
        priority
      />
    </div>
  );
}
