"use client";

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import SeasonButton from "./ui/SeasonButton";
import MapMenuButton from "./ui/MapMenuButton";
import Marker from "./Marker";
import { Bookmark } from "@/model/bookmark";
import { calculateCenter } from "@/service/map";
import { DotLoader } from "react-spinners";

type Props = {
  bookmarks: Bookmark[];
};

export default function Map({ bookmarks }: Props) {
  const [userPos, setUserPos] = useState({
    lat: 0,
    lng: 0
  });
  const [gpsToggle, setGpsToggle] = useState(false);
  const [zoomSize, setZoomSize] = useState(12);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        prompt("현재 위치를 가져오는 데 실패하였습니다.");
        console.log(error);
      }
    );
  }, []);

  const toggleGPS = () => {
    setGpsToggle(!gpsToggle);
  };

  const upSize = () => {
    let size = zoomSize + 1;
    setZoomSize(size);
  };
  const downSize = () => {
    let size = zoomSize - 1;
    setZoomSize(size);
  };

  // bookmark가 없다면 현재 위치를 중심으로 지도를 보여준다.
  const mapCenter =
    bookmarks.length === 0 ? userPos : calculateCenter(bookmarks);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string
  });

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full h-full border-2">
        <DotLoader size={80} color="#36d7b7" />
      </div>
    );
  }

  const ClickHandler = () => {
    console.log("Clicked!");
  };

  return (
    <div className="relative w-full h-full z-0">
      <MapMenuButton
        upSize={upSize}
        downSize={downSize}
        gpsToggle={gpsToggle}
        toggleGPS={toggleGPS}
      />
      <SeasonButton />
      <GoogleMap
        options={mapOptions}
        zoom={zoomSize}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onClick={ClickHandler}
      >
        {gpsToggle ? (
          <MarkerF position={{ lat: userPos.lat, lng: userPos.lng }} />
        ) : (
          <></>
        )}
        <Marker bookmarks={bookmarks} />
      </GoogleMap>
    </div>
  );
}
