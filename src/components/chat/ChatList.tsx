import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { ChatType, ChatWithVisibilityType } from "@/model/chat";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useRef } from "react";
import { CalculateAmPmTime } from "@/service/time";

type Props = {
  chatList: ChatWithVisibilityType[];
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

  const infiniteScrollHandler = () => {
    if (scrollableContainer == undefined) {
      return;
    }
    const scrollPosition = scrollableContainer.scrollTop;
    const containerHeight = scrollableContainer.clientHeight;
    const contentHeight = scrollableContainer.scrollHeight;

    if (scrollPosition + containerHeight >= contentHeight) {
      // Todo forward message
    } else if (scrollPosition === 0) {
      // Todo backward message
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList, scrollToBottom]);

  return (
    <section className="w-full h-[33rem]">
      <ul
        ref={scrollableContainerRef}
        className="flex flex-col border-2 rounded-md bg-white h-full relative overflow-y-auto "
        onScroll={infiniteScrollHandler}
      >
        {chatList.map((chat: ChatWithVisibilityType, index: number) =>
          chat.userId === 0 ? (
            <li key={index} className="justify-center flex items-center">
              <p className="border-2 rounded-md m-1 p-2 w-[15rem] text-sm text-white font-thin break-words bg-gray-400">
                {chat.content}
              </p>
            </li>
          ) : chat.nickname === userName ? (
            <li key={index} className="justify-end flex items-end">
              {chat.timeVisibility ? (
                <p className="self-end text-xs mb-2">{chat.createdAt}</p>
              ) : null}
              <p className="border-2 rounded-md m-1 p-2 w-fit max-w-[12rem] break-words bg-yellow-300">
                {chat.content}
              </p>
            </li>
          ) : (
            <li key={index} className="justify-start flex items-start">
              <div className="flex items-center w-[2.5rem]">
                {chat.userVisibility ? (
                  <Image
                    src={defaultProfileImg}
                    className="bg-gray-100 rounded-full m-1"
                    width={30}
                    height={30}
                    alt="my Image"
                  />
                ) : null}
              </div>
              <div>
                {chat.userVisibility ? (
                  <p className="text-sm ml-1">{chat.nickname}</p>
                ) : null}
                <div className="flex">
                  <p className="border-2 rounded-md m-1 p-2 w-fit max-w-[12rem] break-words bg-gray-200">
                    {chat.content}
                  </p>
                  {chat.timeVisibility ? (
                    <p className="self-end text-xs mb-2">{chat.createdAt}</p>
                  ) : null}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
