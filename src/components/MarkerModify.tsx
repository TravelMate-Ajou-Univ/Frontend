import { Bookmark } from "@/model/bookmark";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: (data: Bookmark[]) => void;
  subPins: Number[];
  setSubPins: (pin: Number[]) => void;
};

export default function MarkerModify({
  bookmarks,
  setBookmarks,
  subPins,
  setSubPins
}: Props) {
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

  const deleteHandler = async (target: Bookmark) => {
    const new_data = target.id === undefined ? 0 : target.id;
    const new_bookmarks = bookmarks.filter(
      bookmark =>
        bookmark.latitude !== target.latitude &&
        bookmark.longitude !== target.longitude
    );

    if (target.id !== undefined) {
      setSubPins([...subPins, new_data]);
    }
    setBookmarks(new_bookmarks);
    setActiveMarker(null);
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
                <button
                  onClick={() => deleteHandler(bookmark)}
                  className="hover:text-red-400"
                >
                  삭제
                </button>
              </section>
            </InfoWindowF>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
