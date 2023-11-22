"use client";

import FriendsListContainer from "@/components/friends/FriendsListContainer";
import FriendsListHeader from "@/components/friends/FriendsListHeader";
import { FriendType } from "@/model/friend";
import { getMyFriendsList } from "@/service/axios/friends";
import { useEffect, useState } from "react";

export default function FriendsListPage() {
  const [page, setPage] = useState(1);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 12;

  useEffect(() => {
    const getFriends = async () => {
      const data = await getMyFriendsList(page, limit);

      setFriends(data.friends);
      setTotal(data.count);
    };
    getFriends();
  }, [page, total]);
  return (
    <section className="flex flex-col w-[70%] m-auto">
      <FriendsListHeader total={total} />
      <FriendsListContainer
        friends={friends}
        setPage={setPage}
        total={total}
        setTotal={setTotal}
      />
    </section>
  );
}
