import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import OutlinedButton from "../button/OutlinedButton";
import { getMyFriendsList } from "@/service/axios/friends";
import { FriendType } from "@/model/friend";
import { Pagination } from "@mui/material";
import MiniProfile from "./MiniProfile";
import { makeChatRoom } from "@/service/axios/chatroom";
import { ChatRoomType } from "@/model/chat";

type Props = {
  toggleModalState: () => void;
  friends: FriendType[];
  total: number;
  setPage: (page: number) => void;
};

export default function ChatRoomModal({
  toggleModalState,
  friends,
  total,
  setPage
}: Props) {
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState<number[]>([]);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTitle(value);
  };

  const addMember = (id: number) => {
    const found = members.find(member => member === id);
    setMembers([...members, id]);
  };

  const subMember = (id: number) => {
    const filter = members.filter(member => member !== id);
    setMembers(filter);
  };
  const createChatRoom = async () => {
    const res: ChatRoomType = makeChatRoom({ name: title, memberIds: members });
    // console.log(res);

    toggleModalState();
  };

  return (
    <div className="flex flex-col gap-2 w-[15rem] absolute right-0 bg-white z-10 border-2 rounded-md p-2 mt-4">
      <p>채팅방 이름</p>
      <textarea
        cols={2}
        onChange={onChangeText}
        className="border-2 rounded-md"
      ></textarea>
      <p>친구 목록</p>
      <ul className="flex flex-col items-center gap-2">
        {friends.map(friend => (
          <li key={friend.id} className="self-start w-full">
            <MiniProfile
              id={friend.id}
              nickname={friend.nickname}
              profileImageId={friend.profileImageId}
              addMember={addMember}
              subMember={subMember}
            />
          </li>
        ))}
        <Pagination
          count={Math.floor((total + 5) / 5)}
          defaultPage={1}
          onChange={(e, page) => setPage(page)}
          className="bottom-[1rem] "
        />
      </ul>
      <div className="flex justify-between mx-2">
        <OutlinedButton onClick={toggleModalState}>취소</OutlinedButton>
        <OutlinedButton onClick={createChatRoom}>만들기</OutlinedButton>
      </div>
    </div>
  );
}
