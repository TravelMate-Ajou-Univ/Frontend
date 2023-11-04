"use client";

import Collection from "@/components/Collection";
import VisibilityButton from "@/components/ui/VisibilityButton";
import { useAppSelector } from "@/hooks/redux";
import { setBookmarkCollection } from "@/redux/features/bookmarkCollectionSlice";
import { getMyCollectionList } from "@/service/axios/bookmark";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  params: {
    slug: string[];
  };
};

export default function UserBookmarkPage({ params }: Props) {
  const dispatch = useDispatch();
  const { collections, count } = useAppSelector(
    state => state.bookmarkCollectionSlice
  );

  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    // Todo : 다른 사용자의 bookmarkcollection을 받아오는 api
    const getData = async () => {
      const data = await getMyCollectionList({
        page: page,
        limit: limit,
        visibility: params.slug[1]
      });
      dispatch(setBookmarkCollection(data));
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
          {params.slug[0]}의 북마크 컬렉션
        </h1>
        <div className="flex justify-between items-center">
          <VisibilityButton user={params.slug[0]} scope={params.slug[1]} />
        </div>
        <div className=" border-4 rounded-md ">
          <ul className="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-4">
            {collections.map((collection, index) =>
              index === 12 ? null : (
                <li key={index} className="h-full w-full">
                  <Collection bookmarkCollection={collection} />
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
