"use client";

import { Bookmark } from "@/model/bookmark";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { SetStateAction, useState } from "react";

type Props = {
  bookmarks: Bookmark[];
};

export default function Marker({ bookmarks }: Props) {
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const clickHandler = (index: number, e: any) => {
    console.log(index);
    console.log(e);

    handleActiveMarker(index);
    setSelectedMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  return (
    <ul>
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <MarkerF
            key={index}
            position={{
              lat: bookmark.location.latitude,
              lng: bookmark.location.longitude
            }}
            title={bookmark.content}
            onClick={e => clickHandler(index, e)}
          />
          {activeMarker === index ? (
            <InfoWindowF
              key={index}
              position={selectedMarker}
              options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div>
                <div className="text-2xl">{bookmark.content}</div>
              </div>
            </InfoWindowF>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
