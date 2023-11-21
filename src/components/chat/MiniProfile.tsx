import React, { useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import Image from "next/image";

type Props = {
  id: number;
  nickname: string;
  profileImageId: string | null;
};

export default function MiniProfile({ id, nickname, profileImageId }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={defaultProfileImg}
        // src={`${profileImageId}`}
        className="bg-gray-200 rounded-full"
        width={40}
        height={40}
        alt={`${nickname}의 사진`}
        priority
      />
      <p className="text-sm text-center truncate hover:text-clip">{nickname}</p>
    </div>
  );
}
