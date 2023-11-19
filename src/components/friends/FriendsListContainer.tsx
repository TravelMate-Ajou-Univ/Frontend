import { FriendType } from "@/model/friend";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { Pagination } from "@mui/material";
import { deleteFriend } from "@/service/axios/friends";

type Props = {
  friends: FriendType[];
  setPage: (page: number) => void;
  total: number;
  setTotal: (total: number) => void;
};

export default function FriendsListContainer({
  friends,
  setPage,
  total,
  setTotal
}: Props) {
  const onClick = async (id: number) => {
    const response = await deleteFriend(id);
    // Todo : error 처리
    setTotal(total - 1);
  };
  return (
    <ul className="relative border-2 h-[37rem]">
      {friends.map((friend, index) => (
        <li
          key={index}
          className="relative flex flex-row items-center p-4 m-4 border-b-2"
        >
          <Image
            src={defaultProfileImg}
            // src={`${profileImageId}`}
            className="bg-gray-200 rounded-full mx-10"
            width={70}
            height={70}
            alt={`${friend.nickname}의 사진`}
            priority
          />
          <p className="text-xl mx-20">{friend.nickname}</p>
          <button
            onClick={() => onClick(friend.id)}
            className="text-sm absolute top-2 right-2 text-red-500"
          >
            삭제
          </button>
        </li>
      ))}
      <Pagination
        count={Math.floor((total + 5) / 5)}
        defaultPage={1}
        onChange={(e, page) => setPage(page)}
        className="absolute bottom-[1rem] right-[45%]"
      />
    </ul>
  );
}
