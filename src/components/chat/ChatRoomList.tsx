"use client";

import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { getMyChatRooms } from "@/service/axios/chatroom";
import { setChatRoom } from "@/redux/features/chatRoomSlice";
import { calculateDelayTime } from "@/service/time";
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
            className="flex items-center border-b-2 md:h-32 h-24 px-4 py-2"
          >
            <div className="md:w-40 w-24 h-full">
              <ChatRoomImage chatRoom={chatroom} />
            </div>
            <div className="w-full h-full">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {chatroom.members.length === 1 && (
                    <p className="md:w-6 w-5 md:h-6 h-5 md:text-base text-sm flex justify-center items-center rounded-full text-white font-bold bg-gray-500">
                      나
                    </p>
                  )}
                  <p className="md:text-xl text-lg">{chatroom.name}</p>
                  <p className="font-bold text-gray-300 md:text-base text-sm">
                    {chatroom.members.length}
                  </p>
                </div>
                <p className="text-xs font-thin">
                  {calculateDelayTime(chatroom.lastChatTime)}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p className="md:text-base text-sm py-2 lg:max-w-[37rem] md:max-w-[30rem] sm:max-w-[28rem] max-w-[15rem] truncate">
                  {chatroom.lastChatType === "text"
                    ? chatroom.lastChat
                    : "이미지"}
                </p>
                {chatroom.unReadChat === 0 ? null : (
                  <p className="md:w-6 w-5 md:h-6 h-5 rounded-full bg-red-400 text-white md:text-sm text-xs text-center flex items-center justify-center">
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
