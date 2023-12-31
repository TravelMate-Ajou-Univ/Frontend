import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { changeImageIdToImageUrl } from "@/service/axios/profile";

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
              : changeImageIdToImageUrl(Number(profileImageId), "profile")
          }
          alt="profile"
          width={150}
          height={150}
          priority
        />
      </div>
      <span className="text-lg font-semibold text-center">{userName}</span>
    </div>
  );
}
