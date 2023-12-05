import React, { ChangeEvent, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import { FriendType } from "@/model/friend";
import { makeChatRoom } from "@/service/axios/chatroom";
import { ChatRoomType } from "@/model/chat";
import { useDispatch } from "react-redux";
import { addChatRoom } from "@/redux/features/chatRoomSlice";
import FriendsAddContainer from "./FriendsAddContainer";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  toggleModalState: () => void;
};

export default function ChatRoomModal({ toggleModalState }: Props) {
  const { id, userName, profileImageId } = useAppSelector(
    state => state.userSlice
  );
  const dispatch = useDispatch();
  const [members, setMembers] = useState<FriendType[]>([]);
  const [title, setTitle] = useState("");

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTitle(value);
  };

  const createChatRoom = async () => {
    const memberIds = members.map(member => member.id);

    const res: ChatRoomType = await makeChatRoom({ name: title, memberIds });
    // res.members.length !== 0 ? dispatch(addChatRoom(res)) : console.log("fail");
    const me: FriendType = {
      id,
      nickname: userName,
      profileImageId: Number(profileImageId)
    };
    const newChatRoom: ChatRoomType = {
      roomId: res.roomId,
      name: res.name,
      members: [...res.members, me],
      lastChat: res.lastChat,
      lastChatTime: res.lastChatTime,
      unReadChat: res.unReadChat
    };
    dispatch(addChatRoom(newChatRoom));
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
      <FriendsAddContainer members={members} setMembers={setMembers} />
      <div className="flex justify-between mx-2">
        <OutlinedButton onClick={toggleModalState}>취소</OutlinedButton>
        <OutlinedButton onClick={createChatRoom}>만들기</OutlinedButton>
      </div>
    </div>
  );
}
