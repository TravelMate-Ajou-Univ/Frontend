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

const initCollection: CollectionType = {
  name: "북마크 컬렉션",
  id: 0
};

const initBookmark: BookmarkType = {
  content: "북마크",
  placeId: "test",
  id: 0,
  latitude: 0,
  longitude: 0
};

export default function BookmarkOptionBox({ setOptionsState }: Props) {
  const [collectionList, setCollectionList] = useState<CollectionType[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>(initCollection);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType[]>([]);
  const [selectedBookmark, setSelectedBookmark] =
    useState<BookmarkType>(initBookmark);
  const [bookmarkToAdd, setBookmarkToAdd] = useState<BookmarkType[]>([]);

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
      setCollectionList(collectionNames);
    };

    getCollections();
  }, []);

  useEffect(() => {
    const getBookmarks = async (id: number) => {
      const data: BookmarkType[] = await getAllBookmarks(id);
      setBookmarkList(data);
    };
    getBookmarks(selectedCollection.id);
  }, [selectedCollection]);

  const addBookmarkToList = (bookmark: BookmarkType) => {
    if (bookmarkToAdd.indexOf(bookmark) !== -1) {
      return;
    }
    setBookmarkToAdd(bookmarkToAdd => [...bookmarkToAdd, bookmark]);
  };

  const subBookmarkToList = (target: BookmarkType) => {
    const filteredBookmarkList = bookmarkToAdd.filter(
      bookmark => bookmark !== target
    );
    setBookmarkToAdd(filteredBookmarkList);
  };

  return (
    <div className="z-20 w-[10rem] border-2 rounded-md bg-white flex flex-col justify-center items-center gap-2 p-2">
      <DropDown
        selected={selectedCollection.name}
        list={collectionList.map(data => data.name)}
        setSelected={(selected: string) => {
          setSelectedCollection(
            collectionList.find((collection: CollectionType) => {
              return collection.name == selected;
            }) as CollectionType
          );
        }}
        size="small"
      />
      <DropDown
        selected={selectedBookmark.content as string}
        list={bookmarkList.map(bookmark => bookmark.content as string)}
        setSelected={(selected: string) => {
          const target = bookmarkList.find((bookmark: BookmarkType) => {
            return (bookmark.content as string) == selected;
          }) as BookmarkType;
          addBookmarkToList(target);
          setSelectedBookmark(target);
        }}
        size="small"
      />
      {bookmarkToAdd.length === 0 ? null : (
        <div className="flex flex-col w-full justify-center items-center">
          <p className="text-xs font-bold self-start">추가할 북마크</p>
          <ul>
            {bookmarkToAdd.map((bookmark, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <p className="w-[5rem] truncate hover:text-clip">
                  {bookmark.content}
                </p>
                <button
                  onClick={() => subBookmarkToList(bookmark)}
                  className="text-red-400 text-xs hover:scale-110"
                >
                  취소
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-4">
        <OutlinedButton
          onClick={() => setOptionsState(false)}
          className="text-xs"
          size="small"
        >
          취소
        </OutlinedButton>
        <OutlinedButton className="text-xs" size="small">
          가져오기
        </OutlinedButton>
      </div>
    </div>
  );
}
