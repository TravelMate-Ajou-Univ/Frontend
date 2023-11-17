"use client";

import { useAppSelector } from "@/hooks/redux";
import { ChatRoomType } from "@/model/chat";
import Image from "next/image";
import { useDispatch } from "react-redux";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import groupProfileImg from "/public/image/groupProfileImg.png";

export default function ChatRoomList() {
  const dispatch = useDispatch();
  const { chatrooms } = useAppSelector(state => state.chatRoomSlice);

  // ui test data
  const test_chatrooms: ChatRoomType[] = [
    {
      name: "chatroom1",
      memberIds: [1],
      lastChat: "test1",
      lastChatTime: "어제"
    },
    {
      name: "chatroom2",
      memberIds: [1, 2],
      lastChat: "test2",
      lastChatTime: "일주일 전"
    }
  ];

  return (
    <ul className="flex flex-col w-full">
      {test_chatrooms.map((chatroom, index) => (
        <li
          key={index}
          className="flex items-center border-b-2 h-[8rem] px-4 py-2"
        >
          <div className="w-[20%]">
            {chatroom.memberIds.length === 1 ? (
              <Image
                src={defaultProfileImg}
                className="bg-gray-100 rounded-full"
                width={75}
                height={75}
                alt="개인 채팅"
                priority
              />
            ) : (
              <Image
                src={groupProfileImg}
                className="bg-gray-100 rounded-full"
                width={75}
                height={75}
                alt="단체 채팅"
                priority
              />
            )}
          </div>
          <div className="w-[80%] h-full">
            <div className="flex justify-between">
              <p className="text-xl">{chatroom.name}</p>
              <p className="text-xs font-thin">{chatroom.lastChatTime}</p>
            </div>
            <p className="py-2">{chatroom.lastChat}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
