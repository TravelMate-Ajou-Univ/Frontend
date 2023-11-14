"use client";
import { useAppSelector } from "@/hooks/redux";
import { PinType } from "@/model/bookmark";
import { addPins, subBookmarks, subPins } from "@/redux/features/mapSlice";
import {
  makeContentString,
  placeDetail,
  searchPlace
} from "@/service/googlemap/map";
import Script from "next/script";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
declare global {
  interface Window {
    initMap: () => void;
  }
}
type Props = {
  modifyState: boolean;
};
export default function GoogleMap({ modifyState }: Props) {
  const dispatch = useDispatch();
  const [map, setMap] = useState<google.maps.Map>();
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<google.maps.Marker[]>([]);
  const { center, bookmarks, pins } = useAppSelector(state => state.mapSlice);
  window.initMap = function () {
    const initmap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        zoom: 12,
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
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      window.initMap();
    } else if (center.latitude == 0 && center.longitude == 0) {
      console.log("wait");
    }
  }, [center, modifyState, pins]);

  // 북마크 컬렉션에 있는 북마크들 marker로 표시
  const setMarker = (initmap: google.maps.Map) => {
    const service = new google.maps.places.PlacesService(
      initmap as google.maps.Map
    );
    bookmarks.map(bookmark => {
      const marker = new google.maps.Marker({
        position: {
          lat: bookmark.latitude,
          lng: bookmark.longitude
        },
        map: initmap
      });
      marker.addListener("click", async () => {
        const result = await placeDetail({
          service,
          place_id: bookmark.placeId
        });
        if (result === null) {
          return;
        }
        const contentString = makeContentString({
          photoUrl: result?.photos?.[0].getUrl(),
          name: result.name,
          address: result.formatted_address,
          rating: result.rating,
          modifyState: modifyState,
          memo: bookmark.content,
          mode: "delete"
        });

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          position: {
            lat: bookmark.latitude,
            lng: bookmark.longitude
          }
        });
        infoWindow.open({
          anchor: marker,
          map
        });
        google.maps.event.addListener(infoWindow, "domready", () => {
          const btn = document.getElementById("btn");
          if (btn) {
            btn.addEventListener("click", () => {
              dispatch(subBookmarks(bookmark));
              infoWindow.close();
              marker.setMap(null);
            });
          }
        });
      });
    });

    pins.map(pin => {
      const marker = new google.maps.Marker({
        position: {
          lat: pin.latitude,
          lng: pin.longitude
        },
        map: initmap
      });
      marker.addListener("click", async () => {
        const result = await placeDetail({
          service,
          place_id: pin.placeId
        });
        if (result === null) {
          return;
        }
        const contentString = makeContentString({
          photoUrl: result?.photos?.[0].getUrl(),
          name: result.name,
          address: result.formatted_address,
          rating: result.rating,
          modifyState: modifyState,
          memo: pin.content,
          mode: "delete"
        });

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          position: {
            lat: pin.latitude,
            lng: pin.longitude
          }
        });
        infoWindow.open({
          anchor: marker,
          map
        });
        google.maps.event.addListener(infoWindow, "domready", () => {
          const btn = document.getElementById("btn");
          if (btn) {
            btn.addEventListener("click", () => {
              dispatch(subPins(pin));
              infoWindow.close();
              marker.setMap(null);
            });
          }
        });
      });
    });
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
    const response = await searchPlace({ service, search, map, center });

    if (response === null) {
      alert("검색 실패");
      return;
    }

    response.map(place => {
      // places marker 표시
      const marker = new google.maps.Marker({
        position: place.geometry?.location,
        map: map,
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
        infoWindow.open({
          anchor: marker,
          map
        });

        // 검색된 marker를 북마크하고 싶을 시 memo창 띄우기
        google.maps.event.addListener(infoWindow, "domready", () => {
          const btn = document.getElementById("btn");
          if (btn) {
            btn.addEventListener("click", () => {
              infoWindow.close();

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
                `<textarea id="text" rows="2" cols="25" style="margin: 0.3rem 0px; border: 1px solid" placeholder="memo.."></textarea>` +
                `<button id="addBtn" style="width: fit-content; border: 1px solid; border-radius: 10px; padding: 0.3rem;">추가하기</button>` +
                `</div>`;
              const addWindow = new google.maps.InfoWindow({
                content: addContentString,
                position: place.geometry?.location
              });
              addWindow.open({
                anchor: marker,
                map
              });
              // 추가 버튼을 눌러 addPin list에 추가하는 로직
              google.maps.event.addListener(addWindow, "domready", () => {
                const btn = document.getElementById(
                  "addBtn"
                ) as HTMLButtonElement;
                btn.addEventListener("click", () => {
                  const text = document.getElementById(
                    "text"
                  ) as HTMLInputElement;
                  const newPin: PinType = {
                    latitude: result.geometry?.location?.lat() as number,
                    longitude: result.geometry?.location?.lng() as number,
                    placeId: place.place_id as string,
                    content: text.value
                  };

                  dispatch(addPins(newPin));
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
    <div className="w-full h-full relative">
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
      <div id="map" className=" w-full h-full"></div>
      <Script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initMap`}
      />
    </div>
  );
}
