"use client";

import { useAppSelector } from "@/hooks/redux";
import { ChatRoomType } from "@/model/chat";
import Image from "next/image";
import { useDispatch } from "react-redux";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import groupProfileImg from "/public/image/groupProfileImg.png";
import Link from "next/link";
import { useEffect } from "react";
import { getMyChatRooms } from "@/service/axios/chatroom";
import { setChatRoom } from "@/redux/features/chatRoomSlice";

export default function ChatRoomList() {
  const dispatch = useDispatch();
  const { chatrooms } = useAppSelector(state => state.chatRoomSlice);

  useEffect(() => {
    const getData = async () => {
      const data = await getMyChatRooms();

      dispatch(setChatRoom(data));
    };
    getData();
  }, []);

  return (
    <ul className="flex flex-col w-full">
      {chatrooms.map((chatroom, index) => (
        <li key={index}>
          <Link
            href={`/chat/${chatroom.name}`}
            className="flex items-center border-b-2 h-[8rem] px-4 py-2"
          >
            <div className="w-[20%]">
              {chatroom.memberIds.length === 2 ? (
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
