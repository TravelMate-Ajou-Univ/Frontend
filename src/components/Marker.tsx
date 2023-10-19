"use client";

import { Bookmark } from "@/model/bookmark";
import { MarkerF } from "@react-google-maps/api";

type Props = {
  bookmarks: Bookmark[];
};
export default function Marker({ bookmarks }: Props) {
  return (
    <ul>
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <MarkerF
            position={{ lat: bookmark.lat, lng: bookmark.lng }}
            onLoad={() => console.log("Marker Loaded")}
          />
        </li>
      ))}
    </ul>
  );
}
