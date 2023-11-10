import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";

export default function MenuProfile() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);

  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full ${
          profileImageId === "" && "bg-gray-200 p-2"
        }`}
      >
        <Image
          src={
            profileImageId === ""
              ? defaultProfileImg
              : `process.env.NEXT_PUBLIC_SERVER_BASE_URL/attachment/${profileImageId}`
          }
          alt="profile"
          priority
        />
      </div>
      <span className="text-lg">{userName}</span>
    </div>
  );
}
