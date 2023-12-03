import React, { useEffect, useState } from "react";
import OutlinedButton from "../ui/button/OutlinedButton";
import { getAllBookmarks, getMyCollectionList } from "@/service/axios/bookmark";
import {
  BookmarkCollectionListType,
  BookmarkType,
  BookmarkWithCollectionNameType
} from "@/model/bookmark";
import DropDown from "../ui/dropDown/DropDown";
import { Socket } from "socket.io-client";

type Props = {
  setOptionsState: (state: boolean) => void;
  socket: Socket;
};

type CollectionType = {
  name: string;
  id: number;
};

const initCollection: CollectionType = {
  name: "북마크 컬렉션",
  id: 0
};

export default function BookmarkOptionBox({ setOptionsState, socket }: Props) {
  const [collectionList, setCollectionList] = useState<CollectionType[]>([]);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>(initCollection);
  const [bookmarkToAdd, setBookmarkToAdd] = useState<
    BookmarkWithCollectionNameType[]
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
    const isDuplicate = bookmarkToAdd.some(
      existingBookmark =>
        existingBookmark.id === bookmark.id &&
        existingBookmark.latitude === bookmark.latitude &&
        existingBookmark.longitude === bookmark.longitude
    );

    if (isDuplicate) {
      return;
    }
    const newBookmark: BookmarkWithCollectionNameType = {
      ...bookmark,
      ...{ collectionName: selectedCollection.name }
    };

    setBookmarkToAdd(bookmarkToAdd => [...bookmarkToAdd, newBookmark]);
  };

  const subBookmarkToList = (target: BookmarkType) => {
    const filteredBookmarkList = bookmarkToAdd.filter(
      bookmark => bookmark !== target
    );
    setBookmarkToAdd(filteredBookmarkList);
  };

  const bringBookmarksHandler = () => {
    // TODO: emit(postBookmarks)
    socket.emit("postBookmark", {
      locationsWithContent: bookmarkToAdd,
      bookmarkCollectionId: 1
    });
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
        selected="가져올 북마크"
        list={bookmarkList.map(bookmark => bookmark.content as string)}
        setSelected={(selected: string) => {
          const target = bookmarkList.find((bookmark: BookmarkType) => {
            return (bookmark.content as string) == selected;
          }) as BookmarkType;
          addBookmarkToList(target);
        }}
        size="small"
      />
      {bookmarkToAdd.length === 0 ? null : (
        <div className="flex flex-col w-full justify-center items-center text-center">
          <p className="text-xs font-bold self-start my-2">추가할 북마크</p>
          <ul>
            <div className="flex gap-2 text-sm border-b-2">
              <p className="w-[3rem] border-r-2">북마크</p>
              <p className="w-[5rem]">memo</p>
            </div>
            {bookmarkToAdd.map((bookmark, index) => (
              <li key={index} className="flex gap-2 text-sm border-b-2">
                <p className="w-[3rem] truncate hover:text-clip border-r-2">
                  {bookmark.collectionName}
                </p>
                <p className="w-[5rem] truncate hover:text-clip">
                  {bookmark.content}
                </p>
                <button
                  onClick={() => subBookmarkToList(bookmark)}
                  className="text-red-400 text-xs hover:scale-110"
                >
                  X
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
        <OutlinedButton
          onClick={bringBookmarksHandler}
          className="text-xs"
          size="small"
        >
          가져오기
        </OutlinedButton>
      </div>
    </div>
  );
}
