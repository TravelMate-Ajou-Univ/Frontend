import { useState } from "react";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";
import SettingIcon from "../ui/icons/SettingIcon";

type Props = {
  roomName: string;
  toggleMapState: () => void;
};

const onClickHandler = () => {};

export default function ChatRoomHeader({ roomName, toggleMapState }: Props) {
  const [settingState, SetSettingState] = useState(false);
  return (
    <div className="flex justify-between items-center p-2">
      <div onClick={toggleMapState} className="hover:scale-110">
        <MarkedMapIcon />
      </div>
      <p className="text-2xl font-bold">{roomName}</p>
      <div
        onClick={() => SetSettingState(!settingState)}
        className="hover:scale-110 relative"
      >
        <SettingIcon />
        {settingState ? (
          <div className="absolute left-[3rem] -top-[0.5rem] w-[8rem] border-2 rounded-md p-2">
            <p className="">채팅방 제목 수정</p>
            <p className="">멤버 추가하기</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
