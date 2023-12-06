import { FormEvent, useState } from "react";
import FilledButton from "../ui/button/FilledButton";
import PictureIcon from "../ui/icons/PictureIcon";
import ImageInput from "../myPage/ProfileImageInput";
import { uploadImage } from "@/service/axios/article";
import { changeImageIdToImageUrl } from "@/service/axios/profile";
import { Socket } from "socket.io-client";
import Image from "next/image";
import DefaultProfile from "/public/image/defaultProfileImg.png";

interface Props {
  sendMessage: (message: string) => void;
  socket: Socket;
}

export default function ChatForm({ sendMessage, socket }: Props) {
  const [message, setMessage] = useState("");
  const [imageSendingState, setImageSendingState] = useState<boolean>(false);
  const [imageId, setImageId] = useState<number | null>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const imgId = await uploadImage(file, "chat");

    if (imgId) {
      setImageSendingState(true);
      setImageId(imgId);
    } else {
      alert("업로드 실패");
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (message.length > 800) return;
    const newMessage = e.target.value;
    setMessage(newMessage.slice(0, 800));
  };

  return (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
      {imageSendingState ? (
        <div className="flex gap-2 justify-center items-center">
          <ImageInput handleImage={handleImage}>
            <PictureIcon />
          </ImageInput>
          <div className="p-2 m-2 border-2 rounded-md flex justify-center flex-grow ">
            <Image
              src={changeImageIdToImageUrl(imageId as number, "chat")}
              alt="메시지 사진"
              height={150}
              width={150}
              className="bg-gray-200 border-2"
            />
          </div>
          <FilledButton
            onClick={() => {
              setMessage("");
              socket.emit("sendImage", {
                message: changeImageIdToImageUrl(imageId as number, "chat")
              });
              setImageId(null);
              setImageSendingState(false);
            }}
          >
            전송
          </FilledButton>
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <ImageInput handleImage={handleImage}>
            <PictureIcon />
          </ImageInput>
          <input
            type="text"
            className="border rounded-md flex-grow px-2 md:py-2 py-1 md:text-base text-sm"
            placeholder="Message.."
            value={message}
            onChange={handleMessage}
          />
          <FilledButton
            onClick={() => {
              setMessage("");
              sendMessage(message);
            }}
          >
            전송
          </FilledButton>
        </div>
      )}
    </form>
  );
}
