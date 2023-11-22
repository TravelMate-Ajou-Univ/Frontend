import { subBookmarks } from "@/redux/features/mapSlice";
import { BookmarkType, PinType } from "@/model/bookmark";
import { placeDetail } from "./place";

type StringProps = {
  photoUrl: string | undefined;
  name: string | undefined;
  address: string | undefined;
  rating: number | undefined;
  modifyState: boolean;
  memo?: string;
  mode?: "add" | "delete";
};
export const makeContentString = ({
  photoUrl,
  name,
  address,
  rating,
  modifyState,
  memo,
  mode
}: StringProps): string => {
  let contentString =
    `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 12rem;">` +
    `<div style="display: flex; flex-direction: row">`;
  if (photoUrl !== undefined) {
    contentString =
      contentString +
      `<img src=${photoUrl} style="width: 3rem; height: 3rem"/>`;
  }
  contentString =
    contentString +
    `<div style="display: flex; flex-direction: column; text-align: start">` +
    `<p style="font-size: 1rem; font-weight: bold; margin: 0">${name}</p>` +
    `<p style="font-size: 0.7rem; margin: 0">${address}</p>`;
  if (rating !== undefined) {
    contentString =
      contentString +
      `<p style="font-size: 0.5rem; margin: 0; text-align: end">
          평점 : ${rating} / 5.0
        </p>` +
      `</div>` +
      `</div>`;
  } else {
    contentString = contentString + `</div>` + `</div>`;
  }
  if (memo) {
    contentString =
      contentString +
      `<p style="align-self: start; margin: 0px 0px 0px 0.5rem; font-size: 0.7rem">메모</p>` +
      `<p style="font-size: 0.7rem; margin: 0px; font-weight: 400">${memo}</p>`;
  }
  if (modifyState && mode === "add") {
    contentString =
      contentString +
      `<button id='btn' style=" width: fit-content; border: 1px solid; border-radius: 10px; padding: 0.3rem">추가하기</button>` +
      `</div>`;
  } else if (modifyState && mode === "delete") {
    contentString =
      contentString +
      `<button id='btn' style=" width: fit-content; border: 1px solid; border-radius: 10px; padding: 0.3rem">삭제하기</button>` +
      `</div>`;
  } else {
    contentString = contentString + `</div>`;
  }
  return contentString;
};

const markerColor = (type: string): string => {
  return type === "pin"
    ? "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    : "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
};

type MarkerProps = {
  pin: PinType | BookmarkType;
  initmap: google.maps.Map;
  service: google.maps.places.PlacesService;
  modifyState: boolean;
  map: google.maps.Map;
  subPinHandler: (pin: PinType) => void;
  subBookmarkHandler: (bookmark: BookmarkType) => void;
};

export const makeMarker = ({
  pin,
  initmap,
  service,
  modifyState,
  map,
  subPinHandler,
  subBookmarkHandler
}: MarkerProps) => {
  const type: string =
    typeof pin === "object" && "id" in pin ? "bookmark" : "pin";

  const marker = new google.maps.Marker({
    position: {
      lat: pin.latitude,
      lng: pin.longitude
    },
    map: initmap,
    icon: `${markerColor(type)}`
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
          type === "pin"
            ? subPinHandler(pin)
            : subBookmarkHandler(pin as BookmarkType);
          infoWindow.close();
          marker.setMap(null);
        });
      }
    });
  });
};
