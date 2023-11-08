"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import OutlinedButton from "../ui/button/OutlinedButton";

export default function ChatList() {
  const [chatList, setChatList] = useState([]);
  const socket = io("http://43.202.162.180:4000", {
    path: "/socket.io",
    transports: ["websocket"]
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
      const nickname = localStorage.getItem("nickname") ?? "user";
      socket.emit("setInit", { nickname }, (response: any) => {
        console.log(response);
      });
    });
    //   socket.emit("getChatRoomList", null);
  }, [socket]);

  socket.on("getChatRoomList", response => {
    console.log("getChatRoomList");
    console.log(response);
    setChatList(response);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  const createChatRoom = () => {
    const roomName = prompt("채팅방 이름을 입력해주세요.");
    if (roomName) {
      socket.emit("createChatRoom", { roomName }, (response: any) => {
        console.log(response);
      });
      //   socket.emit("getChatRoomList", null);
    }
  };

  return (
    <div className="flex flex-col">
      <OutlinedButton onClick={createChatRoom}>채팅방 만들기</OutlinedButton>
      {/* <ul className="flex flex-col gap-4">
        {chatList.length !== 0 &&
          chatList.map((chat: any) => (
            <li className="border w-full bg-white" key={chat.id}>
              <Link href={`/chat/${chat.id}`}>
                <p>{chat.name}</p>
              </Link>
            </li>
          ))}
      </ul> */}
    </div>
  );
}
