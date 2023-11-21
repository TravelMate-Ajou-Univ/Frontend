import { ChatRoomType } from "@/model/chat";
import { chatApi } from "./api";

type ChatRoomProps = {
  name: string;
  memberIds: number[];
};

export const getMyChatRooms = async (): Promise<ChatRoomType[]> => {
  try {
    const response = await chatApi({
      method: "get",
      url: "/me/chatrooms"
    });
    const datas = response.data;

    const chatrooms = datas.map((data: any) => {
      const chatroom = {
        roomId: data.chatRoom._id,
        name: data.chatRoom.name,
        memberIds: data.chatRoom.memberIds,
        lastChat: data.chatRoom.lastChat,
        lastChatTime: data.chatRoom.created_at
      };

      return chatroom;
    });

    return chatrooms;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const makeChatRoom = async ({
  name,
  memberIds
}: ChatRoomProps): Promise<ChatRoomType> => {
  try {
    const response = await chatApi({
      method: "post",
      url: "/chatroom",
      data: {
        name,
        memberIds
      }
    });
    const data = response.data;

    const newChatRoom: ChatRoomType = {
      roomId: data.chatRoom._id,
      name: data.chatRoom.name,
      memberIds: data.chatRoom.memberIds,
      lastChat: "",
      lastChatTime: data.chatRoom.created_at
    };
    return newChatRoom;
  } catch (error) {
    console.error(error);
    return {
      roomId: "",
      name: "",
      memberIds: [],
      lastChat: "",
      lastChatTime: ""
    };
  }
};
