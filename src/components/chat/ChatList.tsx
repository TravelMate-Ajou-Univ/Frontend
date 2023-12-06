import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { ViewChatFormType } from "@/model/chat";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import { changeImageIdToImageUrl } from "@/service/axios/profile";
import { calculateAmPmTime } from "@/service/time";
import ImageModal from "./ImageModal";

type Props = {
  chatList: ViewChatFormType[];
  firstChatIndex: number;
};
export default function ChatList({ chatList, firstChatIndex }: Props) {
  const { userName } = useAppSelector(state => state.userSlice);

  const [zoomState, setZoomState] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const scrollableContainerRef = useRef<HTMLUListElement>(null);
  const scrollableContainer = scrollableContainerRef.current;

  const scrollToBottom = () => {
    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  const focusOnChatItem = (index: number) => {
    if (scrollableContainer) {
      const chatItems = scrollableContainer.querySelectorAll("li");
      const targetChatItem = chatItems[index];

      if (targetChatItem) {
        // 특정 아이템으로 스크롤 이동
        targetChatItem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const imageZoomInHandler = (imgUrl: string) => {
    setZoomState(true);
    setImageUrl(imgUrl);
  };

  useEffect(() => {
    // chatList의 변화에 따라 scrollToBottom 실행
    scrollToBottom();
  }, [chatList]);

  useEffect(() => {
    // 처음에 firstChatIndex로 포커싱
    if (firstChatIndex !== -1) {
      focusOnChatItem(firstChatIndex);
    }
  }, [firstChatIndex]);

  return (
    <section className="w-full md:h-[33rem] h-[29rem]">
      {zoomState ? (
        <ImageModal imageUrl={imageUrl} cancleHandler={setZoomState} />
      ) : null}
      <ul
        ref={scrollableContainerRef}
        className="flex flex-col border-2 rounded-md bg-white h-full relative overflow-y-auto "
      >
        {chatList.map((chat: ViewChatFormType, index: number) =>
          chat.userId === 0 ? (
            <li key={index} className="justify-center flex items-center">
              <p className="border-2 rounded-md m-1 px-2 md:py-2 py-1 w-fit md:max-w-[17rem] max-w-[15rem] text-xs text-center text-white font-thin break-words bg-gray-400">
                {chat.content}
              </p>
            </li>
          ) : chat.nickname === userName ? (
            <li key={index} className="justify-end flex items-end">
              {chat.timeVisibility && (
                <p className="self-end text-xs mb-2">
                  {calculateAmPmTime(chat.createdAt)}
                </p>
              )}
              <p className="border-2 rounded-md m-1 px-2 md:py-2 py-1 w-fit md:max-w-[22rem] max-w-[13rem] md:text-base text-sm break-words bg-yellow-300">
                {chat.type === "text" ? (
                  chat.content
                ) : (
                  <Image
                    src={chat.content}
                    height={200}
                    width={200}
                    alt="chatting image"
                    onClick={() => imageZoomInHandler(chat.content)}
                  />
                )}
              </p>
            </li>
          ) : (
            <li key={index} className="justify-start flex items-start">
              <div className="flex items-center md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem]">
                {chat.userVisibility && (
                  <Image
                    src={
                      chat.profileImageId === null
                        ? defaultProfileImg
                        : changeImageIdToImageUrl(
                            chat.profileImageId,
                            "profile"
                          )
                    }
                    className="bg-gray-100 rounded-full m-1 w-[2rem] h-[2rem]"
                    width={30}
                    height={30}
                    alt="my Image"
                  />
                )}
              </div>
              <div>
                {chat.userVisibility && (
                  <p className="text-sm ml-1">{chat.nickname}</p>
                )}
                <div className="flex">
                  <p className="border-2 rounded-md m-1 px-2 md:py-2 py-1 w-fit md:max-w-[22rem] max-w-[13rem] md:text-base text-sm break-words bg-gray-200">
                    {chat.type === "text" ? (
                      chat.content
                    ) : (
                      <Image
                        src={chat.content}
                        height={200}
                        width={200}
                        alt="chatting image"
                        onClick={() => imageZoomInHandler(chat.content)}
                      />
                    )}
                  </p>
                  {chat.timeVisibility && (
                    <p className="self-end text-xs mb-2">
                      {calculateAmPmTime(chat.createdAt)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
