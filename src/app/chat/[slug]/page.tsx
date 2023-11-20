"use client";
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

interface Props {
  params: {
    slug: string;
  };
}

export default function ChatPage({ params: { slug } }: Props) {
  const dispatch = useDispatch();
  const [mapState, setMapState] = useState(false);
  // const roomid = slug;
  // const socket = io("http//localhost:8080", {
  //   path: "/socket.io",
  //   transports: ["websocket"]
  // });
  // const [myInfo, setMyInfo] = useState({
  //   nickname: "",
  //   id: "",
  //   room: {
  //     roomId: "",
  //     roomName: ""
  //   }
  // });

  // useEffect(() => {
  // socket.emit("enterChatRoom", { roomId: roomid }, (response: any) => {
  //   console.log(response);
  //   setMyInfo({ nickname, id, room: response });
  // });
  // socket.on("disconnect", () => {
  //   console.log("disconneted");
  // });
  // }, [roomid, socket]);
  useEffect(() => {
    const getData = async () => {
      // Todo : 지도에 대한 처리, Message 기록 가져오기
      const data = [];

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

    // socket.on("connect", () => {
    //   console.log("conneted");
    // });
    // const nickname = localStorage.getItem("nickname") ?? "user";
    // const id = socket.io.toString();
    // socket.emit(
    //   "setInit",
    //   {
    //     nickname: "test_nickname",
    //     room: {
    //       roomId: "test room id",
    //       roomName: "test room name"
    //     }
    //   },
    //   (response: any) => {
    //     console.log(response);
    //   }
    // );
  }, []);

  const sendMessage = (message: string) => {
    // Todo : send Message
    // socket.emit("sendMessage", { roomId: "test Id", nickname: "test name" });
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
        <ChatRoomHeader roomName={slug} toggleMapState={toggleMapState} />
        <ChatList />
        <ChatForm sendMessage={sendMessage} />
      </div>
    </section>
  );
}
