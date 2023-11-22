"use client";

import { useEffect, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import ChatRoomModal from "./ChatRoomModal";
import { FriendType } from "@/model/friend";
import { getMyFriendsList } from "@/service/axios/friends";

export default function ChatRoomListHeader() {
  const [modalState, setModalState] = useState(false);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const toggleModalState = async () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getMyFriendsList(page, 5);
      setFriends(res.friends);
      setTotal(res.count);
    };
    getData();
  }, [page]);
  return (
    <div className="flex justify-between items-center p-4 border-b-2">
      <p className="text-[2rem]">채팅 목록</p>
      <div className="relative">
        <OutlinedButton onClick={() => toggleModalState()}>
          채팅방 만들기
        </OutlinedButton>
        {modalState ? (
          <ChatRoomModal
            toggleModalState={toggleModalState}
            friends={friends}
            total={total}
            setPage={setPage}
          />
        ) : null}
      </div>
    </div>
  );
}
