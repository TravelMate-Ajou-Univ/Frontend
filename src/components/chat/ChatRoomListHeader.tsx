"use client";

import { useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import ChatRoomModal from "./ChatRoomModal";

export default function ChatRoomListHeader() {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = async () => {
    setModalState(!modalState);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b-2">
      <h1 className="font-semibold md:text-3xl text-2xl">채팅 목록</h1>
      <div className="relative">
        <OutlinedButton onClick={() => toggleModalState()}>
          채팅방 만들기
        </OutlinedButton>
        {modalState && <ChatRoomModal toggleModalState={toggleModalState} />}
      </div>
    </div>
  );
}
