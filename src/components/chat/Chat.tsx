"use client";

import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import OutlinedButton from "../ui/button/OutlinedButton";
import FilledButton from "../ui/button/FilledButton";

interface Props {
  roomid: string;
}

export default function Chat({ roomid }: Props) {
  const [myInfo, setMyInfo] = useState({
    nickname: "",
    id: "",
    room: {
      roomId: "",
      roomName: ""
    }
  });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      nickname: string;
      message: string;
    }[]
  >();

  const socket = io("http://43.202.162.180:4000", {
    path: "/socket.io",
    transports: ["websocket"]
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
      const nickname = localStorage.getItem("nickname") ?? "user";
      const id = socket.io.toString();
      socket.emit("setInit", { nickname }, (response: any) => {
        console.log(response);
      });
      socket.emit("enterChatRoom", { roomId: roomid }, (response: any) => {
        console.log(response);
        setMyInfo({ nickname, id, room: response });
      });
    });
  }, [roomid, socket]);

  const changeName = () => {
    const nickname = prompt("닉네임을 입력해주세요.");
    if (nickname) {
      socket.emit("setNickname", nickname);
      localStorage.setItem("nickname", nickname);
    }
  };

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    if (!messages) setMessages([{ nickname: myInfo.nickname, message }]);
    else setMessages([...messages, { nickname: myInfo.nickname, message }]);
    setMessage("");
  };

  socket.on("getMessage", ({ id, nickname, message }) => {
    if (!messages) setMessages([{ nickname, message }]);
    else setMessages([...messages, { nickname, message }]);
  });

  return (
    <div className="mx-auto w-96 bg-white flex flex-col gap-3">
      <h1>채팅방 이름: {myInfo.room.roomName}</h1>
      <h2>내 닉네임: {myInfo.nickname}</h2>
      <OutlinedButton onClick={changeName}>닉네임 바꾸기</OutlinedButton>
      <section className="h-[40rem] border overflow-auto">
        {messages?.map((message, index) => (
          <p key={index}>
            <span>{message.nickname}: </span>
            <span>{message.message}</span>
          </p>
        ))}
      </section>
      <form
        className="flex gap-1"
        onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <input
          className="border flex-grow"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <FilledButton onClick={sendMessage}>전송</FilledButton>
      </form>
    </div>
  );
}
