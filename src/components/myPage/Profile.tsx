"use client";

import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import NicknameForm from "./NicknameForm";
import FilledButton from "../ui/button/FilledButton";
import { changeNickname, checkDuplicateName } from "@/service/axios/profile";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  const { userName } = useAppSelector(state => state.userSlice);
  const [modifyState, setModifyState] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [nicknamePreview, setNicknamePreView] = useState<string>("");

  useEffect(() => {
    setNickname(userName);
  }, [modifyState, userName]);

  const modifyNickname = () => {
    checkDuplicateName(nickname)
      .then(async response => {
        try {
          const res = await changeNickname(nickname);
          setNicknamePreView(nickname);
          alert(res);
          setModifyState(false);
        } catch (error) {
          alert("변경 실패");
        }
      })
      .catch(err => {
        alert("닉네임이 중복되었습니다.");
      });
  };
  return (
    <div className="w-full flex justify-around items-center py-4 border-b-2">
      <ProfileImage />
      <div className="flex flex-col gap-4 w-[20rem] text-center">
        {modifyState ? (
          <NicknameForm nickname={nickname} setNickname={setNickname} />
        ) : (
          <p className="text-3xl font-bold ">
            {nicknamePreview === "" ? userName : nicknamePreview}
          </p>
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
