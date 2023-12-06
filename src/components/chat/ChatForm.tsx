import { FormEvent, useState } from "react";
import FilledButton from "../ui/button/FilledButton";
import PictureIcon from "../ui/icons/PictureIcon";
import ImageInput from "../myPage/ProfileImageInput";
import { uploadImage } from "@/service/axios/article";
import { changeImageIdToImageUrl } from "@/service/axios/profile";
import { Socket } from "socket.io-client";
import Image from "next/image";
import DefaultProfile from "/public/image/defaultProfileImg.png";
import ModalPortal from "../ui/ModalPortal";
import OutlinedButton from "../ui/button/OutlinedButton";

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
    if (e.target.files.length === 0) return;
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
    <form
      className="h-max"
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
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
      {imageSendingState && (
        <ModalPortal>
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50">
            <section className="bg-white rouded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[30rem] w-[22rem] md:h-[35rem] h-[30rem] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 items-center">
                <div className="md:max-w-[26rem] max-w-[18rem] md:max-h-[30rem] max-h-[25rem]">
                  <Image
                    src={changeImageIdToImageUrl(imageId as number, "chat")}
                    alt="메시지 사진"
                    height={150}
                    width={150}
                    className="bg-gray-200 h-full w-full"
                  />
                </div>
                <p className="md:text-base text-sm">전송하시겠습니까?</p>
                <div className="flex gap-2">
                  <OutlinedButton
                    onClick={() => {
                      setImageId(null);
                      setImageSendingState(false);
                    }}
                  >
                    취소
                  </OutlinedButton>
                  <FilledButton
                    onClick={() => {
                      setMessage("");
                      socket.emit("sendImage", {
                        message: changeImageIdToImageUrl(
                          imageId as number,
                          "chat"
                        )
                      });
                      setImageId(null);
                      setImageSendingState(false);
                    }}
                  >
                    전송
                  </FilledButton>
                </div>
              </div>
            </section>
          </div>
        </ModalPortal>
      )}
    </form>
  );
}
