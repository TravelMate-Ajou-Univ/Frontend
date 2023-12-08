import ChatForm from "@/components/chat/ChatForm";
import ChatList from "@/components/chat/ChatList";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setBookmarks, setCenter } from "@/redux/features/mapSlice";
import { Socket } from "socket.io-client";
import { calculateCenter } from "@/service/googlemap/map";
import { useAppSelector } from "@/hooks/redux";
import { ReceiveChatFormType, ViewChatFormType } from "@/model/chat";
import OutlinedButton from "../ui/button/OutlinedButton";
import BookmarkOptionBox from "./BookmarkOptionBox";
import { checkVisibility, makeNewChat } from "@/service/chat";
import ChatMap from "../googleMap/ChatMap";
import { getChatList, getChatRoomData } from "@/service/axios/chatroom";
import { FriendType } from "@/model/friend";

type Props = {
  socket: Socket;
  roomId: string;
  roomName: string;
};

export default function Chatting({ socket, roomId, roomName }: Props) {
  const { id } = useAppSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const { userName } = useAppSelector(state => state.userSlice);
  const [mapState, setMapState] = useState(false);
  const [chatList, setChatList] = useState<ViewChatFormType[]>([]);
  const chatListRef = useRef<ViewChatFormType[]>([]);
  const [firstChatIndex, setFirstChatIndex] = useState<number>(-1);
  const [optionsState, setOptionsState] = useState<boolean>(false);
  const [roomMembers, setRoomMembers] = useState<FriendType[]>([]);
  const [collectionId, setCollectionId] = useState<number>(0);
  const [memberChangedState, setMemberChangedState] = useState<boolean>(false);

  // 지도, chat기록 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      const data = await getChatRoomData(roomId);
      const chatdata = await getChatList(roomId);

      setRoomMembers(data.members);
      setCollectionId(data.collectionId);
      dispatch(setBookmarks(data.bookmarks));

      const result = checkVisibility(
        chatdata.chats,
        chatdata.firstChat,
        data.members
      );
      const newChatList: ViewChatFormType[] = result.newChatList;

      setFirstChatIndex(() => {
        return result.firstChatIndex;
      });

      chatListRef.current = newChatList;
      setChatList(chatListRef.current);

      // bookmark들이 있다면 지도 center을 bookmark들의 가운데로
      // 없다면 내 위치를 center로 설정
      if (data.bookmarks.length === 0) {
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
            alert("현재 위치를 가져오는 데 실패하였습니다.");
          }
        );
      } else {
        dispatch(setCenter(calculateCenter(data.bookmarks)));
      }
    };

    getData();
  }, [dispatch, roomId]);

  useEffect(() => {
    // 맴버 최신화
    const getData = async () => {
      const data = await getChatRoomData(roomId);
      setRoomMembers(data.members);
    };
    getData();
  }, [memberChangedState, roomId]);

  useEffect(() => {
    socket.on("postBookmark", data => {
      const newBookmarkMessage: ReceiveChatFormType = {
        userId: 0,
        nickname: "",
        content: `${data.nickname}님이 북마크를 추가하였습니다.`,
        type: "text",
        createdAt: String(new Date()),
        profileImageId: 0
      };
      chatListRef.current = makeNewChat(
        newBookmarkMessage,
        chatListRef.current
      );
      setChatList(chatListRef.current);
    });
    socket.on("deleteBookmark", data => {
      const newBookmarkMessage: ReceiveChatFormType = {
        userId: 0,
        nickname: "",
        content: `${data.nickname}님이 북마크를 삭제하였습니다.`,
        type: "text",
        createdAt: String(new Date()),
        profileImageId: 0
      };
      chatListRef.current = makeNewChat(
        newBookmarkMessage,
        chatListRef.current
      );
      setChatList(chatListRef.current);
    });
    socket.on("message", data => {
      chatListRef.current = makeNewChat(data, chatListRef.current);
      setChatList(chatListRef.current);
    });
    socket.on("exitChatRoom", data => {
      setMemberChangedState(!memberChangedState);
    });
    socket.on("disconnected", message => {});
  }, [socket]);

  const sendMessage = (content: string) => {
    if (content.trim() === "") {
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
    <section className="w-full md:h-[41rem] h-[35rem] flex md:flex-row flex-col items-center md:mt-8 mt-4">
      {mapState && (
        <div className="md:w-[40rem] w-[90%] md:h-full h-[35rem] mx-2 border-2 rounded-md md:static absolute z-40">
          <ChatMap
            modifyState={true}
            socket={socket}
            collectionId={collectionId}
          />
          <div className="relative w-fit lg:translate-x-56 translate-x-2 lg:-translate-y-[40rem] md:-translate-y-[38rem] -translate-y-[32rem]">
            <OutlinedButton
              onClick={() => {
                setOptionsState(!optionsState);
              }}
              className="text-sm"
              size="small"
            >
              북마크 가져오기
            </OutlinedButton>
            {optionsState && (
              <div className="absolute top-7 left-0 z-50 shadow-md">
                <BookmarkOptionBox
                  setOptionsState={setOptionsState}
                  socket={socket}
                  bookmarkCollectionId={collectionId}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="md:w-[40rem] h-full mx-auto p-2 border-2 rounded-md bg-white flex flex-col justify-between gap-2">
        <ChatRoomHeader
          socket={socket}
          userId={id}
          roomId={roomId}
          nickname={userName}
          roomName={roomName}
          roomMembers={roomMembers}
          toggleMapState={toggleMapState}
          memberChangedState={memberChangedState}
          setMemberChangedState={setMemberChangedState}
        />
        <ChatList chatList={chatList} firstChatIndex={firstChatIndex} />
        <ChatForm sendMessage={sendMessage} socket={socket} />
      </div>
    </section>
  );
}
