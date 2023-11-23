import { Pagination } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { sendAddFriendRequest, searchUser } from "@/service/axios/friends";
import { FriendType } from "@/model/friend";
import OutlinedButton from "../ui/button/OutlinedButton";
import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";

type Props = {
  toggleModalState: (type: "received" | "sent" | "add" | "") => void;
  total: number;
  setTotal: (total: number) => void;
};

export default function FriendsAddModal({
  toggleModalState,
  total,
  setTotal
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchFriends, setSearchFriends] = useState<FriendType[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const searchHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await searchUser(search);

    setSearchFriends(response);
  };
  const onClick = (id: number) => {
    sendAddFriendRequest(id)
      .then(res => {
        if (res.data === "친구가 추가되었습니다.") {
          alert(res.data);
          setTotal(total + 1);
        } else {
          alert("친구 요청을 보냈습니다.");
        }
        toggleModalState("");
      })
      .catch(err => {
        alert(err.response.data.message);
        toggleModalState("");
      });
  };
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-[15rem] absolute right-0 bg-white z-10 border-2 rounded-md p-2 mt-4">
      <form className="flex items-center">
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          onChange={onChange}
          className="text-sm p-1 border"
        />
        <button
          onClick={searchHandler}
          className="text-sm border-2 bg-white hover:bg-slate-300 p-1"
        >
          검색
        </button>
      </form>
      <ul className="flex flex-col items-center gap-2 w-full">
        {searchFriends.map(friend => (
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
              onClick={() => onClick(friend.id)}
              size="small"
            >
              추가
            </OutlinedButton>
          </li>
        ))}
        {/* <Pagination
          count={Math.floor((total + 5) / 5)}
          defaultPage={1}
          onChange={(e, page) => setPage(page)}
          className="bottom-[1rem] "
        /> */}
      </ul>
    </div>
  );
}
