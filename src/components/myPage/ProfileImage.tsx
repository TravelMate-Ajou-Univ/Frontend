import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import ProfileImageInput from "./ProfileImageInput";
import { useAppSelector } from "@/hooks/redux";
import { uploadImage } from "@/service/axios/article";
import { useRef, useState } from "react";
import { changProfileIdToProfileUrl } from "@/service/axios/profile";

export default function ProfileImage() {
  const { profileImageId } = useAppSelector(state => state.userSlice);
  const imageRef = useRef("");
  const [modifyState, setModifyState] = useState<boolean>(false);

  const handleProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const imgId = await uploadImage(file, "profile");
    imageRef.current = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=profile`;

    if (imgId) {
      alert("변경되었습니다.");
      setModifyState(!modifyState);
    } else {
      alert("변경 실패");
    }
  };

  return (
    <div className="relative ">
      <Image
        src={
          profileImageId === ""
            ? defaultProfileImg
            : imageRef.current === ""
            ? changProfileIdToProfileUrl(Number(profileImageId))
            : imageRef.current
        }
        className="bg-gray-100 rounded-full w-[7.5rem] h-[7.5rem]"
        width={150}
        height={150}
        alt="프로필 사진"
        priority
      />

      <ProfileImageInput
        className="absolute bottom-0 right-0 text-gray-400 hover:scale-110 hover:cursor-pointer"
        handleImage={handleProfile}
      />
    </div>
  );
}
