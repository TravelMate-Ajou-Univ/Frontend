import { useState } from "react";
import { Socket } from "socket.io-client";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";
import SettingIcon from "../ui/icons/SettingIcon";
import OutlinedButton from "../ui/button/OutlinedButton";
import FriendsAddContainer from "./FriendsAddContainer";
import { FriendType } from "@/model/friend";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { changeImageIdToImageUrl } from "@/service/axios/profile";

type Props = {
  socket: Socket;
  userId: number;
  roomId: string;
  nickname: string;
  roomName: string;
  roomMembers: FriendType[];
  toggleMapState: () => void;
  memberChangedState: boolean;
  setMemberChangedState: (state: boolean) => void;
};

export default function ChatRoomHeader({
  socket,
  userId,
  roomId,
  nickname,
  roomName,
  roomMembers,
  toggleMapState,
  memberChangedState,
  setMemberChangedState
}: Props) {
  const [settingState, setSettingState] = useState(false);
  const [addModalState, setAddModalState] = useState<boolean>(false);
  const [members, setMembers] = useState<FriendType[]>([]);
  const router = useRouter();
  const exitChatRoom = () => {
    socket.emit("exitChatRoom", { nickname, roomId, userId });
    router.push("/chat/list");
    setMemberChangedState(!memberChangedState);
  };
  const cancleHandler = () => {
    setAddModalState(false);
    setMembers([]);
  };

  const addMemberHandler = () => {
    socket.emit("inviteFriend", {
      members
    });
    setMemberChangedState(!memberChangedState);
    setMembers([]);
    setSettingState(false);
  };
  return (
    <div className="flex justify-between items-center p-2">
      <div onClick={toggleMapState} className="hover:scale-110">
        <MarkedMapIcon />
      </div>
      <p className="text-2xl font-bold">{roomName}</p>
      <div className="relative">
        <div onClick={() => setSettingState(!settingState)}>
          <SettingIcon />
        </div>
        {settingState ? (
          <div className="absolute left-[3rem] -top-[0.5rem] w-[13rem] gap-2 border-2 rounded-md p-2">
            <div>
              <p>채팅방 멤버들</p>
              <ul className="flex gap-4 overflow-x-scroll">
                {roomMembers.map((member, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center w-[4rem]"
                  >
                    <Image
                      src={
                        member.profileImageId === null
                          ? defaultProfileImg
                          : changeImageIdToImageUrl(
                              member.profileImageId,
                              "profile"
                            )
                      }
                      className="bg-gray-200 rounded-full w-[3.5rem] h-[3.5rem]"
                      width={40}
                      height={40}
                      alt={`${member.nickname}의 사진`}
                      priority
                    />
                    <p className="w-[4rem] truncate hover:text-clip text-sm">
                      {member.nickname}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {addModalState ? (
              <div>
                <FriendsAddContainer
                  members={members}
                  setMembers={setMembers}
                  roomMembers={roomMembers}
                  nickname={nickname}
                />
                <div className="flex justify-between mx-2">
                  <OutlinedButton onClick={cancleHandler}>취소</OutlinedButton>
                  <OutlinedButton onClick={addMemberHandler}>
                    추가하기
                  </OutlinedButton>
                </div>
              </div>
            ) : (
              <div className=" flex flex-col items-center gap-2">
                <OutlinedButton
                  size="small"
                  onClick={() => setAddModalState(true)}
                >
                  멤버 추가하기
                </OutlinedButton>
                <OutlinedButton size="small" onClick={exitChatRoom}>
                  채팅방 나가기
                </OutlinedButton>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
