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
      <p className="text-[2rem]">채팅 목록</p>
      <div className="relative">
        <OutlinedButton onClick={() => toggleModalState()}>
          채팅방 만들기
        </OutlinedButton>
        {modalState ? (
          <ChatRoomModal toggleModalState={toggleModalState} />
        ) : null}
      </div>
    </div>
  );
}
