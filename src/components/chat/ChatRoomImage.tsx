import { ChatRoomType } from "@/model/chat";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import React from "react";
import { changeImageIdToImageUrl } from "@/service/axios/profile";

type Props = {
  chatRoom: ChatRoomType;
};

export default function ChatRoomImage({ chatRoom }: Props) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {chatRoom.members.length === 1 ? (
        <Image
          src={
            chatRoom.members[0].profileImageId === null
              ? defaultProfileImg
              : changeImageIdToImageUrl(
                  chatRoom.members[0].profileImageId,
                  "profile"
                )
          }
          className="bg-gray-100 rounded-full w-[6rem] h-[6rem]"
          width={150}
          height={150}
          alt="프로필 사진"
          priority
        />
      ) : chatRoom.members.length === 2 ? (
        <div className="relative w-full h-full">
          <Image
            src={
              chatRoom.members[0].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[0].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[4.5rem] h-[4.5rem] absolute right-[0.5rem] top-[1rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[1].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[1].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[4.5rem] h-[4.5rem] absolute left-[0.25rem] top-[1rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
        </div>
      ) : chatRoom.members.length === 3 ? (
        <div className="relative w-full h-full">
          <Image
            src={
              chatRoom.members[0].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[0].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[4rem] h-[4rem] absolute right-[0.5rem] top-[2.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[1].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[1].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[4rem] h-[4rem] absolute left-[0.5rem] top-[2.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[2].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[2].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[4rem] h-[4rem] absolute left-[2.25rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={
              chatRoom.members[0].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[0].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[3rem] h-[3rem] absolute right-[1.25rem] top-[3.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[1].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[1].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[3rem] h-[3rem] absolute left-[1.25rem] top-[3.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[2].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[2].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[3rem] h-[3rem] absolute right-[1.25rem] top-[0.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
          <Image
            src={
              chatRoom.members[3].profileImageId === null
                ? defaultProfileImg
                : changeImageIdToImageUrl(
                    chatRoom.members[3].profileImageId,
                    "profile"
                  )
            }
            className="bg-gray-100 rounded-full w-[3rem] h-[3rem] absolute left-[1.25rem] top-[0.5rem]"
            width={150}
            height={150}
            alt="프로필 사진"
            priority
          />
        </div>
      )}
    </div>
  );
}
