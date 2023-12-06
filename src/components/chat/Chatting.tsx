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
import { calculateAmPmTime } from "@/service/time";
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
    <section className="w-full mx-auto flex mt-4">
      {mapState ? (
        <div className="w-[41rem] h-[40rem] m-2 border-2 rounded-md my-auto relative">
          <ChatMap
            modifyState={true}
            socket={socket}
            collectionId={collectionId}
          />
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
                bookmarkCollectionId={collectionId}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="w-[52rem] mx-auto">
        <div className="w-[40rem] mt-2 p-2 border-2 rounded-md">
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
      </div>
    </section>
  );
}
