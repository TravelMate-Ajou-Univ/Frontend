import ChatForm from "@/components/chat/ChatForm";
import ChatList from "@/components/chat/ChatList";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBookmarks, setCenter } from "@/redux/features/mapSlice";
import { Socket } from "socket.io-client";
import { calculateCenter } from "@/service/googlemap/map";
import { getAllBookmarks } from "@/service/axios/bookmark";
import { useAppSelector } from "@/hooks/redux";
import { ChatType, ChatWithVisibilityType } from "@/model/chat";
import OutlinedButton from "../ui/button/OutlinedButton";
import BookmarkOptionBox from "./BookmarkOptionBox";
import { CalculateAmPmTime } from "@/service/time";
import { checkVisibility, makeNewChat } from "@/service/chat";
import ChatMap from "../googleMap/ChatMap";

type Props = {
  socket: Socket;
  roomId: string;
  roomName: string;
};

const test_chat = [
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 1",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 2",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 3",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 4",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 5",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 2",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 3",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 4",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 5",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 2",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 3",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 4",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 5",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 2",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 3",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 2,
    nickname: "test2",
    content: "test chat 4",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  },
  {
    userId: 1,
    nickname: "test1",
    content: "test chat 5",
    createdAt: CalculateAmPmTime("2023-11-23T19:29:42.923Z")
  }
];
export default function Chatting({ socket, roomId, roomName }: Props) {
  const { id } = useAppSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const { userName } = useAppSelector(state => state.userSlice);
  const [mapState, setMapState] = useState(false);
  const [chatList, setChatList] = useState<ChatWithVisibilityType[]>([]);
  const [optionsState, setOptionsState] = useState<boolean>(false);

  // 지도, chat기록 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      // Todo : 지도에 대한 처리, Message 기록 가져오기
      const data: any[] = [];

      dispatch(setBookmarks(data));
      // bookmark들이 있다면 지도 center을 bookmark들의 가운데로
      // 없다면 내 위치를 center로 설정
      if (data.length === 0) {
        navigator.geolocation.getCurrentPosition(
          position => {
            dispatch(
              setCenter({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
            );
          },
          error => {
            prompt("현재 위치를 가져오는 데 실패하였습니다.");
            console.log(error);
          }
        );
      } else {
        dispatch(setCenter(calculateCenter(data)));
      }

      // chat Data
      const response: ChatType[] = test_chat;

      const chatWithVisibilityList: ChatWithVisibilityType[] =
        checkVisibility(response);

      setChatList(chatWithVisibilityList);
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    socket.on("message", data => {
      // const newChatList = makeNewChat(data, chatList);
      let newChat: ChatWithVisibilityType;
      const time = CalculateAmPmTime(data.createdAt);

      if (chatList.length === 0) {
        newChat = {
          userId: data.userId,
          nickname: data.nickname,
          content: data.content,
          createdAt: time,
          timeVisibility: true,
          userVisibility: true
        };
      } else if (chatList[chatList.length - 1].nickname !== data.nickname) {
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

      setChatList(chatList => [...chatList, newChat]);
    });
    socket.on("disconnected", message => {});
  }, [socket]);

  const sendMessage = (content: string) => {
    if (content.length === 0) {
      return;
    }
    socket.emit("sendMessage", {
      message: content
    });
  };

  const toggleMapState = () => {
    setMapState(!mapState);
  };

  return (
    <section className="w-[90%] mx-auto flex justify-center mt-4">
      {mapState ? (
        <div className="w-[50%] h-[40rem] m-2 border-2 rounded-md my-auto relative">
          <ChatMap modifyState={true} socket={socket} />
          <OutlinedButton
            onClick={() => {
              setOptionsState(!optionsState);
            }}
            className="absolute left-[14rem] top-[0.5rem] z-20 text-sm"
            size="small"
          >
            북마크 가져오기
          </OutlinedButton>
          {optionsState ? (
            <div className="absolute left-[21rem] top-[0.5rem] z-20">
              <BookmarkOptionBox
                setOptionsState={setOptionsState}
                socket={socket}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="w-[50%] mx-auto mt-2 p-2 border-2 rounded-md">
        <ChatRoomHeader
          socket={socket}
          userId={id}
          roomId={roomId}
          nickname={userName}
          roomName={roomName}
          toggleMapState={toggleMapState}
        />
        <ChatList chatList={chatList} />
        <ChatForm sendMessage={sendMessage} />
      </div>
    </section>
  );
}
