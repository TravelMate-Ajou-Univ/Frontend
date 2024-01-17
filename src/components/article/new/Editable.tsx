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
      edittingId={id}
      edittingSeason={searchParams.get("season")?.toUpperCase() as SeasonType}
    />
  );
}
