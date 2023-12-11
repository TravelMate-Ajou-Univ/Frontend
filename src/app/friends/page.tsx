"use client";

import FriendsListContainer from "@/components/friends/FriendsListContainer";
import FriendsListHeader from "@/components/friends/FriendsListHeader";
import { FriendWithPkType } from "@/model/friend";
import { getMyFriendsList } from "@/service/axios/friends";
import { useEffect, useState } from "react";

export default function FriendsListPage() {
  const [page, setPage] = useState(1);
  const [friends, setFriends] = useState<FriendWithPkType[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const getFriends = async () => {
      const data = await getMyFriendsList(page, limit);

      setFriends(data.friends);
      setTotal(data.count);
    };
    getFriends();
  }, [page, total]);
  return (
    <section className="flex flex-col lg:w-mainSection md:w-mainSectionMd sm:w-mainSectionSm w-full m-auto">
      <FriendsListHeader total={total} setTotal={setTotal} />
      <FriendsListContainer
        friends={friends}
        setPage={setPage}
        total={total}
        setTotal={setTotal}
      />
    </section>
  );
}
