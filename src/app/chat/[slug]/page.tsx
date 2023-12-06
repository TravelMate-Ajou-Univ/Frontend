"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import Chatting from "@/components/chat/Chatting";
import { api } from "@/service/axios/api";

export default function ChatPage() {
  const params = useSearchParams();
  const roomId = String(params.get("roomId"));
  const roomName = String(params.get("roomName"));
  const { userName } = useAppSelector(state => state.userSlice);
  const accessToken = api.defaults.headers.common["Authorization"];

  const socket = io(`${process.env.NEXT_PUBLIC_CHAT_SERVER_BASE_URL}`, {
    path: "/socket.io",
    transports: ["websocket"],
    auth: {
      token: accessToken
    }
  });

  useEffect(() => {
    try {
      if (!socket.connected) {
        socket.on("connect", () => {
          // 클라이언트가 방에 참여할 때마다 connect 이벤트가 발생하므로,
          // 서버에 최초 한 번만 참여 메시지를 보내도록 수정
          socket.emit("enterChatRoom", {
            roomId: roomId
          });
        });
      }

      return () => {
        socket.emit("leaveRoom", {
          roomId: roomId
        });
        socket.on("leaveRoom", () => {
          socket.disconnect();
        });
      };
    } catch (err) {
      // Todo : refresh JWT
    }
  }, [roomId, userName, socket]);

  return <Chatting socket={socket} roomId={roomId} roomName={roomName} />;
}
