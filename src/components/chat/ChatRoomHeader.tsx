import { useState } from "react";
import { Socket } from "socket.io-client";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";
import SettingIcon from "../ui/icons/SettingIcon";
import OutlinedButton from "../ui/button/OutlinedButton";
import FriendsAddContainer from "./FriendsAddContainer";
import { FriendType } from "@/model/friend";
import { useRouter } from "next/navigation";

type Props = {
  socket: Socket;
  userId: number;
  roomId: string;
  nickname: string;
  roomName: string;
  toggleMapState: () => void;
};

export default function ChatRoomHeader({
  socket,
  userId,
  roomId,
  nickname,
  roomName,
  toggleMapState
}: Props) {
  const [settingState, SetSettingState] = useState(false);
  const [addModalState, setAddModalState] = useState<boolean>(false);
  const [members, setMembers] = useState<FriendType[]>([]);
  const router = useRouter();
  const exitChatRoom = () => {
    socket.emit("exitChatRoom", { nickname, roomId, userId });
    router.push("/chat/list");
  };
  const cancleHandler = () => {
    setAddModalState(false);
    setMembers([]);
  };

  const addMemberHandler = () => {
    console.log(members);
  };
  return (
    <div className="flex justify-between items-center p-2">
      <div onClick={toggleMapState} className="hover:scale-110">
        <MarkedMapIcon />
      </div>
      <p className="text-2xl font-bold">{roomName}</p>
      <div className="relative">
        <div onClick={() => SetSettingState(!settingState)}>
          <SettingIcon />
        </div>
        {settingState ? (
          <div className="absolute left-[3rem] -top-[0.5rem] w-[12rem] flex flex-col items-center gap-2 border-2 rounded-md p-2">
            {addModalState ? (
              <div>
                <FriendsAddContainer
                  members={members}
                  setMembers={setMembers}
                />
                <div className="flex justify-between mx-2">
                  <OutlinedButton onClick={cancleHandler}>취소</OutlinedButton>
                  <OutlinedButton onClick={addMemberHandler}>
                    만들기
                  </OutlinedButton>
                </div>
              </div>
            ) : (
              <OutlinedButton
                size="small"
                onClick={() => setAddModalState(true)}
                className=""
              >
                멤버 추가하기
              </OutlinedButton>
            )}
            <OutlinedButton size="small" onClick={exitChatRoom} className="">
              채팅방 나가기
            </OutlinedButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}
