import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { ChatType } from "@/model/chat";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useRef } from "react";

type Props = {
  chatList: ChatType[];
};
export default function ChatList({ chatList }: Props) {
  const { userName } = useAppSelector(state => state.userSlice);
  const scrollableContainerRef = useRef<HTMLUListElement>(null);
  const scrollableContainer = scrollableContainerRef.current;

  const scrollToBottom = () => {
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const pre_chat: string = "";
  return (
    <section className="w-full h-[33rem]">
      <ul
        ref={scrollableContainerRef}
        className="flex flex-col border-2 rounded-md bg-white h-full relative overflow-y-auto "
      >
        {chatList.map((chat: ChatType, index: number) =>
          chat.userId === 0 ? (
            <li key={index} className="justify-center flex items-center">
              <p className="border-2 rounded-md m-1 p-2 w-[15rem] text-sm text-white font-thin break-words bg-gray-400">
                {chat.content}
              </p>
            </li>
          ) : chat.nickname === userName ? (
            <li key={index} className="justify-end flex items-end">
              <div className="flex">
                <p className="self-end text-xs mb-2">{chat.createdAt}</p>
                <p className="border-2 rounded-md m-1 p-2 w-fit max-w-[12rem] break-words bg-yellow-300">
                  {chat.content}
                </p>
              </div>
              <div className="flex items-center">
                <Image
                  src={defaultProfileImg}
                  className="bg-gray-100 rounded-full m-2"
                  width={30}
                  height={30}
                  alt="my Image"
                />
              </div>
            </li>
          ) : (
            <li key={index} className="justify-start flex items-start">
              <div className="flex items-center">
                <Image
                  src={defaultProfileImg}
                  className="bg-gray-100 rounded-full m-1"
                  width={30}
                  height={30}
                  alt="my Image"
                />
              </div>
              <div>
                <p className="text-sm ml-1">{chat.nickname}</p>
                <div className="flex">
                  <p className="border-2 rounded-md m-1 p-2 w-fit max-w-[12rem] break-words bg-gray-200">
                    {chat.content}
                  </p>
                  <p className="self-end text-xs mb-2">{chat.createdAt}</p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
