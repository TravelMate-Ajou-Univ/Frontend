"use client";

import { useAppSelector } from "@/hooks/redux";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import Image from "next/image";
import OutlinedButton from "../ui/button/OutlinedButton";
import { SyntheticEvent, useState } from "react";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);
  const [modifyState, setModifyState] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setProfileFile(file);

    console.log(URL.createObjectURL(file));
    setProfilePreview(URL.createObjectURL(file));
  };

  const modifyProfile = () => {
    const answer = confirm("프로필을 수정하시겠습니까?");
    if (answer) {
      // Todo : profile 수정 반영
    } else {
    }
    setModifyState(false);
  };
  return (
    <div className="w-full flex justify-around items-center border-b-2">
      <div className="relative">
        <Image
          src={
            profilePreview === null
              ? defaultProfileImg
              : (profilePreview as string)
          }
          // src={defaultProfileImg}
          className="bg-gray-100 rounded-full"
          width={150}
          height={150}
          alt="개인 채팅"
          priority
        />
        <ProfileImage
          className="absolute bottom-1 right-1 text-gray-500 hover:scale-110 hover:cursor-pointer"
          handleImage={handleProfile}
        />
      </div>
      <div className="flex flex-col gap-4">
        {modifyState ? (
          <></>
        ) : (
          <p className="text-3xl font-bold ">{userName}</p>
        )}
        <div className="flex justify-around">
          {modifyState ? (
            <OutlinedButton onClick={() => modifyProfile()}>
              완료
            </OutlinedButton>
          ) : (
            <OutlinedButton
              onClick={() => {
                setModifyState(true);
              }}
            >
              수정
            </OutlinedButton>
          )}
          <OutlinedButton onClick={() => {}}>탈퇴</OutlinedButton>
        </div>
      </div>
    </div>
  );
}
