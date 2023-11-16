import { BookmarkType, LocationType } from "@/model/bookmark";

export function CalculateCenter(bookmarks: BookmarkType[]): LocationType {
  let lat = 0;
  let lng = 0;

  for (let i = 0; i < bookmarks.length; i++) {
    lat += bookmarks[i].latitude;
    lng += bookmarks[i].longitude;
  }

  lat = lat / bookmarks.length;
  lng = lng / bookmarks.length;

  return { latitude: lat, longitude: lng };
}

type SearchProps = {
  service: google.maps.places.PlacesService;
  search: string;
  map: google.maps.Map | undefined;
  center: LocationType;
};
export const searchPlace = async ({
  search,
  map,
  center
}: SearchProps): Promise<google.maps.places.PlaceResult[] | null> => {
  return new Promise((resolve, reject) => {
    const request = {
      location: {
        lat: center.latitude,
        lng: center.longitude
      },
      radius: 500,
      query: search
    };

    const service = new google.maps.places.PlacesService(
      map as google.maps.Map
    );

    service.textSearch(request, (results, status, page) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        console.error("장소 검색 실패 : ", status);
        reject(null);
      }
    });
  });
};

type DetailProps = {
  service: google.maps.places.PlacesService;
  place_id: string;
};
export const placeDetail = async ({
  service,
  place_id
}: DetailProps): Promise<google.maps.places.PlaceResult | null> => {
  return new Promise((resolve, reject) => {
    const request = {
      placeId: place_id,
      fields: ["name", "rating", "geometry", "formatted_address", "photo"]
    };

    service.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(result);
      } else {
        console.error("세부정보 검색 실패 : ", status);
        reject(null);
      }
    });
  });
};

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
