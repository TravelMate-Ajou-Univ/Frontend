"use client";

import CollectionAddButton from "@/components/CollectionAddButton";
import Collection from "@/components/Collection";
import VisibilityButton from "@/components/ui/VisibilityButton";
import { getMyCollectionList } from "@/service/axios/bookmark";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import {
  setBookmarkCollectionList,
  setBookmarkCollectionView
} from "@/redux/features/bookmarkCollectionListSlice";

type Props = {
  params: {
    slug: "all" | "public" | "friends_only" | "private";
  };
};
export default function MyBookmarkPage({ params }: Props) {
  const dispatch = useDispatch();
  const { bookmarkCollections, count } = useAppSelector(
    state => state.bookmarkCollectionListSlice
  );
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const getData = async () => {
      const data = await getMyCollectionList({
        page: page,
        limit: limit,
        visibility: params.slug
      });
      dispatch(setBookmarkCollectionList(data));
      dispatch(setBookmarkCollectionView(params.slug));
    };
    getData();
  }, [page, params.slug, dispatch]);

  const pageHandler = (page: number) => {
    setPage(page);
  };

  return (
    <section className="flex flex-col items-center w-full p-4 relative pb-[4rem]">
      <div className="flex flex-col gap-4 w-[60%] mx-auto">
        <h1 className="font-bold text-2xl text-center my-4">
          나의 북마크 컬렉션
        </h1>
        <div className="flex justify-between items-center">
          <VisibilityButton user="me" scope={params.slug} />
          <CollectionAddButton />
        </div>
        <div className=" border-4 rounded-md h-[37rem]">
          <ul className="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-4">
            {bookmarkCollections.map((bookmarkCollection, index) =>
              index === 12 ? null : (
                <li key={index} className="h-full w-full">
                  <Collection bookmarkCollection={bookmarkCollection} />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <Pagination
        count={Math.floor((count + limit) / limit)}
        defaultPage={1}
        onChange={(e, page) => pageHandler(page)}
        className="absolute bottom-[1rem]"
      />
    </section>
  );
}

export async function generateStaticParams() {
  const visible_scopes: string[] = ["all", "public", "friends_only", "private"];

  return visible_scopes.map(visible_scope => ({
    slug: visible_scope
  }));
}
