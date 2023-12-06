"use client";

import { AdminListType } from "@/model/admin";
import { useState } from "react";
import ListTypeNav from "./ListTypeNav";
import UserList from "./UserList";
import BanModal from "../ui/admin/BanModal";
import { banUser } from "@/service/axios/admin";
import { User } from "@/model/user";
import UserReportList from "./UserReportList";
import PostingReportList from "./PostingReportList";

export default function Admin() {
  const [listType, setListType] = useState<AdminListType>("USER");
  const [banTarget, setBanTarget] = useState<User>({
    id: 0,
    userName: "",
    profileImageId: ""
  });
  const [banReason, setBanReason] = useState<string>("");
  const [banModal, setBanModal] = useState(false);

  const ban = async () => {
    if (listType === "USER" || listType === "USER_REPORT") {
      if (!banTarget) return alert("다시 시도해주세요.");
      const res = await banUser(banTarget.id, banReason);
      if (res) {
        alert(`${banTarget.userName}님을 정지시켰습니다.`);
        setBanModal(false);
      } else {
        alert("다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <section className="bg-white shadow-lg">
        <ListTypeNav
          listType={listType}
          setListType={(value: AdminListType) => setListType(value)}
        />
        <div className="w-full border-2 border-t-0">
          {listType === "USER" ? (
            <UserList setBanTarget={setBanTarget} setBanModal={setBanModal} />
          ) : listType === "USER_REPORT" ? (
            <UserReportList
              setBanTarget={setBanTarget}
              setBanModal={setBanModal}
            />
          ) : (
            <PostingReportList />
          )}
        </div>
      </section>
      {banModal && (
        <BanModal
          name={banTarget.userName}
          setReason={(value: string) => setBanReason(value)}
          submit={() => {}}
          cancel={() => setBanModal(false)}
        />
      )}
    </>
  );
}
