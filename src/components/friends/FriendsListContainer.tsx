import { FriendWithPkType } from "@/model/friend";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { Pagination } from "@mui/material";
import { deleteFriend } from "@/service/axios/friends";
import Link from "next/link";
import BookmarkCollectionIcon from "../ui/icons/BookmarkCollectionIcon";

type Props = {
  friends: FriendWithPkType[];
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
    if (response.statusText === "OK") {
      alert(response.data);
      setTotal(total - 1);
    } else {
      alert(`실패하였습니다.`);
    }
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
          <Link
            href={{
              pathname: `/bookmark/list/${friend.id}`,
              query: {
                nickname: friend.nickname
              }
            }}
            className="absolute top-10 right-2"
          >
            <p className="text-sm p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-secondary">
              북마크 보기
            </p>
          </Link>
          <button
            onClick={() => onClick(friend.pk)}
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
