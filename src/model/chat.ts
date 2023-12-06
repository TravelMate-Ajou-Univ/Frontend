import { FriendType } from "./friend";

export type ChatRoomType = {
  roomId: string;
  name: string;
  members: FriendType[];
  lastChat: string;
  lastChatType: string;
  lastChatTime: string;
  unReadChat: number;
};

export type ReceiveChatFormType = {
  userId: number;
  nickname: string;
  content: string;
  type: string;
  createdAt: string;
  profileImageId: number;
};

export type ViewChatFormType = ReceiveChatFormType & {
  userVisibility: boolean;
  timeVisibility: boolean;
};
