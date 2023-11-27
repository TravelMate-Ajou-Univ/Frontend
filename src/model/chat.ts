export type ChatRoomType = {
  roomId: string;
  name: string;
  memberIds: number[];
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
