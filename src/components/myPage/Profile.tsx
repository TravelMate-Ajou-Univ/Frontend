"use client";

import { useAppSelector } from "@/hooks/redux";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import NicknameForm from "./NicknameForm";
import FilledButton from "../ui/button/FilledButton";
import { changeNickname } from "@/service/axios/profile";
import { uploadImage } from "@/service/axios/article";

export default function Profile() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);
  const [modifyState, setModifyState] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  // const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(false);

  useEffect(() => {
    setNickname(userName);
  }, [modifyState, userName]);

  const handleProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    // setProfilePreview(URL.createObjectURL(file));

    const imgId = await uploadImage(file, "profile");
    const profile = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=profile`;
    setProfileUrl(profile);
  };

  const modifyNickname = async () => {
    if (checkDuplicate) {
      alert("닉네임이 중복되었습니다.");
      return;
    }
    try {
      const res = await changeNickname(nickname);
      alert(res);
      setModifyState(false);
    } catch (error) {
      alert("변경 실패");
    }
  };
  return (
    <div className="w-full flex justify-around items-center py-4 border-b-2">
      <div className="relative">
        <Image
          src={profileUrl === null ? defaultProfileImg : profileUrl}
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
      <div className="flex flex-col gap-4 w-[20rem] text-center">
        {modifyState ? (
          <NicknameForm
            nickname={nickname}
            setNickname={setNickname}
            setCheckDuplicate={setCheckDuplicate}
          />
        ) : (
          <p className="text-3xl font-bold ">{userName}</p>
        )}
        <div className="flex justify-center items-center mt-8 gap-2">
          {modifyState ? (
            <FilledButton onClick={() => modifyNickname()}>
              변경하기
            </FilledButton>
          ) : (
            <FilledButton
              onClick={() => {
                setModifyState(true);
              }}
            >
              닉네임 변경
            </FilledButton>
          )}
        </div>
      </div>
    </div>
  );
}
