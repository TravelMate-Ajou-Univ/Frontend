"use client";

import { useAppSelector } from "@/hooks/redux";
import { ChatRoomType } from "@/model/chat";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { getMyChatRooms } from "@/service/axios/chatroom";
import { setChatRoom } from "@/redux/features/chatRoomSlice";
import { CalculateDelayTime } from "@/service/time";
import ChatRoomImage from "./ChatRoomImage";

export default function ChatRoomList() {
  const dispatch = useDispatch();
  const { chatrooms } = useAppSelector(state => state.chatRoomSlice);

  useEffect(() => {
    const getData = async () => {
      const data = await getMyChatRooms();
      dispatch(setChatRoom(data));
    };
    getData();
  }, [dispatch]);

  return (
    <ul className="flex flex-col w-full">
      {chatrooms.map((chatroom, index) => (
        <li key={index}>
          <Link
            href={{
              pathname: `/chat/chatting`,
              query: {
                roomId: chatroom.roomId,
                roomName: chatroom.name
              }
            }}
            className="flex items-center border-b-2 h-[8rem] px-4 py-2"
          >
            <div className="w-[10rem] h-full">
              <ChatRoomImage chatRoom={chatroom} />
            </div>
            <div className="w-full h-full">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {chatroom.members.length === 1 ? (
                    <p className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-full text-white font-bold bg-gray-500">
                      나
                    </p>
                  ) : null}
                  <p className="text-xl">{chatroom.name}</p>
                  <p className="font-bold text-gray-300">
                    {chatroom.members.length}
                  </p>
                </div>
                <p className="text-xs font-thin">
                  {CalculateDelayTime(chatroom.lastChatTime)}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p className="py-2">
                  {chatroom.lastChatType === "text"
                    ? chatroom.lastChat
                    : "이미지"}
                </p>
                {chatroom.unReadChat === 0 ? null : (
                  <p className="w-6 h-6 rounded-full bg-red-400 text-white text-sm text-center flex items-center justify-center">
                    {chatroom.unReadChat}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
