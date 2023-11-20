import React, { ChangeEvent, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import { getMyFriendsList } from "@/service/axios/friends";
import { FriendType } from "@/model/friend";
import { Pagination } from "@mui/material";
import { makeChatRoom } from "@/service/axios/chatroom";
import { ChatRoomType } from "@/model/chat";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { useDispatch } from "react-redux";
import { addChatRoom } from "@/redux/features/chatRoomSlice";

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
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState<FriendType[]>([]);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTitle(value);
  };

  const addMember = (friend: FriendType) => {
    setMembers([...members, friend]);
  };

  const subMember = (friend: FriendType) => {
    const filter = members.filter(member => member.id !== friend.id);
    setMembers(filter);
  };
  const createChatRoom = async () => {
    const memberIds = members.map(member => member.id);

    const res: ChatRoomType = await makeChatRoom({ name: title, memberIds });
    res.memberIds.length !== 0 ? dispatch(addChatRoom(res)) : null;

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
        {friends.map((friend, index) => (
          <li
            key={index}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={defaultProfileImg}
              // src={`${profileImageId}`}
              className="bg-gray-200 rounded-full"
              width={40}
              height={40}
              alt={`${friend.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center truncate hover:text-clip">
              {friend.nickname}
            </p>
            <OutlinedButton
              onClick={() => addMember(friend)}
              className=" w-[3rem] "
              size="small"
            >
              추가
            </OutlinedButton>
          </li>
        ))}
        <Pagination
          count={Math.floor((total + 5) / 5)}
          defaultPage={1}
          onChange={(e, page) => setPage(page)}
          className="bottom-[1rem] "
        />
      </ul>
      <p>채팅방 멤버</p>
      <ul className="flex flex-col items-center gap-2">
        {members.map((member, index) => (
          <li
            key={index}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={defaultProfileImg}
              // src={`${profileImageId}`}
              className="bg-gray-200 rounded-full"
              width={40}
              height={40}
              alt={`${member.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center truncate hover:text-clip">
              {member.nickname}
            </p>
            <OutlinedButton
              onClick={() => subMember(member)}
              className=" w-[3rem] "
              size="small"
            >
              취소
            </OutlinedButton>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mx-2">
        <OutlinedButton onClick={toggleModalState}>취소</OutlinedButton>
        <OutlinedButton onClick={createChatRoom}>만들기</OutlinedButton>
      </div>
    </div>
  );
}
