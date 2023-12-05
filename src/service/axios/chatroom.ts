import { ChatRoomType } from "@/model/chat";
import { chatApi } from "./api";
import { BookmarkType } from "@/model/bookmark";
import { FriendType } from "@/model/friend";

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

    const chatrooms: ChatRoomType[] = datas.map((data: any) => {
      const chatroom: ChatRoomType = {
        roomId: data.chatRoom._id,
        name: data.chatRoom.name,
        members: data.members,
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
      members: data.members,
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
      members: [],
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
    const members: FriendType[] = data.members.map((member: any) => ({
      id: member.id,
      nickname: member.nickname,
      profileImageId: member.profileImageId
    }));
    const bookmarks: BookmarkType[] = data.bookmarks.map((bookmark: any) => ({
      latitude: Number(bookmark.location.latitude),
      longitude: Number(bookmark.location.longitude),
      content: bookmark.content,
      placeId: bookmark.location.placeId,
      id: bookmark.id
    }));

    return {
      members,
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

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
