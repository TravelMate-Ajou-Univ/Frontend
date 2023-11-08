import { useAppSelector } from "@/hooks/redux";
import { LocationType } from "@/model/bookmark";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Marker from "./Marker";

type Props = {
  modifyState: boolean;
};
export default function MarkerList({ modifyState }: Props) {
  const dispatch = useDispatch();
  const { pins, bookmarks } = useAppSelector(state => state.mapSlice);

  const [activeMarker, setActiveMarker] = useState<LocationType | null>(null);

  return (
    <div>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>
            <Marker
              bookmark={bookmark}
              modifyState={modifyState}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
          </li>
        ))}
      </ul>
      <ul>
        {pins.map((bookmark, index) => (
          <li key={index}>
            <Marker
              bookmark={bookmark}
              modifyState={modifyState}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
