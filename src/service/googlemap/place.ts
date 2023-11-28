import { LocationType } from "@/model/bookmark";

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
      radius: 150000,
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
