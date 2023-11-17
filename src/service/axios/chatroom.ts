import { ChatRoomType } from "@/model/chat";
import { chatApi } from "./api";

type ChatRoomProps = {
  name: string;
  memberIds: number[];
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
    console.log(data);

    // const newChatRoom: ChatRoomType = {
    //   name: data.
    //   memberIds:
    //   lastChat:
    //   lastChatTime:
    // }
  } catch (error) {
    console.error(error);
  }
};
