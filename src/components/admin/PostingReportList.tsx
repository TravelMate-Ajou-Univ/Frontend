"use client";

import { ArticleReportType } from "@/model/admin";
import { getArticleReports } from "@/service/axios/admin";
import { useEffect, useState } from "react";
import ProfileImg from "./ProfileImg";
import Link from "next/link";
import { Pagination } from "@mui/material";

export default function PostingReportList() {
  const [reports, setReports] = useState<ArticleReportType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getUserList = async () => {
      const data = await getArticleReports(page, 100);
      const reports: ArticleReportType[] = data.nodes.map((node: any) => {
        return {
          id: node.id,
          reason: node.reason,
          reporter: {
            id: node.articleReporter.id,
            userName: node.articleReporter.nickname,
            profileImageId: node.articleReporter.profileImageId
          },
          article: node.article
        };
      });
      setReports(reports);
      setTotalPage(Math.floor((data.count + 100) / 100));
    };
    getUserList();
  }, [page]);

  const returnSeason = (article: any) => {
    if (article.springVersionID) return "spring";
    if (article.summerVersionID) return "summer";
    if (article.fallVersionID) return "fall";
    if (article.winterVersionID) return "winter";
    return "all";
  };

  return (
    <section className="p-3">
      <ul className="divide-y">
        {reports.map(({ id, reason, reporter, article }: ArticleReportType) => (
          <li key={id} className="px-4 py-4 hover:bg-gray-50">
            <Link
              href={`/article/detail/${article.id}?season=${returnSeason(
                article
              )}`}
            >
              <section className="flex items-center gap-4 mb-4">
                <p className="text-lg font-semibold">{article.title}</p>
              </section>
              <section className="ml-16 mt-2 px-4 py-2 flex flex-col gap-3 border bg-white">
                <h1 className="font-semibold">신고자/사유</h1>
                <div className="flex items-center gap-4">
                  <ProfileImg profileImageId={reporter.profileImageId} />
                  <p>{reporter.userName}</p>
                </div>
                <p className="w-full px-2 py-1 bg-gray-100 whitespace-pre-line">
                  {reason}
                </p>
              </section>
            </Link>
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
