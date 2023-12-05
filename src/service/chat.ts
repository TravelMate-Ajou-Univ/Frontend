import { ReceiveChatFormType, ViewChatFormType } from "@/model/chat";
import { CalculateAmPmTime, CheckChatTime } from "./time";
import { FriendType } from "@/model/friend";

type ChatProps = {
  _id: string;
  userId: number;
  content: string;
  type: string;
  createdAt: string;
};

export const checkVisibility = (
  chatList: ChatProps[],
  firstChat: ChatProps | null,
  members: FriendType[]
): ViewChatFormType[] => {
  // key & value
  const nicknameDict = new Map<number, string>();
  const profileDict = new Map<number, number | null>();

  members.map(member => {
    nicknameDict.set(member.id, member.nickname);
    profileDict.set(member.id, member.profileImageId);
  });

  let newChatList: ViewChatFormType[] = [];
  let newChat: ViewChatFormType;

  for (let i = 0; i < chatList.length; i++) {
    // 읽지않은 채팅의 시작이라면 system message 삽입.
    if (firstChat !== null && firstChat._id === chatList[i]._id) {
      const unReadChat: ViewChatFormType = {
        userId: 0,
        nickname: "",
        content: "여기까지 읽었습니다.",
        type: "text",
        createdAt: "",
        profileImageId: 0,
        userVisibility: false,
        timeVisibility: false
      };
      newChatList = [...newChatList, unReadChat];
    }

    // 뒤에 채팅으로 판별시작
    // 이미지를 보여주는 경우 : 이전 채팅이 다른 사람이거나 첫 채팅이라면 이미지 표시
    if (
      newChatList.length === 0 ||
      newChatList[newChatList.length - 1].userId !== chatList[i].userId
    ) {
      newChat = {
        userId: chatList[i].userId,
        nickname: nicknameDict.get(chatList[i].userId) as string,
        profileImageId: profileDict.get(chatList[i].userId) as number,
        content: chatList[i].content,
        type: chatList[i].type,
        createdAt: chatList[i].createdAt,
        userVisibility: true,
        timeVisibility: true
      };
    } else {
      // 처음 채팅이 아니고, 한 사용자가 계속 쓴 채팅 중
      // 시간 차이가 난다.
      if (
        CheckChatTime(
          newChatList[newChatList.length - 1].createdAt,
          chatList[i].createdAt
        )
      ) {
        newChat = {
          userId: chatList[i].userId,
          nickname: nicknameDict.get(chatList[i].userId) as string,
          profileImageId: profileDict.get(chatList[i].userId) as number,
          content: chatList[i].content,
          type: chatList[i].type,
          createdAt: chatList[i].createdAt,
          userVisibility: false,
          timeVisibility: true
        };
      } else {
        newChatList[newChatList.length - 1].timeVisibility = false;
        newChat = {
          userId: chatList[i].userId,
          nickname: nicknameDict.get(chatList[i].userId) as string,
          profileImageId: profileDict.get(chatList[i].userId) as number,
          content: chatList[i].content,
          type: chatList[i].type,
          createdAt: chatList[i].createdAt,
          userVisibility: false,
          timeVisibility: true
        };
      }
    }
    newChatList = [...newChatList, newChat];
  }

  return newChatList;
};

export const makeNewChat = (
  data: ReceiveChatFormType,
  chatList: ViewChatFormType[]
): ViewChatFormType[] => {
  let newChat: ViewChatFormType;
  if (
    chatList.length === 0 ||
    chatList[chatList.length - 1].userId !== data.userId
  ) {
    newChat = {
      userId: data.userId,
      nickname: data.nickname,
      profileImageId: data.profileImageId,
      content: data.content,
      type: data.type,
      createdAt: data.createdAt,
      userVisibility: true,
      timeVisibility: true
    };
  } else {
    // 처음 채팅이 아니고, 한 사용자가 계속 쓴 채팅 중
    // 시간 차이가 난다.
    if (
      CheckChatTime(chatList[chatList.length - 1].createdAt, data.createdAt)
    ) {
      newChat = {
        userId: data.userId,
        nickname: data.nickname,
        profileImageId: data.profileImageId,
        content: data.content,
        type: data.type,
        createdAt: data.createdAt,
        userVisibility: false,
        timeVisibility: true
      };
    } else {
      chatList[chatList.length - 1].timeVisibility = false;
      newChat = {
        userId: data.userId,
        nickname: data.nickname,
        profileImageId: data.profileImageId,
        content: data.content,
        type: data.type,
        createdAt: data.createdAt,
        userVisibility: false,
        timeVisibility: true
      };
    }
  }
  const newChatList = [...chatList, newChat];
  return newChatList;
};
