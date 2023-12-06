import { useAppSelector } from "@/hooks/redux";
import { BookmarkType, PinType } from "@/model/bookmark";
import {
  addBookmarks,
  initBookmarks,
  initPins,
  setBookmarks,
  subBookmarks,
  subPins
} from "@/redux/features/mapSlice";
import { makeContentString, makeMarker } from "@/service/googlemap/marker";
import { placeDetail, searchPlace } from "@/service/googlemap/place";
import Script from "next/script";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
declare global {
  interface Window {
    initMap: () => void;
  }
}
type Props = {
  socket: Socket;
  modifyState: boolean;
  collectionId: number;
};
export default function ChatMap({ modifyState, socket, collectionId }: Props) {
  const dispatch = useDispatch();
  const [map, setMap] = useState<google.maps.Map>();
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<google.maps.Marker[]>([]);
  const { center, bookmarks } = useAppSelector(state => state.mapSlice);
  const activeMarkerInfoRef = useRef<google.maps.InfoWindow>();
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
    }
  }, [center, bookmarks]);

  useEffect(() => {
    socket.on("postBookmark", data => {
      const newBookmarks: BookmarkType[] = data.bookmark.map(
        (chatBookmark: any) => ({
          latitude: Number(chatBookmark.location.latitude),
          longitude: Number(chatBookmark.location.longitude),
          content: chatBookmark.content,
          placeId: chatBookmark.location.placeId,
          id: chatBookmark.id
        })
      );
      dispatch(addBookmarks(newBookmarks));
    });
    socket.on("deleteBookmark", data => {
      const deletedBookmarkId = data.bookmarkIds[0];
      const recentBookmarks = bookmarks.filter(
        bookmark => bookmark.id !== deletedBookmarkId
      );
      dispatch(setBookmarks(recentBookmarks));
    });
  }, [socket, dispatch]);

  // page를 나갈 때 pins, bookmarks 초기화.
  useEffect(() => {
    return () => {
      dispatch(initBookmarks());
    };
  }, [dispatch]);

  // 북마크 컬렉션에 있는 북마크들 marker로 표시
  const setMarker = (initmap: google.maps.Map) => {
    const service = new google.maps.places.PlacesService(
      initmap as google.maps.Map
    );
    bookmarks.map(bookmark => {
      makeMarker({
        pin: bookmark,
        initmap,
        service,
        modifyState,
        activeMarkerHandler,
        subBookmarkHandler
      });
    });
  };
  const activeMarkerHandler = (currentMarker: google.maps.InfoWindow): void => {
    // active marker 변경
    activeMarkerInfoRef.current?.close();
    activeMarkerInfoRef.current = currentMarker;
  };

  const subBookmarkHandler = (bookmark: BookmarkType) => {
    socket.emit("deleteBookmark", {
      bookmarkIds: [bookmark.id],
      bookmarkCollectionId: collectionId
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
        if (result === null || map === undefined) {
          return;
        }

        // click한 marker를 맵 중앙에 오고, 정보창 띄우기
        map.setCenter(marker.getPosition() as google.maps.LatLng);
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

                  // 검색한 bookmark chatting map에 emit
                  socket.emit("postBookmark", {
                    locationsWithContent: [
                      {
                        latitude: result.geometry?.location?.lat() as number,
                        longitude: result.geometry?.location?.lng() as number,
                        content: text.value,
                        placeId: place.place_id as string
                      }
                    ],
                    bookmarkCollectionId: collectionId
                  });

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
