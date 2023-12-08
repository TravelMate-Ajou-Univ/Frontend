"use client";

import { SeasonType } from "@/model/article";
import { BookmarkType, LocationType, PinType } from "@/model/bookmark";
import { createBookmark } from "@/service/axios/bookmark";
import { calculateCenter } from "@/service/googlemap/map";
import { makeContentString, makeMarker } from "@/service/googlemap/marker";
import { placeDetail, searchPlace } from "@/service/googlemap/place";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
}

type Props = {
  modifyState: boolean;
  location?: string;
  setBookmarkIds?: React.Dispatch<React.SetStateAction<number[]>>;
  bookmarks?: (BookmarkType & { period: SeasonType })[];
  className?: string;
};

export default function ArticleGoogleMap({
  modifyState,
  location = "",
  setBookmarkIds,
  bookmarks,
  className = ""
}: Props) {
  const [map, setMap] = useState<google.maps.Map>();
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<google.maps.Marker[]>([]);
  const [pins, setPins] = useState<PinType[]>([]);
  const [center, setCenter] = useState<LocationType>({
    latitude: 0,
    longitude: 0
  });
  const [zoom, setZoom] = useState(14);
  const activeMarkerInfoRef = useRef<google.maps.InfoWindow>();

  window.initMap = function () {
    const initmap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControl: false,
        streetViewControl: false
      }
    );
    setMap(initmap);
    setMarker(initmap);
  };

  useEffect(() => {
    if (bookmarks && bookmarks.length > 0) {
      setCenter(calculateCenter(bookmarks));
      // map?.panTo({
      //   lat: calculateCenter(bookmarks).latitude,
      //   lng: calculateCenter(bookmarks).longitude
      // });
      setZoom(9);
      setPins(bookmarks);
    } else if (location === "") {
      setPins([]);
      setZoom(14);
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          // map?.panTo({
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude
          // });
        },
        error => {
          alert("현재 위치를 가져오는 데 실패하였습니다.");
          console.log(error);
        }
      );
    } else {
      setPins([]);
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          setCenter({
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng()
          });
          setZoom(9);
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      });
    }
  }, [location, bookmarks]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      window.initMap();
    }
  }, [center, modifyState]);

  useEffect(() => {
    if (map !== undefined) {
      setMarker(map);
    }
  }, [pins]);

  const setMarker = (initmap: google.maps.Map) => {
    const service = new google.maps.places.PlacesService(
      initmap as google.maps.Map
    );

    pins.map(pin => {
      makeMarker({
        pin: pin,
        initmap,
        service,
        modifyState,
        activeMarkerHandler,
        subPinHandler
      });
    });
  };

  const activeMarkerHandler = (currentMarker: google.maps.InfoWindow): void => {
    // active marker 변경
    activeMarkerInfoRef.current?.close();
    activeMarkerInfoRef.current = currentMarker;
  };

  const subPinHandler = (pin: PinType) => {
    setPins(prevPins => prevPins.filter(prevPin => prevPin !== pin));
    if (setBookmarkIds) {
      setBookmarkIds(prevBookmarkIds =>
        prevBookmarkIds.filter((_, index) => index !== pins.indexOf(pin))
      );
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const searchHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const service = new google.maps.places.PlacesService(
      map as google.maps.Map
    );

    // 기존 검색된 places marker 지우기.
    places.map(place => place.setMap(null));
    setPlaces([]);

    // 검색어로 검색.
    const response = await searchPlace({ service, search, map });

    if (response === null) {
      alert("검색 실패");
      return;
    }

    response.map(place => {
      // places marker 표시
      const marker = new google.maps.Marker({
        position: place.geometry?.location,
        map: map,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        title: place.name
      });
      setPlaces(prevPlaces => [...prevPlaces, marker]);

      // 검색된 marker 클릭 시
      marker.addListener("click", async () => {
        const result = await placeDetail({
          service,
          place_id: place.place_id as string
        });
        if (result === null) {
          return;
        }

        // click한 marker를 맵 중앙에 오고, 정보창 띄우기
        map?.panTo(marker.getPosition() as google.maps.LatLng);
        const contentString = makeContentString({
          photoUrl: result?.photos?.[0].getUrl(),
          name: result.name,
          address: result.formatted_address,
          rating: result.rating,
          modifyState: modifyState,
          mode: "add"
        });

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          position: place.geometry?.location
        });

        activeMarkerHandler(infoWindow);
        infoWindow.open({
          anchor: marker,
          map
        });

        // 검색된 marker를 북마크하고 싶을 시 memo창 띄우기
        google.maps.event.addListener(infoWindow, "domready", () => {
          const btn = document.getElementById("btn");
          if (btn) {
            btn.addEventListener("click", () => {
              let addContentString = makeContentString({
                photoUrl: result?.photos?.[0].getUrl(),
                name: result.name,
                address: result.formatted_address,
                rating: result.rating,
                modifyState: false
              });
              addContentString =
                addContentString +
                `<div style="display: flex; flex-direction: column; align-items: center; width: 12rem;">` +
                `<p style="align-self: start; margin: 0px 0px 0px 0.5rem; font-size: 0.7rem">메모</p>` +
                `<textarea id="text" rows="2" cols="25" style="height: 4rem; margin: 0.3rem 0px; border: 1px solid" placeholder="memo.."></textarea>` +
                `<button id="addBtn" style="width: fit-content; border: 1px solid; border-radius: 10px; padding: 0.3rem;">추가하기</button>` +
                `</div>`;
              const addWindow = new google.maps.InfoWindow({
                content: addContentString,
                position: place.geometry?.location
              });
              activeMarkerHandler(addWindow);
              addWindow.open({
                anchor: marker,
                map
              });
              // 추가 버튼을 눌러 addPin list에 추가하는 로직
              google.maps.event.addListener(addWindow, "domready", () => {
                const btn = document.getElementById(
                  "addBtn"
                ) as HTMLButtonElement;
                btn.addEventListener("click", async () => {
                  const text = document.getElementById(
                    "text"
                  ) as HTMLInputElement;
                  const newPin: PinType = {
                    latitude: result.geometry?.location?.lat() as number,
                    longitude: result.geometry?.location?.lng() as number,
                    placeId: place.place_id as string,
                    content: text.value
                  };

                  const bookmarkId = await createBookmark(newPin);
                  if (!bookmarkId) return;
                  if (setBookmarkIds) {
                    setBookmarkIds((prevBookmarkIds: number[]) => [
                      ...prevBookmarkIds,
                      bookmarkId
                    ]);
                  }

                  setPins(prevPins => [...prevPins, newPin]);
                  addWindow.close();
                  marker.setMap(null);
                });
              });
            });
          }
        });
      });
    });
  };

  return (
    <div className={`${className} w-full h-full relative`}>
      {modifyState && (
        <form className="absolute z-10 left-2 top-2 flex items-center">
          <input
            type="text"
            placeholder="search place.."
            onChange={onChange}
            className="text-sm p-1"
          />
          <button
            onClick={searchHandler}
            className="text-sm border-2 bg-white hover:bg-slate-300 p-1"
          >
            검색
          </button>
        </form>
      )}
      <div id="map" className=" w-full h-full"></div>
    </div>
  );
}
