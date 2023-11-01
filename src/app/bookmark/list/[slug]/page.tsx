"use client";

import CollectionAddButton from "@/components/CollectionAddButton";
import Collection from "@/components/Collection";
import VisibilityButton from "@/components/ui/VisibilityButton";
import { BookmarkCollection } from "@/model/bookmark";
import { getMyCollectionList } from "@/service/axios/bookmark";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  params: {
    slug: "ALL" | "PUBLIC" | "FRIENDS_ONLY" | "PRIVATE";
  };
};
export default function BookmarkPage({ params }: Props) {
  const [collections, setCollections] = useState<BookmarkCollection[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const data = await getMyCollectionList({
        page: page,
        limit: 8,
        visibility: params.slug
      });
      setCollections(data);
    };
    getData();
  }, [page]);

  const pageHandler = (page: number) => {
    setPage(page);
  };
  return (
    <section className="flex flex-col items-center w-full p-4">
      <div className="flex flex-col w-[60%] mx-auto">
        <div className="flex justify-between items-center">
          <VisibilityButton scope={params.slug} />
          <CollectionAddButton />
        </div>
        <div className="h-[70vh] my-4 border-4 rounded-md p-7 ">
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((collection, index) => (
              <li key={index}>
                <Collection bookmarkCollection={collection} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Pagination
        count={10}
        defaultPage={1}
        onChange={(e, page) => pageHandler(page)}
        className="mt-4"
      />
    </section>
  );
}

export async function generateStaticParams() {
  const visible_scopes: string[] = ["ALL", "PUBLIC", "FRIENDS_ONLY", "PRIVATE"];

  return visible_scopes.map(visible_scope => ({
    slug: visible_scope
  }));
}
