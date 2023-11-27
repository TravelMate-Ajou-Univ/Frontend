import { ChatType, ChatWithVisibilityType } from "@/model/chat";
import { CalculateAmPmTime } from "./time";

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

type Props = {
  userId: number;
  nickname: string;
  content: string;
  createdAt: string;
  sender: string;
};

export const makeNewChat = (
  data: Props,
  chatList: ChatWithVisibilityType[]
): ChatWithVisibilityType[] => {
  let newChat: ChatWithVisibilityType;
  const time = CalculateAmPmTime(data.createdAt);

  if (chatList[chatList.length - 1].nickname !== data.nickname) {
    // 이전 챗이 다른 사용자인 경우
    newChat = {
      userId: data.userId,
      nickname: data.nickname,
      content: data.content,
      createdAt: time,
      timeVisibility: true,
      userVisibility: true
    };
  } else if (chatList[chatList.length - 1].createdAt !== time) {
    // 이전 챗이 나이며, 시간 차이가 안나는 경우
    chatList[chatList.length - 1].timeVisibility = false; // 이전 챗 시간 안 보여주기
    newChat = {
      userId: data.userId,
      nickname: data.nickname,
      content: data.content,
      createdAt: time,
      timeVisibility: true,
      userVisibility: false
    };
  } else {
    // 이전 챗이 나이지만 시간 차이가 나는 경우
    chatList[chatList.length - 1].timeVisibility = true; // 이전 챗 시간 보여주기
    newChat = {
      userId: data.userId,
      nickname: data.nickname,
      content: data.content,
      createdAt: time,
      timeVisibility: false,
      userVisibility: false
    };
  }

  return [...chatList, newChat];
};