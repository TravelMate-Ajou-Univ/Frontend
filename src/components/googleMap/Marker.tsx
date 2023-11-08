import { useAppSelector } from "@/hooks/redux";
import { BookmarkType, LocationType, PinType } from "@/model/bookmark";
import { subBookmarks, subPins } from "@/redux/features/mapSlice";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  bookmark: BookmarkType | PinType;
  modifyState: boolean;
  activeMarker: LocationType | null;
  setActiveMarker: (pos: LocationType | null) => void;
};
export default function Marker({
  bookmark,
  modifyState,
  activeMarker,
  setActiveMarker
}: Props) {
  const dispatch = useDispatch();
  const { pins, bookmarks, deleteBookmarks } = useAppSelector(
    state => state.mapSlice
  );
  const [selectedMarker, setSelectedMarker] = useState<LocationType>({
    lat: 0,
    lng: 0
  });
  const clickHandler = (index: LocationType) => {
    console.log(index);

    handleActiveMarker(index);
    setSelectedMarker(index);
  };

  const handleActiveMarker = (marker: LocationType) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const deleteHandler = async (target: BookmarkType | PinType) => {
    const del_bookmark = bookmarks.find(
      bookmark => bookmark.position === target.position
    );

    if (del_bookmark === undefined) {
      dispatch(subPins(target));
    } else {
      dispatch(subBookmarks(del_bookmark));
    }
  };
  return (
    <div>
      <MarkerF
        position={bookmark.position}
        title={bookmark.content}
        onClick={() => clickHandler(bookmark.position)}
      />
      {activeMarker === bookmark.position ? (
        <InfoWindowF
          position={selectedMarker}
          options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <section className="flex flex-col items-center">
            <p className="text-2xl">{bookmark.content}</p>
            {modifyState ? (
              <button
                onClick={() => deleteHandler(bookmark)}
                className="hover:text-red-400"
              >
                삭제
              </button>
            ) : null}
          </section>
        </InfoWindowF>
      ) : null}
    </div>
  );
}
