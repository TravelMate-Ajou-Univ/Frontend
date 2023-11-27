import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pagination } from "@mui/material";
import defaultProfileImg from "/public/image/defaultProfileImg.png";
import { FriendType } from "@/model/friend";
import { getMyFriendsList } from "@/service/axios/friends";
import OutlinedButton from "../ui/button/OutlinedButton";

type Props = {
  members: FriendType[];
  setMembers: (friends: FriendType[]) => void;
};

export default function FriendsAddContainer({ members, setMembers }: Props) {
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const addMember = (addFriend: FriendType) => {
    const filter = friends.filter(friend => friend.id !== addFriend.id);
    setFriends(filter);
    setMembers([...members, addFriend]);
  };

  const subMember = (subFriend: FriendType) => {
    const filter = members.filter(member => member.id !== subFriend.id);
    setMembers(filter);
    setFriends([...friends, subFriend]);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getMyFriendsList(page, 5);
      setFriends(res.friends);
      setTotal(res.count);
    };
    getData();
  }, [page]);

  return (
    <div>
      <p>친구 목록</p>
      <ul className="flex flex-col items-center gap-2">
        {friends.map((friend, index) => (
          <li
            key={index}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={defaultProfileImg}
              // src={`${profileImageId}`}
              className="bg-gray-200 rounded-full"
              width={40}
              height={40}
              alt={`${friend.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center truncate hover:text-clip">
              {friend.nickname}
            </p>
            <OutlinedButton
              onClick={() => addMember(friend)}
              className=" w-[3rem] "
              size="small"
            >
              추가
            </OutlinedButton>
          </li>
        ))}
        <Pagination
          count={Math.floor((total + 5) / 5)}
          defaultPage={1}
          onChange={(e, page) => setPage(page)}
          className="bottom-[1rem] "
        />
      </ul>
      <p>채팅방 멤버</p>
      <ul className="flex flex-col items-center gap-2">
        {members.map((member, index) => (
          <li
            key={index}
            className="self-start w-full flex justify-around items-center"
          >
            <Image
              src={defaultProfileImg}
              // src={`${profileImageId}`}
              className="bg-gray-200 rounded-full"
              width={40}
              height={40}
              alt={`${member.nickname}의 사진`}
              priority
            />
            <p className="text-sm text-center truncate hover:text-clip">
              {member.nickname}
            </p>
            <OutlinedButton onClick={() => subMember(member)} size="small">
              취소
            </OutlinedButton>
          </li>
        ))}
      </ul>
    </div>
  );
}