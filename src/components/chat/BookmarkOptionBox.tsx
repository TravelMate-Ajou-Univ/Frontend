import React, { useEffect, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import { getAllBookmarks, getMyCollectionList } from "@/service/axios/bookmark";
import { BookmarkCollectionListType, BookmarkType } from "@/model/bookmark";
import DropDown from "../ui/dropDown/DropDown";

type Props = {
  setOptionsState: (state: boolean) => void;
};

type CollectionType = {
  name: string;
  id: number;
};

export default function BookmarkOptionBox({ setOptionsState }: Props) {
  // const [selectedCollection, setSelectedCollection] = useState<CollectionType>({
  //   name: "북마크 컬렉션",
  //   id: 0
  // });
  const [selectedCollection, setSelectedCollection] =
    useState<string>("북마크 컬렉션");
  const [collectionNameList, setCollectionNameList] = useState<
    CollectionType[]
  >([]);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  useEffect(() => {
    const getCollections = async () => {
      const data: BookmarkCollectionListType = await getMyCollectionList({
        page: 1,
        limit: 25,
        visibility: "all"
      });
      const collectionNames: CollectionType[] = data.bookmarkCollections.map(
        bookmarkCollection => {
          return {
            name: bookmarkCollection.title,
            id: bookmarkCollection.id
          };
        }
      );
      setCollectionNameList(collectionNames);
    };

    getCollections();
  }, []);

  // useEffect(() => {
  //   const getBookmarks = async (id: number) => {
  //     const data: BookmarkType[] = await getAllBookmarks(id);
  //     setBookmarks(data);
  //   };
  //   getBookmarks(selectedCollection);
  // }, [selectedCollection]);

  return (
    <div className="z-20 w-[10rem] border-2 rounded-md bg-white flex flex-col justify-center items-center gap-2 p-2">
      <DropDown
        selected={selectedCollection}
        list={collectionNameList.map(data => data.name)}
        setSelected={(target: string) => setSelectedCollection(target)}
      />
      <button className="border-2 text-xs">북마크</button>
      <div className="flex gap-4">
        <OutlinedButton
          onClick={() => setOptionsState(false)}
          className="text-xs"
          size="small"
        >
          취소
        </OutlinedButton>
        <OutlinedButton className="text-xs" size="small">
          추가하기
        </OutlinedButton>
      </div>
    </div>
  );
}
