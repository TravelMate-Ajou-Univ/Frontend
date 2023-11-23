import { useCallback, useEffect, useRef, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import FriendsAddModal from "./FriendsAddModal";
import FriendsListModal from "./FriendsListModal";

type Props = {
  total: number;
  setTotal: (total: number) => void;
};

type lookUp = "received" | "sent" | "add" | "";

export default function FriendsListHeader({ total, setTotal }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [lookUpState, setlookUpState] = useState<lookUp>("");

  const toggleModalState = (type: lookUp) => {
    setlookUpState(type);
  };
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleModalState("");
    }
  }, []);

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={modalRef} className="flex justify-between items-center p-4">
      <p className="text-[2rem]">친구 {total}</p>
      <div className="flex gap-4">
        <div className="relative">
          <OutlinedButton onClick={() => toggleModalState("received")}>
            내가 받은 요청
          </OutlinedButton>
          {lookUpState === "received" ? (
            <FriendsListModal
              total={total}
              setTotal={setTotal}
              toggleModalState={toggleModalState}
              mode="received"
              buttonContent="승인"
            />
          ) : null}
        </div>
        <div className="relative">
          <OutlinedButton onClick={() => toggleModalState("sent")}>
            내가 보낸 요청
          </OutlinedButton>
          {lookUpState === "sent" ? (
            <FriendsListModal
              total={total}
              setTotal={setTotal}
              toggleModalState={toggleModalState}
              mode="sent"
              buttonContent="취소"
            />
          ) : null}
        </div>
        <div className="relative">
          <OutlinedButton onClick={() => toggleModalState("add")}>
            친구 추가
          </OutlinedButton>
          {lookUpState === "add" ? (
            <FriendsAddModal
              total={total}
              setTotal={setTotal}
              toggleModalState={toggleModalState}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
