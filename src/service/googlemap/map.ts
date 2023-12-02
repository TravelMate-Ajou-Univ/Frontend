import { BookmarkType, LocationType } from "@/model/bookmark";

export function calculateCenter(bookmarks: BookmarkType[]): LocationType {
  let lat = 0;
  let lng = 0;

  for (let i = 0; i < bookmarks.length; i++) {
    lat += Number(bookmarks[i].latitude);
    lng += Number(bookmarks[i].longitude);
  }

  lat = lat / bookmarks.length;
  lng = lng / bookmarks.length;

  return { latitude: lat, longitude: lng };
}
