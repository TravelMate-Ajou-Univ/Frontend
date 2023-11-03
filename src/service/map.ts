import { Bookmark } from "@/model/bookmark";

export function CalculateCenter(bookmarks: Bookmark[]) {
  let lat = 0;
  let lng = 0;

  for (let i = 0; i < bookmarks.length; i++) {
    lat += bookmarks[i].latitude;
    lng += bookmarks[i].longitude;
  }

  lat = lat / bookmarks.length;
  lng = lng / bookmarks.length;

  return { lat: lat, lng: lng };
}
