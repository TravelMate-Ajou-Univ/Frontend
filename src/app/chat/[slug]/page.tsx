"use client";
import Chat from "@/components/chat/Chat";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  params: {
    slug: string;
  };
}

export default function ChatPage({ params: { slug } }: Props) {
  const roomid = slug;
  const socket = io("172.21.35.219:8080", {
    path: "/socket.io",
    transports: ["websocket"]
  });
  const [myInfo, setMyInfo] = useState({
    nickname: "",
    id: "",
    room: {
      roomId: "",
      roomName: ""
    }
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conneted");
    });
    const nickname = localStorage.getItem("nickname") ?? "user";
    const id = socket.io.toString();
    socket.emit(
      "setInit",
      {
        nickname: "test_nickname",
        room: {
          roomId: "test room id",
          roomName: "test room name"
        }
      },
      (response: any) => {
        console.log(response);
      }
    );
    // socket.emit("enterChatRoom", { roomId: roomid }, (response: any) => {
    //   console.log(response);
    //   setMyInfo({ nickname, id, room: response });
    // });
    // socket.on("disconnect", () => {
    //   console.log("disconneted");
    // });
  }, [roomid, socket]);

  const onClick = () => {
    // socket.emit("sendMessage", "test message");
    socket.emit("sendMessage", { roomId: "test Id", nickname: "test name" });
  };

  return (
    <section className="">
      <button onClick={onClick}>emit button</button>
    </section>
  );
}
