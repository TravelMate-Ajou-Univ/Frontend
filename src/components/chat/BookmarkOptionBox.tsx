import React, { useEffect, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import { getMyCollectionList } from "@/service/axios/bookmark";
import { BookmarkCollectionListType } from "@/model/bookmark";
import DropDown from "../ui/dropDown/DropDown";

type Props = {
  setOptionsState: (state: boolean) => void;
};

type CollectionType = {
  name: string;
  id: number;
};

export default function BookmarkOptionBox({ setOptionsState }: Props) {
  const [collectionName, setCollectionName] = useState<string>("북마크 컬렉션");
  const [collectionNameList, setCollectionNameList] = useState<
    CollectionType[]
  >([]);

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

  return (
    <div className="z-20 w-[10rem] border-2 rounded-md bg-white flex flex-col justify-center items-center gap-2 p-2">
      <DropDown
        selected={collectionName}
        list={collectionNameList.map(data => data.name)}
        setSelected={setCollectionName}
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
