import { ChatRoomType } from "@/model/chat";
import { chatApi } from "./api";
import { BookmarkType } from "@/model/bookmark";

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
        lastChat: data.lastChat.content,
        lastChatTime: data.lastChat.createdAt,
        unReadChat: data.unReadCount
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
      lastChat: data.lastChat.content,
      lastChatTime: data.lastChat.createdAt,
      unReadChat: 0
    };
    return newChatRoom;
  } catch (error) {
    console.error(error);
    return {
      roomId: "",
      name: "",
      memberIds: [],
      lastChat: "",
      lastChatTime: "",
      unReadChat: 0
    };
  }
};

export const getChatRoomData = async (roomId: string) => {
  try {
    const response = await chatApi({
      method: "get",
      url: `chatroom/${roomId}`
    });
    const data = response.data;
    const bookmarks: BookmarkType[] = data.bookmarks.map((bookmark: any) => ({
      latitude: Number(bookmark.location.latitude),
      longitude: Number(bookmark.location.longitude),
      content: bookmark.content,
      placeId: bookmark.location.placeId,
      id: bookmark.id
    }));

    return {
      members: data.members,
      collectionId: data.collectionId,
      bookmarks
    };
  } catch (error) {
    console.error(error);
    return {
      members: [],
      collectionId: 0,
      bookmarks: []
    };
  }
};

export const getChatList = async (roomId: string) => {
  try {
    const response = await chatApi({
      method: "get",
      url: `/chatroom/${roomId}/chats`
    });

    console.log("roomId", roomId);

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
