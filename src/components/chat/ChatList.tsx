import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { ChatType } from "@/model/chat";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  chatList: ChatType[];
};
export default function ChatList({ chatList }: Props) {
  const { userName } = useAppSelector(state => state.userSlice);
  const pre_chat: string = "";
  return (
    <section className="w-full h-[33rem]">
      <ul className="flex flex-col border-2 rounded-md bg-white h-full relative">
        {chatList.map((chat: ChatType, index: number) =>
          chat.nickname === userName ? (
            <li key={index} className="justify-end flex items-end">
              <p className="border-2 rounded-md m-1 p-2 w-[15rem] break-words bg-yellow-300">
                {chat.message}
              </p>
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
                  className="bg-gray-100 rounded-full"
                  width={30}
                  height={30}
                  alt="my Image"
                />
              </div>
              <p className="border-2 rounded-md m-1 p-2 w-[15rem] break-words bg-gray-200">
                {chat.message}
              </p>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
