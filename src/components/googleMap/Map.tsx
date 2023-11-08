import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF
} from "@react-google-maps/api";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import MapMenuButton from "../ui/MapMenuButton";
import { LocationType, PinType } from "@/model/bookmark";
import { DotLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import {
  addPins,
  setDeleteBookmarks,
  setPins
} from "@/redux/features/mapSlice";
import MarkerList from "./MarkerList";

type Props = {
  modifyState: boolean;
};
export default function Map({ modifyState }: Props) {
  const dispatch = useDispatch();
  const { bookmarks, center } = useAppSelector(state => state.mapSlice);
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

    dispatch(setPins());
    dispatch(setDeleteBookmarks());
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

  const addHandler = (location: LocationType) => {
    setClickState(false);
    const new_pin: PinType = {
      position: location,
      content: text
    };
    dispatch(addPins(new_pin));
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
      <GoogleMap
        options={mapOptions}
        zoom={zoomSize}
        center={center}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onClick={e => clickHandler(e)}
      >
        {modifyState ? (
          clickState ? (
            <section>
              <MarkerF position={location} />
              <InfoWindowF
                position={location}
                options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
                onCloseClick={() => setClickState(false)}
              >
                <div className="flex flex-col items-center gap-2">
                  <textarea
                    rows={3}
                    onChange={onChange}
                    className="border-4"
                    autoFocus
                  />
                  <button
                    className="text-red-500 focus:pointer hover:scale-110"
                    onClick={() => addHandler(location)}
                  >
                    추가하기
                  </button>
                </div>
              </InfoWindowF>
            </section>
          ) : null
        ) : null}
        {gpsToggle ? (
          <MarkerF position={{ lat: userPos.lat, lng: userPos.lng }} />
        ) : null}
        <MarkerList modifyState={modifyState} />
      </GoogleMap>
    </div>
  );
}
