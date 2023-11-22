import { Pagination } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  addFriend,
  deleteFriend,
  getMyFriendsList,
  searchUser,
  viewReceivedFriendRequest,
  viewSentFriendRequest
} from "@/service/axios/friends";
import { FriendType, FriendsWithPkListType } from "@/model/friend";
import OutlinedButton from "../ui/button/OutlinedButton";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";

type Props = {
  toggleModalState: (type: "received" | "sent" | "add" | "") => void;
  mode: "received" | "sent";
  buttonContent: string;
};
export default function FriendsListModal({
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
    const response = await deleteFriend(pk);
    if (response.statusText === "OK") {
      alert(response.data);
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
  }, [page]);
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-[15rem] absolute right-0 bg-white z-10 border-2 rounded-md p-2 mt-4">
      <ul className="flex flex-col items-center gap-2 w-full">
        {frinedList.friends.map(friend => (
          <li
            key={friend.id}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={defaultProfileImg}
              // src={`${profileImageId}`}
              className="bg-gray-200 rounded-full"
              width={30}
              height={30}
              alt={`${friend.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center truncate hover:overflow-visible w-[5rem]">
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
        <Pagination
          count={Math.floor((frinedList.count + limit) / limit)}
          defaultPage={1}
          onChange={(e, page) => setPage(page)}
          className="bottom-[1rem] "
        />
      </ul>
    </div>
  );
}
