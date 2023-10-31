"use client";

import { Bookmark } from "@/model/bookmark";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

type Props = {
  bookmarks: Bookmark[];
};

export default function UneditableMarker({ bookmarks }: Props) {
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
    handleActiveMarker(index);
    setSelectedMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <ul>
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <MarkerF
            position={{
              lat: bookmark.latitude,
              lng: bookmark.longitude
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
              <section className="flex flex-col items-center">
                <p className="text-2xl">{bookmark.content}</p>
              </section>
            </InfoWindowF>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
