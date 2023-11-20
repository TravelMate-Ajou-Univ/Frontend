import React from "react";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";

type Props = {
  roomName: string;
  toggleMapState: () => void;
};

export default function ChatRoomHeader({ roomName, toggleMapState }: Props) {
  return (
    <div className="flex justify-center relative items-center">
      <div className="absolute left-3" onClick={toggleMapState}>
        <MarkedMapIcon />
      </div>
      <p className="text-2xl text-center mb-2">{roomName}</p>
    </div>
  );
}
