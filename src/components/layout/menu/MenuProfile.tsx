import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";

export default function MenuProfile() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`overflow-hidden w-28 h-28 rounded-full ${
          profileImageId === "" && "bg-gray-200 p-2"
        }`}
      >
        <Image
          src={
            profileImageId === ""
              ? defaultProfileImg
              : `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/attachment/${profileImageId}`
          }
          alt="profile"
          priority
        />
      </div>
      <span className="text-lg font-semibold">{userName}</span>
    </div>
  );
}
