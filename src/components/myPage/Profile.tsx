"use client";

import { useAppSelector } from "@/hooks/redux";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import Image from "next/image";
import OutlinedButton from "../ui/button/OutlinedButton";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import NicknameForm from "./NicknameForm";
import FilledButton from "../ui/button/FilledButton";

export default function Profile() {
  const { userName, profileImageId } = useAppSelector(state => state.userSlice);
  const [modifyState, setModifyState] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(false);

  useEffect(() => {
    setNickname(userName);
  }, [modifyState]);

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const modifyProfile = () => {
    const answer = confirm("프로필을 수정하시겠습니까?");
    if (answer) {
      if (checkDuplicate) {
        alert("닉네임이 중복되었습니다.");
        return;
      }
      // Todo : change axios
      setModifyState(false);
    }
  };
  return (
    <div className="w-full flex justify-around items-center py-4 border-b-2">
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
        {modifyState ? (
          <ProfileImage
            className="absolute bottom-1 right-1 text-gray-500 hover:scale-110 hover:cursor-pointer"
            handleImage={handleProfile}
          />
        ) : null}
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
            <OutlinedButton onClick={() => modifyProfile()}>
              완료
            </OutlinedButton>
          ) : (
            <OutlinedButton
              onClick={() => {
                setModifyState(true);
              }}
            >
              프로필 수정
            </OutlinedButton>
          )}
          <FilledButton onClick={() => {}}>탈퇴</FilledButton>
        </div>
      </div>
    </div>
  );
}
