import { FriendType } from "./friend";

export type ChatRoomType = {
  roomId: string;
  name: string;
  members: FriendType[];
  lastChat: string;
  lastChatTime: string;
  unReadChat: number;
};

export type ChatType = {
  userId: number;
  nickname: string;
  content: string;
  createdAt: string;
};

export type ChatWithVisibilityType = ChatType & {
  userVisibility: boolean;
  timeVisibility: boolean;
};
