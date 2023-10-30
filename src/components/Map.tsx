"use client";

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import SeasonButton from "./ui/SeasonButton";
import MapMenuButton from "./ui/MapMenuButton";
import Marker from "./Marker";
import { Bookmark } from "@/model/bookmark";
import { calculateCenter } from "@/service/map";
import { DotLoader } from "react-spinners";

type Props = {
  bookmarks: Bookmark[];
  modifyState: boolean;
};

export default function Map({ bookmarks, modifyState }: Props) {
  const [userPos, setUserPos] = useState({
    lat: 0,
    lng: 0
  });
  const [gpsToggle, setGpsToggle] = useState(false);
  const [zoomSize, setZoomSize] = useState(12);
  const [clickState, setClickState] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  // const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

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
  const initCenter =
    bookmarks.length === 0 ? userPos : calculateCenter(bookmarks);
  // setMapCenter(initCenter);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  );

  // map이 loading중일 때 spinner 보여주기
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

  const clickHandler = (e: any) => {
    console.log(modifyState);

    if (modifyState === false) return;
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    console.log(position);

    setLocation(position);
    setClickState(true);
  };

  const addHandler = () => {
    console.log("add");
    setClickState(false);
  };

  // const centerChangeHandler = () => {};

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
        center={initCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        // onCenterChanged={centerChangeHandler}
        onClick={e => clickHandler(e)}
      >
        {clickState ? (
          <section>
            <MarkerF position={location} />
            <InfoWindowF
              position={location}
              options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
              onCloseClick={() => setClickState(false)}
            >
              <div>
                <input type="text" placeholder="Comment.." />
                <button className="text-red-500" onClick={() => addHandler()}>
                  추가
                </button>
              </div>
            </InfoWindowF>
          </section>
        ) : null}
        {gpsToggle ? (
          <MarkerF position={{ lat: userPos.lat, lng: userPos.lng }} />
        ) : null}
        <Marker bookmarks={bookmarks} />
      </GoogleMap>
    </div>
  );
}
