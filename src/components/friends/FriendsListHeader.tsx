"use client";
import { useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import FriendsAddModal from "./FriendsAddModal";

type Props = {
  total: number;
};

export default function FriendsListHeader({ total }: Props) {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = async () => {
    setModalState(!modalState);
  };
  return (
    <div className="flex justify-between items-center p-4">
      <p className="text-[2rem]">친구 {total}</p>
      <div className="relative">
        <OutlinedButton onClick={() => toggleModalState()}>
          친구 추가
        </OutlinedButton>
        {modalState ? <FriendsAddModal /> : null}
      </div>
    </div>
  );
}
