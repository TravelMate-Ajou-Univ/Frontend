import { FriendWithPkType } from "@/model/friend";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { Pagination } from "@mui/material";
import { deleteFriend } from "@/service/axios/friends";
import Link from "next/link";
import { changeImageIdToImageUrl } from "@/service/axios/profile";

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
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const response = await deleteFriend(id);
    if (response.status === 200) {
      alert(response.data);
      setTotal(total - 1);
    } else {
      alert(`실패하였습니다.`);
    }
  };
  return (
    <div className="relative">
      <ul className="border-2">
        {friends.map((friend, index) => (
          <li
            key={index}
            className="flex items-center md:px-4 px-2 md:py-6 py-4 md:mx-4 mx-2 border-b-2"
          >
            <Image
              src={
                friend.profileImageId === null
                  ? defaultProfileImg
                  : changeImageIdToImageUrl(friend.profileImageId, "profile")
              }
              className="bg-gray-200 rounded-full md:w-[5rem] w-12 md:h-[5rem] h-12 md:ml-6 ml-2"
              width={70}
              height={70}
              alt={`${friend.nickname}의 사진`}
              priority
            />
            <p className="md:text-xl md:mx-10 mx-2 flex-grow break-words">
              {friend.nickname}
            </p>
            <div className="self-start flex flex-col items-end h-full">
              <button
                onClick={() => onClick(friend.pk)}
                className="font-semibold md:text-sm text-xs text-red-500"
              >
                삭제
              </button>
              <Link
                href={{
                  pathname: `/bookmark/list/${friend.id}`,
                  query: {
                    nickname: friend.nickname
                  }
                }}
              >
                <p className="font-semibold md:text-sm text-xs">북마크 보기</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.floor((total + 5 - 1) / 5)}
        defaultPage={1}
        onChange={(e, page) => setPage(page)}
        className="absolute -bottom-[3rem] right-[45%]"
      />
    </div>
  );
}
