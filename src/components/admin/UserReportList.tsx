"use client";

import { useEffect, useState } from "react";
import { User } from "@/model/user";
import { getUserReports } from "@/service/axios/admin";
import OutlinedButton from "../ui/button/OutlinedButton";
import { Pagination } from "@mui/material";
import ProfileImg from "./ProfileImg";
import { UserReportType } from "@/model/admin";

interface Props {
  setBanTarget: React.Dispatch<React.SetStateAction<User>>;
  setBanModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserReportList({ setBanTarget, setBanModal }: Props) {
  const [reports, setReports] = useState<UserReportType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getUserList = async () => {
      const data = await getUserReports(page, 100);
      const reports: UserReportType[] = data.nodes.map((node: any) => {
        return {
          id: node.id,
          reason: node.reason,
          reportedUser: {
            id: node.reportedUser.id,
            userName: node.reportedUser.nickname,
            profileImageId: node.reportedUser.profileImageId
          },
          reporter: {
            id: node.reporter.id,
            userName: node.reporter.nickname,
            profileImageId: node.reporter.profileImageId
          }
        };
      });
      setReports(reports);
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
        {reports.map(
          ({ id, reason, reportedUser, reporter }: UserReportType) => (
            <li key={id} className="px-4 py-4">
              <section className="flex items-center gap-4 mb-4">
                <ProfileImg profileImageId={reportedUser.profileImageId} />
                <p className="grow">{reportedUser.userName}</p>
                <OutlinedButton
                  size="small"
                  onClick={() =>
                    banHandler({
                      id: reportedUser.id,
                      userName: reportedUser.userName,
                      profileImageId: reportedUser.profileImageId
                    })
                  }
                >
                  정지
                </OutlinedButton>
              </section>
              <section className="ml-16 mt-2 px-4 py-2 flex flex-col gap-3 border">
                <h1 className="font-semibold">신고자/사유</h1>
                <div className="flex items-center gap-4">
                  <ProfileImg profileImageId={reporter.profileImageId} />
                  <p className="whitespace-pre-line">{reporter.userName}</p>
                </div>
                <p className="w-full px-2 py-1 bg-gray-100">{reason}</p>
              </section>
            </li>
          )
        )}
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
