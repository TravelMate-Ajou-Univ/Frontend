"use client";

import { getMyArticleByRequest } from "@/service/axios/article";
import { useEffect } from "react";

export default function ActivitySection() {
  useEffect(() => {
    const getData = async () => {
      const data = await getMyArticleByRequest(1, 25, "pending");
    };
    getData();
  }, []);

  return (
    <div>
      <p>내가 작성한 게시글</p>

      <p>내가 기여한 게시글</p>
      <p>수정요청한 게시글</p>
    </div>
  );
}
