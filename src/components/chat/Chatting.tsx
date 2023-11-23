import ChatForm from "@/components/chat/ChatForm";
import ChatList from "@/components/chat/ChatList";
import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import GoogleMap from "@/components/googleMap/GoogleMap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBookmarks, setCenter } from "@/redux/features/mapSlice";
import { Socket, io } from "socket.io-client";
import { calculateCenter } from "@/service/googlemap/map";
import { getAllBookmarks } from "@/service/axios/bookmark";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import { ChatType } from "@/model/chat";

export default function Chatting({ socket }: { socket: Socket }) {
  const { id } = useAppSelector(state => state.userSlice);
  const params = useSearchParams();
  const rooomName = String(params.get("roomName"));
  const roomId = String(params.get("roomId"));
  const dispatch = useDispatch();
  const { userName } = useAppSelector(state => state.userSlice);
  const [mapState, setMapState] = useState(false);
  const [chatList, setChatList] = useState<ChatType[]>([]);
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
    };

    getData();

    // Todo : 관리자 메시지에 대한 처리
    // socket.on("adminMessage", message => {
    // console.log(message);
    // });
    socket.on("message", data => {
      const newChat: ChatType = {
        message: data.message,
        nickname: data.nickname
      };
      setChatList(chatList => [...chatList, newChat]);
    });
    socket.on("disconnected", message => {});
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("sendMessage", {
      roomId: roomId,
      userId: id,
      nickname: userName,
      message: message
    });
  };

  const toggleMapState = () => {
    setMapState(!mapState);
  };

  return (
    <section className="w-[90%] mx-auto flex justify-center mt-4">
      {mapState ? (
        <div className="w-[50%] h-[40rem] m-2 border-2 rounded-md my-auto">
          <GoogleMap modifyState={true} />
        </div>
      ) : null}
      <div className="w-[50%] mx-auto mt-2 p-2 border-2 rounded-md">
        <ChatRoomHeader roomName={rooomName} toggleMapState={toggleMapState} />
        <ChatList chatList={chatList} />
        <ChatForm sendMessage={sendMessage} />
      </div>
    </section>
  );
}
