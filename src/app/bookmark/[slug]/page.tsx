"use client";

import { useSearchParams } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import { ChangeEvent, useEffect, useState } from "react";
import { BookmarkType, PinType } from "@/model/bookmark";
import PublicIcon from "@/components/ui/icons/PublicIcon";
import FriendsOnlyIcon from "@/components/ui/icons/FriendsOnlyIcon";
import PrivateIcon from "@/components/ui/icons/PrivateIcon";
import { getAllBookmarks } from "@/service/axios/bookmark";
import EditableMap from "@/components/EditableMap";
import UneditableMap from "@/components/UneditableMap";
import { useDispatch } from "react-redux";
import DropDown from "@/components/ui/dropDown/DropDown";

export default function BookmarkPage() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const title = String(params.get("title"));
  const visibility = String(params.get("visibility"));

  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newVisibility, setNewVisibility] = useState(visibility);
  const [modifyState, setModifyState] = useState(true);
  const [addPins, setAddPins] = useState<PinType[]>([]);
  const [subPins, setSubPins] = useState<Number[]>([]);

  const visible_scopes = [
    {
      icon: <PrivateIcon />,
      name: "private",
      description: "나만 공개"
    },
    {
      icon: <FriendsOnlyIcon />,
      name: "friends_only",
      description: "친구 공개"
    },
    {
      icon: <PublicIcon />,
      name: "public",
      description: "모두 공개"
    }
  ];
  const visible_scope = visible_scopes.find(
    element => element.name === visibility
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAllBookmarks(id);

      setBookmarks(data);
    };
    getData();
  }, [id]);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewTitle(value);
  };

  const modifyVisible = (name: string) => {
    setNewVisibility(name);
  };

  return (
    <section className="flex flex-col w-[60vw] items-center mx-auto mt-4">
      {modifyState ? (
        <div className="flex w-full justify-between items-center">
          <input
            type="text"
            value={newTitle}
            onChange={onChangeText}
            className="text-3xl font-bold bg-white border-none hover:scale-110"
          />
          <DropDown
            selected={`${visible_scope?.description}`}
            list={visible_scopes.map(element => element.description)}
            setSelected={() => {
              console.log("hi");
            }}
          />
        </div>
      ) : (
        <div className="flex w-full justify-between items-center">
          <p className="text-3xl font-bold">{title}</p>
          <div className="flex justify-center w-[8rem] gap-4 p-1">
            {visible_scope?.icon}
            {visible_scope?.description}
          </div>
        </div>
      )}
      <div className="w-[60vw] h-[70vh] border-2 m-4">
        {modifyState ? (
          <EditableMap
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            addPins={addPins}
            setAddPins={setAddPins}
            subPins={subPins}
            setSubPins={setSubPins}
          />
        ) : (
          <UneditableMap bookmarks={bookmarks} />
        )}
      </div>
      <BookmarkButton
        id={id}
        title={newTitle}
        visibility={newVisibility}
        addPins={addPins}
        subPins={subPins}
        modifyState={modifyState}
        setModifyState={setModifyState}
      />
    </section>
  );
}
