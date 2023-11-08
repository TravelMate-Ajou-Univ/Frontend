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
    latitude: 0,
    longitude: 0
  });
  const clickHandler = (index: LocationType, e: any) => {
    handleActiveMarker(index);
    setSelectedMarker({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
  };
  const handleActiveMarker = (marker: LocationType) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const deleteHandler = async (target: BookmarkType | PinType) => {
    const del_bookmark = bookmarks.find(
      bookmark =>
        bookmark.latitude === target.latitude &&
        bookmark.longitude === target.longitude
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
        position={{
          lat: bookmark.latitude,
          lng: bookmark.longitude
        }}
        title={bookmark.content}
        onClick={e =>
          clickHandler(
            {
              latitude: bookmark.latitude,
              longitude: bookmark.longitude
            },
            e
          )
        }
      />
      {activeMarker?.latitude === bookmark.latitude &&
      activeMarker.longitude === bookmark.longitude ? (
        <InfoWindowF
          position={{
            lat: selectedMarker.latitude,
            lng: selectedMarker.longitude
          }}
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
