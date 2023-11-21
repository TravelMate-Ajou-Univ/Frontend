"use client";

import { useSearchParams } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";
import { ChangeEvent, useEffect, useState } from "react";
import { VisibilityType } from "@/model/bookmark";
import PublicIcon from "@/components/ui/icons/PublicIcon";
import FriendsOnlyIcon from "@/components/ui/icons/FriendsOnlyIcon";
import PrivateIcon from "@/components/ui/icons/PrivateIcon";
import { getAllBookmarks } from "@/service/axios/bookmark";
import DropDown from "@/components/ui/dropDown/DropDown";
import { useDispatch } from "react-redux";
import { setBookmarks, setCenter } from "@/redux/features/mapSlice";
import { CalculateCenter } from "@/service/googlemap/map";
import GoogleMap from "@/components/googleMap/GoogleMap";

export default function BookmarkPage() {
  const dispatch = useDispatch();

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
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const title = String(params.get("title"));
  const visibility = visible_scopes.find(
    scope => scope.name === String(params.get("visibility"))
  )?.description as VisibilityType;

  const [newTitle, setNewTitle] = useState<string>(title);
  const [newVisibility, setNewVisibility] = useState(visibility);
  const [modifyState, setModifyState] = useState(false);

  const visible_scope = visible_scopes.find(
    element => element.description === newVisibility
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAllBookmarks(id);
      dispatch(setBookmarks(data));

      // bookmark들이 있다면 지도 center을 bookmark들의 가운데로
      // 없다면 내 위치를 center로 설정
      if (data.length === 0) {
        navigator.geolocation.getCurrentPosition(
          position => {
            dispatch(
              setCenter({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
            );
          },
          error => {
            prompt("현재 위치를 가져오는 데 실패하였습니다.");
            console.log(error);
          }
        );
      } else {
        dispatch(setCenter(CalculateCenter(data)));
      }
    };
    getData();
  }, [id, dispatch]);

  const onChangeText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewTitle(value);
  };

  const modifyVisible = (visibility: string) => {
    const new_scope = visible_scopes.find(
      scope => scope.description === visibility
    )?.description as VisibilityType;
    setNewVisibility(new_scope);
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
            selected={newVisibility}
            list={visible_scopes.map(element => element.description)}
            setSelected={modifyVisible}
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
        <GoogleMap modifyState={modifyState} />
      </div>
      <BookmarkButton
        id={id}
        title={newTitle}
        visibility={visible_scope?.name as string}
        modifyState={modifyState}
        setModifyState={setModifyState}
      />
    </section>
  );
}
