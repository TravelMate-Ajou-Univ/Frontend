"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultProfile from "/public/image/defaultProfileImg.png";
import { Pagination } from "@mui/material";
import { User } from "@/model/user";
import { getUsers } from "@/service/axios/admin";
import { changProfileIdToProfileUrl } from "@/service/axios/profile";
import OutlinedButton from "../ui/button/OutlinedButton";
import ProfileImg from "./ProfileImg";

interface Props {
  setBanTarget: React.Dispatch<React.SetStateAction<User>>;
  setBanModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserList({ setBanTarget, setBanModal }: Props) {
  const [list, setList] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getUserList = async () => {
      const data = await getUsers(page, 100);
      const users: User[] = data.nodes.map((user: any) => {
        return {
          id: user.id,
          userName: user.nickname,
          profileImageId: user.profileImageId
        };
      });
      setList(users);
      setTotalPage(Math.floor((data.count + 100) / 100));
    };
    getUserList();
  }, [page]);

  const banHandler = (user: User) => {
    setBanTarget(user);
    setBanModal(true);
  };

  return (
    <section className="p-3">
      <ul className="divide-y">
        {list.map(({ id, userName, profileImageId }: User) => (
          <li key={id} className="flex items-center gap-4 px-4 py-2">
            <ProfileImg profileImageId={profileImageId} />
            <p className="grow">{userName}</p>
            <OutlinedButton
              size="small"
              onClick={() => banHandler({ id, userName, profileImageId })}
            >
              정지
            </OutlinedButton>
          </li>
        ))}
      </ul>
      <Pagination
        count={totalPage}
        defaultPage={1}
        onChange={(_, page) => setPage(page)}
        className="mx-auto my-4 w-fit"
      />
    </section>
  );
}
