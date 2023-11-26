import { ChatType, ChatWithVisibilityType } from "@/model/chat";

export const checkVisibility = (
  chatList: ChatType[]
): ChatWithVisibilityType[] => {
  let check_nickname: string = "";
  let check_time: string = "";
  let newChatList: ChatWithVisibilityType[] = [];
  let newChat: ChatWithVisibilityType;
  for (let i = 0; i < chatList.length; i++) {
    if (chatList[i].nickname !== check_nickname) {
      check_nickname = chatList[i].nickname;
      check_time = chatList[i].createdAt;
      newChat = {
        userId: chatList[i].userId,
        nickname: chatList[i].nickname,
        content: chatList[i].content,
        createdAt: chatList[i].createdAt,
        userVisibility: true,
        timeVisibility: true
      };
    } else {
      if (check_time !== chatList[i].createdAt || i === chatList.length - 1) {
        check_time = chatList[i].createdAt;
        newChat = {
          userId: chatList[i].userId,
          nickname: chatList[i].nickname,
          content: chatList[i].content,
          createdAt: chatList[i].createdAt,
          userVisibility: false,
          timeVisibility: true
        };
      } else {
        newChat = {
          userId: chatList[i].userId,
          nickname: chatList[i].nickname,
          content: chatList[i].content,
          createdAt: chatList[i].createdAt,
          userVisibility: false,
          timeVisibility: false
        };
      }
    }
    newChatList = [...newChatList, newChat];
  }
  return newChatList;
};
