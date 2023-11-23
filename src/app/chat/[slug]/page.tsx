"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import Chatting from "@/components/chat/Chatting";

export default function ChatPage() {
  const params = useSearchParams();
  const roomId = String(params.get("roomId"));
  const { userName } = useAppSelector(state => state.userSlice);
  const socket = io(
    "http://travelmate-chat-env.eba-djvegdyw.ap-northeast-2.elasticbeanstalk.com/",
    {
      path: "/socket.io",
      transports: ["websocket"]
    }
  );
  useEffect(() => {
    if (!socket.connected) {
      socket.on("connect", () => {
        // 클라이언트가 방에 참여할 때마다 connect 이벤트가 발생하므로,
        // 서버에 최초 한 번만 참여 메시지를 보내도록 수정
        socket.emit("enterChatRoom", {
          nickname: userName,
          roomId: roomId
        });
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Chatting socket={socket} />;
}
