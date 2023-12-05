import Image from "next/image";
import { changeImageIdToImageUrl } from "@/service/axios/profile";
import DefaultProfile from "/public/image/defaultProfileImg.png";

interface Props {
  profileImageId: string;
}

export default function ProfileImg({ profileImageId }: Props) {
  return (
    <div
      className={`w-12 h-12 rounded-full overflow-hidden bg-gray-300 ${
        profileImageId ? "" : "p-1.5"
      }`}
    >
      <Image
        src={
          profileImageId
            ? changeImageIdToImageUrl(parseInt(profileImageId), "profile")
            : DefaultProfile
        }
        alt="프로필 이미지"
        className="w-full h-full object-cover"
        width={40}
        height={40}
      />
    </div>
  );
}
