import { FriendType } from "@/model/friend";
import React, { useState } from "react";
import OutlinedButton from "../button/OutlinedButton";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import Image from "next/image";

type Props = {
  id: number;
  nickname: string;
  profileImageId: string | null;
  addMember: (id: number) => void;
  subMember: (id: number) => void;
};

export default function MiniProfile({
  id,
  nickname,
  profileImageId,
  addMember,
  subMember
}: Props) {
  const [state, setState] = useState(false);
  const onClick = () => {
    state ? subMember(id) : addMember(id);
    setState(!state);
  };
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <Image
        src={defaultProfileImg}
        // src={`${profileImageId}`}
        className="bg-gray-200 rounded-full"
        width={40}
        height={40}
        alt={`${nickname}의 사진`}
        priority
      />
      <p className="text-sm text-center truncate w-[50%] hover:text-clip">
        {nickname}
      </p>
      <OutlinedButton className="text-xs" onClick={onClick} size="small">
        {state ? "취소" : "추가"}
      </OutlinedButton>
    </div>
  );
}
