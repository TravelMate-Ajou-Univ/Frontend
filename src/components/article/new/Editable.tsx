"use client";

import { useSearchParams } from "next/navigation";
import { SeasonType } from "@/model/article";
import ArticleForm from "./ArticleForm";

interface Props {
  id: string;
}

export default function Editable({ id }: Props) {
  const searchParams = useSearchParams();

  return (
    <ArticleForm
      id={id}
      edittngSeason={searchParams.get("season")?.toUpperCase() as SeasonType}
    />
  );
}
