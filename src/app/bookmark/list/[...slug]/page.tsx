"use client";

import Collection from "@/components/Collection";
import { useAppSelector } from "@/hooks/redux";
import { setBookmarkCollectionList } from "@/redux/features/bookmarkCollectionListSlice";
import { getFriendCollectionList } from "@/service/axios/bookmark";
import { Pagination } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  params: {
    slug: number;
  };
};

export default function UserBookmarkPage({ params }: Props) {
  const dispatch = useDispatch();
  const param = useSearchParams();
  const nickname = String(param.get("nickname"));
  const { bookmarkCollections, count } = useAppSelector(
    state => state.bookmarkCollectionListSlice
  );

  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const getData = async () => {
      const data = await getFriendCollectionList(params.slug, page, limit);
      dispatch(setBookmarkCollectionList(data));
    };
    getData();
  }, [page, dispatch, params.slug]);

  const pageHandler = (page: number) => {
    setPage(page);
  };
  return (
    <section className="flex flex-col items-center w-full p-4 relative pb-[4rem]">
      <div className="flex flex-col gap-4 w-[60%] mx-auto">
        <h1 className="font-bold text-2xl text-center my-4">
          {nickname}의 북마크 컬렉션
        </h1>
        <div className=" border-4 rounded-md w-full h-[37rem]">
          <ul className="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-4 overflow-y-scroll">
            {bookmarkCollections.map((bookmarkCollection, index) =>
              index === 12 ? null : (
                <li key={index} className="h-full w-full">
                  <Collection
                    bookmarkCollection={bookmarkCollection}
                    authorId={params.slug}
                  />
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
