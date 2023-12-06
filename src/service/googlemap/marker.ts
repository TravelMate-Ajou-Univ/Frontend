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
    `<div style="display: flex; flex-direction: column; width: 12rem;">` +
    `<div style="display: flex; flex-direction: column; gap: 0.3rem;">`;
  if (photoUrl !== undefined) {
    contentString =
      contentString +
      `<img src=${photoUrl} style="width: 100%; height: 100%; max-height: 8rem; object-fit: contain;"/>`;
  }
  contentString =
    contentString +
    `<div style="display: flex; flex-direction: column; gap: 0.3rem; text-align: start">` +
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
      `<p style="align-self: start; font-size: 0.7rem">메모</p>` +
      `<p style="align-self: start; font-size: 0.7rem; margin: 0.5rem 0; font-weight: 400; padding: 2px 4px; background-color: rgb(254 243 199); width: 100%; min-height: 3rem;">${memo}</p>`;
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
  activeMarkerHandler: (currentMarker: google.maps.InfoWindow) => void;
  subPinHandler?: (pin: PinType) => void;
  subBookmarkHandler?: (bookmark: BookmarkType) => void;
};

export const makeMarker = ({
  pin,
  initmap,
  service,
  modifyState,
  activeMarkerHandler,
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

    activeMarkerHandler(infoWindow);
    initmap.panTo(marker.getPosition() as google.maps.LatLng);
    infoWindow.open({
      anchor: marker,
      map: initmap
    });
    google.maps.event.addListener(infoWindow, "domready", () => {
      const btn = document.getElementById("btn");

      if (btn && subPinHandler) {
        btn.addEventListener("click", () => {
          subPinHandler(pin as PinType);

          infoWindow.close();
          marker.setMap(null);
        });
      } else if (btn && subBookmarkHandler) {
        btn.addEventListener("click", () => {
          subBookmarkHandler(pin as BookmarkType);
          infoWindow.close();
          marker.setMap(null);
        });
      }
    });
  });
};
