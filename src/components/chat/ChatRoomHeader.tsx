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
import FilledButton from "../ui/button/FilledButton";

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
  const cancelHandler = () => {
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
    <div className="flex justify-between items-center px-2 md:py-2">
      <div onClick={toggleMapState} className="hover:scale-110">
        <MarkedMapIcon isChatting />
      </div>
      <p className="md:text-2xl text-lg font-bold">{roomName}</p>
      <div className="relative">
        <div onClick={() => setSettingState(!settingState)}>
          <SettingIcon />
        </div>
        {settingState && (
          <div className="bg-white absolute right-0 top-7 w-[15rem] gap-2 border-2 rounded-md px-4 py-3 z-30 shadow-lg">
            <div className="mb-2">
              <p className="font-semibold mb-1.5">채팅방 멤버</p>
              <ul className="flex gap-4 overflow-x-auto">
                {roomMembers.map((member, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center w-[4rem]"
                  >
                    <div className="w-12 h-12">
                      <Image
                        src={
                          member.profileImageId === null
                            ? defaultProfileImg
                            : changeImageIdToImageUrl(
                                member.profileImageId,
                                "profile"
                              )
                        }
                        className="bg-gray-200 rounded-full min-w-full min-h-full"
                        width={40}
                        height={40}
                        alt={`${member.nickname}의 사진`}
                        priority
                      />
                    </div>
                    <p className="w-[4rem] truncate hover:text-clip text-sm">
                      {member.nickname}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {addModalState ? (
              <div className="bg-white">
                <FriendsAddContainer
                  members={members}
                  setMembers={setMembers}
                  roomMembers={roomMembers}
                  nickname={nickname}
                />
                <div className="flex justify-between mx-2">
                  <OutlinedButton onClick={cancelHandler}>취소</OutlinedButton>
                  <FilledButton onClick={addMemberHandler}>
                    추가하기
                  </FilledButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
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
        )}
      </div>
    </div>
  );
}
