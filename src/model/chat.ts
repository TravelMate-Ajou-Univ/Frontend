export type ChatRoomType = {
  roomId: string;
  name: string;
  memberIds: number[];
  lastChat: string;
  lastChatTime: string;
};

export type ChatType = {
  message: string;
  nickname: string;
  time: string;
};
