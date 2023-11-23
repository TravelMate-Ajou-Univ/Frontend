export type ChatRoomType = {
  roomId: string;
  name: string;
  memberIds: number[];
  lastChat: string;
  lastChatTime: string;
};

export type ChatType = {
  userId: number;
  nickname: string;
  content: string;
  createdAt: string;
};
