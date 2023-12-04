"use client";

import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import NicknameForm from "./NicknameForm";
import FilledButton from "../ui/button/FilledButton";
import { changeNickname } from "@/service/axios/profile";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  const { userName } = useAppSelector(state => state.userSlice);
  const [modifyState, setModifyState] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(false);

  useEffect(() => {
    setNickname(userName);
  }, [modifyState, userName]);

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
      <ProfileImage />
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
