import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SeasonButton from "./ui/SeasonButton";
import MapMenuButton from "./ui/MapMenuButton";
import { Bookmark, Pin } from "@/model/bookmark";
import { calculateCenter } from "@/service/map";
import { DotLoader } from "react-spinners";
import MarkerModify from "./MarkerModify";

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: (data: Bookmark[]) => void;
  addPins: Pin[];
  setAddPins: (pin: Pin[]) => void;
  subPins: Number[];
  setSubPins: (pin: Number[]) => void;
};

export default function MapModify({
  bookmarks,
  setBookmarks,
  addPins,
  setAddPins,
  subPins,
  setSubPins
}: Props) {
  const [userPos, setUserPos] = useState({
    lat: 0,
    lng: 0
  });
  const [gpsToggle, setGpsToggle] = useState(false);
  const [zoomSize, setZoomSize] = useState(12);
  const [clickState, setClickState] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [text, setText] = useState("");

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

  // bookmark가 없다면 현재 위치를 중심으로 지도를 보여준다.
  const initCenter =
    bookmarks.length === 0 ? userPos : calculateCenter(bookmarks);

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
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    setLocation(position);
    setClickState(true);
  };

  const addHandler = (location: any) => {
    setClickState(false);
    const new_data: Pin = {
      latitude: location.lat,
      longitude: location.lng,
      content: text
    };
    const new_bookmarks = [...bookmarks, new_data];
    const new_pins = [...addPins, new_data];

    setAddPins(new_pins);
    setBookmarks(new_bookmarks);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
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
        center={initCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
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
                <input
                  type="text"
                  placeholder="Comment.."
                  onChange={onChange}
                />
                <button
                  className="text-red-500"
                  onClick={() => addHandler(location)}
                >
                  추가
                </button>
              </div>
            </InfoWindowF>
          </section>
        ) : null}
        {gpsToggle ? (
          <MarkerF position={{ lat: userPos.lat, lng: userPos.lng }} />
        ) : null}
        <MarkerModify
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          subPins={subPins}
          setSubPins={setSubPins}
        />
      </GoogleMap>
    </div>
  );
}
