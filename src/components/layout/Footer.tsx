import Image from "next/image";
import footerImg from "/public/image/footer.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Image
        className="w-full"
        src={footerImg}
        alt="푸터"
        width={1920}
        height={200}
      />
      <div className="bg-slate-200 flex flex-col justify-center items-center md:h-32 h-24 border-t-2 border-gray-400">
        <Link
          href="/"
          className="md:text-3xl text-2xl text-secondary font-bold"
        >
          TravelMate
        </Link>
        <p className="md:text-base text-sm">Copyright © 2023 TravelMate</p>
        <p className="md:text-base text-sm">junhakjh@ajou.ac.kr</p>
      </div>
    </footer>
  );
}
