import { LocationType } from "@/model/bookmark";

type SearchProps = {
  service: google.maps.places.PlacesService;
  search: string;
  map: google.maps.Map | undefined;
};
export const searchPlace = async ({
  search,
  map
}: SearchProps): Promise<google.maps.places.PlaceResult[] | null> => {
  const zoomLevel = map?.getZoom() as number;

  // 장소 탐색 범위 설정
  const radius =
    zoomLevel > 20
      ? 500
      : zoomLevel > 15
      ? 1000
      : zoomLevel > 10
      ? 10000
      : zoomLevel > 5
      ? 10000
      : 100000;

  return new Promise((resolve, reject) => {
    const request = {
      location: {
        lat: map?.getCenter()?.lat() as number,
        lng: map?.getCenter()?.lng() as number
      },
      radius,
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
