import { Pagination } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  sendAddFriendRequest,
  deleteFriend,
  getMyFriendsList,
  searchUser,
  viewReceivedFriendRequest,
  viewSentFriendRequest,
  acceptAddFriendRequest
} from "@/service/axios/friends";
import { FriendType, FriendsWithPkListType } from "@/model/friend";
import OutlinedButton from "../ui/button/OutlinedButton";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { changeImageIdToImageUrl } from "@/service/axios/profile";

type Props = {
  total: number;
  setTotal: (total: number) => void;
  toggleModalState: (type: "received" | "sent" | "add" | "") => void;
  mode: "received" | "sent";
  buttonContent: string;
};
export default function FriendsListModal({
  total,
  setTotal,
  toggleModalState,
  mode,
  buttonContent
}: Props) {
  const [page, setPage] = useState(1);
  const [frinedList, setFriendList] = useState<FriendsWithPkListType>({
    friends: [],
    count: 0
  });
  const limit = 5;
  const onClick = async (pk: number) => {
    const response =
      mode === "sent"
        ? await deleteFriend(pk)
        : await acceptAddFriendRequest(pk);

    if (response.status === 201 || 200) {
      alert(response.data);
      setTotal(total + 1);
      toggleModalState("");
    } else {
      alert(`실패하였습니다.`);
      toggleModalState("");
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      const response =
        mode === "received"
          ? await viewReceivedFriendRequest(page, limit)
          : await viewSentFriendRequest(page, limit);

      setFriendList(response);
    };
    getFriends();
  }, [page, mode]);
  return (
    <div className="flex flex-col gap-2 justify-center items-center md:w-[15rem] w-44 absolute right-0 bg-white z-10 border-2 rounded-md p-2 mt-4">
      <p className="font-bold md:text-base text-sm">
        총 {mode === "sent" ? "보낸" : "받은"} 요청 : {frinedList.count}
      </p>
      <ul className="flex flex-col items-center gap-2 w-full">
        {frinedList.friends.map(friend => (
          <li
            key={friend.id}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={
                friend.profileImageId === null
                  ? defaultProfileImg
                  : changeImageIdToImageUrl(
                      Number(friend.profileImageId),
                      "profile"
                    )
              }
              className="bg-gray-200 rounded-full lg:w-10 lg:h-10 w-5 h-5"
              width={30}
              height={30}
              alt={`${friend.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center whitespace-nowrap overflow-hidden hover:overflow-x-scroll w-[5rem]">
              {" "}
              {friend.nickname}
            </p>
            <OutlinedButton
              className="text-xs w-[3rem]"
              onClick={() => onClick(friend.pk)}
              size="small"
            >
              {buttonContent}
            </OutlinedButton>
          </li>
        ))}
        {frinedList.count !== 0 ? (
          <Pagination
            count={Math.floor((frinedList.count + limit) / limit)}
            defaultPage={1}
            onChange={(e, page) => setPage(page)}
            className="bottom-[1rem] "
          />
        ) : null}
      </ul>
    </div>
  );
}
