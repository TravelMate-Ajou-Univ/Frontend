"use client";

import Map from "@/components/MapModify";
import { useSearchParams } from "next/navigation";
import ModifyButton from "@/components/ModifyButton";
import { ChangeEvent, useEffect, useState } from "react";
import { Bookmark, Pin } from "@/model/bookmark";
import PublicIcon from "@/components/ui/icons/PublicIcon";
import FriendsOnlyIcon from "@/components/ui/icons/FriendsOnlyIcon";
import PrivateIcon from "@/components/ui/icons/PrivateIcon";
import { getAllBookmarks } from "@/service/bookmark";
import MapModify from "@/components/MapModify";
import MapView from "@/components/MapView";

export default function BookmarkPage() {
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const title = String(params.get("title"));
  const visibility = String(params.get("visibility"));

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newVisibility, setNewVisibility] = useState(visibility);
  const [modifyState, setModifyState] = useState(false);
  const [visibleState, setVisibleState] = useState(false);
  const [addPins, setAddPins] = useState<Pin[]>([]);
  const [subPins, setSubPins] = useState<Number[]>([]);

  const visible_scopes = [
    {
      icon: <PrivateIcon />,
      name: "PRIVATE",
      description: "나만 공개"
    },
    {
      icon: <FriendsOnlyIcon />,
      name: "FRIENDS_ONLY",
      description: "친구 공개"
    },
    {
      icon: <PublicIcon />,
      name: "PUBLIC",
      description: "모두 공개"
    }
  ];
  const visible_scope = visible_scopes.find(
    element => element.name === visibility
  );

  useEffect(() => {
    const getBookmark = async () => {
      const data = await getAllBookmarks(id);

      setBookmarks(data);
    };
    getBookmark();
  }, []);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewTitle(value);
  };

  const toggleVisible = () => {
    setVisibleState(!visibleState);
  };

  const modifyVisible = (name: string, e: any) => {
    setNewVisibility(name);
    setVisibleState(!visibleState);
  };

  return (
    <section className="flex flex-col items-center">
      {modifyState ? (
        <div className="flex w-[60vw] justify-between items-center">
          <input
            type="text"
            value={newTitle}
            onChange={onChangeText}
            className="text-3xl font-bold border-none hover:scale-110"
          />
          <div
            onClick={toggleVisible}
            className="flex relative gap-4 p-1 w-[12rem] rounded-md hover:scale-110 z-50"
          >
            {
              visible_scopes.find(element => element.name === newVisibility)
                ?.icon
            }
            {
              visible_scopes.find(element => element.name === newVisibility)
                ?.name
            }
            {visibleState ? (
              <ul className="absolute top-8 border-2 bg-white">
                {visible_scopes.map(element => (
                  <li
                    key={element.name}
                    onClick={e => {
                      modifyVisible(element.name, e);
                    }}
                    className="flex gap-4 p-1 hover:bg-slate-200"
                  >
                    {element.icon}
                    {element.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex w-[60vw] justify-between items-center">
          <p className="text-3xl font-bold">{title}</p>
          <div className="flex w-[12rem] gap-4 p-1">
            {visible_scope?.icon}
            {visible_scope?.name}
          </div>
        </div>
      )}
      <div className="w-[60vw] h-[70vh] border-2 m-4">
        {modifyState ? (
          <MapModify
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            addPins={addPins}
            setAddPins={setAddPins}
            subPins={subPins}
            setSubPins={setSubPins}
          />
        ) : (
          <MapView bookmarks={bookmarks} />
        )}
      </div>
      <ModifyButton
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
